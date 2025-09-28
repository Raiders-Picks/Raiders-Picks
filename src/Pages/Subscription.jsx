import React, { useEffect } from "react";
import NavBar from "../components/NavBar";
import { links } from "../data/NavData";
import logo from "/raider-logo.png";
import BackgroundLayer from "../components/BackgroundLayer";
import Packages from "../components/Packages";
import Footer from "../components/Footer";
import { useLocation } from "react-router-dom";

function Subscription() {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      const scrollToSection = () => {
        const section = document.getElementById(location.state.scrollTo);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        } else {
          // If the section isn't ready yet, trying again after a short delay
          setTimeout(scrollToSection, 50);
        }
      };
      scrollToSection();
    }
  }, [location]);

  return (
    <div className="relative">
      <BackgroundLayer />
      <NavBar logo={logo} links={links} />
      <Packages />
      <Footer />
    </div>
  );
}

export default Subscription;
