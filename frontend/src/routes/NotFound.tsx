"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Home, AlertTriangle } from "lucide-react";
import Button from "@/components/ui/Button";

export default function NotFoundPage() {
  const [glitchText, setGlitchText] = useState("404");

  // Glitch effect
  useEffect(() => {
    const glitchChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";
    const originalText = "404";

    const interval = setInterval(() => {
      if (Math.random() > 0.8) {
        const glitched = originalText
          .split("")
          .map((char) =>
            Math.random() > 0.7
              ? glitchChars[Math.floor(Math.random() * glitchChars.length)]
              : char
          )
          .join("");
        setGlitchText(glitched);

        setTimeout(() => setGlitchText(originalText), 100);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#0d0d0d] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background animation */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Main content */}
      <div className="text-center max-w-2xl mx-auto">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h1
            className="text-8xl md:text-9xl font-black bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-500 bg-clip-text text-transparent mb-4 font-mono"
            animate={{
              textShadow: [
                "0 0 20px rgba(59, 130, 246, 0.5)",
                "0 0 40px rgba(79, 70, 229, 0.5)",
                "0 0 20px rgba(6, 182, 212, 0.5)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {glitchText}
          </motion.h1>

          <motion.div
            className="flex items-center justify-center gap-2 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <AlertTriangle className="w-6 h-6 text-yellow-500" />
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Page Not Found
            </h2>
            <AlertTriangle className="w-6 h-6 text-yellow-500" />
          </motion.div>
        </motion.div>

        <motion.p
          className="text-gray-200 text-lg mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Oops! This page seems to have vanished into the void. But don't worry,
          you can always go back or head home.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="secondary"
              className=" text-white font-semibold px-8 py-3 rounded-2xl h-12 shadow-lg"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Go Back
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              //   variant="outline"
              className="bg-gray-800/50 backdrop-blur-md border-gray-600 text-white hover:bg-gray-700/50 font-semibold px-8 py-3 rounded-2xl h-12"
              onClick={() => (window.location.href = "/")}
            >
              <Home className="w-5 h-5 mr-2" />
              Home Page
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
