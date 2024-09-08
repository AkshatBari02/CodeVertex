import React, { useContext, useState } from 'react'
import { Context } from '../../index';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';
import { FaRegUser } from 'react-icons/fa';
import { MdOutlineMailOutline } from 'react-icons/md';
import { RiLock2Fill } from 'react-icons/ri';
import Lottie from "react-lottie";
import * as animationData from './../../assets/loading.json';

const defaultOptions = {
  loop: true,
  autoplay : true,
  animationData : animationData,
  rendererSettings: {
      preserveAspectRatio : 'xMidYMid slice'
  }
};

const Login = () => {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [role,setRole] = useState("");
  const [loading,setLoading] = useState(false);


  const {isAuthorized,setIsAuthorized,user,setUser} = useContext(Context);

  const handleLogin = async(e)=>{
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(
        process.env.REACT_APP_LOGIN,
        {email,password,role},
        {
          withCredentials:true,
          headers:{
            "Content-Type": "application/json",

          }
        }
      );
      setLoading(false);

      toast.success(data.message);
      setEmail("");
      setPassword("");
      setRole("");
      setIsAuthorized(true);
    } catch (error) {
          setLoading(false);
          if (error.response && error.response.data) {
          toast.error(error.response.data.message);
          
        } else {
          toast.error("An unknown error occurred");
          
        }
      }
  };


  if(isAuthorized){
    return <Navigate to={"/"}/>;
  }
  return (
    <>
      {loading === true
      ?
      (<>
            <Lottie options={defaultOptions}
            height={482}
            width={400}
            isStopped={false}
            isPaused={false} 
            className='lottie'/>
            <h5 style={{color:"green",textAlign:"center"}}>Please wait while we are registering you :)</h5>
      </>)
      :
      (<>
        <div className='authPage'>
        <div className='container'>
          <div className='header'>
            <img src='/logo-org.png' alt='logo'/>
            <h3>Login To Your Account</h3>
          </div>
          <form>
            <div className='inputTag'>
              <label>Login As</label>
              <div>
                <select value={role} onChange={(e)=> setRole(e.target.value)}>
                  <option value="">Select Role</option>
                  <option value="Employer">Employer</option>
                  <option value="Job Seeker">Job Seeker</option>
                </select>
                <FaRegUser/>
              </div>
            </div>
            <div className='inputTag'>
              <label>Email</label>
              <div>
                <input type='email' value={email} onChange={(e)=> setEmail(e.target.value)} placeholder='Enter Your Email'/>
                <MdOutlineMailOutline/>
              </div>
            </div>
            <div className='inputTag'>
              <label>Password</label>
              <div>
                <input type='password' value={password} onChange={(e)=> setPassword(e.target.value)} placeholder='Enter Your Password'/>
                <RiLock2Fill/>
              </div>
            </div>
            <span className='frpwd'><Link to={'/frgpwd'}>Forgot Password?</Link></span>
            <button onClick={handleLogin} type='submit'>Login</button>
            <span>Don't Have An Account? <Link to={"/register"}>Register Now</Link></span>
          </form>
        </div>
        <div className='banner'>
          <img src='/login.png' alt='login'/>
        </div>
      </div>
      </>)
      }
      

    </>
  )
}

export default Login;