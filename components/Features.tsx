
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import { 
  ArrowPathIcon, 
  SparklesIcon, 
  DocumentCheckIcon, 
  ArrowsRightLeftIcon,
  ShieldCheckIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

const features = [
  {
    title: "AI SEO Optimization",
    desc: "Automatically generate high-converting titles & bullet points for each marketplace.",
    icon: SparklesIcon,
    color: "text-blue-400"
  },
  {
    title: "Auto GST + HSN",
    desc: "Compliance made easy. We auto-fill HSN codes and GST rates for Indian beauty categories.",
    icon: DocumentCheckIcon,
    color: "text-emerald-400"
  },
  {
    title: "Inventory Sync",
    desc: "Overselling is over. One sale on Meesho updates inventory across Amazon & Flipkart.",
    icon: ArrowsRightLeftIcon,
    color: "text-purple-400"
  },
  {
    title: "CSV + API Ready",
    desc: "Download formatted bulk sheets or push directly to marketplace APIs.",
    icon: ArrowPathIcon,
    color: "text-orange-400"
  },
  {
    title: "Built for India",
    desc: "Designed specifically for the nuances of Flipkart, Amazon.in and Meesho.",
    icon: ShieldCheckIcon,
    color: "text-red-400"
  },
  {
    title: "10 Hours to 10 Mins",
    desc: "Launch 50 SKUs in under an hour instead of spending weeks in Excel.",
    icon: ClockIcon,
    color: "text-yellow-400"
  }
];

export const Features: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-16">
      {features.map((f, i) => (
        <div key={i} className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800 hover:border-zinc-700 transition-all group">
          <div className={`w-12 h-12 rounded-xl bg-zinc-800 flex items-center justify-center mb-4 transition-transform group-hover:scale-110`}>
            <f.icon className={`w-6 h-6 ${f.color}`} />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">{f.title}</h3>
          <p className="text-zinc-400 text-sm leading-relaxed">{f.desc}</p>
        </div>
      ))}
    </div>
  );
};
