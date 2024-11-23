import{ useEffect } from 'react';   
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from '@/components/ui/button';
import DashboardNav from './DashboardNav';
import DashboardContent from './DashboardContent';
import DashboardSearch from './DashboardSearch';

function Dashboard() {
  return (
    <div className='gradient-background w-full h-screen'>
      <div className="flex flex-col pt-24 px-48 gap-4">
        <DashboardNav />
        <DashboardContent />
        <DashboardSearch />
      </div>
    </div>
  );
}

export default Dashboard;
