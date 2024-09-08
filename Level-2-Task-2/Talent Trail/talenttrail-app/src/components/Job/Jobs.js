import React, { useContext, useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Context } from '../..';
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

const Jobs = () => {
  const [jobs,setJobs] = useState([]);
  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();
  const [fetching,setFetching] = useState(false);


  useEffect(()=>{
    setFetching(true)
    try {
      axios.get(process.env.REACT_APP_GET_ALL_JOBS,{withCredentials:true}).then((res)=>{
        setFetching(false)
        setJobs(res.data);
      })
    } catch (error) {
      setFetching(false);
      console.log(error);
    }
  },[])

  if(!isAuthorized){
    navigateTo('/login');
  }
  return (
    <section className='jobs page'>
      <div className='container'>
        <h1>ALL AVAILABLE JOBS</h1>
        {fetching === true
        ?
        (<>
          <Lottie options={defaultOptions}
            height={482}
            width={400}
            isStopped={false}
            isPaused={false} 
            className='lottie'/>
            <h5 style={{color:"green",textAlign:"center"}}>Please wait while we are fetching jobs for you :)</h5>
        </>)
        :
        (<>
          <div className='banner'>
          {jobs.jobs && jobs.jobs.map((element)=>{
            return (
              <div className='card' key={element.id}>
                <p>{element.title}</p>
                <p>{element.category}</p>
                <p>{element.country}</p>
                <Link to={`/job/${element._id}`}>Job Details</Link>
              </div>
            )
          })}
        </div>
        </>)
        }
      </div>
    </section>
  )
}

export default Jobs;