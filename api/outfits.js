// api/outfits.js — Vercel serverless function: GET /api/outfits
const dbConnect = require('../lib/db');
const Outfit = require('../models/Outfit');

module.exports = async (req, res) => {
    // CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') return res.status(200).end();

    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        await dbConnect();

        const { occasion, size, budget, category } = req.query;
        const query = { inStock: true };

        if (occasion) query.occasions = { $in: [occasion.toLowerCase()] };
        if (size) query.sizes = { $in: [size] };
        if (category) query.category = category;

        if (budget) {
            const [min, max] = budget.split('-').map(Number);
            query.price = max ? { $gte: min, $lte: max } : { $gte: min };
        }

        const outfits = await Outfit.find(query).sort({ createdAt: -1 });
        return res.status(200).json({ success: true, data: outfits });
    } catch (err) {
        console.error('GET /api/outfits error:', err);
        return res.status(500).json({ success: false, error: 'Server error' });
    }
};
