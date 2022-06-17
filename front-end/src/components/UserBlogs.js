import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Blog from './Blog'
const UserBlogs = () => {
  const[userData, setUserData] = useState()
  const[oData, setOData] = useState()
  const id = localStorage.getItem("userId")
  const sendRequests = async() => {
    const res = await axios.get(`http://localhost:5000/users/${id}`).catch(err => console.log(err))
    const data = await res.data
    return data
  }
  useEffect(() => {
    sendRequests()
    .then((data) => setUserData(data.user.blogs))
  },[])
  useEffect(() => {
    sendRequests().then((data) => setOData(data.user))
  },[])
  return (
    <div>
      {userData && userData.map((blog) => (
      <Blog title={blog.title} description={blog.description} image={blog.image} userName={blog.user.username} isUser={localStorage.getItem("userId") === blog.user._id}/>
    ))}

    </div>
  )
}

export default UserBlogs