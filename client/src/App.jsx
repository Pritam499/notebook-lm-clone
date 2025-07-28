// client/src/App.jsx
import React, { useState, useRef, useEffect } from "react";
import PdfUploader from "./components/PdfUploader";
import PdfViewer from "./components/PdfViewer";
import ChatWindow from "./components/ChatWindow";

// ✅ Use environment variable
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function App() {
  const [docMeta, setDocMeta] = useState(null);
  const [extractedText, setExtractedText] = useState("");
  const pdfRef = useRef();
  useEffect(() => {
    // Clear previous session's PDF text on app load
    localStorage.removeItem("pdfText");
  }, []);

  const handleUploaded = ({ documentId, filename, pdfText }) => {
    setDocMeta({ documentId, filename, pdfText });
    localStorage.setItem("pdfText", pdfText);
  };

  const pdfViewerRef = useRef(null);

  // ⏬ Extract PDF text after docMeta is set
  useEffect(() => {
    const extractTextFromPdf = async () => {
      if (pdfRef.current?.getText) {
        const text = await pdfRef.current.getText();
        setExtractedText(text);
      }
    };

    if (docMeta) {
      // Delay to allow PDF to fully load
      setTimeout(() => {
        extractTextFromPdf();
      }, 1000);
    }
  }, [docMeta]);

  return (
    <div className="h-screen flex flex-col">
      {!docMeta ? (
        <PdfUploader onUploaded={handleUploaded} />
      ) : (

        <div className="flex flex-1">
          <div className="w-1/2 border-r p-4">
            <ChatWindow
              documentId={docMeta.documentId}
              pdfText={docMeta.pdfText}
              pdfViewerRef={pdfViewerRef}
            />
          </div>
          <div className="w-1/2 p-4 overflow-hidden">
            <PdfViewer
              ref={pdfViewerRef}
              url={`${BASE_URL}/uploads/${docMeta.filename}`}
            />
          </div>
        </div>
      )}
    </div>
  );
}
