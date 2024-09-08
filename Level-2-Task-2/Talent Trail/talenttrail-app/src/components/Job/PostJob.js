import React, { useContext, useState } from "react";
import { Context } from "../..";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
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

const PostJob = () => {
  const navigateTo = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const [salaryFrom, setSalaryFrom] = useState("");
  const [salaryTo, setSalaryTo] = useState("");
  const [fixedSalary, setFixedSalary] = useState("");
  const [salaryType, setSalaryType] = useState("default");
  const [loading,setLoading] = useState(false);

  const { isAuthorized, user } = useContext(Context);

  const handlePostJob = async (e) => {
    e.preventDefault();
    if (salaryType === "Fixed Salary") {
      setSalaryFrom("");
      setSalaryTo("");
    } else if (salaryType === "Ranged Salary") {
      setFixedSalary("");
    } else {
      setSalaryFrom("");
      setSalaryTo("");
      setFixedSalary("");
    }
    setLoading(true);
    await axios
      .post(
        process.env.REACT_APP_POST_JOB,
        fixedSalary.length >= 4
          ? ({title, category, country, city, location, fixedSalary,description})
          : ({title, category, country, city, location, salaryFrom, salaryTo,description}),
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        setLoading(false);
        toast.success(res.data.message);
        navigateTo('/job/getall')
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.response.data.message);
      });
  };

  if (!isAuthorized || (user && user.role !== "Employer")) {
    navigateTo("/");
  }

  return (
    <>
      <div className="job_post page">
        <div className="container">
          <h3>POST A NEW JOB</h3>
          {loading === true
          ?
          (<>
            <Lottie options={defaultOptions}
            height={482}
            width={400}
            isStopped={false}
            isPaused={false} 
            className='lottie'/>
            <h5 style={{color:"green",textAlign:"center"}}>Please wait while we are posting your job :)</h5>
          </>)
          :
          (<>
            <form onSubmit={handlePostJob}>
            <div className="wrapper">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Job Title"
              />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="" disabled={true}>
                  Select Category
                </option>
                <option value="Graphics And Design">Graphics And Design</option>
                <option value="Mobile App Development">
                  Mobile App Development
                </option>
                <option value="Frontend Web Development">
                  Frontend Web Development
                </option>
                <option value="MERN Stack Development">
                  MERN Stack Development
                </option>
                <option value="Account & Finance">Account & Finance</option>
                <option value="Artificial Intelligence">
                  Artificial Intelligence
                </option>
                <option value="MEAN Stack Development">
                  MEAN Stack Development
                </option>
                <option value="Data Entry Operator">Data Entry Operator</option>
              </select>
            </div>
            <div className="wrapper">
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="Country"
              />
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="City"
              />
            </div>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location"
            />
            <div className="salary_wrapper">
              <select
                value={salaryType}
                onChange={(e) => setSalaryType(e.target.value)}
              >
                <option value="default">Select Salary Type</option>
                <option value="Fixed Salary">Fixed Salary</option>
                <option value="Ranged Salary">Ranged Salary</option>
              </select>
              <div>
                {salaryType === "default" ? (
                  <p>Please Provide Salary Type *</p>
                ) : salaryType === "Fixed Salary" ? (
                  <input
                    type="number"
                    placeholder="Enter Fixed Salary"
                    value={fixedSalary}
                    onChange={(e) => setFixedSalary(e.target.value)}
                  />
                ) : (
                  <div className="ranged_salary">
                    <input type="number" placeholder="Salary From" value={salaryFrom} onChange={(e)=>setSalaryFrom(e.target.value)}/>
                    <input type="number" placeholder="Salary To" value={salaryTo} onChange={(e)=>setSalaryTo(e.target.value)}/>
                  </div>
                )}
              </div>
            </div>
            <textarea rows={10} value={description} onChange={(e)=>setDescription(e.target.value)} placeholder="Description"></textarea>
            <button type="submit">Create Job</button>
          </form>
          </>)
          }
        </div>
      </div>
    </>
  );
};

export default PostJob;
