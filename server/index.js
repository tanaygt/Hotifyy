// server/index.js — Express dev server (local only; Vercel uses api/ functions)
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const express = require('express');


const outfitsHandler = require('../api/outfits');
const inquiriesHandler = require('../api/inquiries');
const seedHandler = require('../api/seed');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Request logger for debugging
app.use((req, res, next) => {
    console.log(`${new Date().toLocaleTimeString()} - ${req.method} ${req.url}`);
    next();
});

// Serve client's built assets (for preview after build)
const clientDist = path.join(__dirname, '../client/dist');
app.use(express.static(clientDist));

// API routes — delegate to the same serverless handlers
app.get('/api/outfits', outfitsHandler);
app.post('/api/inquiries', inquiriesHandler);
app.post('/api/seed', seedHandler);

// All other routes → React app
app.get(/.*$/, (req, res) => {
    res.sendFile(path.join(clientDist, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`✅ Hotify server running → http://localhost:${PORT}`);
});
