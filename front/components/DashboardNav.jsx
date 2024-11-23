"use client"
import { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { Separator } from "./ui/separator";

const datasetNames = [
  "HR_ProductivitySatisfaction.csv",
  "HR_TimeSalary.csv",
  "titanic_dataset.csv",
  "German_Companies.csv"
]

function DashboardNav() {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (event) => {
    handleUpload(event.target.files[0]);
  };

  const handleUpload = async (selectedFile) => {
    if (!selectedFile) {
      return;
    }
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      setUploading(true);
      const response = await axios.post("http://147.232.172.210:8000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response)
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="frosted-magenta-small border-2 border-white  flex justify-between items-center py-4 px-8 rounded-2xl">
      <Dialog>
        <DialogTrigger className="inline-flex items-center justify-center rounded-md text-sm h-9 px-4 py-2 bg-white">
          View datasets
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Uploaded datasets</DialogTitle>
            <DialogDescription>
              {/* {datasetNames.map((dataset) => (
                <>
                  <div key={dataset} className="flex justify-between items-center pt-2">
                    <div className="border-[#E2097A] border-b">
                      {dataset}
                    </div>
                    <Trash className="cursor-pointer select-none text-[#E2097A]" size={24}/>
                  </div>
                  
                </>
              )) */}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <div className="flex gap-2">
        <Select>
          <SelectTrigger className="w-[180px] bg-white">
            <SelectValue placeholder="Predictive model" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>GPT-4o</SelectLabel>
              <SelectItem value="apple">o1-preview</SelectItem>
              <SelectItem value="blueberry">Llama 3.1</SelectItem>
              <SelectItem value="grapes">Mistral 7B</SelectItem>
              <SelectItem value="pineapple">Gemma</SelectItem>
              <SelectItem value="banana">Anthropic Claude</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Button disabled={uploading}>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="file-upload">Choose File</Label>
          <Input
            type="file"
            accept=".csv, .xls, .xlsx"
            onChange={handleFileChange}
            className="hidden"
            id="file-upload"
          />
        </div>
        </Button>
      </div>
    </div>
  );
}

export default DashboardNav;
