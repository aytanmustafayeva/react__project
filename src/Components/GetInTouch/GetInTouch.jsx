import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./GetInTouch.css";
import PhoneIcon from "../../assets/phone-call.png";
import FaxIcon from "../../assets/fax.png";
import EmailIcon from "../../assets/email.png";
import { motion } from "framer-motion";
import { fadeIn } from "../../Variants";
import { LanguageContext } from "../../Context/LanguageContext";
import { nav } from "framer-motion/client";

const GetInTouch = () => {
  const [contactForm, setContactForm] = useState({});
  const [navData, setNavData] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    findUs: "",
  });

  const [errors, setErrors] = useState({});
  const { language } = useContext(LanguageContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    let formErrors = {};

    if (!formData.name) formErrors.name = "Name is required";
    if (!formData.email) {
      formErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      formErrors.email = "Invalid email format";
    }
    if (!formData.phone) formErrors.phone = "Phone number is required";
    if (!formData.findUs) formErrors.findUs = "Please select an option";

    return formErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      console.log("Form submitted", formData);
    } else {
      setErrors(formErrors);
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/contact")
      .then((response) => {
        setContactForm(response.data[language]);
      })
      .catch((error) =>
        console.error("Error fetching contact form data:", error)
      );

    axios
      .get("http://localhost:5000/navBar")
      .then((response) => {
        setNavData(response.data[language]);
      })
      .catch((error) => console.error("Error fetching navbar data:", error));
  }, [language]);

  return (
    <div className="getintouch__backcolor">
      <div className="getintouch__map container">
        <motion.div
          variants={fadeIn("right", 0.1)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.4 }}
          className="get__in__touch"
        >
          <motion.h4 variants={fadeIn("up", 0.4)}>
            {navData?.getIn} <span>{navData?.touch}</span>
          </motion.h4>
          <motion.p variants={fadeIn("up", 0.3)}>{navData?.pForm}</motion.p>

          <motion.form
            variants={fadeIn("left", 0.3)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.4 }}
            className="form"
            onSubmit={handleSubmit}
          >
            <motion.input
              variants={fadeIn("up", 0.3)}
              type="text"
              name="name"
              placeholder={navData?.nameForm}
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <span className="error">{errors.name}</span>}

            <motion.input
              variants={fadeIn("up", 0.3)}
              type="email"
              name="email"
              placeholder={navData?.emailForm}
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <span className="error">{errors.email}</span>}

            <motion.input
              variants={fadeIn("up", 0.3)}
              type="tel"
              name="phone"
              placeholder={navData?.phoneForm}
              value={formData.phone}
              onChange={handleChange}
            />
            {errors.phone && <span className="error">{errors.phone}</span>}

            <motion.select
              name="findUs"
              variants={fadeIn("up", 0.3)}
              value={formData.findUs}
              onChange={handleChange}
            >
              <option value="">{navData?.selectContact}</option>
              <option value="Social Media">{navData?.optionContact}</option>
              <option value="Friend">{navData?.optionContact}</option>
              <option value="Advertisement">{navData?.optionContact}</option>
            </motion.select>
            {errors.findUs && <span className="error">{errors.findUs}</span>}

            <motion.button
              variants={fadeIn("up", 0.5)}
              className="btn__send"
              type="submit"
            >
              {navData?.btnForm || "Send"}
            </motion.button>
          </motion.form>

          <motion.div
            variants={fadeIn("left", 0.3)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.4 }}
            className="tel__fax__email"
          >
            <div className="phone">
              <img src={PhoneIcon} alt="Phone" />
              <div className="contact__icon__text">
                <motion.h6 variants={fadeIn("up", 0.4)}>
                  {navData?.phoneForm}
                </motion.h6>
                <Link className="contact__link link__btn">03 5432 1234</Link>
              </div>
            </div>
            <div className="fax">
              <img src={FaxIcon} alt="Fax" />
              <div className="contact__icon__text">
                <motion.h6 variants={fadeIn("up", 0.4)}>
                  {navData?.fax}
                </motion.h6>
                <Link className="contact__link link__btn">03 5432 1234</Link>
              </div>
            </div>
            <div className="email">
              <img src={EmailIcon} alt="Email" />
              <div className="contact__icon__text">
                <motion.h6 variants={fadeIn("up", 0.4)}>
                  {navData?.emailForm}
                </motion.h6>
                <Link
                  className="contact__link link__btn"
                  to="/info@marcc.com.au"
                >
                  info@marcc.com.au
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          variants={fadeIn("left", 0.1)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.4 }}
          className="map"
        >
          <iframe
            width="100%"
            height="580"
            src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Azerbaijan%20Baku+(My%20Baku)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
            title="Google Maps"
          ></iframe>
        </motion.div>
      </div>
    </div>
  );
};

export default GetInTouch;
