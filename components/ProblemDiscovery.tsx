
import React, { useState } from 'react';

export const ProblemDiscovery: React.FC = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const options = [
    "CSV file upload errors",
    "Writing SEO titles and descriptions",
    "Resizing images for each platform",
    "Finding GST/HSN codes",
    "Inventory sync issues",
    "Different rules for each marketplace",
    "Uploading same product 3 times",
    "Other"
  ];

  const handleContinue = () => {
    // Scroll to the "Unified Product Hub" demo section
    const element = document.getElementById('automation-demo');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#1F2937] mb-4">What's Your Biggest Listing Problem?</h2>
        <p className="text-gray-500 mb-12">Select your main challenge to see how we solve it.</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => setSelected(opt)}
              className={`p-5 rounded-2xl border-2 text-left font-bold transition-all transform active:scale-95 ${
                selected === opt 
                  ? 'border-[#2563EB] bg-blue-50 text-[#2563EB] ring-4 ring-blue-50' 
                  : 'border-gray-100 bg-gray-50 text-gray-500 hover:border-gray-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{opt}</span>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  selected === opt ? 'border-[#2563EB] bg-[#2563EB]' : 'border-gray-300'
                }`}>
                  {selected === opt && <div className="w-2 h-2 bg-white rounded-full"></div>}
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-12 h-20 flex items-center justify-center">
          {selected && (
            <button 
              onClick={handleContinue}
              className="px-10 py-4 bg-[#2563EB] text-white font-black rounded-full animate-in zoom-in duration-300 shadow-xl shadow-blue-500/30"
            >
              Continue to Solution
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
