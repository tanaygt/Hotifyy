const mongoose = require('mongoose');

const outfitSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        occasion: { type: String, required: true },   // e.g. "Wedding · Bridal"
        occasions: [{ type: String }],                // array for filtering: ["wedding","bridal"]
        sizes: [{ type: String }],                    // ["XS","S","M","L","XL","XXL"]
        price: { type: Number, required: true },       // rental price in ₹
        pricePer: { type: String, default: 'per 3 days' },
        image: { type: String, required: true },       // path: /assets/outfit1.png
        tag: { type: String },                         // "New", "Trending", "Hot Pick"
        category: {
            type: String,
            enum: ['women', 'men', 'bridal', 'party', 'festive'],
            required: true,
        },
        inStock: { type: Boolean, default: true },
    },
    { timestamps: true }
);

// Text index for search
outfitSchema.index({ name: 'text', occasion: 'text' });

module.exports = mongoose.models.Outfit || mongoose.model('Outfit', outfitSchema);
