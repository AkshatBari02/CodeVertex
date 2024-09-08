import React, { useContext, useEffect, useState } from "react";
import { Context } from "../..";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ResumeModel from "./ResumeModel";
import Lottie from "react-lottie";
import * as animationData from './../../assets/fetching.json';

const defaultOptions = {
  loop: true,
  autoplay : true,
  animationData : animationData,
  rendererSettings: {
      preserveAspectRatio : 'xMidYMid slice'
  }
};

const MyApplication = () => {
  const [applications, setApplications] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [ResumeImageUrl, setResumeImageUrl] = useState("");
  const { user, isAuthorized } = useContext(Context);
  const [fetching,setFetching] = useState(false);

  const navigateTo = useNavigate();
  useEffect(() => {
    try {
      if (user && user.role === "Employer") {
        setFetching(true)
        axios
          .get(
            process.env.REACT_APP_GET_ALL_APPLICATIONS_EMPLOYER,
            { withCredentials: true }
          )
          .then((res) => {
            setFetching(false)
            setApplications(res.data.applications || []);
          });
      } else {
        setFetching(true)
        axios
          .get(
            process.env.REACT_APP_GET_ALL_APPLICATIONS_JOBSEEKER,
            { withCredentials: true }
          )
          .then((res) => {
            setFetching(false)
            setApplications(res.data.applications || []);
          });
      }
    } catch (error) {
      setFetching(false)
      toast.error(error.response.data.message);
    }
  }, [isAuthorized]);

  if(!isAuthorized){
    navigateTo("/login");
  }


  const deleteApplication = (id)=>{
    const deleteApplicationUrl = process.env.REACT_APP_DELETE_APPLICATION;
    try {
      setFetching(true)
      axios.delete(`${deleteApplicationUrl}${id}`,{withCredentials:true}).then((res)=>{
        toast.success(res.data.message);
        setFetching(false)
        setApplications(prevApplications =>
          prevApplications.filter((application)=>application._id !== id));
      });
    } catch (error) {
      setFetching(false)
        toast.error(error.response.data.message)
    }
  }

  const openModal = (imageUrl)=>{
    setResumeImageUrl(imageUrl);
    setModalOpen(true);
  };

  const closeModal = ()=>{
    setModalOpen(false);
  }

  
  return (
          <>
              <section className="my_applications page">
                {
                  user && user.role === "Job Seeker" 
                  ? 
                  (
                    <>
                        <div className="container">
                          <h3>My Applications</h3>
                          {fetching === true 
                          ?
                          (<>
                            <Lottie options={defaultOptions}
                              height={482}
                              width={400}
                              isStopped={false}
                              isPaused={false} 
                              className='lottie'/>
                              <h5 style={{color:"green",textAlign:"center"}}>Please wait while we are fetching your applications :)</h5>
                          </>)
                          :
                          (<>
                            {
                            applications.length <= 0 
                            ?
                            (
                              <>
                                {" "}
                                <h4>No Applications Found</h4>{" "}
                              </>
                            )
                            :
                            (
                              <>
                                {
                                  applications.map((el)=>{
                                    return <JobSeekerCard element={el} key={el._id} deleteApplication={deleteApplication} openModal={openModal}/>
                                  })
                                }
                              </>
                            )
                          }
                          </>)}
                        </div>
                    
                    </>
                  )
                  :
                  (
                    <>
                        <div className="container">
                          <h3>Candidate Applications</h3>
                          {fetching === true
                          ?
                          (<>
                            <Lottie options={defaultOptions}
                              height={482}
                              width={400}
                              isStopped={false}
                              isPaused={false} 
                              className='lottie'/>
                              <h5 style={{color:"green",textAlign:"center"}}>Please wait while we are fetching your applications :)</h5>
                          </>)
                          :
                          (<>
                            {
                            applications.length <= 0 
                            ?
                            (
                              <>
                                {" "}
                                <h4>No Applications Found</h4>{" "}
                              </>
                            )
                            :
                            (
                              <>
                                {
                                applications.map((el)=>{
                                  return <EmployerCard element={el} key={el._id} openModal={openModal}/>
                                  })
                                }
                              </>
                            )
                          }
                          </>)}
                          
                        </div>
                    </>
                  )
                }

                {
                  modalOpen && (
                    <ResumeModel imageUrl={ResumeImageUrl} onClose={closeModal}/>
                  )
                }
              </section>

          </>
  );
};

export default MyApplication;



const JobSeekerCard = ({element,deleteApplication,openModal})=>{
  return(
    <>
        <div className="job_seeker_card">
          <div className="detail">
            <p>
              <span>Name:</span>&nbsp;
              {element.name}
            </p>
            <p>
              <span>Email:</span>&nbsp;
              {element.email}
            </p>
            <p>
              <span>Mobile:</span>&nbsp;
              {element.phone}
            </p>
            <p>
              <span>Address:</span>&nbsp;
              {element.address}
            </p>
            <p>
              <span>Cover Letter:</span>&nbsp;
              {element.coverLetter}
            </p>
          </div>
          <div className="resume">
            <img src={element.resume.url} alt="resume" onClick={()=>openModal(element.resume.url)}/>
          </div>
          <div className="btn_area">
            <button onClick={()=>deleteApplication(element._id)}>Delete Application</button>
          </div>
        </div>
    
    </>
  );
}


const EmployerCard = ({element,openModal})=>{

  const navigateTo = useNavigate();
  function handleReply(e){
    e.preventDefault();
    navigateTo(`/reply-form?email=${element.email}`);
  }
  return(
    <>
        <div className="job_seeker_card">
          <div className="detail">
            <p>
              <span>Name:</span>&nbsp;
              {element.name}
            </p>
            <p>
              <span>Email:</span>&nbsp;
              {element.email}
            </p>
            <p>
              <span>Mobile:</span>&nbsp;
              {element.Phone}
            </p>
            <p>
              <span>Address:</span>&nbsp;
              {element.address}
            </p>
            <p>
              <span>Cover Letter:</span>&nbsp;
              {element.coverLetter}
            </p>
          </div>
          <div className="resume">
            <img
              src={element.resume.url}
              alt="resume"
              onClick={() => openModal(element.resume.url)}
            />
          </div>
          <div className="btn_area">
            <button onClick={handleReply}>Reply</button>
          </div>
        </div>
    
    </>
  );
}
