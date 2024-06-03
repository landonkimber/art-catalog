const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

// import schema from Book.js
const Artwork = require('./Artwork');

const adminSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Must use a valid email address'],
        },
        password: {
            type: String,
            required: true,
        },
        artworks: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Artwork',
            },
        ],

    },
    {
        toJSON: {
            virtuals: true,
        },
    }
);

// hash admin password
adminSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
});

// custom method to compare and validate password for logging in
adminSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};


const Admin = model('Admin', adminSchema);

module.exports = Admin;
