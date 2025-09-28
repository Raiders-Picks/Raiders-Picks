import { useEffect } from "react";
import PremiumServicesData from "../data/PremiumData";
import AOS from "aos";
import "aos/dist/aos.css";
import { CheckCircle } from "lucide-react";

const Premium = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section
      id="premium"
      className="flex flex-col items-center justify-center w-full px-4 py-28 bg-black"
      aria-labelledby="premium-services-title"
    >
      <div className="w-full max-w-6xl">
        {/* Section Title */}
        <div
          className="flex flex-col lg:flex-row items-center gap-2 mb-12"
          id="premium-services-title"
        >
          <CheckCircle className="text-white w-10 h-10" />
          <h1 className="text-3xl sm:text-4xl font-poppins font-black text-[#f97316] text-center">
            Why Choose Raider Picks ?
          </h1>
        </div>

        {/* Grid of Services */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          data-aos="fade-up"
        >
          {PremiumServicesData.map((service, index) => (
            <article
              key={service.id}
              data-aos="zoom-in"
              data-aos-delay={index * 100}
              className="relative bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 hover:border-[#f97316] transition-all duration-500 hover:scale-105 p-6 text-center flex flex-col items-center group"
            >
              <div className="w-24 h-24 flex items-center justify-center rounded-full bg-gradient-to-br from-[#f97316]/20 to-transparent mb-4 transition-transform group-hover:scale-110">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-14 h-14 object-contain drop-shadow-md"
                />
              </div>

              <h2 className="font-poppins font-bold text-lg sm:text-xl text-white transition-colors group-hover:text-[#f97316]">
                {service.title}
              </h2>

              <p className="font-inter text-sm sm:text-base text-gray-300 mt-3">
                {service.desc}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Premium;
