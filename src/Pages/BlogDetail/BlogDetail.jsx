import React from "react";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./BlogDetail.css";
import { Link, useParams } from "react-router-dom";
import EachPageHead from "../../Components/EachPageHead/EachPageHead";
import BgImage from "../../assets/service-head-back-img.png";
import { FaAngleRight } from "react-icons/fa";
import Hammers from "../../assets/hammer.png";
import { motion } from "framer-motion";
import { fadeIn } from "../../Variants";
import { LanguageContext } from "../../Context/LanguageContext";

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [blogsList, setBlogsList] = useState([]);
  const { language } = useContext(LanguageContext);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/blogs`)
      .then((response) => {
        const blogsData = response.data[language];
        setBlogsList(blogsData);

        const currentBlog = blogsData.find((blg) => blg.id === id);
        setBlog(currentBlog);
      })
      .catch((error) => {
        console.error("Error fetching projects", error);
      });
  }, [id, language]);

  if (!blog) {
    return <div>not blog data </div>;
  }

  return (
    <div>
      <section className="each__page__head">
        <EachPageHead backgroundImage={BgImage} heading={blog.title} />
      </section>
      <div className="blog__detail">
        <div className="container">
          <aside className="blog__detail__left">
            {/* <h2>Others Blogs</h2> */}
            <ul className="list__of__blog__detail">
              {blogsList?.slice(0, 3).map((listofblog) => (
                <motion.li
                  variants={fadeIn("left", 0.1)}
                  initial="hidden"
                  whileInView={"show"}
                  viewport={{ once: false, amount: 0.4 }}
                  key={listofblog.id}
                >
                  <Link
                    to={`/blog-detail/${listofblog.id}`}
                    className="links__of__blog1__detail"
                  >
                    <img src={listofblog?.image} alt="" />
                    <p>
                      {listofblog?.title}
                      <FaAngleRight />{" "}
                    </p>
                  </Link>
                </motion.li>
              ))}
            </ul>

            <div className="enquiry__sec">
              <img src={Hammers} alt="hammers" className="hammers" />
              <div className="enquiry">
                <motion.h6
                  variants={fadeIn("left", 0.4)}
                  initial="hidden"
                  whileInView={"show"}
                  viewport={{ once: false, amount: 0.4 }}
                >
                  {blog.needHelp}{" "}
                </motion.h6>
                <motion.p
                  variants={fadeIn("left", 0.3)}
                  initial="hidden"
                  whileInView={"show"}
                  viewport={{ once: false, amount: 0.4 }}
                >
                  {blog.helpParagraph}{" "}
                </motion.p>
                <Link to="/" className="link__btn">
                  <motion.button
                    variants={fadeIn("left", 0.5)}
                    initial="hidden"
                    whileInView={"show"}
                    viewport={{ once: false, amount: 0.4 }}
                    className="btn__detail__enquiry"
                  >
                    {blog.btnEnquiry} <FaAngleRight />
                  </motion.button>
                </Link>
              </div>
            </div>
          </aside>
          <section className="blog__detail__sec">
            <motion.div
              variants={fadeIn("up", 0.1, 1)}
              initial="hidden"
              animate="show"
              className="detail__img"
              viewport={{ once: false, amount: 0.4 }}
            >
              <img src={blog?.image} alt="" />
            </motion.div>
            <motion.div variants={fadeIn("up", 0.2)} className="detail__text">
              <motion.h2
                variants={fadeIn("up", 0.1)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: false, amount: 0.4 }}
              >
                {blog?.title}
              </motion.h2>
              <motion.p
                variants={fadeIn("up", 0.3, 1)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: false, amount: 0.4 }}
              >
                {blog?.description}
              </motion.p>
              {blog.details?.electrical && (
                <motion.div variants={fadeIn("up", 0.3)}>
                  <motion.h5
                    variants={fadeIn("up", 0.1)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: false, amount: 0.4 }}
                  >
                    {blog.electricalTitle}
                  </motion.h5>
                  <ul>
                    {blog.details.electrical.map((detail, id) => (
                      <motion.li
                        variants={fadeIn("up", 0.4)}
                        initial="hidden"
                        whileInView={"show"}
                        viewport={{ once: false, amount: 0.5 }}
                        key={id}
                      >
                        {detail}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {blog.details?.mechanical && (
                <>
                  <motion.h5
                    variants={fadeIn("up", 0.1)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: false, amount: 0.4 }}
                  >
                    {blog.mechanicalTitle}
                  </motion.h5>
                  <ul>
                    {blog.details.mechanical.map((detail, id) => (
                      <motion.li
                        variants={fadeIn("right", 0.1)}
                        initial="hidden"
                        whileInView={"show"}
                        viewport={{ once: false, amount: 0.5 }}
                        key={id}
                      >
                        {detail}
                      </motion.li>
                    ))}
                  </ul>
                </>
              )}
            </motion.div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
