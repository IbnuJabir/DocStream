import MedicalExcellenceSection from "../components/MedicalExcellenceSection";
import CareContainer from "../components/CareContainer";
import GroupComponent1 from "../components/GroupComponent1";
import GroupComponent from "../components/GroupComponent";
import BonesContainer from "../components/BonesContainer";
import Footer from "../components/Footer";
import ContactsSection from "../components/ContactsSection";
import AppointmentForm from "../components/AppointmentForm";
import NewsSection from "../components/NewsSection";
import OurDoctorsSection from "../components/OurDoctorsSection";
import Navbar from "../components/Navbar";
import Topmost from "../components/Topmost";
import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      <div className="home-child" />
      <Topmost />
      <Navbar />
      <MedicalExcellenceSection />
      <CareContainer />
      {/* <img className="home-item" alt="" src="/group-183.svg" />
      <div className="home-inner" />
      <div className="rectangle-parent">
        <div className="group-child" />
        <div className="our-services-parent">
          <div className="our-services">Our Services</div>
          <b className="care-you-can">Care you can believe in</b>
        </div>
        <div className="group-parent">
          {/* <GroupComponent1 /> */}
           {/*<div className="rectangle-group">
            <img className="group-item" alt="" src="/rectangle-13@2x.png" />
            <div className="rectangle-container">
              <div className="group-inner" />
              <div className="rectangle-div" />
              <div className="group-child1" />
            </div>
          </div>
          <div className="group-div">
            <img className="group-item" alt="" src="/frame-187@3x.png" />
            <div className="rectangle-container">
              <div className="group-inner" />
              <div className="rectangle-div" />
              <div className="group-child1" />
            </div>
          </div>
          {/* <GroupComponent /> *
        </div>
      </div> */}
      {/* <div className="group-container">
        <div className="our-specialties-parent">
          <div className="our-specialties">Our Specialties</div>
          <b className="always-caring">Always Caring</b>
        </div>
        <BonesContainer />
      </div>
      <div className="rectangle-parent2">
        <img className="group-child5" alt="" src="/rectangle-33@2x.png" />
        <div className="group-child6" />
        <div className="book-an-appointment-parent">
          <div className="book-an-appointment">Book an Appointment</div>
          <div className="lorem-ipsum-dolor">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
            placerat scelerisque tortor ornare ornare. Convallis felis vitae
            tortor augue. Velit nascetur proin massa in. Consequat faucibus
            porttitor enim et.
          </div>
        </div>
      </div>
      <div className="goals-parent">
        <div className="goals">
          <div className="book-an-appointment1">Book an Appointment</div>
          <img className="calendar-icon" alt="" src="/39calendar.svg" />
          <img className="team-icon" alt="" src="/27team.svg" />
          <img className="cash-icon" alt="" src="/15cash.svg" />
        </div>
        <div className="goals1">
          <div className="book-an-appointment1">Book an Appointment</div>
          <img className="calendar-icon1" alt="" src="/39calendar1.svg" />
          <img className="team-icon1" alt="" src="/27team1.svg" />
          <img className="cash-icon" alt="" src="/15cash.svg" />
        </div>
        <div className="goals2">
          <div className="book-an-appointment1">Book an Appointment</div>
          <img className="calendar-icon1" alt="" src="/39calendar.svg" />
          <img className="team-icon" alt="" src="/27team.svg" />
          <img className="cash-icon2" alt="" src="/15cash1.svg" />
        </div>
      </div>
      <Footer
        footerPosition="absolute"
        footerTop="5398px"
        footerLeft="0px"
        groupDivWidth="17.57%"
        groupDivRight="68.74%"
        groupDivWidth1="71.83%"
        groupDivRight1="28.17%"
        groupDivWidth2="17.13%"
        groupDivRight2="36.24%"
      />
      <ContactsSection
        contactsSectionPosition="absolute"
        contactsSectionTop="4971px"
        contactsSectionLeft="187px"
        groupDivWidth="77.68%"
        groupDivRight="9.44%"
        groupIconWidth="19.56%"
        groupIconRight="80%"
        groupDivWidth1="79.4%"
        groupDivRight1="7.73%"
        groupIconWidth1="16.22%"
        groupIconRight1="83.41%"
        groupIconLeft="0.38%"
      />
      <AppointmentForm
        appointmentFormPosition="absolute"
        appointmentFormMarginLeft="unset"
        submitLeft="43.79%"
      />
      <NewsSection
        newsSectionPosition="absolute"
        newsSectionTop="4271px"
        newsSectionLeft="0px"
      />
      <OurDoctorsSection
        ourDoctorsSectionPosition="absolute"
        ourDoctorsSectionTop="3489px"
        ourDoctorsSectionLeft="187px"
        rectangleIconWidth="317px"
        rectangleIconAlignSelf="unset"
        rectangleIconOverflow="unset"
      /> */}
    </div>
  );
};

export default Home;
