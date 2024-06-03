const { Admin } = require('../models');
const Artwork = require('../models/Artwork');
const { signToken, AuthenticationError } = require('../utils/auth');

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
  Mutation: {
    addAdmin: async (parent, { username, email, password }) => {
      const admin = await Admin.create({ username, email, password });
      const token = signToken(admin);

      return { token, admin };
    },
    loginAdmin: async (_, { email, password }) => {
      const admin = await Admin.findOne({ email });

      if (!admin) {
        throw AuthenticationError;
      }

      const correctPw = await admin.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(admin);

      return { token, admin };
    },
  }
};

module.exports = resolvers;