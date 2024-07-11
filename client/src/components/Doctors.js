import React from 'react'
import './style/doctors.css'
import { FaFacebook, FaLinkedinIn } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
function Doctors() {
  return (
    <div className='doctors_section'>
        <p className='sub_title'>TRUSTED CARE</p>
        <p className='title'>Our Doctors</p>
        <div className='doctors_cards'>
            <div className='card'>
                <img src='/rectangle-20@2x.png' alt='doc1' />
                <div className='card_info'>
                    <p>doc name</p>
                    <h2>title</h2>
                    <div className='social_icons'>
                    <FaLinkedinIn />
                    <FaFacebook />
                    <FaInstagram />
                    </div>
                </div>
                <div className='view_profile'>
                    <p>view Profile</p>
                </div>
            </div>
            <div className='card'>
                <img src='/rectangle-20@2x.png' alt='doc1' />
                <div className='card_info'>
                    <p>doc name</p>
                    <h2>title</h2>
                    <div className='social_icons'>
                    <FaLinkedinIn />
                    <FaFacebook />
                    <FaInstagram />
                    </div>
                </div>
                <div className='view_profile'>
                    <p>view Profile</p>
                </div>
            </div>
            <div className='card'>
                <img src='/rectangle-20@2x.png' alt='doc1' />
                <div className='card_info'>
                    <p>Doc. William</p>
                    <h2>Nurologist</h2>
                    <div className='social_icons'>
                    <FaLinkedinIn />
                    <FaFacebook />
                    <FaInstagram />
                    </div>
                </div>
                <div className='view_profile'>
                    <p>view Profile</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Doctors
