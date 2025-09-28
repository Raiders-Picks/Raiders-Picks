import bgImage from "/raider-hero.png";

const BackgroundLayer = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Solid background */}
      <div className="w-full h-full bg-[#0f172a]"></div>

      {/* Blurred gradient shapes */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-[#f97316]/30 to-[#f97316]/10 rounded-full blur-[120px] animate-pulse-slow"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-r from-[#f97316]/30 to-[#f97316]/10 rounded-full blur-[120px] animate-pulse-slow delay-1000"></div>

      {/* Background image with blur */}
      <img
        src={bgImage}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover opacity-40 blur-2xl"
      />
    </div>
  );
};

export default BackgroundLayer;
