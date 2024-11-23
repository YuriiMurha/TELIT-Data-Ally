import pandas as pd


# dataset_path = "./data/titanic_dataset.csv"
# dataset_path = "./data/HR_TimeSalary.csv"
# dataset_path = "./data/HR_ProductivitySatisfaction.csv"
# dataset_path = "./data/German_Companies.csv"


def data_summary_tool(dataset_path) -> str:
    """
    Based on the information you get about the dataset, analyze it and give a responce in the following format:

    DATASET OVERVIEW:
        A brief verbal description of a dataset (1-2 sentences).

    COLUMNS DESCRIPTION:
        - Column1 [data type]: a sentence describing Column1...
        - Column2 [data type]: a sentence describing Column2...
        ...

    Args:
        dataset_path (str): path to the file

    Returns:
        If there's no error return DATASET OVERVIEW and COLUMNS DESCRIPTION strictly in the format above.
    """
    try:
        with open(dataset_path, "r", encoding="utf-8") as f:
            data = pd.read_csv(f)
        dataset_overview = {
            "num_rows": data.shape[0],
            "num_columns": data.shape[1],
            "columns": data.columns.tolist()
        }
        summary = data.head()
        return f"Data Overview:\n{dataset_overview}\nData Summary:\n{summary}\n"

    except Exception as e:
        return f"Error: {str(e)}\n"