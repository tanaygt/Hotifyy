const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        phone: { type: String, required: true, trim: true },
        occasion: { type: String, required: true },
        eventDate: { type: Date },
        budget: { type: String },
        color: { type: String },
        preference: { type: String, trim: true },
        status: {
            type: String,
            enum: ['new', 'contacted', 'booked', 'closed'],
            default: 'new',
        },
    },
    { timestamps: true }
);

module.exports = mongoose.models.Inquiry || mongoose.model('Inquiry', inquirySchema);
