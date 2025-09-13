'use client';

import { Dropzone, DropzoneEmptyState, DropzoneContent } from "@/components/ui/shadcn-io/dropzone";
import { useState } from "react";

import { uploadPdfs } from "@/lib/uploads";

export default function PdfUpload() {
  const [files, setFiles] = useState<File[] | undefined>(); // used only for updating UI

  const handleDrop = (files: File[]) => {
    console.log("received files"); // DEBUG
    setFiles(files);
    uploadPdfs(files); // TODO: error handle here, lib/uploads.ts, and api/upload/route.ts
  };

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        Upload PDFs to the database.
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Dropzone
            accept={{ 'application/pdf': [] }}
            maxFiles={10}
            maxSize={1024 * 1024 * 20}
            minSize={1024}
            onDrop={handleDrop}
            onError={console.error}
            src={files}
          >
            <DropzoneEmptyState />
            <DropzoneContent />
          </Dropzone>
        </div>
      </main>
    </div>
  );
}
