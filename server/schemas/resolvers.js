const Artwork = require('../models/Artwork');

const resolvers = {
  Query: {
    artworks: async () => {
      try {
        const artworks = await Artwork.find();
        return artworks;
      } catch (error) {
        throw new Error('Failed to fetch artworks');
      }
    },
    artwork: async (_, { id }) => {
      try {
        const artwork = await Artwork.findById(id);
        if (!artwork) {
          throw new Error('Artwork not found');
        }
        return artwork;
      } catch (error) {
        throw new Error('Failed to fetch artwork');
      }
    },
    artworksByTag: async (_, { tag }) => {
      try {
        const artworks = await Artwork.find({ tags: { $regex: new RegExp(tag, 'i') } });
        return artworks;
      } catch (error) {
        throw new Error('Failed to fetch artworks by tag');
      }
    },
    artworksByMedium: async (_, { medium }) => {
      try {
        const artworks = await Artwork.find({ medium: { $regex: new RegExp(medium, 'i') } });
        return artworks;
      } catch (error) {
        throw new Error('Failed to fetch artworks by medium');
      }
    },
    artworksByArtist: async (_, { artist }) => {
      try {
        const artworks = await Artwork.find({ artists: { $regex: new RegExp(artist, 'i') } });
        return artworks;
      } catch (error) {
        throw new Error('Failed to fetch artworks by artist');
      }
    },
  },
};

module.exports = resolvers;