import './App.css';
import React from 'react';
import { useEffect,useContext } from 'react';
import {Context} from "./index";
import { BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import ForgotPassword from './components/auth/ForgotPassword';
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import Home from "./components/Home/Home";
import JobDetails from "./components/Job/JobDetails";
import MyJobs from "./components/Job/MyJobs";
import PostJob from "./components/Job/PostJob";
import Application from "./components/applications/Application";
import MyApplication from "./components/applications/MyApplication";
import NotFound from "./components/NotFound/NotFound";
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import Jobs from './components/Job/Jobs';
import ReplyForm from './components/applications/ReplyApplication';

const App = () => {

  const {isAuthorized, setIsAuthorized, setUser} = useContext(Context);
  useEffect(()=>{
    const fetchUser = async()=>{
      try{
        const response = await axios.get(process.env.REACT_APP_GET_USER,{withCredentials: true});
        setUser(response.data.user);
        setIsAuthorized(true);
      }catch(error){
        setIsAuthorized(false);
      };
    };
    fetchUser();
  },[isAuthorized]);



  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path = "/login" element={<Login/>}/>
        <Route path = "/register" element={<Register/>}/>
        <Route path = "/frgpwd" element={<ForgotPassword/>}/>
        <Route path = "/" element={<Home/>}/>
        <Route path = "/job/getall" element={<Jobs/>}/>
        <Route path = "/job/:id" element={<JobDetails/>}/>
        <Route path = "/job/post" element={<PostJob/>}/>
        <Route path = "/job/me" element={<MyJobs/>}/>
        <Route path = "/application/:id" element={<Application/>}/>
        <Route path = "/application/me" element={<MyApplication/>}/>
        <Route path = "/reply-form" element={<ReplyForm/>}/>
        <Route path = "*" element={<NotFound/>}/>
      </Routes>
      <Footer/>
      <Toaster/>
    </Router>
  )
}

export default App