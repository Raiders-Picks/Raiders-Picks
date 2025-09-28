import React from "react";
import { useNavigate } from "react-router-dom";
import heroImage from "/raider-hero.png";
import logo from "/raider-logo.png";
import discord from "/discord.svg";
import Button from "./Button";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section
      id="home"
      className="relative w-full min-h-770px] flex items-center text-white overflow-hidden"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      {/* Hero background image with very low opacity for subtle effect */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      {/* Transparent gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-[#0f172a]/80 to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 flex flex-col-reverse lg:flex-row items-center justify-between gap-12 pt-24 sm:pt-50 pb-10 sm:pb-20">
        {/* Left: Text */}
        <div
          className="flex-1 text-center lg:text-left"
          data-aos="fade-right"
          data-aos-duration="1000"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
            Maximize Your <br className="hidden lg:block" />
            Winning Potential
          </h1>
          <p className="mt-6 text-lg sm:text-xl lg:text-2xl xl:text-3xl text-gray-300 max-w-2xl lg:max-w-none mx-auto lg:mx-0">
            Get{" "}
            <span className="text-[#f97316] font-semibold">
              data-driven insights
            </span>
            , expert analysis, and real-time predictions to stay ahead of the
            game.
          </p>

          <div
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            data-aos="zoom-in-up"
            data-aos-delay="200"
          >
            <Button
              variant="secondary"
              onClick={() => {
                window.open("https://discord.gg/ppa2xFmCHr", "_blank");
              }}
            >
              <span className="flex items-center justify-center gap-2">
                <img src={discord} alt="discord logo" width={35} />
                <span>Join Discord</span>
              </span>
            </Button>

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
              <span className="">Get Started</span>
            </Button>
          </div>

          <p
            className="mt-6 text-xs text-gray-400"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            🎯 Trusted by bettors worldwide
          </p>
        </div>

        {/* Right: Logo */}
        <div
          className="flex-1 relative"
          data-aos="fade-left"
          data-aos-duration="1200"
        >
          <div className="w-full max-w-xs sm:max-w-md lg:max-w-lg mx-auto rounded-full shadow-[0_0_40px_rgba(249,115,22,0.5)] border-4 border-[#f97316]/50 p-6">
            <img
              src={logo}
              alt="Raiders Picks Logo"
              className="w-full rounded-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
