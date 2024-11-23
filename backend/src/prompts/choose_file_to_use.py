import json

__all__ = ["get_choose_file_prompt"]


def get_choose_file_prompt(json_file_path: str, user_query: str) -> str:

    with open(json_file_path, 'r', encoding='utf-8') as file:
        data = json.load(file)
    parsed_string = ""
    for d in data:
        parsed_string += f"- Dataset Path: \"{d['dataset_path']}\"\nDescription: \"{d['description']}\"\n"

    return f"Based on the description of the files and the user's query, "\
           f"decide which one of the files should be used to answer the following user query: \"{user_query}\". "\
           f"Here is the data about the files contained in our dataset:\n{parsed_string}\n"\
           "Your answer must be in the follwing format: \"Best database: `Dataset Path`\", strictly with \"`\"."


if __name__ == "__main__":
    print(get_choose_file_prompt("./data/data_desc.json"))