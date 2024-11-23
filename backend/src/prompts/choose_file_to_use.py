import json

__all__ = ["choose_file_to_use"]


def choose_file_to_use(json_file_path:str) -> str:

    with open(json_file_path, 'r', encoding='utf-8') as file:
        data = json.load(file)
    parsed_string = ""
    for d in data["datasets"]:
        parsed_string += f"- Dataset_name: {d['name']}\n  Description: {d['description']}\n"

    return f"""Based on the description of the files and the user's query, decide which one of the files should be used to answer a particular user query.
Here is the data about the files contained in our dataset:\n{parsed_string}"""