const artworkData = require('./testSeedData.js');
const mongoose = require('mongoose');
const Artwork = require('../models/Artwork');

// Connect to the database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/art-catalog');



const seedDB = async () => {
    try {
        // Delete existing artwork data
        await Artwork.deleteMany({});
        console.log('Cleared existing artwork data');

        // Insert new artwork data
        await Artwork.insertMany(artworkData);
        console.log('Seeded artwork data successfully');

        // Disconnect from the database
        mongoose.disconnect();
        console.log('Disconnected from the database');
    } catch (error) {
        console.error('Error seeding the database:', error);
    }
};

// Run the seeding process
seedDB();