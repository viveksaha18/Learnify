"use client";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Home() {
  const router = useRouter();
  const { isSignedIn } = useUser();

  const handleGetStarted = () => {
    if (isSignedIn) {
      router.push("/workspace");
    } else {
      router.push("/sign-up");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-b from-blue-50 via-white to-gray-100">
      {/* Hero Section */}
      <main className="flex flex-col md:flex-row items-center justify-center text-center md:text-left px-6 md:px-16 mt-20 md:mt-32 gap-10">
        
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-xl"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight">
            Welcome to <span className="text-blue-600">Learnify</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Empower your learning journey with{" "}
            <span className="font-semibold text-blue-500">AI-driven insights</span> and
            interactive tools. Learn smarter, grow faster, and achieve your academic goals
            — all in one place.
          </p>

          <motion.button
            whileHover={{ scale: 1.07, boxShadow: "0 0 15px rgba(37,99,235,0.5)" }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGetStarted}
            className="bg-blue-600 text-white text-lg font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 cursor-pointer"
          >
            Get Started
          </motion.button>
        </motion.div>

        {/* Right Image (college student PNG) */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-lg"
        >
          <motion.img
            src="/college-student.png" // 👈 your image in public folder
            alt="College Student Illustration"
            className="rounded-2xl shadow-lg w-full"
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-10 mt-20">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Contact Section */}
          <div>
            <h2 className="text-lg font-semibold text-white mb-4">Contact Us</h2>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Mail size={18} className="text-blue-400" />
                <a href="mailto:viveksaha096@gmail.com" className="hover:text-white transition-colors">
                  viveksaha096@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={18} className="text-blue-400" />
                <a href="tel:+918093189895" className="hover:text-white transition-colors">
                  +91 99999 99999
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={18} className="text-blue-400" />
                <span>Bhubaneswar, India</span>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-lg font-semibold text-white mb-4">Quick Links</h2>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Courses</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Vision Section */}
          <div>
            <h2 className="text-lg font-semibold text-white mb-4">Our Vision</h2>
            <p className="text-gray-400 leading-relaxed">
              Learnify aims to make education{" "}
              <span className="text-blue-400 font-semibold">intelligent, personalized,</span> 
              and accessible for every learner through innovation and AI technology.
            </p>
          </div>
        </div>

        
      </footer>
    </div>
  );
}
