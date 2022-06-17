const express = require("express")
const bodyParser = require("body-parser")
const userRouter = express.Router()
const User = require("../models/User")
const bcrypt = require("bcryptjs")
userRouter.use(bodyParser.json())
userRouter.get("/", async(req, res, next) => {
    let users
    try{
        users = await User.find()
    }catch(err){
        console.log(err)
    }
    if(!users){
        return res.status(400).json({message: "Users not found"})
    }
    return res.status(200).json({users})
})
userRouter.post("/signup", async(req, res, next) => {
   const { username, email, password} = req.body;
   let existingUser;
   try{
       existingUser = await User.findOne({email})
   }catch(err){
       return console.log(err)
   }
   if(existingUser){
       return res.status(400).json({message: "user already exists"})
   }
   const hashedPassword = bcrypt.hashSync(password)
   const user = new User({
       username,
       email,
       password: hashedPassword,
       blogs: []
   })
   try{
       await user.save()
   } catch(err){
       return console.log(err)
   }
   return res.status(201).json({message: "registerd succesfuly", user})

})
userRouter.post("/login", async(req, res, next) => {
    const { email, password} = req.body
    let existingUser
    try{
        existingUser = await User.findOne({ email})
    }catch(err){
        return console.log(err)
    }
    if(!existingUser){
        return res.status(404).json({message: "User is not existing"})
    }
    const isPassword = bcrypt.compareSync(password, existingUser.password)
    if(!isPassword){
        return res.status(400).json({message: "the password is not correct"})
    }
    return res.status(200).json({message: "login successfull", user: existingUser})
})
userRouter.get("/:userId", async(req, res, next) => {
    let user
    try{
        user = await User.findById(req.params.userId).populate("blogs")
    }catch(err){
        return console.log(err)
    }
    if(!user){
        return res.status(404).json({message: "The user is not founded"})
    }
    return res.status(200).json({ user })
})

module.exports = userRouter