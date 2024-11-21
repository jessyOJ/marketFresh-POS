import React, { useState } from "react";
import { Button, Modal } from "antd";
import { useNavigate ,Link } from "react-router-dom";
import 'aos/dist/aos.css'; 
import AOS from 'aos';
import "../resources/LandingPage.css"; 

function LandingPage() {
  AOS.init({ duration: 2000 });
  const navigate = useNavigate();
  
  const [isLocationModalVisible, setIsLocationModalVisible] = useState(false);
  const [isContactModalVisible, setIsContactModalVisible] = useState(false);
  const [isAboutUsModalVisible, setIsAboutUsModalVisible] = useState(false);

  const showLocationModal = () => setIsLocationModalVisible(true);
  const showContactModal = () => setIsContactModalVisible(true);
  const showAboutUsModal = () => setIsAboutUsModalVisible(true);
 
  return (
    <div className="container-fluid landing">
      <div className="d-flex links-container">
        <Link  onClick={showLocationModal}>Location</Link>
        <Link to="/showItems">All Products</Link>
        <Link  onClick={showContactModal}>Contact Us</Link>
        <Link  onClick={showAboutUsModal}>About Us</Link>
      </div>

      {/* Location Modal */}
      <Modal
        title="Our Location"
        open={isLocationModalVisible}
         className="custom-modal"
        footer={false}
        onCancel={()=>{setIsLocationModalVisible(false)}}
      >
        <div className="modal-content">
        <h2>Visit Us at:</h2>
        <p>We are located at Victoria Island, Lagos, Nigeria.</p>
        <p>Feel free to visit us anytime during working hours!</p>
        <hr/>
        <p>Working Days:Monday-Saturday</p>
        <p>Working Hours:8AM -3PM</p>
        </div>
      
      </Modal>

      {/* Contact Us Modal */}
      <Modal
        title="Contact Us"
         className="custom-modal"
         footer={false}
        open={isContactModalVisible}
        onCancel={()=>{setIsContactModalVisible(false)}}
      >
        <div className="modal-content">
        <h2>You can contact us at:</h2>
        <p>Email: <Link href="mailto:support@marketfresh.com">support@marketfresh.com</Link></p>
        <p>Phone: +234 806 0548424</p>
        </div>
       
      </Modal>

      <Modal
        title="About Us"
        open={isAboutUsModalVisible}
        footer={false}
         className="custom-modal"
        onCancel={()=>{setIsAboutUsModalVisible(false)}}
      >
        <div className="modal-content">
        <h2>Who We Are</h2>
        <p>MarketFresh is committed to providing high-quality fresh produce, meats, and grocery items.</p>
        <p>We strive to make shopping convenient, affordable, and enjoyable for everyone.</p>
        </div>
        
      </Modal>

      <div>
        <div className="header">
          <h1 data-aos="zoom-in">
            <span style={{ color: "#E8AE3C" }}>MarketFresh</span>
            <span style={{ color: "white" }}>POS</span>
          </h1>
          <p
            data-aos="fade-up"
            data-aos-offset="0"
            data-aos-duration="1000"
            data-aos-once="true"
          >
            Transforming Shopping into an Effortless Experience
          </p>
          <div>
            <Button
              data-aos="flip-right"
              data-aos-duration="6000"
              className="landing-btn"
              onClick={() => navigate("/home")}
            >
              Get Started
            </Button>
          </div>
          <div className="justify-content-between landing-items">
            <div>
              <img
                data-aos="zoom-out-right"
                src="https://img.freepik.com/premium-photo/photo-grilled-meat-steak-row-meat-seasoning_763111-24714.jpg?w=826"
                alt=""
              />
              <img
                data-aos="fade-up"
                data-aos-duration="3000"
                src="https://static.vecteezy.com/system/resources/previews/030/645/540/non_2x/the-fruit-of-the-month-club-free-photo.jpg"
                alt=""
              />
              <img
                data-aos="fade-down"
                data-aos-duration="3000"
                src="https://statbel.fgov.be/sites/default/files/styles/news_full/public/images/landbouw/8.7%20Zuivelstatistieken/AdobeStock_62229517.jpeg?itok=y-njvkAD"
                alt=""
              />
              <img
                data-aos="zoom-out"
                data-aos-duration="3000"
                src="https://img.freepik.com/premium-photo/front-view-vegetables_884296-282.jpg"
                alt=""
              />
              <img
                data-aos="zoom-in"
                data-aos-duration="3000"
                src="https://www.undercurrentnews.com/wp-content/uploads/2021/06/MAFAC2-e1624894611800.jpg"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;

