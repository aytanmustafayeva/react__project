import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import "./ProjectDetail.css";
import EachPageHead from "../../Components/EachPageHead/EachPageHead";
import BgImage from "../../../src/assets/service-head-back-img.png";
import { motion } from "framer-motion";
import { fadeIn } from "../../Variants";
import { LanguageContext } from "../../Context/LanguageContext";

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [projects, setProjects] = useState([]);
  const { language } = useContext(LanguageContext);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/projects`)
      .then((response) => {
        const projectsData = response.data[language];
        setProjects(projectsData);

        const currentProject = projectsData.find((proj) => proj.id === id);
        setProject(currentProject);
      })
      .catch((error) => {
        console.error("Error fetching projects", error);
      });
  }, [id, language]);

  if (!project || projects.length === 0) {
    return <div>Loading project data...</div>;
  }

  const currentIndex = projects.findIndex((proj) => proj.id === id);

  const prev = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const next =
    currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  const handlePrevious = () => {
    if (prev) {
      navigate(`/project-detail/${prev.id}`);
    }
  };

  const handleNext = () => {
    if (next) {
      navigate(`/project-detail/${next.id}`);
    }
  };

  return (
    <div>
      <section className="each__page__head">
        <EachPageHead backgroundImage={BgImage} heading={project.title} />
      </section>
      <section className="pro__detail__sec">
        <div className="container">
          <div className="pro__detail__up">
            <motion.img
              variants={fadeIn("up", 0.1, 1)}
              initial="hidden"
              animate="show"
              className="detail__img"
              viewport={{ once: false, amount: 0.4 }}
              src={project?.image}
              alt="Projects-Img"
            />
            <div className="detail__date">
              <ul>
                <motion.li
                  variants={fadeIn("left", 0.1)}
                  initial="hidden"
                  whileInView={"show"}
                  viewport={{ once: false, amount: 0.4 }}
                >
                  <strong>{project.dateName}:</strong> {project?.date}
                </motion.li>
                <motion.li
                  variants={fadeIn("left", 0.1)}
                  initial="hidden"
                  whileInView={"show"}
                  viewport={{ once: false, amount: 0.4 }}
                >
                  <strong>{project.clientName}:</strong> {project?.client}
                </motion.li>
                <motion.li
                  variants={fadeIn("left", 0.1)}
                  initial="hidden"
                  whileInView={"show"}
                  viewport={{ once: false, amount: 0.4 }}
                >
                  <strong>{project.locationName}:</strong> {project?.location}
                </motion.li>
                <motion.li
                  variants={fadeIn("left", 0.1)}
                  initial="hidden"
                  whileInView={"show"}
                  viewport={{ once: false, amount: 0.4 }}
                >
                  <strong>{project.categoryName}:</strong> {project?.category}
                </motion.li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="pro__detail__text">
        <div className="container">
          <motion.h4
            variants={fadeIn("up", 0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.4 }}
          >
            {project?.title}
          </motion.h4>
          <motion.p
            variants={fadeIn("up", 0.3)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.4 }}
          >
            {project?.description}
          </motion.p>
          <div className="prev__next">
            <motion.button
              variants={fadeIn("left", 0.5)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.4 }}
              className="btn__prev__next prev"
              onClick={handlePrevious}
              disabled={!prev}
            >
              {project.btnPrev} {prev && <h6>{prev.title}</h6>}
            </motion.button>

            <motion.button
              variants={fadeIn("right", 0.5)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.4 }}
              className="btn__prev__next next"
              onClick={handleNext}
              disabled={!next}
            >
              <p>{project.btnNext}</p> {next && <h6>{next.title}</h6>}
            </motion.button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetail;
