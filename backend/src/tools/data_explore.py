import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np


def data_explore(explore_code: str) -> str:
    """
    Extract knowledge using a DataFrame variable called "df" and a given python code as an argument.
    You can use "pd","np" and "sns" for the visualization

    Args:
        explore_code (str): A python code that will be executed

    Returns:
        Whether the visualization was successful or not.
    """
    
    try:
        exec(explore_code)
        return f"SUCCESSFUL VISUALIZATION\n"
    except Exception as e:
        return f"UNSUCCESSFUL VISUALIZATION: {e}\n"