import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Mail } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import emailjs from "@emailjs/browser";

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.subject ||
      !formData.message
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      const serviceId = "service_7l70dsr";
      const templateId = "template_ze9ctf8";
      const publicKey = "d4w_xiM5cLxVo--fD";

      // Add formatted timestamp
      const timestamp = new Date().toLocaleString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });

      const templateParams = {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        date: timestamp,
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);

      toast.success("Message sent to Raiders Picks successfully! 🎉", {
        autoClose: 3000,
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("EmailJS Error:", error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full p-3 rounded-xl bg-[#1e293b]/70 border border-[#f97316]/50 text-white placeholder-[#f97316]/70 focus:border-[#f97316] focus:ring-2 focus:ring-[#f97316]/40 outline-none shadow-md";

  return (
    <div className="py-20 px-4 flex justify-center bg-[#0f172a]">
      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-lg p-8 bg-[#1e293b]/60 backdrop-blur-md border border-[#f97316]/30 rounded-2xl shadow-lg shadow-[#f97316]/20"
        data-aos="fade-up"
      >
        {/* Header */}
        <div className="flex flex-col items-center mb-8" data-aos="zoom-in">
          <Mail className="text-[#f97316]" size={40} />
          <h2 className="text-3xl font-bold text-white mt-3">Get In Touch</h2>
          <p className="text-[#f97316]/80 text-center mt-2">
            Fill out the form and we'll get back to you as soon as possible.
          </p>
        </div>

        {/* Input Fields */}
        <div className="space-y-5">
          <div data-aos="fade-right" data-aos-delay="100">
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              type="text"
              required
              className={inputClass}
            />
          </div>

          <div data-aos="fade-right" data-aos-delay="200">
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              type="email"
              required
              className={inputClass}
            />
          </div>

          <div data-aos="fade-right" data-aos-delay="300">
            <input
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Subject"
              type="text"
              required
              className={inputClass}
            />
          </div>

          <div data-aos="fade-right" data-aos-delay="400">
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message..."
              rows={4}
              required
              className={inputClass + " resize-none"}
            />
          </div>
        </div>

        {/* Submit Button */}
        <div data-aos="zoom-in-up" data-aos-delay="500">
          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-[#f97316] to-[#bf0050] text-white font-bold shadow-lg shadow-[#f97316]/30 hover:opacity-90 transition-all"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
