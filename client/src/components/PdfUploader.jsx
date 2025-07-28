import React, { useState } from 'react';
import { uploadDocument } from '../api/documents';

export default function PdfUploader({ onUploaded }) {
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (e) => {
    localStorage.removeItem("pdfText");
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const { documentId, filename, pdfText } = await uploadDocument(file, setProgress);
    
    setUploading(false);
    onUploaded({ documentId, filename, pdfText }); // ✅ not just documentId
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 h-screen bg-gray-100">
      {!uploading ? (
        <>
          <label className="cursor-pointer bg-white shadow p-6 rounded-lg border border-gray-200 hover:shadow-lg transition">
            <input
              type="file"
              accept="application/pdf"
              className="hidden"
              onChange={handleFileUpload}
            />
            <div className="text-purple-600 mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12v8m4-4l-4-4-4 4m4-12v8" />
              </svg>
            </div>
            <div className="text-gray-800 font-medium">Upload PDF to start chatting</div>
            <div className="text-gray-500 text-sm">Click to select or drag & drop</div>
          </label>
        </>
      ) : (
        <div className="w-full max-w-md">
          <div className="text-center text-gray-700 mb-2">Uploading PDF… {progress}%</div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-purple-600 h-2 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}