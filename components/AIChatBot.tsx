
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useRef, useEffect } from 'react';
import { ChatBubbleLeftRightIcon, XMarkIcon, PaperAirplaneIcon } from '@heroicons/react/24/solid';
import { chatWithAI } from '../services/gemini';

export const AIChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', text: string }[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg = input.trim();
    setInput('');
    
    // Update local state with user message
    const currentHistory = [...messages];
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const response = await chatWithAI(userMsg, currentHistory);
      setMessages(prev => [...prev, { role: 'ai', text: response }]);
    } catch (e) {
      console.error("Chat Error:", e);
      setMessages(prev => [...prev, { role: 'ai', text: "I'm sorry, I'm having a hard time reaching the server. Please try again in a moment." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      {isOpen ? (
        <div className="w-80 sm:w-96 h-[500px] bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
          <div className="p-4 bg-emerald-600 flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <ChatBubbleLeftRightIcon className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-white tracking-tight">ListSync Assistant</span>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className="text-white/80 hover:text-white transition-colors"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>
          
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-zinc-950 scroll-smooth">
            {messages.length === 0 && (
              <div className="text-center text-zinc-500 mt-10 p-6">
                <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/20">
                  <ChatBubbleLeftRightIcon className="w-6 h-6 text-emerald-500" />
                </div>
                <p className="font-bold text-zinc-300">Namaste!</p>
                <p className="text-sm mt-1 leading-relaxed">I'm your dedicated e-commerce assistant. Ask me about Amazon SEO, HSN codes, or how to scale your brand!</p>
              </div>
            )}
            
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                <div className={`max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed ${
                  m.role === 'user' 
                    ? 'bg-emerald-600 text-white rounded-tr-none shadow-md' 
                    : 'bg-zinc-800 text-zinc-100 rounded-tl-none border border-zinc-700'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-zinc-800 p-3.5 rounded-2xl rounded-tl-none border border-zinc-700 animate-pulse flex gap-1">
                  <div className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce delay-75"></div>
                  <div className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce delay-150"></div>
                </div>
              </div>
            )}
          </div>
          
          <div className="p-4 bg-zinc-900 border-t border-zinc-800 flex gap-2">
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your question..."
              className="flex-1 bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition-all placeholder:text-zinc-500"
            />
            <button 
              onClick={handleSend} 
              disabled={!input.trim() || isLoading}
              className="p-2.5 bg-emerald-600 rounded-xl hover:bg-emerald-500 disabled:opacity-50 disabled:hover:bg-emerald-600 transition-all shadow-lg active:scale-95"
            >
              <PaperAirplaneIcon className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center shadow-[0_8px_30px_rgb(16,185,129,0.3)] hover:scale-110 transition-all group relative border-4 border-zinc-950"
        >
          <div className="absolute inset-0 rounded-full animate-ping bg-emerald-500/20 pointer-events-none group-hover:hidden"></div>
          <ChatBubbleLeftRightIcon className="w-8 h-8 text-white group-hover:rotate-12 transition-transform" />
        </button>
      )}
    </div>
  );
};
