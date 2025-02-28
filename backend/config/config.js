const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        if (process.env.NODE_ENV === 'test') {
            console.log('Skipping MongoDB connection in test environment');
            return;
        }

        const uri = process.env.DATABASE_URI;
        if (!uri) {
            throw new Error('DATABASE_URI environment variable is not defined');
        }
        
        await mongoose.connect(uri);
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1); 
    }
};

module.exports = connectDB;