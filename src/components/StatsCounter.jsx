import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

const StatsCounter = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const [counts, setCounts] = useState({
    members: 0,
    winRate: 0,
    picks: 0,
    sports: 0,
  });
  const [hasCounted, setHasCounted] = useState(false);

  const targets = { members: 2800, winRate: 80, picks: 10750, sports: 13 };
  const duration = 1500;

  const stats = [
    { value: counts.members, label: "Happy Subscribers" },
    { value: counts.winRate, label: "Win Rate %" },
    { value: counts.picks, label: "Winning Picks" },
    { value: counts.sports, label: "Sports Covered" },
  ];

  const icons = [
    <svg
      key="members"
      className="w-12 h-12 text-[#f97316] mb-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
      />
    </svg>,
    <svg
      key="winrate"
      className="w-12 h-12 text-[#f97316] mb-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>,
    <svg
      key="picks"
      className="w-12 h-12 text-[#f97316] mb-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
      />
    </svg>,
    <svg
      key="sports"
      className="w-12 h-12 text-[#f97316] mb-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"
      />
    </svg>,
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasCounted) {
          animateCounts();
          setHasCounted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, [hasCounted]);

  const animateCounts = () => {
    const start = performance.now();
    const initialCounts = { ...counts };

    const step = (timestamp) => {
      const progress = Math.min((timestamp - start) / duration, 1);
      const updatedCounts = {};
      Object.keys(targets).forEach((key) => {
        updatedCounts[key] = Math.floor(
          initialCounts[key] + progress * (targets[key] - initialCounts[key])
        );
      });
      setCounts(updatedCounts);

      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  };

  return (
    <div
      ref={containerRef}
      className="relative py-16 overflow-hidden bg-[#0f172a] text-white"
    >
      {/* Intriguing background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-[#f97316]/20 to-[#f97316]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-l from-[#f97316]/20 to-[#f97316]/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0 w-full h-full bg-[url('/raider-hero.png')] bg-center bg-cover opacity-10" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="group relative border border-[#f97316]/20 rounded-xl p-6 text-center bg-[#0f172a]/50 backdrop-blur-sm hover:border-[#f97316]/50 hover:shadow-lg hover:shadow-[#f97316]/20 transition-all flex flex-col items-center"
            >
              {icons[idx]}
              <div className="text-4xl md:text-5xl font-bold mb-2 text-[#f97316]">
                {Math.floor(stat.value).toLocaleString()}
                {stat.label === "Win Rate %" && (
                  <span className="text-3xl">%</span>
                )}
              </div>
              <div className="text-gray-300 text-lg font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button
            variant="primary"
            onClick={() => {
              if (window.location.pathname === "/subscription") {
                window.scrollTo({ top: 0, behavior: "smooth" });
              } else {
                navigate("/subscription", { state: { scrollTo: "packages" } });
              }
            }}
          >
            <span className="">Join Us Today!!</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StatsCounter;
