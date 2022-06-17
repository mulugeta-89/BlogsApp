import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Blog from "./Blog"
const Blogs = () => {
  const[blogs, setBlogs] = useState()

  const sendRequests = async() => {
    const res = await axios.get("http://localhost:5000/blog")
    const data = await res.data
    return data
  }
  useEffect(() => {
    sendRequests()
    .then((data) => setBlogs(data.blogs))
    .catch((err) => console.log(err))
  
  },[])
  
  return (
    <div>
      {blogs && blogs.map((blog, index) => (
        <Blog key={index} id={blog._id}title={blog.title} description={blog.description} image={blog.image} userName={blog.user.username} isUser={localStorage.getItem("userId") === blog.user._id}/>
      ))}
    </div>
  )
}

export default Blogs