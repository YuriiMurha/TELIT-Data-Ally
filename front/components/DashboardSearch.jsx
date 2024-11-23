import { useState } from "react";
import { Input } from "./ui/input";
import { ArrowUp, Plus } from "lucide-react";

function DashboardSearch() {
  const [queryNumber, setQueryNumber] = useState(0);

  return (
    <div className="flex flex-row items-center frosted-magenta-small border-2 border-[#ffffff] h-auto py-3 px-4 w-full rounded-xl gap-5">
      <Input
        type="text"
        placeholder="Write your query here..."
        className="flex-grow"
      />

      <div className="flex flex-row gap-4 justify-center">
        <div
          className="my-1 flex justify-center h-auto w-[160px] flex-col bg-[#E2097A] rounded-full flex-shrink-0"
        >
          <div
            className="flex justify-center items-center p-2 rounded-full"
            onClick={() => setQueryNumber(queryNumber + 1)}
          >
            <div className="flex gap-2 items-center">
              <Plus className="text-white" />
              <p className="text-white text-sm uppercase font-semibold">Add Prompt</p>
              
              <div
                className={`text-white text-md border-2 border-white rounded-3xl px-2 font-bold ${
                  queryNumber === 0 ? 'invisible' : ''
                }`}
              >
                {queryNumber}
              </div>
            </div>
          </div>
        </div>

        <div className="my-1 flex justify-center h-auto w-auto flex-col bg-[#E2097A] rounded-full flex-shrink-0">
          <div className="flex justify-center items-center p-2 rounded-full">
            <ArrowUp className="text-white " />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardSearch;
