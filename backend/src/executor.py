import dotenv
import os
import re
import json
import time
import shutil

from langchain.agents import create_openai_tools_agent
from langchain_openai import ChatOpenAI
from langchain_core.prompts import (
    ChatPromptTemplate, 
    SystemMessagePromptTemplate,
    PromptTemplate
)
from langchain_core.tools import StructuredTool
from langchain.agents.agent import AgentExecutor

import src.prompts as p
import src.tools as t

dotenv.load_dotenv(".env")


def get_llm():
    llm = ChatOpenAI(
        name="gpt-4o",
        temperature=0.,
        model_kwargs={
            "seed": 42,
        },
        api_key=os.environ["LLM_KEY"]
    )
    return llm


def get_agent(tools, system_prompt):
    llm = get_llm()
    if tools:
        llm.bind_tools(tools)

    if tools:
        prompt = ChatPromptTemplate.from_messages(
            [
                SystemMessagePromptTemplate(prompt=system_prompt),
                ("placeholder", "{chat_history}"),
                ("human", "{input}"),
                ("ai", "{agent_scratchpad}"),
            ]
        )
        agent = create_openai_tools_agent(llm=llm, prompt=prompt, tools=tools)
        agent_executor = AgentExecutor(
            agent=agent,
            tools=tools,
            max_iterations=5,
            verbose=True,
            handle_parsing_errors=True,
            return_intermediate_steps=True,
        )
        return agent_executor
    prompt = ChatPromptTemplate.from_messages(
        [
            SystemMessagePromptTemplate(prompt=system_prompt),
            ("human", "{input}"),
        ]
    )
    return (prompt | llm)


def get_data_summary(session_id, dataset_path):
    tools = [StructuredTool.from_function(func=t.data_summary_tool, handle_tool_error=True)]
    system_prompt = PromptTemplate.from_template(
        "".join(
            [
                p.get_agent_description_prompt(),
                p.get_tools_prompt(tools),
            ]
        )
    )
    agent = get_agent(tools, system_prompt)
    res = agent.invoke(
        {
            "input": f"Give me the dataset summary from a followng file {dataset_path}.",
        },
        {"configurable": {"session_id": session_id}},
    )
    output = res["output"].replace("**", "")
    overview = output.split("COLUMNS DESCRIPTION:\n")[0].replace("DATASET OVERVIEW:", "").replace("\n", "")
    attrs_desc = output.split("COLUMNS DESCRIPTION:\n")[1]
    return {"overview": overview, "attrs_desc": attrs_desc}


def get_best_dataset(session_id, user_query):
    system_prompt = PromptTemplate.from_template(p.get_agent_description_prompt())
    user_prompt = p.get_choose_file_prompt(user_query)
    agent = get_agent([], system_prompt)
    res = agent.invoke(
        {
            "input": user_prompt,
        },
        {"configurable": {"session_id": session_id}},
    )
    data_path = re.findall(r"`(.*?)`", res.content)[0]
    return data_path


def exec_agent(session_id, user_query):
    data_path = get_best_dataset(session_id, user_query)
    with open("./data/data_desc.json", "r") as f:
        dataset_metadata = [i for i in json.load(f) if i["dataset_path"] == data_path][0]
    tools = [
        StructuredTool.from_function(func=t.datavis_tool, handle_tool_error=True),
        StructuredTool.from_function(func=t.dataagg_tool, handle_tool_error=True)
    ]
    system_prompt = PromptTemplate.from_template(
        "".join(
            [
                p.get_agent_description_prompt(),
                p.get_tools_prompt(tools),
                p.get_da_tool_rules_prompt(dataset_metadata)
            ]
        )
    )
    agent = get_agent(tools, system_prompt)
    res = agent.invoke(
        {
            "input": user_query,
        },
        {"configurable": {"session_id": session_id}},
    )

    img_paths = []
    for img in os.listdir("./plots"):
        shutil.move(f"./plots/{img}", f"./data/images/{img.split('.')[0]}_{round(time.time())}.{img.split('.')[1]}")
        img_paths.append(f"{img.split('.')[0]}_{round(time.time())}.{img.split('.')[1]}")
    return {"response": res["output"], "plot_paths": img_paths}