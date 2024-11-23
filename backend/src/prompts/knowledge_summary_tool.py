import pandas as pd
__all__ = ["knowledge_summary_tool"]


def knowledge_summary_tool(file_path):
    """
    Based on the information you get about the dataset, analyze it and output it strictly in this format:
    DATASET OVERVIEW:
        A few sentences about the dataset.

    COLUMNS DESCRIPTION:
        - Column1 [data type]: a sentence describing Column1...
        - Column2 [data type]: a sentence describing Column2...
        ... 

    Args:
        file_path (str): Path to the dataset (CSV file).

    Returns:
        str: Summary of the dataset in the specified string format.
    """
    try:
        data = pd.read_csv(file_path)
        dataset_overview = {
            "num_rows": data.shape[0],
            "num_columns": data.shape[1],
            "columns": data.columns.tolist()
        }
        sammary = data.head()
        return f"overwie:{dataset_overview} how data looks: {sammary}"

    except Exception as e:
        return f"Error: {str(e)}"