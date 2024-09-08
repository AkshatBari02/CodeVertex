import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Context } from '../..';
import axios from 'axios';
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

const JobDetails = () => {
  const {id} = useParams();
  const [job,setJob] = useState({});
  const [fetching,setFetching] = useState(false);
  const navigateTo = useNavigate();

  const {isAuthorized,user} = useContext(Context);

  useEffect(()=>{
    setFetching(true);
    const getJobDetailsUrl = process.env.REACT_APP_GET_JOB_DETAILS;
    axios.get(`${getJobDetailsUrl}${id}`,{
      withCredentials:true
    }).then((res)=>{
      setFetching(false);
      setJob(res.data.job);
    }).catch((err)=>{
      setFetching(false);
      console.log(err.response.data.message);
    })
  },[]);


  if(!isAuthorized){
    navigateTo('/login');
  }


  return (
    <div className='jobDetail page'>
      <div className='container'>
        <h3>Job Details</h3>
        {fetching === true
        ?
        (<>
          <Lottie options={defaultOptions}
            height={482}
            width={400}
            isStopped={false}
            isPaused={false} 
            className='lottie'/>
            <h5 style={{color:"green",textAlign:"center"}}>Please wait while we are fetching job details :)</h5>
        </>)
        :
        (<>
          <div className='banner'>
          <p>
            Title: <span>{job.title}</span>
          </p>
          <p>
            Category: <span>{job.category}</span>
          </p>
          <p>
            Country: <span>{job.country}</span>
          </p>
          <p>
            City: <span>{job.city}</span>
          </p>
          <p>
            Location: <span>{job.location}</span>
          </p>
          <p>
            Description: <span>{job.description}</span>
          </p>
          <p>
            Job Posted On: <span>{job.jobPostedOn}</span>
          </p>
          <p>
            Salary: {job.fixedSalary ? (<span>{job.fixedSalary}</span>) : (<span>{job.salaryFrom} - {job.salaryTo}</span>)}
          </p>
          <div className='banner-btn'>
          <p>
            {
              user && user.role === "Employer" ? <></> : (
                <Link to={`/application/${job._id}`}>Apply Now</Link>
              )
            }
          </p>
          </div>
        </div>
        </>)}
        
      </div>
    </div>
  )
}

export default JobDetails