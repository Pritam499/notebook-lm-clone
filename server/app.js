// server/app.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const pdf = require("pdf-parse");
const db = require("./db");
const axios = require("axios");

const upload = multer({ dest: "uploads/" });

const app = express();
const PORT = process.env.PORT || 4000;

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
  })
);
app.use(express.json());

app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"), {
    dotfiles: "allow",
    maxAge: "1d",
  })
);

// OpenRouter setup
const OR_KEY = process.env.OPENROUTER_API_KEY;
const OR_BASE = "https://openrouter.ai/api/v1";
// console.log("OpenRouter API Key:", OR_KEY ? "✅ Present" : "❌ Missing");

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK" });
});

// PDF upload
// app.post("/api/documents", upload.single("file"), async (req, res, next) => {
//   try {
//     const { originalname, filename: tmpName } = req.file;
//     const ext = path.extname(originalname).toLowerCase();
//     const newName = tmpName + ext;
//     const oldPath = path.join("uploads", tmpName);
//     const newPath = path.join("uploads", newName);

//     fs.renameSync(oldPath, newPath);

//     const { rows } = await db.query(
//       `INSERT INTO documents(filename, filepath)
//        VALUES($1, $2) RETURNING id`,
//       [originalname, newName]
//     );
//     const documentId = rows[0].id;

//     res.json({ documentId, filename: newName });
//   } catch (err) {
//     next(err);
//   }
// });

app.post("/api/documents", upload.single("file"), async (req, res, next) => {
  try {
    const { originalname, filename: tmpName } = req.file;
    const ext = path.extname(originalname).toLowerCase();
    const newName = tmpName + ext;
    const oldPath = path.join("uploads", tmpName);
    const newPath = path.join("uploads", newName);
    fs.renameSync(oldPath, newPath);

    // Extract text (just to send to client — not saved in DB)
    const fileBuffer = fs.readFileSync(newPath);
    const pdfData = await pdf(fileBuffer);
    const pdfText = pdfData.text || "";
    // console.log("📝 Extracted PDF Text:", pdfText.substring(0, 300));

    // Insert only filename and filepath (no text_content)
    const { rows } = await db.query(
      `INSERT INTO documents(filename, filepath)
   VALUES($1, $2) RETURNING id`,
      [originalname, newName]
    );
    const documentId = rows[0].id;

    res.json({ documentId, filename: newName, pdfText }); // Send pdfText to client
  } catch (err) {
    next(err);
  }
});

// Chat route — no embeddings, direct to OpenRouter
app.post("/api/chat", async (req, res, next) => {
  try {
    const { prompt, pdfText } = req.body;

    const systemPrompt = pdfText
      ? `You are a helpful assistant answering questions based on the following PDF content:\n\n${pdfText}`
      : `You are a helpful assistant.`;

    const chatResp = await axios.post(
      `${OR_BASE}/chat/completions`,
      {
        model: "mistralai/mistral-small-3.2-24b-instruct:free",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: prompt },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${OR_KEY}`,
          "HTTP-Referer": "http://localhost:5173",
          "X-Title": "MyPDFAssistant",
        },
      }
    );

    const answer = chatResp.data.choices?.[0]?.message?.content || "";
    res.json({ answer });
  } catch (err) {
    next(err);
  }
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

// Start server
app.listen(PORT, () => {
  // console.log(`📂 Static files at http://localhost:${PORT}/uploads/:filename`);
  console.log(`🚀 API listening on port ${PORT}`);
});
