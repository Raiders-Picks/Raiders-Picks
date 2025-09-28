import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { Star, RefreshCw, ChevronLeft, ChevronRight } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { initialTestimonials } from "../data/TestimonyData";

const Testimonial = () => {
  const [testimonials, setTestimonials] = useState(initialTestimonials);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const shuffleTestimonials = () => {
    setTestimonials([...testimonials].sort(() => Math.random() - 0.5));
  };

  const NextArrow = ({ onClick }) => (
    <div
      className="absolute top-1/2 -right-4 transform -translate-y-1/2 z-10 cursor-pointer text-[#f97316] hover:text-[#bf0050] hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition"
      onClick={onClick}
    >
      <ChevronRight size={24} />
    </div>
  );

  const PrevArrow = ({ onClick }) => (
    <div
      className="absolute top-1/2 -left-4 transform -translate-y-1/2 z-10 cursor-pointer text-[#f97316] hover:text-[#bf0050] hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition"
      onClick={onClick}
    >
      <ChevronLeft size={24} />
    </div>
  );

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 768, settings: { slidesToShow: 1 } }, // small
      { breakpoint: 1024, settings: { slidesToShow: 2 } }, // medium
      { breakpoint: 1280, settings: { slidesToShow: 3 } }, // large
    ],
  };

  return (
    <section
      id="testimonials"
      className="py-16 md:py-24 bg-[#0f172a]"
      data-aos="fade-up"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#f97316] flex items-center gap-3">
            <Star className="w-7 h-7 text-white" />
            What Our Members Say
          </h2>
          <button
            onClick={shuffleTestimonials}
            className="flex items-center gap-2 bg-gradient-to-r from-[#f97316] to-[#bf0050] text-white px-4 py-2 rounded-lg text-sm sm:text-base font-mono font-medium transition hover:opacity-90 shadow-md shadow-[#f97316]/40"
          >
            <RefreshCw size={18} />
            Refresh
          </button>
        </div>

        {/* Carousel */}
        <Slider {...settings}>
          {testimonials.map((t, idx) => (
            <div key={idx} className="px-3">
              <Card t={t} />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

const Card = ({ t }) => (
  <div className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-[#f97316]/20 hover:border-[#f97316] hover:shadow-lg hover:shadow-[#f97316]/30 transition-all duration-500 h-full">
    <div className="flex mb-3 text-[#f97316]">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={18}
          fill="#FFD700"
          stroke="#FFD700"
          className="mr-1"
        />
      ))}
    </div>
    <p className="text-[#f97316] italic mb-4 font-mono leading-relaxed text-sm sm:text-base">
      "{t.text}"
    </p>
    <p className="text-white font-serif font-semibold text-sm sm:text-base">
      {t.name}
    </p>
    <p className="text-gray-400 text-xs sm:text-sm">{t.location}</p>
  </div>
);

export default Testimonial;
