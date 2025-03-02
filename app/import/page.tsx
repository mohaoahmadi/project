"use client";

import { FileUploader } from '@/components/file-uploader';

export default function ImportPage() {
  return (
    <div className="max-w-[1200px] mx-auto w-full p-6">
      <h1 className="text-2xl font-semibold mb-6">Data Import</h1>
      <div className="max-w-xl">
        <FileUploader />
      </div>
    </div>
  );
}