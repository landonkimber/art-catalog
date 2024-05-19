const typeDefs = `
    type Artwork {
        _id: ID
        title: String
        description: String
        artists: [String]
        medium: String
        image: String
        altImages: [String]
        date: String
        tags: [String]
        height: Float
        width: Float
        depth: Float
        dbCreatedAt: String
        dbUser: String
    }

    type Query {
        artworks: [Artwork]
        artwork(id: ID!): Artwork
        artworksByTag(tag: String!): [Artwork]
        artworksByMedium(medium: String!): [Artwork]
        artworksByArtist(artist: String!): [Artwork]
    }
`;

module.exports = typeDefs;