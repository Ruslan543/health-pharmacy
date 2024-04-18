import { useEffect } from "react";
import AboutSection from "../components/about/AboutSection";

function About() {
  useEffect(function () {
    document.title = "HEALTH pharmacy | О нас";
  }, []);

  return <AboutSection />;
}

export default About;
