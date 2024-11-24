"use client";
import { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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

function DashboardNav({ appendFileDescription }) {
  const [uploading, setUploading] = useState(false);
  const [datasetNames, setDatasetNames] = useState([]);

  const handleFileChange = (event) => {
    handleUpload(event.target.files[0]);
  };

  const handleUpload = async (selectedFile) => {
    if (!selectedFile) {
      return;
    }
    const formData = new FormData();
    formData.append("file", selectedFile);
    setDatasetNames((prevNames) => [...prevNames, selectedFile.name]);

    try {
      setUploading(true);
      const response = await axios.post(
        "http://147.232.172.217:8000/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      appendFileDescription({
        name: selectedFile.name,
        description: response.data?.overview
      })

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
              {datasetNames.length !== 0 ? (
                datasetNames.map((dataset) => (
                  <div
                    key={dataset}
                    className="flex justify-between items-center pt-2"
                  >
                    <div className="border-[#E2097A] border-b">{dataset}</div>
                    <Trash
                      className="cursor-pointer select-none text-[#E2097A]"
                      size={24}
                    />
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-center w-10 h-10">
                  Empty.
                </div>
              )}
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
              <SelectLabel>Model</SelectLabel>
              <SelectItem value="o1-preview">o1-preview</SelectItem>
              <SelectItem value="anthropic-claude">Anthropic Claude</SelectItem>
              <SelectItem value="llama">Llama 3.1</SelectItem>
              <SelectItem value="mistral">Mistral 7B</SelectItem>
              <SelectItem value="gpt-4o">GPT-4o</SelectItem>
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
