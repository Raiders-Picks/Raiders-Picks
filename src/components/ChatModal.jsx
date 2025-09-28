import { useEffect, useRef, useState } from "react";
import {
  MessageCircle,
  X,
  Send,
  Upload,
  Bitcoin,
  CreditCard,
  Wallet,
  Copy,
} from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AOS from "aos";
import "aos/dist/aos.css";
import emailjs from "@emailjs/browser";

const ChatModal = ({ isOpen, onClose, selectedPackage }) => {
  const [chatMessages, setChatMessages] = useState([]);
  const [userMessage, setUserMessage] = useState("");
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [showUpload, setShowUpload] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [step, setStep] = useState("payment"); // 'payment' | 'email' | 'paymentProof' | 'nameDiscord'
  const [userEmail, setUserEmail] = useState("");

  const chatRef = useRef(null);
  const fileInputRef = useRef(null);

  const crypto = [
    {
      name: "Bitcoin",
      icon: <Bitcoin size={16} />,
      address: "bc1qm5rg29zzzy7drk93278m2ntfg79l6yxlzxhn2k",
      network: "Bitcoin",
    },
  ];

  const paymentMethods = [
    ...crypto.map((c) => ({ name: c.name, icon: c.icon })),
    { name: "PayPal", icon: <CreditCard size={16} /> },
    { name: "Zelle", icon: <Wallet size={16} /> },
    { name: "ApplePay", icon: <CreditCard size={16} /> },
    { name: "Chime", icon: <CreditCard size={16} /> },
  ];

  useEffect(() => {
    AOS.init({ duration: 600, once: true });
  }, []);

  useEffect(() => {
    if (chatRef.current)
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [chatMessages]);

  useEffect(() => {
    if (isOpen && selectedPackage) {
      setPaymentMethod(null);
      setShowUpload(false);
      setUploadedImage(null);
      setStep("payment");
      setUserEmail("");
      setChatMessages([
        {
          id: 1,
          sender: "bot",
          text: `Welcome! You're interested in the ${selectedPackage.title} package. How would you like to pay?`,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    }
  }, [isOpen, selectedPackage]);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handlePaymentSelect = (method) => {
    setPaymentMethod(method);
    setChatMessages((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        sender: "user",
        text: `I'd like to pay with ${method}.`,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
      {
        id: prev.length + 2,
        sender: "bot",
        text: "Please enter your email to continue.",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
    setStep("email");
  };

  const handleEmailSubmit = (email) => {
    if (!validateEmail(email))
      return toast.error("Please enter a valid email address.");
    setUserEmail(email);

    const cryptoObj = crypto.find((c) => c.name === paymentMethod);

    const botMessage = cryptoObj
      ? `Please send your payment to the following address:`
      : "Text Raiders Picks on Discord with a screenshot of your payment. After payment, upload proof along with your name and Discord username to gain access.";

    setChatMessages((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        sender: "user",
        text: email,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
      {
        id: prev.length + 2,
        sender: "bot",
        text: botMessage,
        address: cryptoObj ? cryptoObj.address : undefined,
        network: cryptoObj ? cryptoObj.network : undefined,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);

    setShowUpload(true);
    setStep("paymentProof");
  };

  const uploadToCloudinary = async (file) => {
    if (!file.type.match("image.*"))
      return toast.error("Upload a valid image file");
    const url = "https://api.cloudinary.com/v1_1/dwv8az2wf/image/upload";
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "J-smart");

    try {
      const response = await fetch(url, { method: "POST", body: formData });
      const data = await response.json();
      if (data.secure_url) return data.secure_url;
      throw new Error("Upload failed");
    } catch {
      toast.error("Upload failed");
      return null;
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const tempId = Date.now();
    setChatMessages((prev) => [
      ...prev,
      {
        id: tempId,
        sender: "user",
        uploading: true,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);

    const uploadedUrl = await uploadToCloudinary(file);
    if (!uploadedUrl) {
      setChatMessages((prev) => prev.filter((msg) => msg.id !== tempId));
      return;
    }

    setUploadedImage(uploadedUrl);

    setChatMessages((prev) =>
      prev.map((msg) =>
        msg.id === tempId
          ? { ...msg, uploading: false, image: uploadedUrl }
          : msg
      )
    );

    setChatMessages((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        sender: "bot",
        text: "Thank you for uploading your payment proof. Please provide your name and Discord username.",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);

    setStep("nameDiscord");
    setShowUpload(false);
  };

  const sendMessage = () => {
    if (!userMessage.trim()) return toast.error("Input cannot be empty");

    if (step === "email") {
      handleEmailSubmit(userMessage);
      setUserMessage("");
      return;
    }

    if (step === "nameDiscord") {
      // Add user message
      setChatMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          sender: "user",
          text: userMessage,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);

      //temporary "sending" bot message with spinner
      const sendingId = Date.now();
      setChatMessages((prev) => [
        ...prev,
        { id: sendingId, sender: "bot", text: "Sending...", sending: true },
      ]);

      setUserMessage("");
      setStep(null);

      emailjs
        .send(
          "service_7l70dsr",
          "template_0y0cef8",
          {
            from_name: "Subscriber",
            package_name: selectedPackage?.title || "Unknown Package",
            package_price: selectedPackage?.price || "Unknown Price",
            user_email: userEmail,
            user_message: userMessage,
            payment_proof_html: uploadedImage
              ? `<img src="${uploadedImage}" alt="Payment Proof" style="max-width:100%; border-radius:6px; box-shadow:0 2px 6px rgba(0,0,0,0.15);" />`
              : "<p style='color:#777;font-style:italic;'>No payment proof uploaded</p>",
            timestamp: new Date().toLocaleString(),
            email: userEmail,
          },
          "d4w_xiM5cLxVo--fD"
        )
        .then(() => {
          setChatMessages((prev) =>
            prev.map((msg) =>
              msg.id === sendingId
                ? {
                    ...msg,
                    text: "✅ Thank you! Your info has been sent. We will verify and get back to you soon.",
                    sending: false,
                  }
                : msg
            )
          );
          toast.success("Message sent!");
        })
        .catch((error) => {
          console.error("EmailJS error details:", error);

          let errorMessage =
            "❌ Failed to send your subscription. Please try again later.";

          // Handle "Failed to fetch" and timeouts
          if (
            error?.message?.includes("Failed to fetch") ||
            error?.message?.includes("timeout")
          ) {
            errorMessage =
              "⚠️ Network error: The request timed out. Please check your internet connection, toggle airplane mode on/off, or switch to a stable network.";
          }
          setChatMessages((prev) =>
            prev.map((msg) =>
              msg.id === sendingId
                ? { ...msg, text: errorMessage, sending: false }
                : msg
            )
          );

          toast.error(errorMessage);
        });

      return;
    }

    // fallback for other steps
    setChatMessages((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        sender: "user",
        text: userMessage,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
    setUserMessage("");
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.info("Copied to clipboard!");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <div
        className="bg-[#1e293b] rounded-xl shadow-2xl w-full max-w-lg flex flex-col border border-[#f97316]"
        data-aos="zoom-in"
      >
        {/* Header */}
        <div className="flex flex-col justify-between px-4 py-3 bg-[#f97316] rounded-t-xl">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 text-white font-bold">
              <MessageCircle size={20} />
              <span className="text-[#1e293b] font-bold">
                Chat with Raider Picks
              </span>
            </div>
            <button
              onClick={onClose}
              className="text-[#1e293b] hover:text-gray-200"
            >
              <X size={20} />
            </button>
          </div>
          <p className="text-[#1e293b] text-sm">
            We're here to help you complete your subscription
          </p>
        </div>

        {/* Selected Package */}
        {selectedPackage && (
          <div className="px-4 py-2 border-b border-gray-700 text-white text-sm">
            <p className="font-bold text-[#f97316]">
              Package: {selectedPackage.title}
            </p>
            <p>{selectedPackage.price}</p>
          </div>
        )}

        {/* Messages */}
        <div
          ref={chatRef}
          className="flex-1 overflow-y-auto p-3 space-y-3"
          style={{ maxHeight: "400px" }}
        >
          {chatMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.sender === "bot" ? "justify-start" : "justify-end"
              } px-1`}
            >
              <div
                className={`max-w-[90%] rounded-lg p-3 ${
                  msg.sender === "bot"
                    ? "bg-gray-800 rounded-bl-none text-gray-400"
                    : "bg-[#f97316] rounded-tr-none text-white"
                }`}
              >
                {msg.text && (
                  <span className="flex items-center gap-2">
                    {msg.text}{" "}
                    {msg.sending && (
                      <div className="w-4 h-4 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
                    )}
                  </span>
                )}

                {/* Spinner while uploading */}
                {msg.uploading && (
                  <div className="flex justify-center mt-2">
                    <div className="w-8 h-8 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}

                {msg.image && (
                  <img
                    src={msg.image}
                    alt="User upload"
                    className="mt-2 max-w-[200px] rounded"
                  />
                )}

                {msg.address && (
                  <div className="flex items-center gap-2 mt-2">
                    <span className="font-monospace bg-gray-400 px-2 py-1 rounded cursor-pointer select-all text-black break-all">
                      {msg.address}
                    </span>
                    <button
                      onClick={() => copyToClipboard(msg.address)}
                      className="text-yellow-400 hover:text-yellow-300"
                      title="Copy address"
                    >
                      <Copy size={16} />
                    </button>
                  </div>
                )}

                {msg.network && (
                  <p className="text-gray-400 text-xs italic">
                    Network: {msg.network}
                  </p>
                )}
                {msg.time && (
                  <p className="text-gray-400 text-xs text-right mt-1">
                    {msg.time}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-gray-700">
          {step === "payment" && (
            <div className="flex flex-wrap gap-2 mb-3">
              {paymentMethods.map((method) => (
                <button
                  key={method.name}
                  onClick={() => handlePaymentSelect(method.name)}
                  className="flex items-center gap-2 bg-[#f97316] hover:bg-[#ea580c] text-white px-3 py-1 rounded-md transition"
                >
                  {method.icon} {method.name}
                </button>
              ))}
            </div>
          )}

          {showUpload && step === "paymentProof" && !uploadedImage && (
            <div className="mb-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="bg-yellow-500 hover:bg-yellow-400 text-black px-3 py-2 rounded-md font-semibold flex items-center gap-2"
              >
                <Upload size={18} /> Upload Proof
              </button>
            </div>
          )}

          {(step === "email" || step === "nameDiscord") && (
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                placeholder={
                  step === "email"
                    ? "Enter your email"
                    : "Name: [Your Name], Discord: [Your Discord]"
                }
                className="flex-grow px-3 py-2 rounded text-[#cdc9c9]"
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <button
                onClick={sendMessage}
                className="bg-[#f97316] hover:bg-[#ea580c] text-white px-4 py-2 rounded-md flex items-center justify-center sm:justify-start gap-1"
              >
                <Send size={18} /> Send
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatModal;
