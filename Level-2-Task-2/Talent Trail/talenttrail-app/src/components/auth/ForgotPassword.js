import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FaRegUser } from 'react-icons/fa';
import { MdOutlineMailOutline } from 'react-icons/md';
import { RiLock2Fill } from 'react-icons/ri';
import Lottie from "react-lottie";
import * as animationData from './../../assets/verify.json';

const defaultOptions = {
  loop: true,
  autoplay : true,
  animationData : animationData,
  rendererSettings: {
      preserveAspectRatio : 'xMidYMid slice'
  }
};

const ForgotPassword = ()=>{

    const navigateTo = useNavigate();
    const [values, setValues] = useState({
        email: "",
        showForm2: false,
        verify: false,
        otp: "",
        newPass: "",
      });
    function handleInput(e) {
    setValues({ ...values, [e.target.name]: e.target.value });
    }

    function handleSendOtp(e){
        e.preventDefault();
        setValues({ ...values, ["verify"]: true })
        axios.post(process.env.REACT_APP_SEND_OTP,values).then((res)=>{
            toast.success(res.data.message);
            setValues({ ...values, ["verify"]: false, ["showForm2"]: true});
        }).catch((err)=>{
            toast.error(err.response.data.message);
            setValues({ ...values, ["verify"]: false });
        })
    }

    function handleVerifyOTP(e) {
        e.preventDefault();
        setValues({ ...values, ["verify"]: true });
        axios
          .post(process.env.REACT_APP_VERIFY_OTP, values)
          .then((res) => {
            toast.success(res.data.message);
            setValues({ ...values, ["verify"]: false, ["showForm2"]: false });
            navigateTo("/login");
          })
          .catch((err) => {
            toast.error(err.response.data.message);
            setValues({ ...values, ["verify"]: false});
          });
      }
    return(
        <>

            {values.verify === true
            ?
            (<>
                <Lottie options={defaultOptions}
                height={482}
                width={400}
                isStopped={false}
                isPaused={false} 
                className='lottie'/>
                <h5 style={{color:"green",textAlign:"center"}}>Please wait while we are updating your password :)</h5>
            </>)
            :
            (<>
                {
                values.showForm2 === false
                ?
                (
                    <>
                        <div className='authPage'>
                            <div className='container'>
                                <div className='header'>
                                    <img src='/logo-org.png' alt='logo'/>
                                    <h3>Email to Change Password</h3>
                                </div>
                                <form>
                                    <div className='inputTag'>
                                    <label>Email</label>
                                    <div>
                                        <input type='email' name="email" value={values.email} onChange={handleInput} placeholder='Enter Your Email'/>
                                        <MdOutlineMailOutline/>
                                    </div>
                                    </div>
                                    <button onClick={handleSendOtp} type='submit'>submit</button>
                                </form>
                            </div>
                            <div className='banner'>
                            <img src='/login.png' alt='login'/>
                            </div>
                        </div>
                    </>
                )
                :
                (
                    <>
                        <div className='authPage'>
                            <div className='container'>
                                <div className='header'>
                                    <img src='/logo-org.png' alt='logo'/>
                                    <h3>Change Your Password</h3>
                                </div>
                                <form>
                                    <div className='inputTag'>
                                    <label>Email</label>
                                    <div>
                                        <input type='email' name="email"value={values.email} onChange={handleInput} placeholder='Enter Your Email'/>
                                        <MdOutlineMailOutline/>
                                    </div>
                                    </div>
                                    <div className='inputTag'>
                                    <label>OTP</label>
                                    <div>
                                        <input type='password' name="otp" value={values.otp}  onChange={ handleInput} placeholder='Enter Your OTP'/>
                                        <RiLock2Fill/>
                                    </div>
                                    </div>
                                    <div className='inputTag'>
                                    <label>New Password</label>
                                    <div>
                                        <input type='password' name="newPass" value={values.newPass} onChange={handleInput} placeholder='Enter Your New Password'/>
                                        <RiLock2Fill/>
                                    </div>
                                    </div>
                                    <button onClick={handleVerifyOTP} type='submit'>Change Password</button>
                                </form>
                            </div>
                            <div className='banner'>
                            <img src='/login.png' alt='login'/>
                            </div>
                        </div>
                    </>
                )
            }
            </>)
            }
        </>
    )
}

export default ForgotPassword;