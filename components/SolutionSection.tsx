import React from 'react';
import { CheckBadgeIcon } from '@heroicons/react/24/solid';

export const SolutionSection: React.FC = () => {
  const benefits = [
    "AI writes Amazon titles & bullets (SEO-optimized)",
    "Auto-formats listings for Flipkart compliance",
    "Generates Meesho listings in one click",
    "Fills GST & HSN automatically based on category",
    "Syncs inventory in real-time across all platforms",
    "Exports formatted CSV & API-ready files"
  ];

  return (
    <section id="solution" className="py-24 bg-[#F9FAFB]">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#1F2937] mb-6 tracking-tight">
            What If You Could List Once & <br className="hidden md:block"/> Publish Everywhere?
          </h2>
          <p className="text-xl text-[#2563EB] font-bold">
            ListSync AI is built specifically for Indian sellers
          </p>
        </div>

        {/* Benefits + Image */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">

          {/* LEFT SIDE */}
          <div className="space-y-5">
            {benefits.map((benefit, i) => (
              <div
                key={i}
                className="flex gap-4 items-center bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition duration-300"
              >
                <CheckBadgeIcon className="w-7 h-7 text-[#10B981] shrink-0" />
                <span className="font-semibold text-gray-700">
                  {benefit}
                </span>
              </div>
            ))}
          </div>

          {/* RIGHT SIDE */}
          <div className="relative flex justify-center md:justify-end">

            {/* Soft Glow */}
            <div className="absolute -inset-8 bg-gradient-to-r from-blue-200 to-purple-200 rounded-3xl blur-3xl opacity-20"></div>

            <img
              src="/create_listing.png"
              alt="ListSync AI Dashboard Preview"
              className="relative w-full max-w-2xl rounded-2xl shadow-2xl border border-gray-200"
            />
          </div>

        </div>

        {/* Math Section */}
        <div className="rounded-3xl bg-gradient-to-r from-red-100 to-orange-100 p-12 shadow-lg">
          <h3 className="text-3xl md:text-4xl font-bold text-red-900 mb-6 text-center">
            The Math Is Devastating
          </h3>

          <p className="text-xl text-red-800 leading-relaxed text-center max-w-4xl mx-auto">
            If you're manually managing just 50 listings across Amazon, Flipkart, and Meesho, you're spending
            <span className="font-bold text-red-600"> 15+ hours per week </span>
            on repetitive tasks.
            At even <span className="font-bold text-red-600"> ₹200 per hour</span>, that's over
            <span className="font-bold text-red-600"> ₹12,000+ per month </span>
            in lost time.
            But the real cost?
            The <span className="font-bold text-red-600"> ₹8–10 lakhs in missed sales </span>
            because you can't scale fast enough.
          </p>
        </div>

      </div>
    </section>
  );
};
