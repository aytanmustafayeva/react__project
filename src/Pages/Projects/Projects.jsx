import React from "react";
import { useState, useEffect, useContext } from "react";
import "./Projects.css";
import EachPageHead from "../../Components/EachPageHead/EachPageHead";
import ServicesAndProjectsItem from "../../Components/ServicesItem/ServicesAndProjectsItem";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeIn } from "../../Variants";
import bgImage from "../../../src/assets/service-head-back-img.png";
import { LanguageContext } from "../../Context/LanguageContext";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const { language } = useContext(LanguageContext);

  useEffect(() => {
    axios
      .get("http://localhost:5000/projects")
      .then((response) => {
        setProjects(response.data[language]);
      })
      .catch((error) => {
        console.error("Error 404", error);
      });
  }, [language]);

  return (
    <div>
      <section className="each__page__head">
        <EachPageHead backgroundImage={bgImage} heading={projects.length > 0 ? projects[0].pageName : "Projects"} />
      </section>
      <section className="projects__sec">
        <div className="container">
          <div className="projects__container">
            {projects.map((project) => (
              <motion.div
                variants={fadeIn("up", 0.2)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: false, amount: 0.4 }}
              >
                <Link to={`/project-detail/${project.id}`} key={project.id}>
                  <ServicesAndProjectsItem data={project} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;
