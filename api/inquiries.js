// api/inquiries.js — Vercel serverless function: POST /api/inquiries
const dbConnect = require('../lib/db');
const Inquiry = require('../models/Inquiry');
const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
    // CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') return res.status(200).end();

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { name, phone, occasion, eventDate, budget, color, preference } = req.body;

        // Basic validation
        if (!name || !phone || !occasion) {
            return res.status(400).json({
                success: false,
                error: 'Name, phone, and occasion are required.',
            });
        }

        let inquiry = null;
        let dbError = null;

        // Attempt DB Save
        try {
            await dbConnect();
            inquiry = await Inquiry.create({
                name: name.trim(),
                phone: phone.trim(),
                occasion,
                eventDate: eventDate ? new Date(eventDate) : undefined,
                budget,
                color,
                preference: preference?.trim(),
            });
            console.log('📝 Inquiry saved to DB for:', name);
        } catch (err) {
            console.error('❌ DB Save failed, proceeding to email only:', err.message);
            dbError = err.message;
        }

        // --- Email Notification ---
        let emailSent = false;
        if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
            try {
                const transporter = nodemailer.createTransport({
                    service: process.env.EMAIL_SERVICE || 'gmail',
                    auth: {
                        user: process.env.EMAIL_USER,
                        pass: process.env.EMAIL_PASS,
                    },
                });

                const mailOptions = {
                    from: `"Hotify Notifications" <${process.env.EMAIL_USER}>`,
                    to: process.env.EMAIL_TO || process.env.EMAIL_USER,
                    subject: `🌸 New Inquiry: ${name} - ${occasion}`,
                    html: `
                        <div style="font-family: sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ffc1da; border-radius: 10px;">
                            <h2 style="color: #ff4fa3; border-bottom: 2px solid #ffc1da; padding-bottom: 10px;">New Inquiry Received ${dbError ? '(Offline Mode)' : ''}</h2>
                            <p><strong>Name:</strong> ${name}</p>
                            <p><strong>Phone:</strong> ${phone}</p>
                            <p><strong>Occasion:</strong> ${occasion}</p>
                            <p><strong>Event Date:</strong> ${eventDate || 'Not specified'}</p>
                            <p><strong>Budget:</strong> ${budget || 'Not specified'}</p>
                            <p><strong>Preferred Color:</strong> ${color || 'Not specified'}</p>
                            <p><strong>Preferences:</strong> ${preference || 'None'}</p>
                            ${dbError ? `<p style="color: #d93025; font-size: 0.9em;"><strong>Note:</strong> Database was unreachable, inquiry only sent via email.</p>` : ''}
                            <hr style="border: none; border-top: 1px solid #ffc1da; margin: 20px 0;">
                            <p style="font-size: 0.8em; color: #777;">Sent from Hotify Fashion Rental Platform</p>
                        </div>
                    `,
                };

                await transporter.sendMail(mailOptions);
                console.log('✅ Notification email sent for:', name);
                emailSent = true;
            } catch (emailErr) {
                console.error('❌ Email notification failed:', emailErr.message);
            }
        }

        // Return success if either DB save or Email succeeded
        if (inquiry || emailSent) {
            return res.status(inquiry ? 201 : 200).json({ 
                success: true, 
                data: inquiry,
                message: inquiry ? 'Inquiry received.' : 'Inquiry received (Offline Mode).'
            });
        }

        // If both failed, then return 500
        throw new Error(`Both database and email services failed. DB: ${dbError || 'Unknown'}, Email: ${process.env.EMAIL_USER ? 'Configured but failed' : 'Not configured'}`);
    } catch (err) {
        console.error('POST /api/inquiries error:', err);
        return res.status(500).json({ 
            success: false, 
            error: err.message || 'Server error',
            details: process.env.NODE_ENV === 'development' ? err.stack : undefined
        });
    }
};

