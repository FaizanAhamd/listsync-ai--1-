
import React from 'react';
import { XCircleIcon } from '@heroicons/react/24/outline';

export const ProblemSection: React.FC = () => {
  const pains = [
    "Uploading the same product details 3 times (Amazon, Flipkart, Meesho)",
    "Resizing and renaming images for 3 different platform requirements",
    "Fighting with CSV upload errors and random file rejections",
    "Spending 30 minutes finding correct HSN codes for every new launch",
    "Writing fresh SEO titles and bullets for each marketplace individually",
    "Inventory going out of sync when you sell 10 units on Meesho",
    "Managing 50+ SKUs manually is a full-time nightmare",
    "Losing 4-6 hours of productive time for every single SKU upload"
  ];

  return (
    <section className="py-24 bg-[#F9FAFB] border-y border-gray-200">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-extrabold text-[#1F2937] text-center mb-16 tracking-tight">
          You Already Know This Pain...
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
          {pains.map((pain, i) => (
            <div key={i} className="flex gap-4 items-start animate-in fade-in slide-in-from-left-4 duration-500" style={{ transitionDelay: `${i * 100}ms` }}>
              <XCircleIcon className="w-6 h-6 text-red-500 shrink-0 mt-0.5" />
              <p className="text-gray-600 font-medium leading-relaxed">{pain}</p>
            </div>
          ))}
        </div>
        <div className="mt-16 p-8 bg-red-50 rounded-2xl border border-red-100 text-center">
          <p className="text-red-800 font-bold text-lg italic">"I spent 6 hours yesterday just uploading one new product to Meesho and Flipkart. It's soul-crushing."</p>
          <p className="text-red-600 text-sm mt-2 font-semibold">— Brand Founder, Delhi</p>
        </div>
      </div>
    </section>
  );
};
