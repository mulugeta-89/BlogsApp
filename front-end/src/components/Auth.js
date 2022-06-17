import { TextField, Typography, Box, Button } from '@mui/material'
import React, { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { authActions } from '../store'
import { useNavigate } from 'react-router-dom'
const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const[isSignUp, setIsSignUp] = useState(false)
 const[inputs, setInputs] = useState({
   username: "",
   email: "",
   password: ""
 })
 const handleChange = (e) => {
   setInputs((prevState) => ({
   ...prevState,
   [e.target.name]: e.target.value
   }))
 }
 const sendRequests = async(type="login") => {
   try {
    const res = await axios.post(`http://localhost:5000/users/${type}`, {
      username: inputs.username,
      email: inputs.email,
      password: inputs.password
    })
    const data = await res.data
    console.log(data)
    return data
   } catch(err){
    return console.log(err)
   } finally {
   }
  
 }
 const handleSubmit = (e) => {
   e.preventDefault()
   console.log(inputs)
   if(isSignUp){
     sendRequests("signup")
     .then((data) => localStorage.setItem("userId", data.user._id))
     .then(() => dispatch(authActions.login()))
     .then(() => navigate("/blogs"))
    //  .then((data) => console.log(data))
   }else {
    sendRequests()
    .then((data) => localStorage.setItem("userId", data.user._id))
    .then(() => dispatch(authActions.login()))
    .then(() => navigate("/blogs"))
    // .then((data) => console.log(data))
   }
   
 }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
        width={500}
        display="flex" 
        flexDirection="column"
        alignItems="center" 
        justifyContent={"center"}
        boxShadow={ "10px 10px 20px #ccc"}
        padding={3}
        marginTop={5}
        marginLeft={"auto"}
        marginRight={"auto"}
        borderRadius={5}>

          <Typography variant="h2" padding={3}>{isSignUp ? "SignUp": "Login"}</Typography>
          {isSignUp && < TextField placeholder="Userame" value ={inputs.username} margin='normal' name="username" onChange={handleChange}/>}
         <TextField type={"email"}
          placeholder="Email" 
          value={inputs.email} 
          margin='normal' 
          onChange={handleChange}
          name="email"/>
          <TextField placeholder="password" 
          type="password"
          value={inputs.password} 
          margin='normal'  
          name="password"
          onChange={handleChange}/>
          <Button variant="contained" type="submit"
           sx={{borderRadius: 3 , marginTop: 3}}
            color="warning">Submit</Button>
          <Button sx={{borderRadius: 3, marginTop:3}}
           onClick={() => setIsSignUp(!isSignUp)}>
             Change To { isSignUp ? "Login" : "signup"}</Button>
        </Box>

      </form>
    </div>
  )
}

export default Login