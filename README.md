📦 Installation & Running
Unzip the folder and open a terminal at the root.

Initial step: 
git clone 

1. Backend Setup
I. `cd server`
II. `npm install`


# III. Create: backend/.env
`Paste below details`
PORT=4000
DATABASE_URL=postgresql://postgres:9P8as51sSt3r472on9g1@seodb.c7u6c6a423bu.eu-north-1.rds.amazonaws.com:5432/dbtools
OPENROUTER_API_KEY=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
CHUNK_SIZE=1000

IV. `node app.js`

🚀 Your backend will be running at: http://localhost:4000


2. Frontend Setup
In a new terminal window:

I. `cd client`
II. `npm install`

# III. Create client/.env
VITE_API_BASE_URL=http://localhost:4000
`Paste below details`
OPENROUTER_API_KEY=
VITE_OPENROUTER_API_KEY=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
VITE_CHUNK_SIZE=1000
VITE_SITE_URL=http://localhost:5173
VITE_SITE_TITLE=PDF Q&A Local

IV. `npm run dev`
🌐 Visit: http://localhost:5173
