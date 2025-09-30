import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { CheckCircle2, Gem } from "lucide-react";
import ChatModal from "./ChatModal";

const packages = [
  {
    title: "Monthly Premium",
    desc: "Most popular choice",
    price: "$55",
    features: [
      "Expert well analyzed picks",
      "AI-powered daily analysis",
      "Weekly premium giveaways",
      "Building bankroll strategies",
      "Lotto selections",
      "Video live analysis",
      "Discord community access",
      "30 days of service",
    ],
    delay: 0,
  },
  {
    title: "3 Month Premium",
    desc: "Best value for regular bettors",
    price: "$100",
    features: [
      "All Monthly Premium features",
      "Priority access to giveaways",
      "Enhanced bankroll building",
      "Advanced AI insights",
      "Early access to lotto picks",
      "Extended video analysis sessions",
      "90 days of service",
    ],
    delay: 100,
  },
  {
    title: "6 Month Premium",
    desc: "Extended access package",
    price: "$150",
    features: [
      "All 3 Month Premium features",
      "VIP-exclusive picks",
      "1-on-1 bankroll consultation",
      "Personalized AI analysis reports",
      "Exclusive lotto strategy sessions",
      "Premium live video Q&A sessions",
      "180 days of service",
    ],
    delay: 200,
  },
  {
    title: "1 Year Premium",
    desc: "Ultimate yearly access",
    price: "$300",
    features: [
      "All 6 Month Premium features",
      "Premium VIP status",
      "Exclusive yearly mega giveaways",
      "Priority 24/7 support",
      "Custom AI-driven betting strategies",
      "VIP lotto selection service",
      "365 days of service",
    ],
    delay: 300,
  },
];

const lifetimePackage = {
  title: "Lifetime Premium",
  desc: "Ultimate VIP experience",
  price: "$600",
  features: [
    "All Premium features for life",
    "Lifetime VIP status",
    "Exclusive lifetime access to all giveaways",
    "Personal betting advisor",
    "Customized AI analysis dashboard",
    "Priority lotto number generation",
    "On-demand video analysis sessions",
    "Unlimited service duration",
  ],
  delay: 300,
  highlight: true,
};

const Packages = () => {
  const [loading, setLoading] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 600, once: true });
  }, []);

  const handleSubscribe = (pkg) => {
    setSelectedPackage(pkg);
    setIsChatOpen(true); // Open chat modal instead of alert
  };

  const renderCard = (pkg) => (
    <div
      key={pkg.title}
      className={`relative p-6 rounded-2xl shadow-lg transition-all duration-300 flex flex-col w-full ${
        pkg.highlight
          ? "bg-gradient-to-br from-[#f97316]/20 to-[#1e293b] border-2 border-[#f97316] hover:scale-105"
          : "bg-[#1e293b] border border-transparent hover:border-[#f97316]/70 hover:shadow-[#f97316]/30"
      }`}
      data-aos="fade-up"
      data-aos-delay={pkg.delay}
    >
      {pkg.highlight && (
        <span className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#f97316] text-white text-xs font-bold px-4 py-1 rounded-full shadow-md">
          Best Value
        </span>
      )}

      <h1 className="text-xl font-bold text-white">{pkg.title}</h1>
      <h3 className="text-sm text-gray-400">{pkg.desc}</h3>
      <h1 className="text-3xl font-bold text-[#f97316] mt-4">{pkg.price}</h1>

      <ul className="text-gray-300 space-y-2 mt-4 flex-1">
        {pkg.features.map((item, fidx) => (
          <li key={fidx} className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-[#f97316]" /> {item}
          </li>
        ))}
      </ul>

      <button
        onClick={() => handleSubscribe(pkg)}
        disabled={loading}
        className={`mt-6 w-full py-3 rounded-lg font-bold transition-all cursor-pointer ${
          loading
            ? "bg-gray-500 text-gray-300 cursor-not-allowed"
            : pkg.highlight
            ? "bg-gradient-to-r from-[#f97316] to-[#ea580c] text-white hover:shadow-xl hover:scale-105"
            : "bg-gradient-to-r from-[#f97316] to-[#ea580c] text-white hover:shadow-lg"
        }`}
      >
        {loading ? "Sending..." : "Subscribe Now"}
      </button>
    </div>
  );

  return (
    <section id="packages" className="bg-[#0f172a]/20 py-32 px-4 relative">
      {/* Section Title */}
      <div className="text-center mb-12" data-aos="fade-up">
        <div className="flex justify-center mb-4">
          <Gem
            size={48}
            className="text-[#f97316] animate-bounce drop-shadow-[0_0_10px_#f97316aa]"
          />
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-white">
          Choose Your Plan
        </h1>
        <p className="text-gray-300 mt-2">
          Unlock the full potential of Raider Picks with a package that fits
          you.
        </p>
      </div>

      {/* First three packages */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 ">
        {packages.map(renderCard)}
      </div>

      {/* Lifetime package centered */}
      <div className="flex justify-center mt-12 w-full sm:w-96 mx-auto">
        {renderCard(lifetimePackage)}
      </div>

      {/* Chat Modal */}
      <ChatModal
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        selectedPackage={selectedPackage}
      />
    </section>
  );
};

export default Packages;
