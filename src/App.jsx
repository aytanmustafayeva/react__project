import "./App.css";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./Components/MainLayout/MainLayout";
import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import Projects from "./Pages/Projects/Projects";
import ProjectDetail from "./Pages/ProjectDetail/ProjectDetail";
import Services from "./Pages/Services/Services";
import ServiceDetail from "./Pages/ServiceDetail/ServiceDetail";
import Contact from "./Pages/Contact/Contact";
import Blog from "./Pages/Blog/Blog";
import BlogDetail from "./Pages/BlogDetail/BlogDetail";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/project-detail/:id" element={<ProjectDetail />} />
          <Route path="/services" element={<Services />} />
          <Route path="/service-detail/:id" element={<ServiceDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blogs" element={<Blog />} />
          <Route path="/blog-detail/:id" element={<BlogDetail />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
