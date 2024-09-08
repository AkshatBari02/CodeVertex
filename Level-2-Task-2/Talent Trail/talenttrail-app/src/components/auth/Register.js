import React, { useContext, useState } from 'react'
import { Context } from '../../index';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';
import { FaPencilAlt, FaRegUser } from 'react-icons/fa';
import { MdOutlineMailOutline } from 'react-icons/md';
import { FaPhoneFlip } from 'react-icons/fa6';
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

const Register = () => {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [phone,setPhone] = useState("");
  const [name,setName] = useState("");
  const [role,setRole] = useState("");
  const [loading,setLoading] = useState(false);


  const {isAuthorized,setIsAuthorized,user,setUser} = useContext(Context);

  const handleRegister = async(e)=>{
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(
        process.env.REACT_APP_REGISTER,
        {name,email,password,phone,role},
        {
          withCredentials:true,
          headers:{
            "Content-Type": "application/json",

          }
        }
      );
      setLoading(false);
      toast.success(data.message);
      setName("");
      setEmail("");
      setPhone("");
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
                  <h3>Create A New Account</h3>
                </div>
                <form>
                  <div className='inputTag'>
                    <label>Register As</label>
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
                    <label>Name</label>
                    <div>
                      <input type='text' value={name} onChange={(e)=> setName(e.target.value)} placeholder='Enter Your Name'/>
                      <FaPencilAlt/>
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
                    <label>Mobile Number</label>
                    <div>
                      <input type='tel' value={phone} onChange={(e)=> setPhone(e.target.value)} placeholder='Enter Your Mobile Number'/>
                      <FaPhoneFlip/>
                    </div>
                  </div>
                  <div className='inputTag'>
                    <label>Password</label>
                    <div>
                      <input type='password' value={password} onChange={(e)=> setPassword(e.target.value)} placeholder='Enter Your Password'/>
                      <RiLock2Fill/>
                    </div>
                  </div>
                  <button onClick={handleRegister} type='submit'>Register</button>
                  <span>Already Have An Account? <Link to={"/login"}>Login Now</Link></span>
                </form>
              </div>
              <div className='banner'>
                <img src='/register.png' alt='register'/>
              </div>
            </div>
          </>)
          }
          

    </>
  )
}

export default Register;