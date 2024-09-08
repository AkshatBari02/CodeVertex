import React, { useContext, useState } from 'react'
import { Context } from '../..';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import Lottie from "react-lottie";
import * as animationData from './../../assets/submit.json';

const defaultOptions = {
  loop: true,
  autoplay : true,
  animationData : animationData,
  rendererSettings: {
      preserveAspectRatio : 'xMidYMid slice'
  }
};

const Application = () => {
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [coverLetter,setCoverLetter] = useState("");
  const [phone,setPhone] = useState("");
  const [address,setAddress] = useState("");
  const [resume,setResume] = useState(null);
  const [loading,setLoading] = useState(false);


  const {isAuthorized,user} = useContext(Context);


  const navigateTo = useNavigate();

  // Function to handle file input changes
  const handleFileChange = (e)=>{
    const resume = e.target.files[0];
    setResume(resume);

  };

  const {id} = useParams();
  const handleApplication = async(e)=>{
    e.preventDefault();
    const formData = new FormData();
    formData.append("name",name);
    formData.append("email",email);
    formData.append("phone",phone);
    formData.append("address",address);
    formData.append("coverLetter",coverLetter);
    formData.append("resume",resume);
    formData.append("jobId",id);


    try {
      setLoading(true);
      const {data} = await axios.post(process.env.REACT_APP_POST_APPLICATION,formData,
        {
          withCredentials:true,
          headers:{
            "Content-Type":"multipart/form-data"
          }
        }
      );
      setName("");
      setEmail("");
      setPhone("");
      setAddress("");
      setCoverLetter("");
      setResume("");
      toast.success(data.message);
      setLoading(false);
      navigateTo('/job/getall');
    } catch (error) {
        setLoading(false);
        toast.error(error.response.data.message);
    }
  };

  if(!isAuthorized || user && user.role === "Employer"){
    navigateTo('/');
  }


  return (
    <>
        <section className='application'>
          <div className='container'>
            <h3>Application Form</h3>

            {loading === true 
            ?
            (<>
              <Lottie options={defaultOptions}
                height={482}
                width={400}
                isStopped={false}
                isPaused={false} 
                className='lottie'/>
                <h5 style={{color:"green",textAlign:"center"}}>Please wait while we are submitting your application :)</h5>
            </>)
            :
            (<>
              <form onSubmit={handleApplication}>
              <input type='text' placeholder='Full Name' value={name} onChange={(e)=>setName(e.target.value)}/>
              <input type='email' placeholder='Email Address' value={email} onChange={(e)=>setEmail(e.target.value)}/>
              <input type='tel' placeholder='Mobile Number' value={phone} onChange={(e)=>setPhone(e.target.value)}/>
              <input type='text' placeholder='Address' value={address} onChange={(e)=>setAddress(e.target.value)}/>
              <textarea value={coverLetter} onChange={(e)=>setCoverLetter(e.target.value)} placeholder='Cover Letter'></textarea>
              <div>
                <label style={{textAlign:"start",display:"block",fontSize:"20px"}}>Upload Resume</label>
                <input type='file' accept='.jpg,.png,.jpeg,.webp' onChange={handleFileChange} style={{width:"100%"}}/>
              </div>
              <button type='submit'>Send Application</button>
            </form>
            </>)}
            
          </div>
        </section>


    </>
  )
}

export default Application