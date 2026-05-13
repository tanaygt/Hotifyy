// lib/db.js — Cached MongoDB connection for both serverless + local
const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI;

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
    if (!MONGODB_URI) {
        throw new Error('Please define the MONGODB_URI environment variable inside .env');
    }

    let uri = MONGODB_URI.trim();
    if (!uri.startsWith('mongodb://') && !uri.startsWith('mongodb+srv://')) {
        uri = `mongodb://${uri}`;
    }

    if (cached.conn) return cached.conn;

    if (!cached.promise) {
        cached.promise = mongoose.connect(uri, {
            bufferCommands: false,
            serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
            connectTimeoutMS: 5000,
        }).then((m) => m);
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }

    return cached.conn;
}

module.exports = dbConnect;
