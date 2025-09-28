import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
import { links } from "../data/NavData";
import logo from "/raider-logo.png";
import Footer from "../components/Footer";
import BackgroundLayer from "../components/BackgroundLayer";
import SportsCards from "../components/SportsCards";
import StatsCounter from "../components/StatsCounter";
import TrustedSports from "../components/TrustedSports";
import Premium from "../components/Premium";
import Testimonial from "../components/Testimonial";
import TestimonialMobile from "../components/TestimonialMobile";
import TestimonialTab from "../components/TestimonialTab";
import ContactSection from "../components/Contact";
import { ArrowUp } from "lucide-react";

function Home() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScrollButton = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScrollButton);
    return () => window.removeEventListener("scroll", handleScrollButton);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      const section = document.getElementById(location.state.scrollTo);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);
  return (
    <div className="relative">
      <BackgroundLayer />
      <NavBar logo={logo} links={links} />
      <Hero />
      <SportsCards />
      <StatsCounter />
      <TrustedSports />
      <Premium />
      <div className="hidden md:hidden lg:block">
        <Testimonial />
      </div>
      <div className="hidden sm:block lg:hidden">
        <TestimonialTab />
      </div>
      <div className="sm:hidden">
        <TestimonialMobile />
      </div>
      <ContactSection />

      <Footer />

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-[#f97316] hover:bg-[#d27533] text-white p-3 rounded-full shadow-lg hover:scale-110 duration-300 z-50 transition animate-breathe"
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} />
        </button>
      )}
    </div>
  );
}

export default Home;
