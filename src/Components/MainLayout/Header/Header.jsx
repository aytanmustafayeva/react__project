import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";
import { FaBars, FaFacebook, FaInstagram } from "react-icons/fa";
import { motion } from "framer-motion";
import { fadeIn } from "../../../Variants";
import { LanguageContext } from "../../../Context/LanguageContext";
import "./Header.css";
import { useLocation } from "react-router-dom";
import Search from "../../../assets/search_black.svg";
import Logo from "../../../assets/710f06b7be7c86841477d36b0a51c066.png";

const Header = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [navData, setNavData] = useState({});
  const [input, setInput] = useState("");
  const [projectsTitle, setProjectsTitle] = useState([]);
  const [servicesTitle, setServicesTitle] = useState([]);
  const [blogsTitle, setBlogsTitle] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [filteredServResults, setFilteredServResults] = useState([]);
  const [filteredBlogResults, setFilteredBlogResults] = useState([]);

  const { language, changeLanguage } = useContext(LanguageContext);

  console.log(filteredResults);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleLanguageChange = (event) => {
    changeLanguage(event.target.value);
  };

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setInput(term);

    const results = projectsTitle.filter((item) =>
      item.title.toLowerCase().includes(term)
    );
    const Servresults = servicesTitle.filter((serv) =>
      serv.title.toLowerCase().includes(term)
    );
    const Blogresults = blogsTitle.filter((blg) =>
      blg.title.toLowerCase().includes(term)
    );

    setFilteredResults(results);
    setFilteredServResults(Servresults);
    setFilteredBlogResults(Blogresults);
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/projects")
      .then((response) => {
        setProjectsTitle(response.data[language]);
      })
      .catch((error) => console.error("Error", error));
    axios
      .get("http://localhost:5000/services")
      .then((response) => {
        setServicesTitle(response.data[language]);
      })
      .catch((error) => console.error("Error", error));
    axios
      .get("http://localhost:5000/blogs")
      .then((response) => {
        setBlogsTitle(response.data[language]);
      })
      .catch((error) => console.error("Error", error));
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
      {location.pathname === "/" && (
        <motion.div
          variants={fadeIn("right", 0.1)}
          initial="hidden"
          whileInView="show"
          className="header__up container"
        >
          <Link className="logo" to="/">
            <img src={Logo} alt="Logo" />
          </Link>
          <motion.div
            variants={fadeIn("left", 0.3)}
            initial="hidden"
            whileInView="show"
            className="whitebox_icon"
          >
            <NavLink className="navlink__icon">
              <FaFacebook />
            </NavLink>
            <NavLink className="navlink__icon">
              <FaInstagram />
            </NavLink>
            <select
              className="lang__select"
              value={language}
              onChange={handleLanguageChange}
            >
              <option value="Eng">{navData?.engLang}</option>
              <option value="Rus">{navData?.rusLang}</option>
              <option value="Az">{navData?.azLang}</option>
            </select>
          </motion.div>
          <div className="menu__icon" onClick={toggleMenu}>
            <FaBars />
          </div>
        </motion.div>
      )}
      <div
        className={`header__down ${
          location.pathname !== "/" ? "light" : "dark"
        } ${menuOpen ? "column" : "row"}`}
      >
        <div className="container">
          {location.pathname !== "/" && (
            <motion.div
              variants={fadeIn("right", 0.1)}
              initial="hidden"
              whileInView="show"
              className="logo__menu__icon"
            >
              <Link className="logo" to="/">
                <img src={Logo} alt="Logo" />
              </Link>
              <div className="menu__icon" onClick={toggleMenu}>
                <FaBars />
              </div>
            </motion.div>
          )}
          <nav className={`nav ${menuOpen ? "open" : "close"}`}>
            <motion.ul
              variants={fadeIn("up", 0.2)}
              initial="hidden"
              whileInView="show"
              className="list__of__navlink"
            >
              <li>
                <NavLink
                  to="/services"
                  className={({ isActive }) =>
                    isActive ? "active navlink" : "navlink"
                  }
                >
                  {navData?.services || "Services"}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/projects"
                  className={({ isActive }) =>
                    isActive ? "active navlink" : "navlink"
                  }
                >
                  {navData?.projects || "Projects"}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    isActive ? "active navlink" : "navlink"
                  }
                >
                  {navData?.contact || "Contact Us"}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    isActive ? "active navlink" : "navlink"
                  }
                >
                  {navData?.about || "About Us"}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/blogs"
                  className={({ isActive }) =>
                    isActive ? "active navlink" : "navlink"
                  }
                >
                  {navData?.blogs || "Blogs"}
                </NavLink>
              </li>
            </motion.ul>

            {/* <motion.form variants={fadeIn("up", 0.2)} className="search__form">
              <div className="search_input_container">
                <img className="search-icon" src={Search} alt="Search" />
                <input
                  type="search"
                  placeholder={navData?.searchPlaceholder || "Search"}
                  value={input}
                  onChange={(e) => handleChange(e.target.value)}
                />
              </div>
            </motion.form> */}

            <motion.form variants={fadeIn("up", 0.2)} className="search__form">
              <div className="search_input_container">
                <img className="search-icon" src={Search} alt="Search" />
                <input
                  type="search"
                  placeholder={navData?.searchPlaceholder || "Search"}
                  value={input}
                  onChange={handleSearch}
                />
              </div>
              {input && (
                <ul className="search-results">
                  {filteredResults?.map((result) => (
                    <li key={result.id}>
                      <Link
                        className="search__results__list"
                        to={`/project-detail/${result.id}`}
                        // onClick={toggleMenu}
                      >
                        {result.title}
                      </Link>
                    </li>
                  ))}
                  {filteredServResults?.map((Servresults) => (
                    <li key={Servresults.id}>
                      <Link
                        className="search__results__list"
                        to={`/service-detail/${Servresults.id}`}
                        // onClick={toggleMenu}
                      >
                        {Servresults.title}
                      </Link>
                    </li>
                  ))}
                  {filteredBlogResults?.map((Blogresults) => (
                    <li key={Blogresults.id}>
                      <Link
                        className="search__results__list"
                        to={`/blog-detail/${Blogresults.id}`}
                        // onClick={toggleMenu}
                      >
                        {Blogresults.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </motion.form>

            <select
              className="lang__select"
              value={language}
              onChange={handleLanguageChange}
            >
              <option value="Eng" onClick={toggleMenu}>
                {navData?.engLang}
              </option>
              <option value="Rus" onClick={toggleMenu}>
                {navData?.rusLang}{" "}
              </option>
              <option value="Az" onClick={toggleMenu}>
                {navData?.azLang}{" "}
              </option>
            </select>
          </nav>

          {menuOpen && (
            <div className="nav_whitebox_icon">
              <NavLink className="navlink__icon">
                <FaFacebook />
              </NavLink>
              <NavLink className="navlink__icon">
                <FaInstagram />
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
