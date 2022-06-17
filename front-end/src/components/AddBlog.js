import { InputLabel, TextField, Typography, Button } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
const labelStyles = {nb: 2, mt:2, fontSize: "24px", fontWeight:"bold"}
const AddBlog = () => {
  const navigate = useNavigate()
  const[inputs, setInputs] = useState({
    title: "",
    description: "",
    image: ""
  })
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }
  const sendRequests = async() => {
    const res = await axios.post("http://localhost:5000/blog/add", {
      title: inputs.title,
      description: inputs.description,
      image: inputs.image,
      user: localStorage.getItem("userId")
    })
    const data = await res.data
    return data
  }
  const handleSubmit= (e) => {
    e.preventDefault()
    sendRequests().then((data) => console.log(data)).then(() => navigate("/blogs"))
  }
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box 
          border={3}
          borderColor="linear-gradient(90deg, rgba(58, 157, 180, 1) 2%, rgba(49, 49, 116, 1) 36%, rgba(0, 58, 161, 1) 73%, rgba(69, 187, 252, 1) 100%)"
          borderRadius={10}
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          margin={"auto"}
          marginTop={3}
          display="flex"
          flexDirection={"column"}
          width={"80%"}>
          <Typography fontWeight={"bold"} padding={3} color="grey" variant="h2" textAlign="center">Post Your Blog</Typography>
          <InputLabel sx={labelStyles}>Title</InputLabel>
          <TextField name="title" value={inputs.title} onChange={handleChange}margin="auto" variant="outlined"/>
          <InputLabel sx={labelStyles}>Description</InputLabel>
          <TextField name="description" value={inputs.description} onChange={handleChange} margin="auto" variant="outlined"/>
          <InputLabel sx={labelStyles}>ImageUrl</InputLabel>
          <TextField name="image" value={inputs.image} onChange={handleChange} margin="auto" variant="outlined"/>
          <Button variant="contained" type="submit"
           sx={{borderRadius: 3 , marginTop: 3}}
            color="warning">Submit</Button>
        </Box>
      </form>
    </div>
  )
}

export default AddBlog