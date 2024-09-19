import React from "react";
import "./ServicesAndProjectsItem.css";
import { FaAngleRight } from "react-icons/fa";

const ServicesAndProjectsItem = ({ data}) => {
  return (
    <>
      <div className="pro__serv__item">
        <div className="img__header">
          <img src={data?.image} alt="ServicesItem" />
          <h6> {data?.title} </h6>
        </div>
        <button className="btn__book__now">
          {data?.button} <FaAngleRight />
        </button>
      </div>
    </>
  );
};

export default ServicesAndProjectsItem;
