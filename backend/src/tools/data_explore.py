import pandas as pd


def dataagg_tool(aggregation_code: str, dataset_path: str) -> str:
    """
    Performs data aggregations using a DataFrame variable called "df" and a given Python code as an argument.
    You must use only pandas for data aggregation.

    Args:
        aggregation_code (str): A Python code that will be executed for data aggregation.
        dataset_path (str): A path to the dataset.

    Returns:
        The result of the aggregation or an error message. Also write a comprehensive description of the aggregation and the dataset name.
    """
    df = pd.read_csv(dataset_path)
    
    try:
        result = eval(aggregation_code)
        return f"AGGREGATION RESULT:\n{result}\n"
    except Exception as e:
        return f"AGGREGATION FAILED: {e}\n"