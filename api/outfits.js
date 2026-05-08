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

    const { occasion, size, budget, category } = req.query;

    try {
        await dbConnect();

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
        console.error('GET /api/outfits DB error, falling back to static data:', err.message);

        // Fallback data if DB is down/not configured
        let data = [
            { _id: 'f1', name: 'Ivory Gold Bridal Lehenga', occasion: 'Wedding · Bridal', occasions: ['wedding', 'bridal'], sizes: ['S', 'M', 'L', 'XL'], price: 8500, pricePer: 'per 3 days', image: '/assets/outfit1.png', tag: 'New', inStock: true },
            { _id: 'f2', name: 'Rose Petal Bridal Lehenga', occasion: 'Wedding', occasions: ['wedding'], sizes: ['XS', 'S', 'M', 'L'], price: 6500, pricePer: 'per 3 days', image: '/assets/wedding_collection.png', tag: 'Trending', inStock: true },
            { _id: 'f3', name: 'Emerald Sequin Gown', occasion: 'Party · Club', occasions: ['party'], sizes: ['S', 'M', 'L', 'XL', 'XXL'], price: 3200, pricePer: 'per 2 days', image: '/assets/womens_glam.png', tag: 'Hot Pick', inStock: true },
            { _id: 'f4', name: 'Golden Crop Lehenga Set', occasion: 'Party · Reception', occasions: ['party', 'reception'], sizes: ['M', 'L', 'XL'], price: 4800, pricePer: 'per 2 days', image: '/assets/party_wear.png', tag: 'Popular', inStock: true },
            { _id: 'f5', name: 'Pink Festive Anarkali', occasion: 'Festive · Pooja', occasions: ['festive'], sizes: ['S', 'M', 'L', 'XL', 'XXL'], price: 2800, pricePer: 'per 2 days', image: '/assets/festive_special.png', tag: 'Bestseller', inStock: true },
            { _id: 'f6', name: 'Pearl White Bridal Ensemble', occasion: 'Wedding · Reception', occasions: ['wedding'], sizes: ['XS', 'S', 'M'], price: 12000, pricePer: 'per 3 days', image: '/assets/hero.png', tag: 'Premium', inStock: true },
            { _id: 'f7', name: 'Royal Gold Sherwani', occasion: 'Wedding · Groom', occasions: ['wedding'], sizes: ['S', 'M', 'L'], price: 9500, pricePer: 'per 3 days', image: '/assets/mens_royal.png', tag: "Men's", inStock: true },
            { _id: 'f8', name: 'Festive Multi-Colour Set', occasion: 'Party · Festive', occasions: ['party', 'festive'], sizes: ['S', 'M', 'L', 'XL'], price: 3800, pricePer: 'per 2 days', image: '/assets/customer_testimonial.png', tag: 'New', inStock: true },
        ];

        // Basic filtering for fallback data
        if (occasion) data = data.filter(o => o.occasions.includes(occasion.toLowerCase()));
        if (size) data = data.filter(o => o.sizes.includes(size));
        if (budget) {
            try {
                const [min, max] = budget.split('-').map(Number);
                data = data.filter(o => max ? (o.price >= min && o.price <= max) : o.price >= min);
            } catch (e) {
                console.error('Fallback filter error:', e);
            }
        }

        return res.status(200).json({ success: true, data: data, fallback: true });
    }
};
