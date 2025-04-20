
import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Upload, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

const AdminResume = () => {
  const [currentResume, setCurrentResume] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleResumeUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setUploadError(null);
    
    if (file) {
      if (file.type === 'application/pdf') {
        setUploading(true);
        
        // Simulate upload process
        setTimeout(() => {
          setCurrentResume(file);
          setUploading(false);
          
          toast({
            title: "Resume uploaded",
            description: `File ${file.name} has been uploaded successfully.`,
          });
        }, 1500); // Simulating a delay for the upload
      } else {
        setUploadError("Please upload a PDF file.");
        toast({
          title: "Invalid file",
          description: "Please upload a PDF file.",
          variant: "destructive",
        });
      }
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    
    const file = event.dataTransfer.files?.[0];
    if (file) {
      if (file.type === 'application/pdf') {
        setUploading(true);
        setUploadError(null);
        
        // Simulate upload process
        setTimeout(() => {
          setCurrentResume(file);
          setUploading(false);
          
          toast({
            title: "Resume uploaded",
            description: `File ${file.name} has been uploaded successfully.`,
          });
        }, 1500); // Simulating a delay for the upload
      } else {
        setUploadError("Please upload a PDF file.");
        toast({
          title: "Invalid file",
          description: "Please upload a PDF file.",
          variant: "destructive",
        });
      }
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
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

        {uploadError && (
          <Alert variant="destructive" className="bg-red-500/10 border-red-500/20 text-red-300">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{uploadError}</AlertDescription>
          </Alert>
        )}

        <div 
          className="border-2 border-dashed border-white/10 rounded-lg p-6"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <div className="flex flex-col items-center gap-2">
            <Upload className="h-8 w-8 text-white/50" />
            <p className="text-sm text-white/70">Drag and drop your resume here or</p>
            <Button 
              onClick={triggerFileInput} 
              variant="outline" 
              className="gap-2" 
              disabled={uploading}
            >
              {uploading ? (
                <>
                  <div className="h-4 w-4 border-2 border-t-transparent border-white/70 rounded-full animate-spin"></div>
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4" />
                  Upload New Resume
                </>
              )}
            </Button>
            <input
              ref={fileInputRef}
              id="resume-upload"
              type="file"
              accept=".pdf"
              className="hidden"
              onChange={handleResumeUpload}
              disabled={uploading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminResume;
