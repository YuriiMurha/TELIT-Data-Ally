import requests


# Define the URL and payload
url = "http://localhost:8000/generate"
headers = {"Content-Type": "application/json"}
data = {
    "user_queries": ["Give me some correlation between working hours and satisfaction."],
    "session_id": "123"
}

# Make the POST request
response = requests.post(url, json=data, headers=headers)

# Print the response
if response.status_code == 200:
    print("Response:", response.json())
else:
    print(f"Failed with status code {response.status_code}: {response.text}")