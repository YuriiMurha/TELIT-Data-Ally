import json
import os
from dotenv import load_dotenv, find_dotenv

from langchain_pinecone import PineconeVectorStore
from langchain_openai import OpenAIEmbeddings


load_dotenv(find_dotenv())

LLM_API_KEY = os.environ.get("LLM_KEY")
PINECONE_API_KEY = os.environ.get("PINECONE_API_KEY")
PINECONE_INDEX_NAME = os.environ.get("PINECONE_INDEX_NAME")

__all__ = ["get_choose_file_prompt"]


def get_metadata_db(user_query: str, k: int = 8):
    embedding = OpenAIEmbeddings(
        model="text-embedding-3-large",
        api_key=LLM_API_KEY
    )
    retriever = PineconeVectorStore(
        embedding=embedding, 
        index_name=PINECONE_INDEX_NAME
    ).as_retriever(search_kwargs={"k": k})

    result = retriever.get_relevant_documents(user_query)
    result = [
        {
            "dataset_path": i.page_content.split(":")[0], 
            "description": i.page_content.split(":")[1]
        } for i in result
    ]
    return result


def get_choose_file_prompt(user_query: str) -> str:

    data = get_metadata_db(user_query)
    parsed_string = ""
    for d in data:
        parsed_string += f"- Dataset Path: \"{d['dataset_path']}\"\n  Description: \"{d['description']}\"\n"

    return f"Based on the description of the files and the user's query, "\
           f"decide which one of the files should be used to answer the following user query: \"{user_query}\". "\
           f"Here is the data about the files contained in our dataset:\n{parsed_string}\n"\
           "Your answer must be in the follwing format: \"Best database: `Dataset Path`\", strictly with \"`\"."


if __name__ == "__main__":
    print(get_choose_file_prompt("./data/data_desc.json"))