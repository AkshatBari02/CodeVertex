import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Context } from "../..";
import axios from "axios";
import toast from "react-hot-toast";
import Lottie from "react-lottie";
import * as animationData from './../../assets/message.json';

const defaultOptions = {
  loop: true,
  autoplay : true,
  animationData : animationData,
  rendererSettings: {
      preserveAspectRatio : 'xMidYMid slice'
  }
};

const ReplyForm = () => {
  const [name,setName] = useState("");
  const [message,setMessage] = useState("");
  const [sending,setSending] = useState(false)
  const navigateTo = useNavigate();


  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const toEmail = queryParams.get("email");

  const {isAuthorized,user} = useContext(Context);
  const fromEmail = user.email;

  const handleSubmit = async(e) => {
    e.preventDefault();
      setSending(true);
      await axios.post(process.env.REACT_APP_RESPONSE_APPLICATION,{
        fromEmail,
        toEmail,
        name,
        message
      },{withCredentials:true}).then((res)=>{
        toast.success(res.data.message);
        setSending(false)
        navigateTo('/application/me');
      }).catch((err)=>{
        setSending(false)
        toast.error(err.response.data.message);
      })
  }

  return (
    <section className='application'>
          <div className='container msg'>
            <h3>Reply to Application</h3>
            {sending === true 
            ?
            (<>
              <Lottie options={defaultOptions}
                height={482}
                width={400}
                isStopped={false}
                isPaused={false} 
                className='lottie'/>
                <h5 style={{color:"green",textAlign:"center"}}>Please wait while we are sending your response :)</h5>
            </>)
            :
            (<>
              <form onSubmit={handleSubmit}>
              <input type='text' placeholder='Company Name' value={name} onChange={(e)=>setName(e.target.value)}/>
              <div>
                <label>From:</label>
              <input type='email' placeholder="Sender's Email Address" value={fromEmail}/>
              </div>
              <div>
                <label>To:</label>
                <input type='email' placeholder="Reciver's Email Address" value={toEmail} readOnly/>
              </div>       
              <textarea value={message} onChange={(e)=>setMessage(e.target.value)} placeholder='Message'></textarea>
             
              <button type='submit'>Send Message</button>
            </form>
            </>)}
          </div>
        </section>

  );
};

export default ReplyForm;
