const express = require("express")
const cors = require("cors")
const http = require("http")
require("dotenv").config()
const app = express()
app.use(cors())
const userRouter = require("./routes/userRouter")
const blogRouter = require("./routes/blogRouter")
const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://admin:5SM7wU0isjof6icT@cluster0.idotl.mongodb.net/?retryWrites=true&w=majority")
.then((db) => console.log("Connected successfully to the database!"), 
err => console.log(err)).
catch((err) => console.log(err))
app.use("/blog", blogRouter)
app.use("/users", userRouter)
const server = http.createServer(app)

server.listen(process.env.PORT || 5000, () => {
    console.log("the server is running")
})

//5SM7wU0isjof6icT
