"use client";

import { useEffect, useState } from "react";

// Custom hook for managing speech synthesis
const useSpeechSynthesis = () => {
  const speak = (text: string, lang: string) => {
    if (typeof window !== "undefined") {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = 0.9; // Slightly slower for more natural sound
      utterance.pitch = 1.1; // Slightly higher pitch for Siri-like voice
      window.speechSynthesis.speak(utterance);
    }
  };

  return { speak };
};

// Animated gradient ring component
const AnimatedRing = ({ delay = 0 }) => (
  <div
    className={`absolute w-[200%] h-[200%] rounded-full bg-gradient-to-r from-blue-400/20 via-indigo-500/20 to-purple-500/20
                animate-pulse-slow transform -translate-x-1/2 -translate-y-1/2
                blur-xl opacity-50 transition-opacity duration-1000`}
    style={{
      animationDelay: `${delay}ms`,
      animation: "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
    }}
  />
);

export default function OnboardingWelcome() {
  const [hasPlayed, setHasPlayed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { speak } = useSpeechSynthesis();

  useEffect(() => {
    // Fade in animation
    setIsVisible(true);

    // Check if we've played the welcome message before
    const hasPlayedBefore = localStorage.getItem("welcomeMessagePlayed");
    
    if (!hasPlayedBefore && !hasPlayed) {
      setHasPlayed(true);
      localStorage.setItem("welcomeMessagePlayed", "true");
      
      // Play English message
      speak(
        "Hi, I'm your Smart AI Assistant. Let's begin your journey toward a successful immigration path.",
        "en-US"
      );
      
      // Play Persian message after English
      setTimeout(() => {
        speak(
          "سلام، من دستیار هوشمند مهاجرتی شما هستم. بیاید سفر مهاجرت رو با هم شروع کنیم.",
          "fa-IR"
        );
      }, 5000);
    }
  }, [hasPlayed]);

  const handleStart = () => {
    if (hasPlayed) {
      // Navigate to the next step
      window.location.href = "/onboarding/steps";
    } else {
      setHasPlayed(true);
      // Play welcome messages
      speak(
        "Hi, I'm your Smart AI Assistant. Let's begin your journey toward a successful immigration path.",
        "en-US"
      );
      setTimeout(() => {
        speak(
          "سلام، من دستیار هوشمند مهاجرتی شما هستم. بیاید سفر مهاجرت رو با هم شروع کنیم.",
          "fa-IR"
        );
      }, 5000);
    }
  };

  return (
    <main className="relative overflow-hidden min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 flex items-center justify-center">
      {/* Animated rings */}
      <div className="absolute inset-0 flex items-center justify-center">
        <AnimatedRing delay={0} />
        <AnimatedRing delay={1000} />
        <AnimatedRing delay={2000} />
      </div>

      {/* Content */}
      <div
        className={`relative z-10 text-center p-8 rounded-2xl backdrop-blur-xl bg-white/10 
                   transform transition-all duration-1000 ${
                     isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                   }`}
      >
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 
                        flex items-center justify-center animate-pulse">
            <span className="text-4xl">🌟</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4 font-display">
            Smart Immigration AI
          </h1>
          <p className="text-xl text-indigo-200 mb-4 font-light">
            Your AI-powered immigration assistant
          </p>
          <p className="text-lg text-blue-200 mb-2" style={{ direction: "rtl" }}>
            دستیار هوشمند مهاجرتی شما
          </p>
        </div>

        <button
          onClick={handleStart}
          className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-full 
                   font-medium text-lg hover:from-indigo-600 hover:to-blue-600 transform hover:scale-105 
                   transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          {hasPlayed ? "Continue Your Journey" : "Start Your Journey"}
        </button>

        <p className="mt-6 text-indigo-200 text-sm">
          Click to {hasPlayed ? "continue" : "hear"} your AI assistant
        </p>
      </div>

      {/* Add global styles for animations */}
      <style jsx global>{`
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.1); opacity: 0.7; }
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </main>
  );
}
