import requests


# Define the URL
url = "http://localhost:8000/upload"

# Define the file to upload
file_path = "D:\\Desktop\\TELIT-Data-Ally\\backend\data\\titanic_dataset.csv"

# Open the file in binary mode
with open(file_path, "rb") as file:
    # Prepare the files dictionary
    files = {
        "file": (file_path, file)  # Name of the form field and the file object
    }

    # Send the POST request with the file
    response = requests.post(url, files=files)

    # Print the response
    if response.status_code == 200:
        print("File uploaded successfully!")
        print("Response:", response.json())
    else:
        print(f"Failed to upload file. Status code: {response.status_code}")
        print("Response:", response.text)