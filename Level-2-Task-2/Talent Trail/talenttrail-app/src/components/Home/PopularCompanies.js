import React from 'react';
import {FaMicrosoft,FaApple} from 'react-icons/fa';
import {SiTesla} from 'react-icons/si';

const PopularCompanies = () => {
  const companies = [
    {
      id: 1,
      title: "Microsoft",
      location: "123,Street,Delhi",
      openPositions: 10,
      icon: <FaMicrosoft />,
    },
    {
      id: 2,
      title: "Tesla",
      location: "B-19,S.Link,Gurgaon",
      openPositions: 5,
      icon: <SiTesla />,
    },
    {
      id: 3,
      title: "Apple",
      location: "Main Street,Bangalore",
      openPositions: 20,
      icon: <FaApple />,
    },
  ];
  return (
    <>
        <div className='companies'>
          <div className='container'>
            <h3>TOP COMPANIES</h3>
            <div className='banner'>
              {
                companies.map(element=>{
                  return(
                    <div className='card' key={element.id}>
                      <div className='content'>
                      <div className='icon'>{element.icon}</div>
                        <p>{element.title}</p>
                        <p>{element.location}</p>
                      </div>
                      <button>Open Positions {element.openPositions}</button>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>


    </>
  )
}

export default PopularCompanies