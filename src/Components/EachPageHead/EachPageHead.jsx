import React from "react";
import { motion } from "framer-motion";
import "./EachPageHead.css";
import { fadeIn, staggeredFadeIn } from "../../Variants"; 

const EachPageHead = ({ backgroundImage, heading }) => {
  return (
    <motion.section
      className="each__page__head"
      style={{ backgroundImage: `url(${backgroundImage})` }}
      variants={fadeIn("up", 0.3)} 
      initial="hidden"
      animate="show"
    >
      <motion.div
        className="each__page__head__title"
        variants={staggeredFadeIn} 
        initial="hidden"
        animate="show"
      >
        <motion.h2 variants={fadeIn("up", 0.5)}>{heading}</motion.h2>
      </motion.div>
    </motion.section>
  );
};

export default EachPageHead;
