import {Route, Routes } from "react-router-dom"
import AddBlog from './components/AddBlog';
import BlogDetail from './components/BlogDetail';
import Blogs from './components/Blogs';
import Header from "./components/Header"
import UserBlogs from './components/UserBlogs';
import Auth from "./components/Auth";
import './App.css'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { authActions } from "./store";
function App() {
  const isLoggedIn = useSelector((state) => state.isLoggedIn)
  const dispatch = useDispatch()
  useEffect(() => {
    if(localStorage.getItem("userId")){
      dispatch(authActions.login())
    }
    
  },[dispatch])
  return (
    <>
      <header>
            <Header />
      </header>
      <main>
        <Routes>
        
          { !isLoggedIn ? <Route path="/auth" element={<Auth />} />: <>
           
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/myBlogs" element={<UserBlogs />} />
            <Route path="/myBlogs/:id" element={<BlogDetail />}/>
            <Route path="/blogs/add" element={<AddBlog />} />
          </>
            
          }
          
        </Routes>
      </main>
      
    </>
 
    );
}

export default App;
