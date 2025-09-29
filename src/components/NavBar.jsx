"use client";

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Trophy } from "lucide-react";
import Button from "./Button";

const Navbar = ({ logo, links }) => {
  const [navScrolled, setNavScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setNavScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigateOrScroll = (link) => {
    const sectionPages = {
      home: "/",
      about: "/",
      premium: "/",
      contact: "/",
      packages: "/subscription",
    };

    const targetPage = sectionPages[link];

    if (window.location.pathname === targetPage) {
      // On the right page → scroll if section exists
      const section = document.getElementById(link);
      if (section) section.scrollIntoView({ behavior: "smooth" });
    } else {
      // Navigate to the target page and pass scroll state
      navigate(targetPage, { state: { scrollTo: link } });
    }

    setIsMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          navScrolled
            ? "bg-white shadow-md text-gray-900"
            : "bg-black/40 backdrop-blur-sm text-white"
        }`}
        data-aos="fade-down"
      >
        <div className="flex items-center justify-between max-w-[1440px] mx-auto px-6 py-4">
          {/* Logo */}
          <div
            onClick={() => {
              if (window.location.pathname === "/") {
                // Already on home → scroll to top
                window.scrollTo({ top: 0, behavior: "smooth" });
              } else {
                // Navigate to home
                navigate("/", { state: { scrollTo: "home" } });
              }
            }}
            className="flex items-center gap-3 cursor-pointer"
          >
            <img
              src={logo}
              alt="Raiders Picks"
              className="w-[55px] md:w-[70px] rounded-full"
            />
            <span
              style={{ fontFamily: "AgencyFB" }}
              className="text-xl md:text-2xl font-extrabold tracking-wide text-[#f97316]"
            >
              Raiders Picks
            </span>
          </div>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex gap-8 text-sm md:text-base font-medium">
            {links.map((link, index) => (
              <li key={index}>
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleNavigateOrScroll(link.link)}
                  className="flex items-center gap-2 hover:text-[#f97316] transition cursor-pointer"
                >
                  {link.icon}
                  {link.name}
                </motion.button>
              </li>
            ))}
          </ul>

          {/* CTA + Mobile Toggle */}
          <div className="hidden lg:flex items-center gap-4">
            <Button
              variant="primary"
              onClick={() => {
                if (window.location.pathname === "/subscription") {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                } else {
                  navigate("/subscription", {
                    state: { scrollTo: "packages" },
                  });
                }
              }}
            >
              <span className="flex gap-2 items-center">
                <Trophy />
                <span className="!text-sm">SUBSCRIBE NOW</span>
              </span>
            </Button>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`lg:hidden focus:outline-none ${
              navScrolled ? "text-gray-800" : "text-white"
            }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-7 w-7" />
            ) : (
              <Menu className="h-7 w-7" />
            )}
          </motion.button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-20 left-0 w-full bg-white rounded-b-lg shadow-xl lg:hidden z-40"
          >
            <ul className="flex flex-col py-2">
              {links.map((link, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.08 }}
                >
                  <button
                    onClick={() => handleNavigateOrScroll(link.link)}
                    className="w-full text-left px-6 py-3 flex items-center gap-3 text-gray-900 hover:bg-gray-100 hover:text-[#f97316] transition cursor-pointer"
                  >
                    {link.icon}
                    <span>{link.name}</span>
                  </button>
                </motion.li>
              ))}
              <li className="border-t border-gray-200 pt-2 ml-4">
                <Button
                  variant="primary"
                  onClick={() => {
                    if (window.location.pathname === "/subscription") {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    } else {
                      navigate("/subscription", {
                        state: { scrollTo: "packages" },
                      });
                    }
                  }}
                >
                  <span className="flex gap-2 items-center">
                    <Trophy />
                    <span className="!text-sm">SUBSCRIBE NOW</span>
                  </span>
                </Button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
