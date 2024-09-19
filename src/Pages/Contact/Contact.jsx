import React, { useEffect, useState, useContext } from "react";
import "./Contact.css";
import axios from "axios";
import EachPageHead from "../../Components/EachPageHead/EachPageHead";
import GetInTouch from "../../Components/GetInTouch/GetInTouch";
import { Link } from "react-router-dom";
import BgImage from "../../assets/contact_head_back_img.jfif";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { motion } from "framer-motion";
import { fadeIn } from "../../Variants";
import { LanguageContext } from "../../Context/LanguageContext";

const Contact = () => {
  const [contact, setContact] = useState(null);
  const [navData, setNavData] = useState({});

  const { language } = useContext(LanguageContext);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/contact`)
      .then((response) => {
        setContact(response.data[language]);
      })
      .catch((error) => {
        console.error("Error", error);
      });
    axios
      .get("http://localhost:5000/navBar")
      .then((response) => {
        setNavData(response.data[language]);
      })
      .catch((error) => console.error("Error fetching navbar data:", error));
  }, [language]);

  if (!contact) {
    return <div>Loading contact data...</div>;
  }

  return (
    <div>
      <section className="each__page__head">
        <EachPageHead
          backgroundImage={BgImage}
          heading={contact.length > 0 ? contact[0].title : "Contact"}
        />
      </section>
      <section>
        <GetInTouch />
      </section>
      <section className="team__sec">
        <motion.div
          className="container"
          variants={fadeIn("up", 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.5 }}
        >
          <motion.h2
            variants={fadeIn("up", 0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.5 }}
          >
            {navData?.teamTitle}
          </motion.h2>
          <div className="teams">
            <Swiper
              spaceBetween={16}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              slidesPerView={1}
              breakpoints={{
                768: {
                  spaceBetween: 20,
                  slidesPerView: 2,
                },
                992: {
                  spaceBetween: 24,
                  slidesPerView: 3,
                },
              }}
              modules={[Autoplay]}
              className="mySwiper"
            >
              {contact.map((member) => (
                <SwiperSlide key={member.id}>
                  <motion.div
                    variants={fadeIn("left", 0.3)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: false, amount: 0.5 }}
                    className="team__members"
                  >
                    <img src={member.image} alt={member.name} />
                    <h6>{member.name}</h6>
                    <Link className="link__mail" to={`mailto:${member.email}`}>
                      {member.email}
                    </Link>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Contact;
