import DashboardNav from './DashboardNav';
import DashboardContent from './DashboardContent';
import DashboardSearch from './DashboardSearch';
import { useEffect, useState } from 'react';

// const dialogData = [
//   {
//     type: "question",
//     content: "What is the weather today?"
//   },
//   {
//     type: "answer",
//     answers: [
//       {
//           "description": "I have visualized the distribution of chick weight from the dataset \"chickweight.csv\". The plot shows the frequency of different weights of chicks. You can view the plot named \"chick_weight_distribution.png\" in the \"plots\" folder.",
//           "imageUrl": "http://147.232.172.217:8000/plots/chick_weight_distribution_1732440686.png"
//       },
//       {
//           "description": "The chart of the fields \"Revenue, Net Income, Liabilities, Assets, and Equity\" from the German_Companies.csv dataset has been successfully created. The pairplot shows the relationships between these variables. You can find the plot saved as \"pairplot.png\" in the \"plots\" folder.",
//           "imageUrl": "http://147.232.172.217:8000/plots/pairplot_1732440695.png"
//       },
//       {
//           "description": "The chart of the selected columns from the HR_TimeSalary.csv dataset has been successfully created.",
//           "imageUrl": "http://147.232.172.217:8000/plots/pairplot_selected_columns_1732440703.png"
//       }
//   ]
//   }
// ]


function Dashboard() {
  const [descriptions, setDescriptions] = useState([]);
  const [dialogData, setDialogData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const updateDialogData = (data) => {
    setDialogData([...dialogData, ...data]);
  }

  const appendFileDescription = (fileDesc) => {
    setDescriptions([
      ...descriptions,
      fileDesc
    ])
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://147.232.172.217:8000/get-datasets', { method: 'GET' });
  

        if (response.ok) {
          const data = await response.json();

          if (data) setDescriptions(data.map((el) => ({ name: el.dataset_name, description: el.description})));
        } else {
          console.error('Failed to fetch datasets:', response.statusText);
        }
    
      } catch (error) {
        console.error('Failed to fetch datasets:', error);
      }
    }

    fetchData();
    
  }, [])

  return (
    <div className='gradient-background w-full h-screen'>
      <div className="flex flex-col pt-24 px-48 gap-4">
        <DashboardNav appendFileDescription={appendFileDescription} descriptions={descriptions} />
        <DashboardContent descriptions={descriptions} dialogData={dialogData} isLoading={isLoading} />
        <DashboardSearch updateDialogData={updateDialogData} setIsLoading={setIsLoading}  />
      </div>
    </div>
  );
}

export default Dashboard;
