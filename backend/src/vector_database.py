import os
import json
from dotenv import load_dotenv
from langchain_openai import OpenAIEmbeddings
from langchain_pinecone import PineconeVectorStore
import pinecone

# Load environment variables
load_dotenv()

LLM_API_KEY = os.environ.get("LLM_KEY")
PINECONE_API_KEY = os.environ.get("PINECONE_API_KEY")
PINECONE_ENVIRONMENT = os.environ.get("PINECONE_ENVIRONMENT")
PINECONE_INDEX_NAME = os.environ.get("PINECONE_INDEX_NAME")

# Initialize Pinecone client
pinecone_client = pinecone.Pinecone(api_key=PINECONE_API_KEY, environment=PINECONE_ENVIRONMENT)
# print(PINECONE_INDEX_NAME in pinecone_client.list_indexes().names())
# Ensure index exists
# Connect to the index
index = pinecone_client.Index(PINECONE_INDEX_NAME)

# Initialize embedding model
embedding_model = OpenAIEmbeddings(
    model="text-embedding-3-large",
    api_key=LLM_API_KEY
)

# Initialize Pinecone vector store
vector_store = PineconeVectorStore(
    embedding=embedding_model,
    index_name=PINECONE_INDEX_NAME
)

# Example JSON input
input_json = """
{
  "datasets": [
    {
      "name": "employee_data",
      "description": "Information about employees including Name, Age, Gender, Projects Completed, Productivity, Satisfaction Rate, Feedback Score, Department, Position, Joining Date, and Salary."
    },
    {
      "name": "sales_data",
      "description": "Details about sales transactions including Product ID, Product Name, Sales Amount, Customer ID, Region, and Sales Date."
    }
  ]
}
"""

# Parse JSON and add data to the vector store
data = json.loads(input_json)
datasets = data.get("datasets", [])

for dataset in datasets:
    dataset_name = dataset["name"]
    description = dataset["description"]
    vector_store.add_texts([description], metadatas=[{"name": dataset_name}])

print("Dataset metadata stored in Pinecone.")

# Query the database
retriever = vector_store.as_retriever(search_kwargs={"k": 7})
query = "Details about employee productivity and satisfaction"
results = retriever .similarity_search(query, k=2)

print("\nSearch Results:")
for result in results:
    print(f"Dataset Name: {result.metadata['name']}")
    print(f"Description: {result.page_content}\n")
