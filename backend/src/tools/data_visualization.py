import pandas as pd


dataset_path = "./data/titanic_dataset.csv"


def datavis_executer(visualization_code: str):
    """
    Visualizes plots using a DataFrame variable called "df" and a given python code as an argument.

    Args:
        visualization_code (str): A python code that will be executed for visualizing and saving plots.

    Returns:
        Whether the visualization was successful or not. If yes, returns a path to the saved plot.
    """
    df = pd.read_csv(dataset_path)
    
    try:
        exec(visualization_code)
        return f"SUCCESSFUL VISUALIZATION\n"
    except Exception as e:
        return f"UNSUCCESSFUL VISUALIZATION: {e}\n"