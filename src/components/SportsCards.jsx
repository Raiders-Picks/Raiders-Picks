import { Expand } from "lucide-react";
import { CardData } from "../data/CardData";

const SportsCards = () => {
  return (
    <section id="about" className="py-28 bg-[#0f172a]/50 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-4 mb-12 justify-center text-center">
          <Expand className="text-[#f97316] w-10 h-10" />
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center  text-white">
            Explore Sports Leagues
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {CardData.map((card, index) => (
            <div
              key={card.id}
              className="flex flex-col items-center justify-center border border-[#f97316]/20 
                         rounded-xl shadow-lg shadow-[#f97316]/10 p-4 sm:p-6 
                         transition-transform transform hover:scale-105 hover:shadow-[#f97316]/30 
                         bg-white/10 backdrop-blur-md"
              data-aos="fade-up"
              data-aos-delay={card.id * 100}
            >
              <div className=" flex items-center justify-center  w-24 h-24 sm:w-28 sm:h-28">
                <img
                  src={card.image}
                  alt={card.title}
                  className={` ${
                    index == 7 ? "rounded-[32px]" : "rounded-lg"
                  } w-full max-h-[100px] object-contain`}
                />
              </div>
              <p className="font-bold text-lg mt-4 text-center text-[#f97316]">
                {card.title}
              </p>
              <p className="text-gray-300 text-sm mt-1 text-center">
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SportsCards;
