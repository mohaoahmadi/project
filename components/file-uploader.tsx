"use client";

import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'sonner';
import { Upload } from 'lucide-react';

export function FileUploader() {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      // Handle file upload logic here
      toast.success(`File uploaded: ${file.name}`);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/json': ['.geojson'],
      'application/x-shapefile': ['.shp'],
    },
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
        ${isDragActive ? 'border-primary bg-primary/10' : 'border-muted-foreground/25'}`}
    >
      <input {...getInputProps()} />
      <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
      {isDragActive ? (
        <p>Drop the files here...</p>
      ) : (
        <div className="space-y-1">
          <p>Drag & drop files here, or click to select files</p>
          <p className="text-sm text-muted-foreground">
            Supports GeoJSON and Shapefile formats
          </p>
        </div>
      )}
    </div>
  );
}