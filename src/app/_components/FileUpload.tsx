import React, { useState } from "react";
import { Upload, HardDrive, Cloud } from "lucide-react";

interface UploadedFile {
  name: string;
  size: number;
  type: string;
}

export default function FileUpload() {
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files: FileList) => {
    const fileArray: UploadedFile[] = Array.from(files).map((file) => ({
      name: file.name,
      size: file.size,
      type: file.type,
    }));
    setUploadedFiles((prev) => [...prev, ...fileArray]);
  };

  const handleGoogleDrive = () => {
    alert("Google Drive integration would be implemented here");
  };

  const handleDropbox = () => {
    alert("Dropbox integration would be implemented here");
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div
        className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
          dragActive
            ? "border-blue-400 bg-blue-50"
            : "border-gray-300 hover:border-gray-400"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Upload your files
        </h3>
        <p className="text-sm text-gray-500 mb-6">
          Drag and drop files here, or choose from the options below
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* PC Upload */}
          <div className="relative">
            <input
              type="file"
              multiple
              onChange={handleFileInput}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <button className="w-full flex flex-col items-center justify-center p-4 border border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors">
              <HardDrive className="h-8 w-8 text-gray-600 mb-2" />
              <span className="text-sm font-medium text-gray-700">From PC</span>
              <span className="text-xs text-gray-500 mt-1">Browse files</span>
            </button>
          </div>

          {/* Google Drive */}
          <button
            onClick={handleGoogleDrive}
            className="flex flex-col items-center justify-center p-4 border border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors"
          >
            <svg className="h-8 w-8 mb-2" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M8.5 8.5L12 2l3.5 6.5H8.5z" />
              <path fill="#34A853" d="M5 13.5L8.5 8.5H12l-3.5 5L5 13.5z" />
              <path fill="#FBBC04" d="M19 13.5l-3.5-5H12l3.5 5H19z" />
              <path fill="#EA4335" d="M5 13.5h14v5H5v-5z" />
            </svg>
            <span className="text-sm font-medium text-gray-700">
              Google Drive
            </span>
            <span className="text-xs text-gray-500 mt-1">Import files</span>
          </button>

          {/* Dropbox */}
          <button
            onClick={handleDropbox}
            className="flex flex-col items-center justify-center p-4 border border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors"
          >
            <Cloud className="h-8 w-8 text-blue-600 mb-2" />
            <span className="text-sm font-medium text-gray-700">Dropbox</span>
            <span className="text-xs text-gray-500 mt-1">Import files</span>
          </button>
        </div>
      </div>

      {/* Uploaded Files List */}
      {uploadedFiles.length > 0 && (
        <div className="mt-6">
          <h4 className="text-lg font-medium text-gray-900 mb-3">
            Uploaded Files
          </h4>
          <div className="space-y-2">
            {uploadedFiles.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center mr-3">
                    <span className="text-xs font-medium text-blue-600">
                      {file.name.split(".").pop()?.toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                </div>
                <button className="text-red-500 hover:text-red-700 text-sm">
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
