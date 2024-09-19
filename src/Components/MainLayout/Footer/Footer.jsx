import React from "react";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./Footer.css";
import { NavLink, Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { motion } from "framer-motion";
import { fadeIn } from "../../../Variants";
import { LanguageContext } from "../../../Context/LanguageContext";

const Footer = () => {
  const location = useLocation();
  const [navData, setNavData] = useState({});

  const isDarkMode = location.pathname !== "/";

  const [services, setServices] = useState([]);
  const { language } = useContext(LanguageContext);

  useEffect(() => {
    axios
      .get("http://localhost:5000/services")
      .then((response) => {
        setServices(response.data[language]);
      })
      .catch((error) => {
        console.error("Error 404", error);
      });
  }, [language]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/navBar")
      .then((response) => {
        setNavData(response.data[language]);
      })
      .catch((error) => console.error("Error fetching navbar data:", error));
  }, [language]);

  return (
    <div>
      <div className={`footer__up ${isDarkMode ? "dark" : "light"}`}>
        <motion.div
          variants={fadeIn("up", 0.1)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.3 }}
          className="container"
        >
          <motion.ul
            variants={fadeIn("up", 0.1)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.4 }}
            className="footer__emscontracting"
          >
            <h5>{navData?.ems}</h5>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "active footer__navlink" : "footer__navlink"
                }
              >
                {navData?.home || "Home"}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive ? "active footer__navlink" : "footer__navlink"
                }
              >
                {navData?.about || "About Us"}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/projects"
                className={({ isActive }) =>
                  isActive ? "active footer__navlink" : "footer__navlink"
                }
              >
                {navData?.projects || "Projects"}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive ? "active footer__navlink" : "footer__navlink"
                }
              >
                {navData?.contact || "Contact Us"}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/Blogs"
                className={({ isActive }) =>
                  isActive ? "active footer__navlink" : "footer__navlink"
                }
              >
                {navData?.blogs || "Blogs"}
              </NavLink>
            </li>
          </motion.ul>

          <ul className="footer__services">
            <h5>{navData?.services}</h5>

            {services?.slice(0, 5).map((service) => (
              <li key={service.id}>
                <NavLink
                  to={`/service-detail/${service.id}`}
                  className={({ isActive }) =>
                    isActive ? "active footer__navlink" : "footer__navlink"
                  }
                >
                  {service.title}
                </NavLink>
              </li>
            ))}
          </ul>

          <ul className="footer__contact">
            <h5>{navData?.contact}</h5>
            <li>
              <Link className="location">
                EMS, Unit 19, City Road, Inner man Street, Switzerland, SR5 2BN
              </Link>
            </li>
            <li>
              <Link className="footer__phone">+91 8630 816230</Link>
            </li>
            <li>
              <Link className="footer__email">parashard641@gmail.com</Link>
            </li>
          </ul>

          <ul className="footer__socialmedia">
            <h5>{navData?.follow}</h5>
            <ul className="socialmedia__list">
              <li>
                <Link to="/" className="socialmedia__icon">
                  <FaFacebook />
                </Link>
              </li>
              <li>
                <Link to="/" className="socialmedia__icon">
                  <FaTwitter />
                </Link>
              </li>
              <li>
                <Link to="/" className="socialmedia__icon">
                  <FaInstagram />
                </Link>
              </li>
              <li>
                <Link to="/" className="socialmedia__icon">
                  <FaYoutube />
                </Link>
              </li>
            </ul>
          </ul>
        </motion.div>
      </div>
      <motion.div
        variants={fadeIn("up", 0.1)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.4 }}
        className="footer__down"
      >
        <p>
          @ 2024, {navData?.footerDownStart} <span>{navData?.footerSpan1}</span>{" "}
          &<span>{navData?.footerSpan2} </span> {navData?.footerDownEnd}
        </p>
      </motion.div>
    </div>
  );
};

export default Footer;
