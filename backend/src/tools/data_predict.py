import pandas as pd
import numpy as np


def predictive_model_tool(predictive_model_code: str, dataset_path: str, save_path: str) -> str:
    """
    Applies a small predictive model for a given dataset using a DataFrame variable called "df".
    The model code must define and use a predictive model and import all required libraries.
    The final prediction must be saved using a method ".to_csv(save_path)".
    Use this tool if the user asks for a PREDICTION.

    Args:
        predictive_model_code (str): Python code defining and applying the predictive model.
        dataset_path (str): Path to the dataset in CSV format.
        save_path (str): Path where the predictions will be saved as a CSV file. It must be saved in a folder "./predictions".

    Returns:
        A message briefly describing the prediction and the model used, if it was successful.
    """
    
    try:
        df = pd.read_csv(dataset_path)
        exec(predictive_model_code)
        return f"SUCCESSFUL PREDICTION: Predictions saved to {save_path}\n"
    except Exception as e:
        return f"UNSUCCESSFUL PREDICTION: {e}\n"
