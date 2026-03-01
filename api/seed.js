// api/seed.js — One-time seed endpoint: POST /api/seed
// Call this once after deploy to populate the DB with initial outfits
const dbConnect = require('../lib/db');
const Outfit = require('../models/Outfit');

const SEED_DATA = [
    {
        name: 'Ivory Gold Bridal Lehenga',
        occasion: 'Wedding · Bridal',
        occasions: ['wedding', 'bridal'],
        sizes: ['S', 'M', 'L', 'XL'],
        price: 8500,
        pricePer: 'per 3 days',
        image: '/assets/outfit1.png',
        tag: 'New',
        category: 'bridal',
    },
    {
        name: 'Rose Petal Bridal Lehenga',
        occasion: 'Wedding',
        occasions: ['wedding', 'bridal'],
        sizes: ['XS', 'S', 'M', 'L'],
        price: 6500,
        pricePer: 'per 3 days',
        image: '/assets/wedding_collection.png',
        tag: 'Trending',
        category: 'bridal',
    },
    {
        name: 'Emerald Sequin Gown',
        occasion: 'Party · Club',
        occasions: ['party'],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        price: 3200,
        pricePer: 'per 2 days',
        image: '/assets/womens_glam.png',
        tag: 'Hot Pick',
        category: 'party',
    },
    {
        name: 'Golden Crop Lehenga Set',
        occasion: 'Party · Reception',
        occasions: ['party', 'reception'],
        sizes: ['M', 'L', 'XL'],
        price: 4800,
        pricePer: 'per 2 days',
        image: '/assets/party_wear.png',
        tag: 'Popular',
        category: 'women',
    },
    {
        name: 'Pink Festive Anarkali',
        occasion: 'Festive · Pooja',
        occasions: ['festive'],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        price: 2800,
        pricePer: 'per 2 days',
        image: '/assets/festive_special.png',
        tag: 'Bestseller',
        category: 'festive',
    },
    {
        name: 'Pearl White Bridal Ensemble',
        occasion: 'Wedding · Reception',
        occasions: ['wedding', 'reception'],
        sizes: ['XS', 'S', 'M'],
        price: 12000,
        pricePer: 'per 3 days',
        image: '/assets/hero.png',
        tag: 'Premium',
        category: 'bridal',
    },
    {
        name: 'Royal Gold Sherwani',
        occasion: 'Wedding · Groom',
        occasions: ['wedding'],
        sizes: ['S', 'M', 'L'],
        price: 9500,
        pricePer: 'per 3 days',
        image: '/assets/mens_royal.png',
        tag: "Men's",
        category: 'men',
    },
    {
        name: 'Festive Multi-Colour Set',
        occasion: 'Party · Festive',
        occasions: ['party', 'festive'],
        sizes: ['S', 'M', 'L', 'XL'],
        price: 3800,
        pricePer: 'per 2 days',
        image: '/assets/customer_testimonial.png',
        tag: 'New',
        category: 'women',
    },
];

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed — use POST' });
    }

    // Simple auth guard — pass ?secret=hotify-seed in query
    if (req.query.secret !== process.env.SEED_SECRET) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        await dbConnect();
        await Outfit.deleteMany({});
        const outfits = await Outfit.insertMany(SEED_DATA);
        return res.status(200).json({ success: true, inserted: outfits.length });
    } catch (err) {
        console.error('Seed error:', err);
        return res.status(500).json({ success: false, error: err.message });
    }
};
