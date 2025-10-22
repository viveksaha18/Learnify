"use client"
import React from "react";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";

function WelcomeBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="p-8 rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-500 to-green-400 shadow-lg text-white flex flex-col sm:flex-row items-center justify-between"
    >
      {/* Left Section - Text */}
      <div className="space-y-2 max-w-xl">
        <h2 className="font-bold text-3xl sm:text-4xl">
          Welcome to <span className="text-yellow-200">Learnify</span>
        </h2>
        <p className="text-sm sm:text-base text-blue-50">
          Learn, Create, and Explore your favorite courses with AI-powered personalized learning.
        </p>
      </div>

      {/* Right Section - Icon */}
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="mt-6 sm:mt-0"
      >
        <BookOpen size={60} className="text-white drop-shadow-lg" />
      </motion.div>
    </motion.div>
  );
}

export default WelcomeBanner;
