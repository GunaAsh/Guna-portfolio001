
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Upload, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminResume = () => {
  const [currentResume, setCurrentResume] = useState<File | null>(null);
  const { toast } = useToast();

  const handleResumeUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setCurrentResume(file);
      // Here you would typically upload to your storage solution
      toast({
        title: "Resume uploaded",
        description: `File ${file.name} has been uploaded successfully.`,
      });
    } else {
      toast({
        title: "Invalid file",
        description: "Please upload a PDF file.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Resume Management</h2>
      </div>

      <div className="glass-card p-6 rounded-xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-white mb-2">Current Resume</h3>
            <p className="text-white/70 text-sm">
              {currentResume ? currentResume.name : "No resume uploaded"}
            </p>
          </div>
          
          {currentResume && (
            <Button variant="outline" className="gap-2">
              <FileText className="h-4 w-4" />
              View Current
            </Button>
          )}
        </div>

        <div className="border-2 border-dashed border-white/10 rounded-lg p-6">
          <div className="flex flex-col items-center gap-2">
            <Upload className="h-8 w-8 text-white/50" />
            <p className="text-sm text-white/70">Drag and drop your resume here or</p>
            <label htmlFor="resume-upload" className="cursor-pointer">
              <Button variant="outline" className="gap-2">
                <Upload className="h-4 w-4" />
                Upload New Resume
              </Button>
              <input
                id="resume-upload"
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={handleResumeUpload}
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminResume;
