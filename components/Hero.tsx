import React from 'react';
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/solid';

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-16 pb-12 md:pt-32 md:pb-16 bg-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-blue-50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter text-[#1F2937] mb-8 leading-[0.95] animate-in fade-in slide-in-from-top-10 duration-700">
          List Once.<br />
          <span className="text-[#2563EB]">Publish Everywhere.</span>
        </h1>
        
        <p className="text-xl sm:text-2xl text-gray-500 max-w-4xl mx-auto leading-relaxed mb-12 animate-in fade-in slide-in-from-top-12 duration-1000">
          Automate your listings for{' '}
          <span className="font-bold text-[#1F2937] hover:text-[#FF9900] cursor-pointer transition-all duration-300 relative group px-1">
            Amazon
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#FF9900] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
          </span>,{' '}
          <span className="font-bold text-[#1F2937] hover:text-[#2874F0] cursor-pointer transition-all duration-300 relative group px-1">
            Flipkart
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#2874F0] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
          </span>,{' '}
          <span className="font-bold text-[#1F2937] hover:text-[#ff47be] cursor-pointer transition-all duration-300 relative group px-1">
            Meesho
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#ff47be] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
          </span>{' '}
          & <span className="font-bold text-[#1F2937]">etc</span> for{' '}
          <span className="font-medium text-gray-500 group/india relative cursor-default inline-block">
            All{' '}
            <span className="relative inline-flex flex-col items-center">
              <span className="inline-flex">
                <span className="text-[#1F2937] group-hover/india:text-[#FF9933] transition-colors duration-300 font-black">Ind</span>
                <span className="text-[#1F2937] font-black group-hover/india:text-gray-400 transition-colors duration-300">ia</span>
                <span className="text-[#1F2937] group-hover/india:text-[#138808] transition-colors duration-300 font-black">n</span>
              </span>
              <span className="absolute -bottom-4 text-[10px] font-mono font-black text-gray-400 opacity-0 group-hover/india:opacity-100 group-hover/india:translate-y-1 transition-all duration-300 tracking-widest">
                IN
              </span>
            </span>
            {' '}products.
          </span>
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-in fade-in slide-in-from-bottom-10 duration-1000">
          <button 
            onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
            className="w-full sm:w-auto px-10 py-5 bg-[#F97316] hover:bg-[#EA580C] text-white font-black rounded-2xl transition-all transform hover:scale-105 active:scale-95 text-xl shadow-[0_10px_40px_-10px_rgba(249,115,22,0.4)]"
          >
            Get Free Early Access
          </button>
          <a 
            href="https://wa.me/9560154403?text=Hi, I want to see how ListSync works"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-10 py-5 bg-white border-2 border-[#2563EB] text-[#2563EB] font-bold rounded-2xl transition-all flex items-center justify-center gap-2 text-xl hover:bg-blue-50 shadow-[0_10px_40px_-10px_rgba(37,99,235,0.15)]"
          >
            <ChatBubbleLeftRightIcon className="w-6 h-6" />
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};