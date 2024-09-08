import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { Context } from "../..";
import { useNavigate } from "react-router-dom";
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

const MyJobs = () => {
  const [myJobs, setMyJobs] = useState([]);
  const [editingMode, setEditingMode] = useState(null);
  const { isAuthorized, user } = useContext(Context);
  const [fetching,setFetching] = useState(false);

  const navigateTo = useNavigate();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setFetching(true);
        const { data } = await axios.get(
          process.env.REACT_APP_GET_MY_JOBS,
          { withCredentials: true }
        );
        setFetching(false);
        setMyJobs(data.myJobs);
      } catch (error) {
        setFetching(false);
        toast.error(error.response.data.message);
        setMyJobs([]);
      }
    };
    fetchJob();
  }, []);

  if (!isAuthorized || (user && user.role !== "Employer")) {
    navigateTo("/");
  }

  // Function for Enabling editing mode
  const handleEnableEdit = (jobId) => {
    setEditingMode(jobId);
  };
  // Function for Disabling editing mode
  const handleDisableEdit = (jobId) => {
    setEditingMode(jobId);
  };

  // Function for Editing Job
  const handleUpdateJob = async (jobId) => {
    const updateJob = myJobs.find((job) => job._id === jobId);
    setFetching(true);
    const updateMyJobUrl = process.env.REACT_APP_UPDATE_MY_JOB
    await axios
      .put(`${updateMyJobUrl}${jobId}`, updateJob, {
        withCredentials: true,
      })
      .then((res) => {
        setFetching(false);
        toast.success(res.data.message);
        setEditingMode(null);
      })
      .catch((err) => {
        setFetching(false);
        toast.error(err.response.data.message);
      });
  };

  // Function for Deleting a Job
  const handleJobDelete = async (jobId) => {
    setFetching(true);
    const deleteMyJobUrl = process.env.REACT_APP_DELETE_MY_JOB
    await axios
      .delete(`${deleteMyJobUrl}${jobId}`, {
        withCredentials: true,
      })
      .then((res) => {
        setFetching(false);
        toast.success(res.data.message);
        setMyJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
      })
      .catch((err) => {
        setFetching(false);
        toast.error(err.response.data.message);
      });
  };

  const handleInputChange = (jobId, field, value) => {
    setMyJobs((prevJobs) =>
      prevJobs.map((job) =>
        job._id === jobId ? { ...job, [field]: value } : job
      )
    );
  };
  return (
    <>
      <div className="myJobs page">
        <div className="container">
          <h3>Your Posted Jobs</h3>
          {fetching === true
          ?
          (<>
            <Lottie options={defaultOptions}
            height={482}
            width={400}
            isStopped={false}
            isPaused={false} 
            className='lottie'/>
            <h5 style={{color:"green",textAlign:"center"}}>Please wait while we are fetching your jobs :)</h5>
          </>)
          :
          (<>
            {myJobs && myJobs.length > 0 ? (
            <>
              <div className="banner">
                {myJobs.map((el) => {
                  return (
                    <div className="card" key={el.id}>
                      <div className="content">
                        <div className="short_fields">
                          <div>
                            <span>Title:</span>
                            <input
                              type="text"
                              disabled={editingMode !== el._id ? true : false}
                              value={el.title}
                              onChange={(e) =>
                                handleInputChange(
                                  el._id,
                                  "title",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <div>
                            <span>Country:</span>
                            <input
                              type="text"
                              disabled={editingMode !== el._id ? true : false}
                              value={el.country}
                              onChange={(e) =>
                                handleInputChange(
                                  el._id,
                                  "country",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <div>
                            <span>City:</span>
                            <input
                              type="text"
                              disabled={editingMode !== el._id ? true : false}
                              value={el.city}
                              onChange={(e) =>
                                handleInputChange(
                                  el._id,
                                  "city",
                                  e.target.value
                                )
                              }
                            />
                            <div>
                              <span>Category:</span>
                              <select
                                value={el.category}
                                onChange={(e) =>
                                  handleInputChange(
                                    el._id,
                                    "category",
                                    e.target.value
                                  )
                                }
                                disabled={editingMode !== el._id ? true : false}
                              >
                                <option value="" disabled={true}>
                                  Select Category
                                </option>
                                <option value="Graphics And Design">
                                  Graphics And Design
                                </option>
                                <option value="Mobile App Development">
                                  Mobile App Development
                                </option>
                                <option value="Frontend Web Development">
                                  Frontend Web Development
                                </option>
                                <option value="MERN Stack Development">
                                  MERN Stack Development
                                </option>
                                <option value="Account & Finance">
                                  Account & Finance
                                </option>
                                <option value="Artificial Intelligence">
                                  Artificial Intelligence
                                </option>
                                <option value="MEAN Stack Development">
                                  MEAN Stack Development
                                </option>
                                <option value="Data Entry Operator">
                                  Data Entry Operator
                                </option>
                              </select>
                            </div>
                            <div>
                              <span>
                                Salary:
                                {el.fixedSalary ? (
                                  <input
                                    type="number"
                                    value={el.fixedSalary}
                                    onChange={(e) =>
                                      handleInputChange(
                                        el._id,
                                        "fixedSalary",
                                        e.target.value
                                      )
                                    }
                                    disabled={
                                      editingMode !== el._id ? true : false
                                    }
                                  />
                                ) : (
                                  <div>
                                    <input
                                      type="number"
                                      value={el.salaryFrom}
                                      onChange={(e) =>
                                        handleInputChange(
                                          el._id,
                                          "salaryFrom",
                                          e.target.value
                                        )
                                      }
                                      disabled={
                                        editingMode !== el._id ? true : false
                                      }
                                    />
                                    <span>to</span>
                                    <input
                                      type="number"
                                      value={el.salaryTo}
                                      onChange={(e) =>
                                        handleInputChange(
                                          el._id,
                                          "salaryTo",
                                          e.target.value
                                        )
                                      }
                                      disabled={
                                        editingMode !== el._id ? true : false
                                      }
                                    />
                                  </div>
                                )}
                              </span>
                            </div>
                            <div>
                              <span>Expired:</span>
                              <select
                                value={el.expired}
                                onChange={(e) =>
                                  handleInputChange(
                                    el._id,
                                    "expired",
                                    e.target.value
                                  )
                                }
                                disabled={editingMode !== el._id ? true : false}
                              >
                                <option value={true}>True</option>
                                <option value={false}>False</option>
                              </select>
                            </div>
                          </div>
                        </div>

                        <div className="long_field">
                            <div>
                              <span>Description:</span>
                              <textarea
                                rows={5}
                                value={el.description}
                                onChange={(e) =>
                                  handleInputChange(
                                    el._id,
                                    "description",
                                    e.target.value
                                  )
                                }
                                disabled={editingMode !== el._id ? true : false}
                              ></textarea>
                            </div>
                            <div>
                              <span>Location:</span>
                              <textarea
                                rows={5}
                                value={el.location}
                                onChange={(e) =>
                                  handleInputChange(
                                    el._id,
                                    "location",
                                    e.target.value
                                  )
                                }
                                disabled={editingMode !== el._id ? true : false}
                              ></textarea>
                            </div>
                          </div>


                        <div className="button_wrapper">
                          <div className="edit_btn_wrapper">
                            {editingMode === el._id ? (
                              <>
                                <button
                                  onClick={() => handleUpdateJob(el._id)}
                                  className="check_btn"
                                >
                                  <FaCheck />
                                </button>
                                <button
                                  onClick={() => handleDisableEdit()}
                                  className="cross_btn"
                                >
                                  <RxCross2 />
                                </button>
                              </>
                            ) : (
                              <button
                                onClick={() => handleEnableEdit(el._id)}
                                className="edit_btn"
                              >
                                Edit
                              </button>
                            )}
                          </div>
                          <button
                            onClick={() => handleJobDelete(el._id)}
                            className="delete_btn"
                          >
                            Delete Job
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <p>You've not posted any job yet!</p>
          )}
          </>)
          }

          
        </div>
      </div>
    </>
  );
};

export default MyJobs;
