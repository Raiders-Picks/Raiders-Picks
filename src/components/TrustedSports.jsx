import React, { useState } from "react";
import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import fanDuel from "/fanduel.jpeg";
import prizePicks from "/prizepicks.jpeg";
import fanatics from "/fanatics.jpeg";
import bet365 from "/bet365.png";
import draftKings from "/draftkings.jpeg";
import espn from "/espn-bets.jpeg";

const sportsbooks = [
  { name: "FanDuel", logo: fanDuel, url: "https://fanduel.com/" },
  {
    name: "PrizePicks",
    logo: prizePicks,
    url: "https://www.prizepicks.com/",
  },
  { name: "Fanatics", logo: fanatics, url: "https://fanatics.com/" },
  { name: "bet365", logo: bet365, url: "https://www.bet365.com/" },
  {
    name: "DraftKings",
    logo: draftKings,
    url: "https://www.draftkings.com/",
  },
  { name: "ESPN BET", logo: espn, url: "https://espnbet.com/" },
];

export default function TrustedSportsbooks() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const navigate = useNavigate();

  const viewBoxW = 300;
  const viewBoxH = 80;
  const rectX = 4;
  const rectY = 4;
  const rectW = 292; // width inside viewBox
  const rectH = 72; // height inside viewBox
  const perimeter = 2 * (rectW + rectH); // stroke-dasharray value

  return (
    <section className="relative py-28 px-2 sm:px-6" id="learn">
      <div
        className="max-w-5xl mx-auto bg-white/8 backdrop-blur-md border border-white/10 rounded-2xl p-4 sm:p-8 md:p-12"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#f97316] text-center">
          Bet Smarter with Our Expert Site Reviews
        </h2>
        <p className="text-gray-300 text-center mt-2">
          We dig deep into odds, payouts, and user experiences so you play where
          it truly pays.
        </p>

        <ul className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {sportsbooks.map((sb, idx) => {
            const gradId = `grad-${idx}`;
            const isActive = hoveredIndex === idx;
            return (
              <li
                key={idx}
                data-aos="fade-up"
                data-aos-delay={idx * 80}
                className="relative"
              >
                <a
                  href={sb.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-3xl relative overflow-hidden"
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onFocus={() => setHoveredIndex(idx)}
                  onBlur={() => setHoveredIndex(null)}
                  aria-label={`Open ${sb.name} in new tab`}
                  tabIndex={0}
                >
                  {/* SVG border — absolute, covers the card */}
                  <svg
                    viewBox={`0 0 ${viewBoxW} ${viewBoxH}`}
                    preserveAspectRatio="none"
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    aria-hidden
                  >
                    <defs>
                      <linearGradient
                        id={gradId}
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop offset="0%" stopColor="#f97316" />
                        <stop offset="50%" stopColor="#ff7b4a" />
                        <stop offset="100%" stopColor="#f97316" />
                      </linearGradient>
                    </defs>

                    <rect
                      x={rectX}
                      y={rectY}
                      rx="18"
                      ry="18"
                      width={rectW}
                      height={rectH}
                      stroke={`url(#${gradId})`}
                      strokeWidth="3.5"
                      fill="none"
                      style={{
                        strokeDasharray: perimeter,
                        strokeDashoffset: isActive ? 0 : perimeter,
                        transition:
                          "stroke-dashoffset 900ms linear, opacity 220ms ease",
                        opacity: isActive ? 1 : 0,
                      }}
                    />
                  </svg>

                  {/* Inner content above the SVG */}
                  <div className="relative z-10 p-4 bg-black/45 rounded-3xl flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={sb.logo}
                        alt={sb.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <span className="text-white font-medium">{sb.name}</span>
                    </div>
                    <ExternalLink
                      className="text-gray-400 group-hover:text-[#f97316]"
                      size={20}
                    />
                  </div>
                </a>
              </li>
            );
          })}
        </ul>

        {/* CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          data-aos="fade-up"
          data-aos-delay={600}
        >
          <h3 className="text-2xl font-bold text-gray-200 mb-4">
            Join Our Community Today
          </h3>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            Get access to premium picks, expert analysis, and exclusive content.
            Connect with fellow sports enthusiasts and elevate your betting
            strategy.
          </p>

          <motion.div
            whileHover={{ scale: 1.03 }}
            data-aos="zoom-in"
            data-aos-delay={800}
            className="relative group inline-block"
          >
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
              <span>Get Started</span>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
