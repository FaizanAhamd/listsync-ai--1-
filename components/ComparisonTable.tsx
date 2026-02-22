
import React from 'react';
import { CheckCircleIcon, XMarkIcon } from '@heroicons/react/24/solid';

export const ComparisonTable: React.FC = () => {
  const rows = [
    { label: "Targeting", generic: "General E-com", listsync: "All products" },
    { label: "SEO Content", generic: "Manual / GPT Copy", listsync: "Marketplace-Specific AI" },
    { label: "HSN/GST Codes", generic: "Search Google", listsync: "Auto-Fill built-in" },
    { label: "Listing Setup", generic: "60-90 Mins / SKU", listsync: "5-10 Mins / SKU" },
    { label: "Pricing", generic: "₹3,000+ / mo", listsync: "Free for Beta" },
    { label: "Support", generic: "Ticketing system", listsync: "WhatsApp & Ticketing" }
  ];

  return (
    <section id="comparison" className="py-24 bg-[#F9FAFB]">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-5xl font-extrabold text-[#1F2937] mb-6 tracking-tight">Why Not Just Use Generic Tools?</h2>
        <p className="text-gray-500 mb-16 text-lg">Most tools are built for the US market. We're built for the Indian seller.</p>
        
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          <div className="grid grid-cols-3 bg-gray-50 py-6 px-8 border-b border-gray-100 font-black text-xs uppercase tracking-widest">
            <div className="text-left text-gray-400">Features</div>
            <div className="text-gray-500">Other Tools</div>
            <div className="text-[#2563EB]">ListSync AI</div>
          </div>
          <div className="divide-y divide-gray-50">
            {rows.map((row, i) => (
              <div key={i} className="grid grid-cols-3 py-6 px-8 items-center group hover:bg-gray-50/50 transition-colors">
                <div className="text-left font-bold text-gray-600 text-sm">{row.label}</div>
                <div className="text-gray-400 text-sm">{row.generic}</div>
                <div className="text-[#1F2937] font-black text-sm">{row.listsync}</div>
              </div>
            ))}
          </div>
          <div className="bg-blue-50 py-4 text-center">
             <p className="text-[#2563EB] text-xs font-black uppercase tracking-widest">We're India-first. Category-agnostic. Seller-obsessed.</p>
          </div>
        </div>
        
        <div className="mt-16">
          <button 
            onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-10 py-5 bg-[#F97316] text-white font-black rounded-xl text-xl shadow-xl shadow-orange-500/20 transform hover:scale-105 active:scale-95 transition-all"
          >
            Get Free Access Now
          </button>
        </div>
      </div>
    </section>
  );
};
