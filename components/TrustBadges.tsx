
import React from 'react';
import { ShieldCheckIcon, UserGroupIcon, ChatBubbleBottomCenterTextIcon, Square3Stack3DIcon } from '@heroicons/react/24/solid';

export const TrustBadges: React.FC = () => {
  const badges = [
    { label: "GST-compliant from day one", icon: ShieldCheckIcon },
    { label: "Marketplace formatting built-in", icon: Square3Stack3DIcon },
    { label: "Personal founder onboarding", icon: UserGroupIcon },
    { label: "24/7 WhatsApp support", icon: ChatBubbleBottomCenterTextIcon }
  ];

  return (
    <section className="py-16 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {badges.map((badge, i) => (
            <div key={i} className="flex flex-col items-center text-center gap-3">
              <badge.icon className="w-8 h-8 text-[#10B981]" />
              <span className="text-xs font-bold text-gray-500 uppercase tracking-widest leading-tight">{badge.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
