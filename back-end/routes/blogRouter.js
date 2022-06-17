const bodyParser = require("body-parser")
const express = require("express")
const { default: mongoose } = require("mongoose")
const Blog = require("../models/Blog")
const User = require("../models/User")
const blogRouter = express.Router()
blogRouter.use(bodyParser.json())
blogRouter.get("/", async(req, res, next) => {
    let blogs;
    try{
        blogs = await Blog.find({}).populate("user")
    }catch(err){
        return console.log(err)
    }
    if(!blogs){
        return res.status(404).json({message: "blogs are not found"})
    }
    return res.status(200).json({blogs})
})
blogRouter.post("/add", async(req, res, next) => {
    const { title, description, image, user} = req.body;
    let existingUser;
    try{
        existingUser = await User.findById(user)
    }catch(err){
        return console.log(err)
    }
    if(!existingUser){
        return res.status(500).json({message: "unable to find the user of by id"})
    }
    const blog = new Blog({
        title,
        description,
        image,
        user
    })
    try{
        await blog.save()
        existingUser.blogs.push(blog)
        await existingUser.save()
    //     const session = await mongoose.startSession()
    //     session.startTransaction()
    //    await blog.save({session})
    //     existingUser.blogs.push(blog)
    //    await existingUser.save({session})
    //    await session.commitTransaction()
    } catch(err){
        return console.log(err)
    }
    return res.status(200).json({blog})
    // let blog
    // try{
    //     blog = await Blog.create(req.body)
    // }catch(err){
    //     return console.log(err)
    // }
    // return res.status(200).json({blog})
})
blogRouter.put("/:blogId", async(req, res, next) => {
    const { title, description, image, user} = req.body
    let blog;
    try{
        blog = await Blog.findByIdAndUpdate(req.params.blogId, {$set: req.body}, {new: true})
        await blog.save()
    }catch(err){
        return console.log(err)
    }
    if(!blog){
        res.status(500).json({message: "unable to update the blog"})
    }
    return res.status(200).json({ blog })
})
blogRouter.get("/:blogId", async(req, res, next) => {
    let blog
    try{
        blog = await Blog.findById(req.params.blogId)

    }catch(err){
        return console.log(err)
    }
    if(!blog){
        return res.status(404).json({ message: "The blog not found" })
    }
    return res.status(200).json({ blog })

})
// blogRouter.get("/:blogId", async(req, res, next) => {
//     let blog;
//     try{
//         blog = await Blog.findById(req.params.blogId)
//     }catch(err){
//         return console.log(err)
//     }
//     if(!blog){
//         return res.status(404).json({message: "blog are not found"})
//     }
//     return res.status(200).json({blog})
// })

blogRouter.delete("/:blogId", async(req, res, next) => {
    let blog;
    try{
        blog = await Blog.findByIdAndRemove(req.params.blogId).populate("user")
        blog.user.blogs.pull(blog)
        await blog.user.save()
    }catch(err){
        return console.log(err)
    }
    if(!blog){
        return res.status(500).json({message: "unable to delete"})
    }
    return res.status(200).json({ message: "deleted successfully", blog})
})
module.exports = blogRouter
