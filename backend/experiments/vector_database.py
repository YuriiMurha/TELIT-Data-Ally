import os
import json
from dotenv import load_dotenv, find_dotenv
from langchain_openai import OpenAIEmbeddings
from langchain_pinecone import PineconeVectorStore


load_dotenv(find_dotenv())

LLM_API_KEY = os.environ.get("LLM_KEY")
PINECONE_API_KEY = os.environ.get("PINECONE_API_KEY")
PINECONE_INDEX_NAME = os.environ.get("PINECONE_INDEX_NAME")


embedding = OpenAIEmbeddings(
  model="text-embedding-3-large",
  api_key=LLM_API_KEY
)

# UPLOADS TO THE DATABASE!!
# with open("./data/data_desc.json", "r") as f:
#   data = json.load(f)
# texts = [f"{i['dataset_path']}: {i['description']}" for i in data]

# docsearch = PineconeVectorStore.from_texts(
#   texts,
#   index_name=PINECONE_INDEX_NAME,
#   embedding=embedding
# )

retriever = PineconeVectorStore(
  embedding=embedding, 
  index_name=PINECONE_INDEX_NAME
).as_retriever(search_kwargs={"k": 5})

results = retriever.get_relevant_documents("What is my salary?")
results = [i.page_content.split(":")[0] for i in results]

print(results)