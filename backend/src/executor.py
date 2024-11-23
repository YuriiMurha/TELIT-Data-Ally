import dotenv
import os

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
    llm.bind_tools(tools)
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
    overview = res["output"].split("COLUMNS DESCRIPTION:\n")[0].replace("DATASET OVERVIEW:", "").replace("\n", "")
    attrs_desc = res["output"].split("COLUMNS DESCRIPTION:\n")[1]
    return {"overview": overview, "attrs_desc": attrs_desc}


# def exec_agent(session_id):
