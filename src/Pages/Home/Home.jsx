import React from "react";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./Home.css";
import { Link } from "react-router-dom";
import ServiceImg from "../../assets/b5a586314e33996f0406889eea26a0d6.png";
import GetInTouch from "../../Components/GetInTouch/GetInTouch";
import ServicesAndProjectsItem from "../../Components/ServicesItem/ServicesAndProjectsItem";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { FaAngleRight } from "react-icons/fa";
import { motion } from "framer-motion";
import { fadeIn } from "../../Variants";
import Logo from "../../assets/710f06b7be7c86841477d36b0a51c066.png";
import { LanguageContext } from "../../Context/LanguageContext";

const Home = () => {
  const [services, setServices] = useState([]);
  const [projects, setProjects] = useState([]);
  const [partners, setPartners] = useState([]);
  const [navData, setNavData] = useState({});
  const [about, setAbout] = useState(null);

  const { language } = useContext(LanguageContext);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/about`)
      .then((response) => {
        setAbout(response.data[language]);
      })
      .catch((error) => {
        console.error("Error", error);
      });

    axios
      .get("http://localhost:5000/services")
      .then((response) => {
        setServices(response.data[language]);
      })
      .catch((error) => {
        console.error("Error 404", error);
      });

    axios
      .get("http://localhost:5000/projects")
      .then((response) => {
        setProjects(response.data[language]);
      })
      .catch((error) => {
        console.error("Error 404", error);
      });

    axios
      .get("http://localhost:5000/navBar")
      .then((response) => {
        setNavData(response.data[language]);
      })
      .catch((error) => console.error("Error fetching navbar data:", error));

    axios
      .get("http://localhost:5000/partners")
      .then((response) => {
        setPartners(response.data);
      })
      .catch((error) => {
        console.error("Error 404", error);
      });
  }, [language]);

  return (
    <div className="Home__Page">
      <section className="section1">
        <motion.div
          initial={{
            backgroundSize: "100% 100%",
            backgroundPosition: "center",
          }}
          whileInView={{
            backgroundSize: "110% 110%",
            backgroundPosition: "center top",
          }}
          transition={{ duration: 5, ease: "easeInOut" }}
          className="section1__left"
          viewport={{ once: false, amount: 0.4 }}
        >
          <motion.div
            variants={fadeIn("up", 0.2)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.4 }}
            className="container"
          >
            <motion.p variants={fadeIn("up", 0.3)}>{navData?.ems}</motion.p>
            <motion.h2 variants={fadeIn("up", 0.4)}>
              {navData?.sec1p}
            </motion.h2>
            <motion.button
              variants={fadeIn("up", 0.5)}
              className="btn__enquiry"
            >
              {navData?.sec1BtnEnquiry}
            </motion.button>
          </motion.div>
        </motion.div>
      </section>

      <section className="about__sec1 container">
        <motion.div
          variants={fadeIn("right", 0.1)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.4 }}
          className="about__sec1__img"
        >
          <img src={about?.homeImage} alt="" />
        </motion.div>

        <motion.div
          variants={fadeIn("left", 0.3)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.4 }}
          className="about__sec1__text"
        >
          <motion.h6
            variants={fadeIn("up", 0.4)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.4 }}
          >
            {about?.pageName}
          </motion.h6>
          <motion.h3
            variants={fadeIn("up", 0.4)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.4 }}
          >
            {about?.title}{" "}
          </motion.h3>
          <motion.p
            variants={fadeIn("up", 0.3)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.4 }}
          >
            {about?.description}
          </motion.p>
          <div className="img4__icon">
            <img src={about?.homeLogo} alt="" />
            <img src={about?.homeLogo} alt="" />
            <img src={about?.homeLogo} alt="" />
            <img src={about?.homeLogo} alt="" />
          </div>
          <Link to="/about" className="link__btn">
            <motion.button
              variants={fadeIn("up", 0.5)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.4 }}
              className="btn__see__more"
            >
              {about?.seeMore} <FaAngleRight />
            </motion.button>
          </Link>
        </motion.div>
      </section>

      <section className="projects__sec3">
        <Link to="/projects" className="link__btn">
          <motion.h2
            variants={fadeIn("up", 0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.4 }}
          >
            {navData?.projects}
          </motion.h2>
        </Link>
        <motion.div
          className="container"
          variants={fadeIn("up", 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.4 }}
        >
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
            {projects?.map((project) => (
              <SwiperSlide key={project.id}>
                <motion.div
                  variants={fadeIn("left", 0.3)}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: false, amount: 0.4 }}
                >
                  <Link
                    to={`/project-detail/${project.id}`}
                    className="link__btn"
                  >
                    <ServicesAndProjectsItem data={project} />
                  </Link>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </section>

      <section className="services__sec4">
        <Link to="/services" className="link__btn">
          <motion.h2
            variants={fadeIn("up", 0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.4 }}
          >
            {navData?.services}
          </motion.h2>{" "}
        </Link>
        <motion.div
          className="container"
          variants={fadeIn("up", 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.4 }}
        >
          {" "}
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
            {services?.map((service) => (
              <SwiperSlide key={service.id}>
                <motion.div
                  variants={fadeIn("left", 0.3)}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: false, amount: 0.4 }}
                >
                  <Link
                    to={`/service-detail/${service.id}`}
                    className="link__btn"
                  >
                    <ServicesAndProjectsItem data={service} />
                  </Link>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </section>

      <section className="service__blue">
        <motion.div
          variants={fadeIn("left", 0.2)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.4 }}
          className="container"
        >
          <img src={ServiceImg} alt="ServiceImg" />
          <motion.p
            variants={fadeIn("up", 0.2)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.4 }}
          >
            {navData?.blueSec}
          </motion.p>
          <Link className="link__btn">
            <motion.button
              variants={fadeIn("up", 0.5)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.4 }}
              className="btn__schedule__service"
            >
              {navData?.btnBlueSec} <FaAngleRight />
            </motion.button>
          </Link>
        </motion.div>
      </section>

      <section className="our__partner__sec6">
        <Link to="/contacts" className="link__btn">
          <motion.h2
            variants={fadeIn("up", 0.4)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.4 }}
          >
            {navData?.partners}{" "}
          </motion.h2>
        </Link>
        <div className="partners">
          <Swiper
            spaceBetween={16}
            autoplay={{
              delay: 1000,
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
                slidesPerView: 5,
              },
            }}
            modules={[Autoplay]}
            className="mySwiper"
          >
            {partners.map((partner) => (
              <SwiperSlide key={partner.id} className="partners__list">
                <motion.div
                  variants={fadeIn("left", 0.3)}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: false, amount: 0.4 }}
                >
                  <Link to="/" className="link__btn">
                    <img
                      src={partner.image}
                      alt="partner-logo"
                      className="partner__logo"
                    />
                  </Link>{" "}
                  <br />
                  <Link to="/" className="link__btn">
                    <img
                      src={partner.image}
                      alt="partner-logo"
                      className="partner__logo"
                    />
                  </Link>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      <section className="contact__sec5">
        <GetInTouch />
      </section>
    </div>
  );
};

export default Home;
