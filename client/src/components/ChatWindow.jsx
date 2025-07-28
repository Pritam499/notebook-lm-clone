// client/src/components/ChatWindow.jsx
import React, { useState } from "react";
import { sendChat } from "../api/chat";
import CitationButton from "./CitationButton";
import { Send } from "lucide-react";

export default function ChatWindow({ documentId, pdfText }) {
  const [messages, setMessages] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!prompt) return;

    const userMsg = { role: "user", content: prompt };
    setMessages((m) => [...m, userMsg]);
    setPrompt("");
    setLoading(true);

    const storedPdfText = localStorage.getItem("pdfText");
    // console.log("📄 Using passed PDF Text:", storedPdfText);
    const { answer, citations } = await sendChat(
      documentId,
      prompt,
      storedPdfText
    );

    const botMsg = { role: "assistant", content: answer, citations };
    setMessages((m) => [...m, botMsg]);
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-full max-h-screen">
      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 max-h-[calc(100vh-72px)]">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex items-start ${
              m.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`flex items-start space-x-2 ${
                m.role === "user" ? "flex-row-reverse" : ""
              }`}
            >
              <div className="p-1">
                {m.role === "user" ? (
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm">
                    👤
                  </div>
                ) : (
                  <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm">
                    🤖
                  </div>
                )}
              </div>

              <div
                className={`px-4 py-2 rounded-xl whitespace-pre-wrap break-words max-w-full ${
                  m.role === "user"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-gray-100 text-purple-800"
                }`}
              >
                {m.content || "⚠️ No response received"}
                {m.citations?.map((p) => (
                  <CitationButton
                    key={p}
                    page={p}
                    onClick={(page) => pdfViewerRef.current.scrollToPage(page)}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Sticky Input Field */}
      <div className="sticky bottom-0 bg-white p-4 border-t flex items-center space-x-2">
        <input
          type="text"
          className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring"
          placeholder="Ask about a document…"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        />
        <button
          className="bg-purple-600 text-white p-2 rounded disabled:opacity-50"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <div className="w-5 h-5 animate-spin border-2 border-white border-t-transparent rounded-full" />
          ) : (
            <Send className="w-5 h-5" />
          )}
        </button>
      </div>
    </div>
  );
}
