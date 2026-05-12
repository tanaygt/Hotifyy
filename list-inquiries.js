require('dotenv').config();
const dbConnect = require('./lib/db');
const Inquiry = require('./models/Inquiry');

async function showInquiries() {
    try {
        console.log('Connecting to DB...');
        await dbConnect();
        const data = await Inquiry.find().sort({ createdAt: -1 });
        
        if (data.length === 0) {
            console.log('No inquiries found in the database.');
        } else {
            console.log(`\n--- Found ${data.length} inquiries ---`);
            data.forEach((item, index) => {
                console.log(`${index + 1}. ${item.name} (${item.phone}) - Occasion: ${item.occasion} [Status: ${item.status}]`);
            });
            console.log('-------------------------------\n');
        }
        process.exit(0);
    } catch (e) {
        console.error('Error:', e);
        process.exit(1);
    }
}
showInquiries();
