// client/src/components/PdfViewer.jsx
import React from 'react';

export default function PdfViewer({ url }) {
  if (!url) {
    return <p className="text-gray-500">No document selected.</p>;
  }

  return (
    <div className="overflow-auto h-full border rounded-lg p-2">
      {/* Use object tag to embed PDF */}
      <object
        data={url}
        type="application/pdf"
        width="100%"
        height="100%"
      >
        <p className="text-center">
          Your browser doesn’t support embedded PDFs.{' '}
          <a href={url} target="_blank" rel="noopener noreferrer">
            Download the PDF
          </a>
          .
        </p>
      </object>
    </div>
  );
}
