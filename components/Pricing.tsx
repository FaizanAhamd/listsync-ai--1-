
import React from 'react';
import { CheckIcon } from '@heroicons/react/24/solid';

export const Pricing: React.FC = () => {
  const inclusions = [
    "Unlimited products",
    "All 3 marketplaces (AMZ, FK, ME)",
    "AI SEO generation",
    "Real-time inventory sync",
    "Direct WhatsApp support",
    "Founder-led onboarding"
  ];

  return (
    <section id="pricing" className="py-24 bg-white overflow-hidden relative">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#1F2937] mb-4 tracking-tight">Simple Pricing</h2>
          <p className="text-lg text-gray-500 font-medium">Limited to first 100 sellers only</p>
        </div>
        
        <div className="relative bg-white rounded-[2rem] border-4 border-[#2563EB] p-10 md:p-16 shadow-2xl overflow-hidden group">
          <div className="absolute top-0 right-0 bg-[#2563EB] text-white px-8 py-2 rounded-bl-2xl font-black text-xs uppercase tracking-widest">Limited Offer</div>
          
          <div className="flex flex-col md:flex-row md:items-end gap-4 mb-12">
            <div>
              <p className="text-gray-400 font-bold line-through text-2xl">₹1,999/mo</p>
              <h3 className="text-6xl md:text-7xl font-black text-[#1F2937] tracking-tighter">Free<span className="text-xl text-gray-400 font-bold">/lifetime</span></h3>
            </div>
            <div className="bg-emerald-100 text-[#10B981] px-4 py-2 rounded-lg font-black text-sm mb-4">100% Free for Beta Users</div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
            {inclusions.map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                  <CheckIcon className="w-4 h-4 text-green-600" />
                </div>
                <span className="font-bold text-gray-700">{item}</span>
              </div>
            ))}
          </div>
          
          <button 
            onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
            className="w-full py-6 bg-[#2563EB] hover:bg-blue-700 text-white font-black rounded-2xl text-2xl shadow-xl shadow-blue-500/30 transition-all active:scale-95 transform group-hover:scale-[1.02]"
          >
            Reserve Your Free Spot
          </button>
          
          <p className="text-center text-gray-400 text-sm mt-6 font-medium">No credit card required. Purely free for early adopters.</p>
        </div>
      </div>
    </section>
  );
};
