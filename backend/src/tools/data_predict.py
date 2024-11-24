import pandas as pd
import numpy as np

def predictive_model_tool(predictive_model_code: str, dataset_path: str, save_path: str) -> str:
    """
    Applies a predictive model to forecast the state at t+1 for a given dataset.
    The DataFrame variable should be named "df". 
    The model code must define and use a predictive model.

    Args:
        predictive_model_code (str): Python code defining and applying the predictive model.
        dataset_path (str): Path to the dataset in CSV format.
        save_path (str): Path where the predictions will be saved as a CSV file.

    Returns:
        str: Message indicating whether prediction was successful or not.
    """
    
    try:
        # Load the dataset
        df = pd.read_csv(dataset_path)
        
        # Execute the predictive model code
        local_vars = {'df': df}
        exec(predictive_model_code, {}, local_vars)
        
        # Check for predictions
        if 'predictions' not in local_vars:
            return "UNSUCCESSFUL PREDICTION: 'predictions' variable not defined in the model code."
        
        # Save predictions
        predictions = local_vars['predictions']
        predictions.to_csv(save_path, index=False)
        
        return f"SUCCESSFUL PREDICTION: Predictions saved to {save_path}\n"
    except Exception as e:
        return f"UNSUCCESSFUL PREDICTION: {e}\n"
