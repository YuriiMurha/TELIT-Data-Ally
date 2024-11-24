import DashboardNav from './DashboardNav';
import DashboardContent from './DashboardContent';
import DashboardSearch from './DashboardSearch';
import { useState } from 'react';

function Dashboard() {
  const [descriptions, setDescriptions] = useState([]);

  const appendFileDescription = (fileDesc) => {
    setDescriptions([
      ...descriptions,
      fileDesc
    ])
  }

  return (
    <div className='gradient-background w-full h-screen'>
      <div className="flex flex-col pt-24 px-48 gap-4">
        <DashboardNav appendFileDescription={appendFileDescription} />
        <DashboardContent descriptions={descriptions} />
        <DashboardSearch />
      </div>
    </div>
  );
}

export default Dashboard;
