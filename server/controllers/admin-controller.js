// import user model
const { Admin } = require('../models');
// import sign token function from auth
const { signToken } = require('../utils/auth');

module.exports = {
    // get a single user by either their id or their username
    async getSingleAdmin({ admin = null, params }, res) {
        const foundAdmin = await Admin.findOne({
            $or: [{ _id: admin ? admin._id : params.id }, { username: params.username }],
        });

        if (!foundAdmin) {
            return res.status(400).json({ message: 'Cannot find an admin with this id!' });
        }

        res.json(foundAdmin);
    },
    // create an admin, sign a token, and send it back
    async createAdmin({ body }, res) {
        const admin = await Admin.create(body);

        if (!admin) {
            return res.status(400).json({ message: 'Something is wrong!' });
        }
        const token = signToken(admin);
        res.json({ token, admin });
    },
    // login an admin, sign a token, and send it back
    // {body} is destructured req.body
    async login({ body }, res) {
        const admin = await Admin.findOne({ $or: [{ username: body.username }, { email: body.email }] });
        if (!admin) {
            return res.status(400).json({ message: "Can't find this user" });
        }

        const correctPw = await admin.isCorrectPassword(body.password);

        if (!correctPw) {
            return res.status(400).json({ message: 'Wrong password!' });
        }
        const token = signToken(admin);
        res.json({ token, admin });
    },
    // save a book to a user's `savedBooks` field by adding it to the set (to prevent duplicates)
    // admin comes from `req.admin` created in the auth middleware function
    async saveBook({ admin, body }, res) {
        console.log(admin);
        try {
            const updatedAdmin = await Admin.findOneAndUpdate(
                { _id: admin._id },
                { $addToSet: { savedBooks: body } },
                { new: true, runValidators: true }
            );
            return res.json(updatedAdmin);
        } catch (err) {
            console.log(err);
            return res.status(400).json(err);
        }
    },
    // remove a book from `savedBooks`
    async deleteBook({ admin, params }, res) {
        const updatedAdmin = await Admin.findOneAndUpdate(
            { _id: admin._id },
            { new: true }
        );
        if (!updatedAdmin) {
            return res.status(404).json({ message: "Couldn't find admin with this id!" });
        }
        return res.json(updatedAdmin);
    },
};
