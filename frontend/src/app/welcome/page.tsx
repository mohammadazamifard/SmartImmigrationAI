"use client";

import { useEffect, useState, useCallback } from "react";

// Custom hook for speech synthesis
const useSpeechSynthesis = () => {
  const [voiceSupport, setVoiceSupport] = useState<boolean>(false);

  const speak = useCallback((text: string, onEnd?: () => void) => {
    if (typeof window === "undefined") return;

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Try to find Samantha (Siri-like voice) or fallback to first en-US female voice
    const voices = window.speechSynthesis.getVoices();
    const siriVoice = voices.find(voice => 
      voice.name === "Samantha" || 
      (voice.lang === "en-US" && voice.name.includes("Female"))
    ) || voices.find(voice => voice.lang === "en-US");

    if (siriVoice) {
      utterance.voice = siriVoice;
    }

    utterance.rate = 0.9; // Slightly slower for clarity
    utterance.pitch = 1.1; // Slightly higher for Siri-like sound
    utterance.onend = onEnd || (() => {});

    window.speechSynthesis.speak(utterance);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setVoiceSupport('speechSynthesis' in window);
    }
  }, []);

  return { speak, voiceSupport };
};

// Animated ring component
const GlowingRing = ({ delay = 0, scale = 1 }) => (
  <div
    className="absolute rounded-full bg-gradient-to-r from-blue-400/20 via-indigo-500/20 to-purple-500/20"
    style={{
      width: `${100 * scale}%`,
      height: `${100 * scale}%`,
      animation: `pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite ${delay}ms`,
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    }}
  />
);

export default function WelcomePage() {
  const [hasPlayed, setHasPlayed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { speak, voiceSupport } = useSpeechSynthesis();

  useEffect(() => {
    setIsVisible(true);

    // Check if welcome message has been played before
    const hasPlayedBefore = localStorage.getItem("welcomeMessagePlayed");
    
    if (!hasPlayedBefore && voiceSupport && !hasPlayed) {
      setHasPlayed(true);
      localStorage.setItem("welcomeMessagePlayed", "true");
      
      speak(
        "Welcome to Smart Immigration AI – Your personal migration assistant",
        () => {
          console.log("Welcome message completed");
        }
      );
    }
  }, [voiceSupport, hasPlayed, speak]);

  const handleReplay = () => {
    if (voiceSupport) {
      speak("Welcome to Smart Immigration AI – Your personal migration assistant");
    }
  };

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 overflow-hidden">
      {/* Animated rings */}
      <div className="absolute inset-0 flex items-center justify-center">
        <GlowingRing delay={0} scale={1.5} />
        <GlowingRing delay={1000} scale={2} />
        <GlowingRing delay={2000} scale={2.5} />
      </div>

      {/* Content container */}
      <div 
        className={`relative z-10 min-h-screen flex flex-col items-center justify-center p-6 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        {/* Central icon */}
        <div className="relative mb-12">
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center animate-pulse">
            <span className="text-4xl">🌟</span>
          </div>
          <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl" />
        </div>

        {/* Welcome text */}
        <div className="text-center max-w-2xl mx-auto space-y-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-display">
            Smart Immigration AI
          </h1>
          
          <div className="space-y-4">
            <p className="text-xl text-indigo-200 leading-relaxed">
              Welcome to Smart Immigration AI – Your personal migration assistant
            </p>
            <p className="text-xl text-indigo-200 leading-relaxed" dir="rtl" lang="fa">
              به اسمارت ایمیگریشن خوش آمدید – دستیار مهاجرتی شخصی شما
            </p>
          </div>

          <button
            onClick={handleReplay}
            className="mt-8 px-8 py-4 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-full font-medium text-lg hover:from-indigo-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          >
            <span>🔊</span>
            <span>Play Welcome Message</span>
          </button>

          {!voiceSupport && (
            <p className="text-amber-400 text-sm mt-2">
              Note: Voice synthesis is not supported in your browser
            </p>
          )}
        </div>
      </div>

      {/* Keyframe animations */}
      <style jsx global>{`
        @keyframes pulse {
          0%, 100% { 
            opacity: 0.3;
            transform: translate(-50%, -50%) scale(0.95);
          }
          50% { 
            opacity: 0.5;
            transform: translate(-50%, -50%) scale(1);
          }
        }
      `}</style>
    </main>
  );
} 