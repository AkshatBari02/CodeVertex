import React from 'react'
import { FaUserPlus } from 'react-icons/fa';
import { IoMdSend } from 'react-icons/io';
import { MdFindInPage } from 'react-icons/md';

const HowItWorks = () => {
  return (
    <>
        <div className='howitworks'>
          <div className='container'>
            <h3>How Zobzee Works?</h3>
            <div className='banner'>
              <div className='card'>
                <FaUserPlus/>
                <p>Create Account</p>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
              </div>
              <div className='card'>
                <MdFindInPage/>
                <p>Find/Post A Job</p>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
              </div>
              <div className='card'>
                <IoMdSend/>
                <p>Create Account</p>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
              </div>
            </div>
          </div>
        </div>

    </>
  )
}

export default HowItWorks;