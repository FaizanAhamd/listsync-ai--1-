/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState } from 'react';
import { Hero } from './components/Hero';
import { SolutionSection } from './components/SolutionSection';
import { HowItWorks } from './components/HowItWorks';
import { HowItWorksSteps } from './components/HowItWorksSteps';
import { ComparisonTable } from './components/ComparisonTable';
import { TrustBadges } from './components/TrustBadges';
import { WaitlistForm } from './components/WaitlistForm';
import { WhatsAppCTA } from './components/WhatsAppCTA';
import { AIChatBot } from './components/AIChatBot';
import { CSVGenerator } from './components/CSVGenerator';
import { optimizeListing } from './services/gemini';
import { 
  SparklesIcon, 
  ArrowPathIcon, 
  CubeIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  ShoppingBagIcon
} from '@heroicons/react/24/solid';

const App: React.FC = () => {
  const [productName, setProductName] = useState("Vitamin C Face Serum");
  const [brand, setBrand] = useState("PureGlow");
  const [category, setCategory] = useState("Skin Care");
  const [featuresText, setFeaturesText] = useState("20% Vitamin C, Hyaluronic Acid, Organic, 100% Vegan");
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleDemo = async () => {
    if (!productName) return;
    setIsOptimizing(true);
    try {
      const data = await optimizeListing({
        name: productName,
        brand: brand,
        category: category,
        features: featuresText
      });
      setResults(data);
    } catch (e) {
      console.error(e);
      alert("AI optimization failed. Please check your API key.");
    } finally {
      setIsOptimizing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-[#1F2937] font-sans selection:bg-[#2563EB]/20">
      {/* Navbar */}
      <nav className="bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#2563EB] rounded-xl flex items-center justify-center font-bold text-white text-2xl shadow-lg shadow-blue-500/30">L</div>
            <span className="text-2xl font-extrabold tracking-tighter">
              <span className="text-[#FF9933]">List</span>
              <span className="text-[#1F2937]">Sync</span>
              <span className="text-[#138808] ml-1">AI</span>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-10 text-sm font-bold text-gray-500">
            <a href="#automation-demo" className="hover:text-[#2563EB] transition-colors">Product Hub</a>
            <a href="#how-it-works" className="hover:text-[#2563EB] transition-colors">How it Works</a>
            <a href="#comparison" className="hover:text-[#2563EB] transition-colors">Why Us?</a>
            <button 
              onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-[#2563EB] text-white px-8 py-3 rounded-full font-black hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/25 transform active:scale-95"
            >
              Sign In (Free)
            </button>
          </div>
        </div>
      </nav>

      <main>
        <Hero />
        
        <SolutionSection />
        
        <HowItWorks />
        
        <HowItWorksSteps />
        
        <ComparisonTable />

        {/* Unified Product Hub Demo - Moved down after Comparison Table CTA as requested */}
        <section id="automation-demo" className="py-24 bg-white overflow-hidden relative border-t border-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-extrabold text-[#1F2937] mb-4 tracking-tight">Unified Product Hub</h2>
              <p className="text-lg text-gray-500">Experience our 4-layer AI transformation engine in real-time.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Input Layer */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-white border border-gray-200 p-8 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
                  <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                    <CubeIcon className="w-5 h-5 text-[#2563EB]" />
                    Product Identity
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-mono uppercase text-gray-400 mb-1.5 font-bold">Product Name</label>
                      <input 
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[#1F2937] font-bold focus:outline-none focus:border-[#2563EB] transition-all"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-mono uppercase text-gray-400 mb-1.5 font-bold">Brand</label>
                        <input 
                          value={brand}
                          onChange={(e) => setBrand(e.target.value)}
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none" 
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono uppercase text-gray-400 mb-1.5 font-bold">Category</label>
                        <select 
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none"
                        >
                          <option>Skin Care</option>
                          <option>Hair Care</option>
                          <option>Makeup</option>
                          <option>Electronics</option>
                          <option>Home Decor</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase text-gray-400 mb-1.5 font-bold">Key Ingredients / Features</label>
                      <textarea 
                        value={featuresText}
                        onChange={(e) => setFeaturesText(e.target.value)}
                        rows={3}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#2563EB] transition-all resize-none"
                      />
                    </div>
                  </div>

                  <button 
                    onClick={handleDemo}
                    disabled={isOptimizing || !productName}
                    className="w-full bg-[#2563EB] disabled:opacity-50 text-white font-black py-4 rounded-xl mt-8 flex items-center justify-center gap-3 text-lg hover:bg-blue-700 transition-all shadow-lg"
                  >
                    {isOptimizing ? (
                      <ArrowPathIcon className="w-6 h-6 animate-spin" />
                    ) : (
                      <>
                        <SparklesIcon className="w-6 h-6" />
                        Automate Listing
                      </>
                    )}
                  </button>
                </div>

                <div className="p-6 bg-blue-50 border border-blue-100 rounded-2xl">
                   <h4 className="flex items-center gap-2 text-[#2563EB] font-bold text-sm mb-2">
                     <ShoppingBagIcon className="w-4 h-4" />
                     Multi-Marketplace Ready
                   </h4>
                   <p className="text-[11px] text-blue-600 leading-relaxed">Our AI automatically detects the best HSN/GST slab and maps your content to Amazon, Flipkart, and Meesho templates with technical precision.</p>
                </div>
              </div>

              {/* Transformation Output */}
              <div className="lg:col-span-7">
                <div className="bg-[#121214] rounded-3xl overflow-hidden border border-gray-800 shadow-2xl flex flex-col h-full min-h-[600px]">
                  <div className="bg-[#1a1a1c] px-6 py-4 flex items-center justify-between border-b border-gray-800">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500/30"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500/30"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500/30"></div>
                    </div>
                    <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Processing Artifact: {results ? results.parent.sku : 'SKU_MASTER_01'}</div>
                  </div>

                  <div className="p-8 flex-1 overflow-y-auto">
                    {!results ? (
                      <div className="h-full flex flex-col items-center justify-center text-gray-700 space-y-4">
                        <ArrowPathIcon className="w-12 h-12 opacity-10" />
                        <p className="font-mono text-sm uppercase tracking-tighter opacity-30">Waiting for payload...</p>
                      </div>
                    ) : (
                      <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                        {/* Validation Layer */}
                        <div className="bg-green-500/5 border border-green-500/20 p-4 rounded-xl flex items-start gap-3">
                          <CheckCircleIcon className="w-6 h-6 text-green-500" />
                          <div>
                            <p className="text-green-500 font-bold text-sm">Pre-validation Passed</p>
                            <p className="text-green-500/70 text-xs">JSON Schema verified. Normalization applied (HSN {results.parent.hsn}, GST {results.parent.gst_rate}%).</p>
                          </div>
                        </div>

                        {/* Marketplace View */}
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <h4 className="text-xs font-black text-gray-500 uppercase tracking-widest">Download Bulk Sheets</h4>
                            <div className="flex flex-wrap gap-2">
                                <CSVGenerator data={results} platform="Amazon" />
                                <CSVGenerator data={results} platform="Flipkart" />
                                <CSVGenerator data={results} platform="Meesho" />
                            </div>
                          </div>
                          
                          <div className="p-6 bg-[#09090b] border border-gray-800 rounded-2xl space-y-6">
                            <div className="space-y-2">
                               <p className="text-[10px] font-mono text-blue-500 uppercase font-black">AI Optimized SEO Title</p>
                               <p className="text-gray-200 text-sm font-bold leading-relaxed">{results.parent.title}</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                               <div className="space-y-2">
                                  <p className="text-[10px] font-mono text-blue-500 uppercase font-black">Bullets (Key Features)</p>
                                  <ul className="space-y-1">
                                    {results.parent.bullets.map((b: string, i: number) => (
                                      <li key={i} className="text-[11px] text-gray-400 flex gap-2">
                                        <span className="text-[#2563EB] shrink-0">•</span> {b}
                                      </li>
                                    ))}
                                  </ul>
                               </div>
                               <div className="space-y-4">
                                  <div className="p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                                     <p className="text-[9px] font-mono text-gray-500 uppercase mb-1">Marketplace Compliance</p>
                                     <div className="flex flex-col gap-1">
                                        <div className="flex justify-between items-center">
                                           <span className="text-[10px] text-gray-400">HSN Code</span>
                                           <span className="text-xs font-bold text-white">{results.parent.hsn}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                           <span className="text-[10px] text-gray-400">GST Rate</span>
                                           <span className="text-xs font-bold text-[#2563EB]">{results.parent.gst_rate}%</span>
                                        </div>
                                     </div>
                                  </div>
                                  <div className="p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                                     <p className="text-[9px] font-mono text-gray-500 uppercase mb-1">Parent SKU Structure</p>
                                     <p className="text-[11px] text-gray-300 font-mono">{results.parent.sku}</p>
                                  </div>
                               </div>
                            </div>
                          </div>
                        </div>

                        {/* Variations View */}
                        <div className="space-y-4">
                          <h4 className="text-xs font-black text-gray-500 uppercase tracking-widest">Child Variations Generated ({results.children.length})</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                            {results.children.map((child: any, i: number) => (
                              <div key={i} className="p-4 bg-[#09090b] border border-gray-800 rounded-xl relative overflow-hidden group hover:border-[#2563EB] transition-colors">
                                <div className="absolute top-0 right-0 p-1">
                                   <div className="w-1.5 h-1.5 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
                                </div>
                                <p className="text-[10px] font-black text-blue-500 mb-1">{child.variation_value}</p>
                                <p className="text-[11px] text-gray-200 font-bold mb-2 truncate">{child.title}</p>
                                <div className="flex justify-between items-center">
                                   <span className="text-xs font-black text-white">₹{child.price}</span>
                                   <span className="text-[9px] font-mono text-gray-600">QTY: {child.quantity}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Validation Suggestions */}
                        {results.validation.suggestions.length > 0 && (
                          <div className="bg-blue-500/5 border border-blue-500/20 p-4 rounded-xl">
                            <h5 className="text-[10px] font-black text-blue-500 uppercase mb-2 flex items-center gap-1">
                              <ExclamationCircleIcon className="w-3 h-3" />
                              Optimization Tips
                            </h5>
                            <ul className="space-y-1">
                              {results.validation.suggestions.map((s: string, i: number) => (
                                <li key={i} className="text-[11px] text-gray-400 italic">"{s}"</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <TrustBadges />
        
        <section id="waitlist" className="py-20 bg-white">
          <WaitlistForm />
        </section>
        
        <WhatsAppCTA />

        <footer className="py-12 bg-gray-50 border-t border-gray-200 text-center">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col items-center gap-4 mb-8">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#2563EB] rounded flex items-center justify-center font-bold text-white text-sm">L</div>
                <span className="text-xl font-extrabold tracking-tighter">
                  <span className="text-[#FF9933]">List</span>
                  <span className="text-[#1F2937]">Sync</span>
                  <span className="text-[#138808] ml-1">AI</span>
                </span>
              </div>
              <p className="text-gray-500 text-sm max-w-md">The #1 multi-marketplace listing automation platform for Indian sellers of all products.</p>
            </div>
            <div className="flex justify-center gap-8 text-sm text-gray-400 font-medium mb-8">
              <a href="#" className="hover:text-gray-600">Privacy Policy</a>
              <a href="#" className="hover:text-gray-600">Terms of Service</a>
              <a href="#" className="hover:text-gray-600">Contact Us</a>
            </div>
            <p className="text-gray-400 text-xs font-mono">India-first. All Products. © 2024 ListSync AI</p>
          </div>
        </footer>
      </main>
      
      <AIChatBot />
    </div>
  );
};

export default App;
