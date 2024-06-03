const typeDefs = `

type Admin {
    _id: ID
    username: String
    email: String
    password: String
    artworks: [Artwork]
}
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
        dbAdmin: String
    }

    type Auth {
        token: ID!
        admin: Admin
    }

    type Query {
        me: Admin

        artworks: [Artwork]
        artwork(id: ID!): Artwork
        artworksByTag(tag: String!): [Artwork]
        artworksByMedium(medium: String!): [Artwork]
        artworksByArtist(artist: String!): [Artwork]
    }

    type Mutation {
        addAdmin(username: String!, email: String!, password: String!): Auth
        loginAdmin(email: String!, password: String!): Auth
    }
`;

module.exports = typeDefs;