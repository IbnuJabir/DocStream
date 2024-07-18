import React from "react";
import "./footer.css";
import dostream from "../../../assets/images/DocStream.png";
import { FaLocationDot } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { FaPhoneAlt } from "react-icons/fa";

function Footer() {
  return (
    <section className="footer">
      <div className="docstream">
        <img src={dostream} alt="#" />
        <p>
          Ready to schedule an appointment or need more information? Contact us
          today to speak with our friendly staff and discover how we can help
          you achieve your health goals.
        </p>
      </div>
      <div className="useful_links">
        <h2>QUICK LINKS</h2>
        <ul>
          <li>
            <a href="/home">Home</a>
          </li>
          <li>
            <a href="/about">About Us</a>
          </li>
          <li>
            <a href="/services">Services</a>
          </li>
          <li>
            <a href="/doctors">Doctors</a>
          </li>
          <li>
            <a href="/contact">Contact</a>
          </li>
        </ul>
      </div>
      <div className="contact">
        <h2>CONTACT</h2>
        <span>
          <FaLocationDot />
          House 7, Road - 9, M-Block Sheger City, Ethiopia
        </span>
        <span>
          <IoMdMail /> docstream.info@gmail.com
        </span>
        <span>
          <FaPhoneAlt />
          (+251) 912 3456 789
        </span>
      </div>
      <div className="newslatter">
        <h1>News Letter</h1>
      </div>
    </section>
  );
}

export default Footer;
