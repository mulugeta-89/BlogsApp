const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Blog = require("./Blog")

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    blogs: [{type: mongoose.Types.ObjectId, ref: "Blog", required: true}]
});
const User = mongoose.model("User", userSchema)
module.exports = User