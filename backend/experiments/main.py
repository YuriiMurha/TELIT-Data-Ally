"""
FastAPI Application for ReAct Agent with LangChain and OpenAI
-------------------------------------------------------------

This module sets up a FastAPI application to interact with the ReAct agent. The agent is designed to process user queries,
interact with an SQL database, and return coherent, context-aware responses. The FastAPI application exposes endpoints
for health checking and generating responses from the agent.

Structure
---------
- Imports: Necessary libraries and modules.
- Data Models: Pydantic models for request validation.
- FastAPI App: Initialization of the FastAPI application.
- Endpoints: API endpoints for health check and generating responses.

Usage
-----
1. Run the FastAPI server:
    ```sh
    fastapi dev main.py
    ```
2. Access the health check endpoint at:
    http://127.0.0.1:8000/healthcheck
3. Generate a response by sending a POST request to:
    http://127.0.0.1:8000/generate
    with a JSON payload containing the user query.

Example:
    ```sh
    curl -X POST http://0.0.0.0:8000/generate -H "Content-Type: application/json" -d '{"user_query": "Which assets Client_1 have a target allocation smaller than 40%?", "session_id": "123"}'
    ```

Dependencies
------------
- fastapi: The web framework for building APIs with Python.
- pydantic: Data validation and settings management using Python type annotations.

"""

from typing import List
from fastapi import FastAPI, File, UploadFile, WebSocket
from fastapi.responses import FileResponse, WebSocketResponse
from pydantic import BaseModel
from time import sleep

from src.agent import agent
from src.executor import get_data_summary


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


@app.get("/healthcheck")
async def healthcheck():
    """
    Health check endpoint to verify if the API is running.

    Returns:
        dict: A dictionary indicating the status of the API.
    """
    return {"status": "ok"}

@app.post("/upload-data")
async def upload_data():
    res = get_data_summary("123", "./data/German_Companies.csv")
    return res

@app.post("/uploadfile/")
async def create_upload_file(file: UploadFile = File(...)):
    """
    Endpoint to upload a file to the server.

    Args:
        file (UploadFile): The file to be uploaded.

    Returns:
        dict: A dictionary indicating the status of the upload.
    """
    if file is None:
        return {"status": "400", "error": "No file was provided"}

    try:
        # Save the file to data folder
        with open(f"data/{file.filename}", "wb") as buffer:
            buffer.write(await file.read())
    except Exception as e:
        return {"status": "500", "error": f"Error occurred while saving the file: {e}"}

    return {"status": "200"}

@app.get("/files/{filename}")
async def download_file(filename: str):
    """
    Endpoint to download a file from the server.

    Args:
        filename (str): The name of the file to be downloaded.

    Returns:
        FileResponse: A FileResponse object containing the file to be downloaded.
    """
    return FileResponse(f"data/{filename}")

@app.post("/generate")
async def generate(gen_req: GenerationRequest):
    """
    Endpoint to generate responses from the agent based on a list of user queries.

    Args:
        gen_req (GenerationRequest): The request payload containing the user's queries.

    Returns:
        List[str]: The responses generated by the agent.
    """
    
    responses = []
    for query in gen_req.user_queries:
        sleep(2)
        responses.append(agent.invoke(
            {
                "input": query,
            },
            {"configurable": {"session_id": gen_req.session_id}},
        ))
    return [res["output"] for res in responses]
