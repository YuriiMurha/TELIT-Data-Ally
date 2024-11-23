__all__ = ["get_da_tool_rules_prompt"]


def get_da_tool_rules_prompt(data_summary: dict) -> str:
    return f"""\
    You have access to a dataset. A path to the dataset: {data_summary['dataset_path']} Here's a brief overview of the dataset:
    
    {data_summary["description"]}

    COLUMNS DESCRIPTION:
    
    {data_summary["attrs_desc"]}

    When using the tools, you must:

    Always use correct Python syntax.
    Always import the necessary libraries at the beginning of your code.
    Always use the data columns specified in COLUMNS DESCRIPTION and no others.
    Never attempt to modify the data.
    Always ensure that your code is syntactically correct and can be executed without errors.
    Never include any unnecessary code or outputs.
    Always answer only what the user asked for; don't provide additional information unless requested.
    """

"""
At the end of the code you must add "plt.savefig" to save the plot using in a folder called "plots".
The Data Visualization tool enables interaction with datasets by creating visualizations using seaborn and matplotlib libraries. 
You can generate various types of plots to explore and present the data effectively. 
The tool will produce visual outputs based on your instructions or return an error message if the visualization cannot be created as specified. 
The error message as the following: "CANNOT EXECUTE!".
"""