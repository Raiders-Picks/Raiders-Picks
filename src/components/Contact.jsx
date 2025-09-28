import { motion } from "framer-motion";
import SocialButton from "./SocialButton";
import Form from "./Form";
import Button from "./Button";
import { Smartphone } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ContactSection = () => {
  const navigate = useNavigate();

  return (
    <section
      id="contact"
      className="relative pt-28 pb-20 bg-[#0f172a] overflow-hidden"
    >
      {/* Gradient background blur */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-[#f97316] rounded-full blur-[120px] opacity-20"></div>
        <div className="absolute bottom-20 right-1/4 w-72 h-72 bg-[#bf0050] rounded-full blur-[120px] opacity-20"></div>
      </div>

      <div
        className="relative max-w-7xl mx-auto px-2 md:px-8 grid gap-6 lg:gap-10 lg:grid-cols-2 items-center"
        data-aos="fade-up"
      >
        {/* Left Column */}
        <div className="text-center md:text-left flex flex-col items-center lg:items-start justify-center">
          <div className=" flex flex-col lg:flex-row items-center  gap-4 mb-4">
            <Smartphone className="text-[#f97316] w-10 h-10" />
            <h2 className="text-4xl md:text-5xl font-extrabold text-white ">
              Contact <span className="text-[#f97316]">Us</span>
            </h2>
          </div>

          <p className="text-gray-400 max-w-md mx-auto md:mx-0 mb-8 text-center lg:text-start">
            Have a question or an enquiry? Drop us a message and we’ll get back
            to you quickly.
          </p>
          <SocialButton />
        </div>

        {/* Right Column */}
        <Form />
      </div>

      {/* Get Started */}
      <div className="mt-16 flex justify-center">
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring" }}
        >
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
            <span>Get Started</span>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
