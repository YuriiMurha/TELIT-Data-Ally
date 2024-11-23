import requests


# Define the URL and payload
url = "http://localhost:8000/generate"
headers = {"Content-Type": "application/json"}
data = {
    "user_queries": ["Make a dataset summarization."],
    "session_id": "123"
}

# Make the POST request
# response = requests.post(url, json=data, headers=headers)
response = requests.post("http://localhost:8000/upload-data", headers=headers)

# Print the response
if response.status_code == 200:
    print("Response:", response.json())
else:
    print(f"Failed with status code {response.status_code}: {response.text}")