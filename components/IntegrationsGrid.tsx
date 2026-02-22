
import React from 'react';

export const IntegrationsGrid: React.FC = () => {
  const integrations = [
    { name: 'amazon.in', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' },
    { name: 'flipkart', logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b9/Flipkart_logo.png' },
    { name: 'meesho', logo: 'https://upload.wikimedia.org/wikipedia/commons/8/80/Meesho_Logo_Full.png' },
    { name: 'myntra', logo: 'https://upload.wikimedia.org/wikipedia/commons/b/bc/Myntra_logo.png' },
    { name: 'nykaa', logo: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/Nykaa_Logo.svg' },
    { name: 'ajio', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Ajio_Logo.svg/2560px-Ajio_Logo.svg.png' },
    { name: 'jiomart', logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/JioMart_logo.svg' },
    { name: 'snapdeal', logo: 'https://upload.wikimedia.org/wikipedia/commons/b/bc/Snapdeal_logo.svg' },
    { name: 'bigbasket', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Bigbasket_logo.png' },
    { name: 'blinkit', logo: 'https://upload.wikimedia.org/wikipedia/commons/c/c5/Blinkit_logo.svg' },
    { name: 'zepto', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Zepto_logo.svg' },
    { name: 'See More...', isText: true },
  ];

  return (
    <div className="w-full">
      <h2 className="text-3xl md:text-5xl font-black text-[#1F2937] text-center mb-12 tracking-tight">
        One Click Integrations With:
      </h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 border-t border-l border-black">
        {integrations.map((item, i) => (
          <div 
            key={i} 
            className="bg-white border-r border-b border-black flex items-center justify-center h-24 sm:h-28 hover:bg-gray-50 transition-all cursor-pointer px-4 group"
          >
            {item.isText ? (
              <span className="text-gray-400 font-bold text-sm tracking-tight">{item.name}</span>
            ) : (
              <img 
                src={item.logo} 
                alt={item.name} 
                className="max-h-10 sm:max-h-12 w-auto object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300" 
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
