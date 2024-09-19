import React from "react";
import { useState, useEffect, useContext } from "react";
import EachPageHead from "../../Components/EachPageHead/EachPageHead";
import ServicesAndProjectsItem from "../../Components/ServicesItem/ServicesAndProjectsItem";
import axios from "axios";
import BgImage from "../../../src/assets/service-head-back-img.png";
import "./Services.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeIn } from "../../Variants";
import { LanguageContext } from "../../Context/LanguageContext";

const Services = () => {
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

  return (
    <div>
      <section className="each__page__head">
        <EachPageHead backgroundImage={BgImage} heading={services.length > 0 ? services[0].pageName : "Services"} />
      </section>

      <section className="services__sec">
        <div className="container">
          <div className="services__container">
            {services.slice(0, 7).map((service) => (
              <motion.div
                variants={fadeIn("up", 0.2)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: false, amount: 0.4 }}
              >
                <Link to={`/service-detail/${service.id}`} key={service.id}>
                  <ServicesAndProjectsItem data={service} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
