import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns


def datavis_tool(visualization_code: str, dataset_path: str) -> str:
    """
    Visualizes plots using a DataFrame variable called "df" and a given python code as an argument.
    You can use "plt" and "sns" for the visualization
    At the end of the code you must add "plt.savefig" to save the plot using in a folder called "plots".

    Args:
        visualization_code (str): A python code that will be executed for visualizing and saving plots.
        dataset_path (str): A path to the dataset.

    Returns:
        Whether the visualization was successful or not.
    """
    df = pd.read_csv(dataset_path)
    
    try:
        exec(visualization_code)
        return f"SUCCESSFUL VISUALIZATION\n"
    except Exception as e:
        return f"UNSUCCESSFUL VISUALIZATION: {e}\n"