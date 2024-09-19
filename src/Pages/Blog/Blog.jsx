import React from "react";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import EachPageHead from "../../Components/EachPageHead/EachPageHead";
import ServicesAndProjectsItem from "../../Components/ServicesItem/ServicesAndProjectsItem";
import BgImage from "../../assets/service-head-back-img.png";
import "./Blog.css"; 
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeIn } from "../../Variants";
import { LanguageContext } from "../../Context/LanguageContext";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);

  const { language } = useContext(LanguageContext);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/blogs`)
      .then((response) => {
        setBlogs(response.data[language]);
      })
      .catch((error) => {
        console.error("Error", error);
      });
  }, [language]);

  return (
    <div>
      <section className="each__page__head">
        <EachPageHead backgroundImage={BgImage} heading={blogs.length > 0 ? blogs[0].pageName : "Blogs"} />
      </section>

      <section className="blogs__sec">
        <div className="container">
          <div className="blogs__container">
            {blogs.slice(0, 6).map((blog) => (
              <motion.div
                variants={fadeIn("up", 0.2)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: false, amount: 0.4 }}
              >
                <Link to={`/blog-detail/${blog.id}`} key={blog.id}>
                  <ServicesAndProjectsItem data={blog} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
