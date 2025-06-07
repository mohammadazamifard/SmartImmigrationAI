'use client';

import { useEffect, useState } from 'react';

// Custom hook for speech synthesis
const useSpeechSynthesis = () => {
  const speak = (text: string, lang: string) => {
    if (typeof window !== "undefined") {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = 0.9;
      utterance.pitch = 1.1;
      window.speechSynthesis.speak(utterance);
    }
  };
  return { speak };
};

export default function DashboardPage() {
  const [isVisible, setIsVisible] = useState(false);
  const { speak } = useSpeechSynthesis();

  useEffect(() => {
    setIsVisible(true);
    
    // Check if we've played the welcome message before
    const hasPlayedDashboard = localStorage.getItem("dashboardWelcomePlayed");
    
    if (!hasPlayedDashboard) {
      localStorage.setItem("dashboardWelcomePlayed", "true");
      
      // Play English welcome
      speak(
        "Welcome to your immigration dashboard. Here's your progress overview.",
        "en-US"
      );
      
      // Play Persian welcome after English
      setTimeout(() => {
        speak(
          "به داشبورد مهاجرتی خود خوش آمدید. خلاصه پیشرفت شما اینجاست.",
          "fa-IR"
        );
      }, 4000);
    }
  }, []);

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900">
      {/* Animated border effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-indigo-500/20 to-purple-500/20 animate-pulse-slow rounded-lg m-1" />
      
      <div className={`relative z-10 flex flex-col items-center justify-between p-8 md:p-24 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        <div className="w-full max-w-5xl">
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center animate-pulse mr-4">
              <span className="text-2xl">📊</span>
            </div>
            <h1 className="text-4xl font-bold text-white">Your Dashboard</h1>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 transform hover:scale-102 transition-all">
              <h2 className="text-2xl font-semibold text-white mb-4">Status Overview</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-400 mr-2 animate-pulse" />
                  <p className="text-green-400">Application Active</p>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-blue-400 mr-2" />
                  <p className="text-blue-400">Documents: 70% Complete</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 transform hover:scale-102 transition-all">
              <h2 className="text-2xl font-semibold text-white mb-4">Next Steps</h2>
              <ul className="space-y-3 text-indigo-200">
                <li className="flex items-center">
                  <span className="mr-2">📄</span>
                  Upload passport scan
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✍️</span>
                  Complete background form
                </li>
                <li className="flex items-center">
                  <span className="mr-2">📅</span>
                  Schedule interview
                </li>
              </ul>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-white mb-4">Recent Updates</h2>
            <div className="space-y-4">
              <div className="flex items-center text-indigo-200">
                <span className="text-2xl mr-3">🎉</span>
                <div>
                  <p className="font-medium">Document Verification Complete</p>
                  <p className="text-sm text-indigo-300">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center text-indigo-200">
                <span className="text-2xl mr-3">📬</span>
                <div>
                  <p className="font-medium">New Message from Immigration Office</p>
                  <p className="text-sm text-indigo-300">1 day ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add global styles for animations */}
      <style jsx global>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.5; }
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        .hover\\:scale-102:hover {
          transform: scale(1.02);
        }
      `}</style>
    </main>
  );
} 