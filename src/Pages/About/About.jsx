import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./About.css";
import AboutImg from "../../../src/assets/90cbb105777de2f4dab98747dd3aa1a7.jfif";
import EachPageHead from "../../Components/EachPageHead/EachPageHead";
import { motion } from "framer-motion";
import { fadeIn } from "../../Variants";
import { LanguageContext } from "../../Context/LanguageContext";

const About = () => {
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
  }, [language]);

  // console.log(about);

  return (
    <div>
      <section className="each__page__head">
        <EachPageHead
          backgroundImage={about?.bgImage}
          heading={about?.pageName}
        />
      </section>
      <div className="container">
        {about && (
          <section className="about__middle">
            <motion.div
              variants={fadeIn("right", 0.2)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.5 }}
              className="about__img"
            >
              <img src={AboutImg} alt="About EMS Contracting" />
            </motion.div>
            <motion.div
              variants={fadeIn("left", 0.4)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.5 }}
              className="about__text"
            >
              <motion.h6 variants={fadeIn("up", 0.4)}>
                {about.pageName}
              </motion.h6>
              <motion.h3 variants={fadeIn("up", 0.4)}>{about?.title}</motion.h3>
              <motion.p variants={fadeIn("up", 0.3)}>
                {about?.description}
              </motion.p>
            </motion.div>
          </section>
        )}
        {about && (
          <section className="about__values">
            <motion.h4 variants={fadeIn("up", 0.4)}>
              {about?.valuesTitle}
            </motion.h4>
            <div className="about__values__container">
              {about?.values?.map((value) => (
                <motion.div
                  variants={fadeIn("up", 0.2)}
                  initial="hidden"
                  whileInView={"show"}
                  viewport={{ once: false, amount: 0.5 }}
                  className="about__value1"
                  key={value.value}
                >
                  <div className="about__values__head">
                    <motion.h6 variants={fadeIn("up", 0.4)}>
                      {value.value}
                    </motion.h6>
                    <motion.img
                      variants={fadeIn("up", 0.3)}
                      src={value.image}
                      alt={value.value}
                    />
                  </div>
                  <motion.p variants={fadeIn("up", 0.3)}>
                    {value.description}
                  </motion.p>
                </motion.div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default About;
