const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const seedHandler = require('../api/seed');

async function runSeed() {
    console.log('🌱 Seeding database...');
    
    // Mock req/res for the serverless handler
    const req = { 
        method: 'POST', 
        query: { secret: process.env.SEED_SECRET } 
    };
    const res = {
        status: (code) => ({
            json: (data) => {
                if (code === 200) {
                    console.log('✅ Seed successful:', data);
                } else {
                    console.error(`❌ Seed failed (${code}):`, data);
                }
            }
        }),
        setHeader: () => {}
    };

    try {
        await seedHandler(req, res);
    } catch (err) {
        console.error('❌ Unexpected error during seed:', err);
    }
}

runSeed();
