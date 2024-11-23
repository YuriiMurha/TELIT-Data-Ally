from sklearn.impute import KNNImputer
from sklearn.preprocessing import StandardScaler
import pandas as pd
from sklearn.impute import SimpleImputer
from typing import List, Any
import os

def preprocesing_knn(
        data: pd.DataFrame = None,
        output_path: str = None
    ):
    # print("Before imputation:")
    # print(data.isnull().sum().sum())
    if data.isnull().sum().sum() == 0:
        return data
    categorical_columns = []
    numerical_columns = []
    for column in data.columns:
        if data[column].dtype == "object":
            categorical_columns.append(column)
        elif data[column].dtype in ["int64", "float64"]:
            numerical_columns.append(column)
    # print(categorical_columns)
    # print(numerical_columns)
    if len(categorical_columns) == 0 and len(numerical_columns) == 0:
        return None
    if len(categorical_columns) != 0:
        frequent_imputer = SimpleImputer(strategy="most_frequent")
        data[categorical_columns] = frequent_imputer.fit_transform(data[categorical_columns])
    if len(numerical_columns) != 0:
        numerical_data = data[numerical_columns]

        scaler = StandardScaler()
        scaled_data = scaler.fit_transform(numerical_data)

        knn_imputer = KNNImputer(n_neighbors=5)
        imputed_data = knn_imputer.fit_transform(scaled_data)

        imputed_data = scaler.inverse_transform(imputed_data)
        data[numerical_columns] = imputed_data

    # print(data.isnull().sum().sum())
    # print(len(data))

    return data

def find_nan_attributes(
    df: pd.DataFrame, 
    nan_threshold: float = 0.8
) -> List[Any]:
    """ Find columns with high percentage of nan values """
    nan_percentage = df.isna().mean()
    return nan_percentage[nan_percentage > nan_threshold].index.tolist()

def read_data(input_path=str) -> pd.DataFrame:
    """ Read data from accidents and vehicles """
    with open(input_path, "r") as f:
        df_accident = pd.read_csv(f)

    return df_accident

def drop_choosen_attributes(df: pd.DataFrame) -> pd.DataFrame:
    """ Drop choosen attributes """
    # drop columns with high nan %
    attrs2drop = find_nan_attributes(df)

    return df.drop(attrs2drop, axis=1)

if __name__ == "__main__":
    # download_dataset()
    data = read_data("E:/thack2024/TELIT-Data-Ally/backend/data/titanic_dataset.csv")
    preproc_data = preprocesing_knn(data=data, output_path="data/preprocessed_data.csv")
    print(preproc_data.isnull().sum().sum())
    pass