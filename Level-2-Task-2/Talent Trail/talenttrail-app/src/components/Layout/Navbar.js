import React, { useContext, useState } from 'react'
import { Context } from '../..';
import { useNavigate,Link, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import {GiHamburgerMenu} from "react-icons/gi";

const Navbar = () => {

  const [show,setShow] = useState(false);
  const {isAuthorized,setIsAuthorized,user} = useContext(Context);
  const navigateTo = useNavigate();
  const location = useLocation();
  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };




  const handleLogout = async()=>{
    try{
      const response = await axios.get(process.env.REACT_APP_LOGOUT,{withCredentials:true});
      toast.success(response.data.message);
      setIsAuthorized(false);
      navigateTo("/login");
    }catch(err){
      toast.error(err.response.data.message);
      setIsAuthorized(true)
    }
  }

  return (
    <>
      <nav className={isAuthorized ? "navbarShow" : "navabrHide"}>
        <div className='container'>
          <div className='logo'>
            <img src='/logo-white.png' alt='logo'/>
          </div>
          <ul className={ !show ? "menu" : "show-menu menu"}>
            <li><Link to={"/"} onClick={()=>setShow(false)} className={isActive('/')}>Home</Link></li>
            <li><Link to={"/job/getall"} onClick={()=>setShow(false)} className={isActive('/job/getall')}>All Jobs</Link></li>
            <li><Link to={"/application/me"} onClick={()=>setShow(false)} className={isActive('/application/me')}>{user && user.role === "Employer" ? "Applicant's Applications" : "My Applications"}</Link></li>
            {
              user && user.role === "Employer" ? (
              <>
                <li><Link to={"/job/post"} onClick={()=>setShow(false)} className={isActive('/job/post')}>Post New Job</Link></li>
                <li><Link to={"/job/me"} onClick={()=>setShow(false)} className={isActive('/job/me')}>View Your Jobs</Link></li>
              </>
              ) : (
              <></>
            )}
            {location.pathname === "/login" || location.pathname === "/register" ? <></> : <button onClick={handleLogout}>Logout</button>}
          </ul>
          <div className='hamburger'>
            <GiHamburgerMenu onClick={()=>setShow(!show)}/>
          </div>
        </div>
      </nav>
    
    
    
    </>
  )
}

export default Navbar