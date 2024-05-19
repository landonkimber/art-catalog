const mongoose = require('mongoose');

const artworkSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    artists: {
        type: [String],
        required: true,
    },
    medium: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    altImages: {
        type: [String],
        default: [],
    },
    date: {
        type: String,
        required: true,
    },
    tags: {
        type: [String],
        default: [],
    },
    height: {
        type: Number,
    },
    width: {
        type: Number,
    },
    depth: {
        type: Number,
    },
    dbCreatedAt: {
        type: Date,
        default: Date.now,
    },
    dbUser: {
        type: String,
        required: true,
    },
});

const Artwork = mongoose.model('Artwork', artworkSchema);

module.exports = Artwork;