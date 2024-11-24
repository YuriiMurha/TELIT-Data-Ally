from typing import List
from fastapi import FastAPI, File, UploadFile
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from time import sleep
import json
import os
from dotenv import load_dotenv, find_dotenv

from langchain_pinecone import PineconeVectorStore
from langchain_openai import OpenAIEmbeddings

from src.executor import get_data_summary, exec_agent


load_dotenv(find_dotenv())

LLM_API_KEY = os.environ.get("LLM_KEY")
PINECONE_API_KEY = os.environ.get("PINECONE_API_KEY")
PINECONE_INDEX_NAME = os.environ.get("PINECONE_INDEX_NAME")


class UploadDataRequest(BaseModel):
    data: str


class GenerationRequest(BaseModel):
    """
    Data model for the generation request payload.

    Attributes:
        user_queries (List[str]): A list of user queries to be processed by the agent.
        session_id (str): The session ID for the conversation.
    """

    user_queries: List[str]
    session_id: str

app = FastAPI()

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost:3000",
    "http://localhost:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.mount("/plots", StaticFiles(directory="./data/images"), name="plots")
app.mount("/datasets", StaticFiles(directory="./data"), name="datasets")


@app.post("/upload")
async def create_upload_file(file: UploadFile = File(...)):
    """
    Endpoint to upload a file to the server.

    Args:
        file (UploadFile): The file to be uploaded.

    Returns:
        dict: A dictionary indicating the status of the upload.
    """
    print(file)
    if file is None:
        return {"status": "400", "error": "No file was provided"}

    try:
        # Save the file to data folder
        with open(f"./data/{file.filename}", "wb") as buffer:
            buffer.write(await file.read())
    except Exception as e:
        return {"status": "500", "error": f"Error occurred while saving the file: {e}"}

    res = get_data_summary("123", f"./data/{file.filename}")
    with open("./data/data_desc.json", "r") as f:
        data_desc = json.load(f)

    data_element = [{
        "dataset_path": f"./data/{file.filename}", 
        "description": res["overview"],
        "attrs_desc": res["attrs_desc"]
    }]

    data_desc += data_element

    # upload to a vector database
    embedding = OpenAIEmbeddings(
    model="text-embedding-3-large",
    api_key=LLM_API_KEY
    )
    PineconeVectorStore.from_texts(
      [f"{data_element[0]['dataset_path']}: {data_element[0]['description']}"],
      index_name=PINECONE_INDEX_NAME,
      embedding=embedding
    )

    with open("./data/data_desc.json", "w") as f:
        json.dump(data_desc, f)

    res["status"] = "200"
    return res


@app.post("/generate")
async def generate(gen_req: dict):
    """
    Endpoint to generate responses from the agent based on a list of user queries.

    Args:
        gen_req (GenerationRequest): The request payload containing the user's queries.

    Returns:
        List[str]: The responses generated by the agent.
    """
    
    responses = []
    for query in gen_req.get("user_queries"):
        sleep(2)
        responses.append(exec_agent("123", query))
    return [res for res in responses]


@app.get("/get-datasets")
async def get_datasets():
    dataset_paths = [i for i in os.listdir("./data") if i.endswith(".csv")]
    result = []
    with open("./data/data_desc.json", "r") as f:
        metadata = json.load(f)
    for dataset in dataset_paths:
        meta_dataset = [i for i in metadata if dataset in i["dataset_path"]][0]
        result.append({
            "dataset_name": dataset,
            "description": meta_dataset["description"],
            "attr_desc": meta_dataset["attrs_desc"]
        })
    return result