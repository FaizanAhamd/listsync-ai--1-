
import React from 'react';
import { ArrowUpTrayIcon, SparklesIcon, GlobeAltIcon } from '@heroicons/react/24/outline';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      title: "1. Upload Once",
      desc: "Upload your product images, base price, and basic details just once.",
      icon: ArrowUpTrayIcon,
      color: "bg-blue-50 text-blue-600"
    },
    {
      title: "2. AI Optimizes",
      desc: "AI writes SEO titles, bullet points, and auto-fills HSN/GST compliance codes.",
      icon: SparklesIcon,
      color: "bg-orange-50 text-orange-600"
    },
    {
      title: "3. Publish All",
      desc: "One click pushes your product to Amazon, Flipkart, and Meesho instantly.",
      icon: GlobeAltIcon,
      color: "bg-purple-50 text-purple-600"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-5xl font-extrabold text-[#1F2937] mb-20 tracking-tight">How It Works</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-1/4 left-[15%] right-[15%] h-0.5 bg-gray-100 -z-10"></div>
          
          {steps.map((step, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className={`w-24 h-24 rounded-3xl ${step.color} flex items-center justify-center mb-8 shadow-lg transition-transform hover:scale-110 hover:rotate-3`}>
                <step.icon className="w-12 h-12" />
              </div>
              <h3 className="text-2xl font-black text-[#1F2937] mb-4">{step.title}</h3>
              <p className="text-gray-500 font-medium max-w-xs mx-auto leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
