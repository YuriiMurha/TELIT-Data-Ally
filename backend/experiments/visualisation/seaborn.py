import seaborn as sns
import pandas as pd
import matplotlib.pyplot as plt

# Sample DataFrame for HR_ProductivitySatisfaction
data = {
    'Name': ['Douglas Lindsey', 'Anthony Roberson', 'Thomas Miller', 'Joshua Lewis', 'Stephanie Bailey', 'Jonathan King', 'Kyle Figueroa', 'Shannon Allen', 'Daryl Noble'],
    'Productivity (%)': [57, 55, 87, 53, 3, 63, 41, 92, 32],
    'Satisfaction Rate (%)': [25, 76, 10, 4, 9, 33, 39, 68, 43],
    'Department': ['Marketing', 'IT', 'IT', 'Marketing', 'IT', 'Sales', 'Sales', 'HR', 'Marketing'],
    'Salary': [63596, 112540, 66292, 38303, 101133, 48740, 73502, 39670, 49323]
}
df = pd.DataFrame(data)

plt.figure(figsize=(10, 6))
sns.scatterplot(data=df, x='Productivity (%)', y='Satisfaction Rate (%)', hue='Department', size='Salary', sizes=(20, 200), palette='viridis', alpha=0.7)
plt.title('Productivity vs. Satisfaction Rate by Department')
plt.show()
