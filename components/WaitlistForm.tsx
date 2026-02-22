import React, { useState } from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/24/solid';

interface FormState {
  fullName: string;
  mobile: string;
  email: string;
  marketplace: string;
  skus: string;
  city: string;
}

interface ErrorState {
  fullName?: string;
  mobile?: string;
  email?: string;
  marketplace?: string;
  skus?: string;
  city?: string;
}

export const WaitlistForm: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormState>({
    fullName: '',
    mobile: '',
    email: '',
    marketplace: '', // Empty to force selection
    skus: '', // Empty to force selection
    city: ''
  });
  const [errors, setErrors] = useState<ErrorState>({});

  const validate = (): boolean => {
    const newErrors: ErrorState = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = "Please enter a valid name";
    }

    const mobileRegex = /^[6-9]\d{9}$|^(\+91)?[6-9]\d{9}$/;
    const cleanMobile = formData.mobile.replace(/\s+/g, '');
    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!mobileRegex.test(cleanMobile)) {
      newErrors.mobile = "Enter a valid 10-digit mobile number";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Gmail/Email ID is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.marketplace) {
      newErrors.marketplace = "Please select a marketplace";
    }

    if (!formData.skus) {
      newErrors.skus = "Please select your SKU count";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required for onboarding";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof ErrorState]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto p-12 rounded-[2rem] bg-green-50 border-4 border-green-100 text-center animate-in zoom-in duration-500">
        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
           <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
        </div>
        <h3 className="text-3xl font-black text-green-800 mb-4 tracking-tight">You're on the list! 🚀</h3>
        <p className="text-green-700 font-bold text-lg">Our founder will reach out to you personally on WhatsApp within 24 hours to schedule your onboarding.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6">
      <div className="bg-[#F9FAFB] rounded-[2.5rem] border border-gray-100 p-8 md:p-16 shadow-xl relative">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#1F2937] mb-4 tracking-tight">Get Started in 2 Minutes</h2>
          <p className="text-gray-500 font-medium">Enter your details for the beta waitlist</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          {/* Full Name & Mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative">
              <label className="block text-xs font-black uppercase text-gray-400 mb-2 tracking-widest">Full Name</label>
              <input 
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                type="text" 
                placeholder="Rahul Sharma" 
                className={`w-full bg-white border-2 ${errors.fullName ? 'border-red-500 bg-red-50/10' : 'border-gray-100'} rounded-2xl px-6 py-4 text-[#1F2937] font-bold focus:outline-none focus:border-[#2563EB] transition-all placeholder:text-gray-300`} 
              />
              {errors.fullName && (
                <div className="flex items-center gap-1 mt-2 text-red-600">
                  <ExclamationCircleIcon className="w-4 h-4" />
                  <span className="text-[11px] font-black uppercase tracking-tight">{errors.fullName}</span>
                </div>
              )}
            </div>
            <div className="relative">
              <label className="block text-xs font-black uppercase text-gray-400 mb-2 tracking-widest">Mobile/WhatsApp</label>
              <input 
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                type="tel" 
                placeholder="+91 98765 43210" 
                className={`w-full bg-white border-2 ${errors.mobile ? 'border-red-500 bg-red-50/10' : 'border-gray-100'} rounded-2xl px-6 py-4 text-[#1F2937] font-bold focus:outline-none focus:border-[#2563EB] transition-all placeholder:text-gray-300`} 
              />
              {errors.mobile && (
                <div className="flex items-center gap-1 mt-2 text-red-600">
                  <ExclamationCircleIcon className="w-4 h-4" />
                  <span className="text-[11px] font-black uppercase tracking-tight">{errors.mobile}</span>
                </div>
              )}
            </div>
          </div>

          {/* Gmail ID (Prominent Full Width) */}
          <div className="relative">
            <label className="block text-xs font-black uppercase text-gray-400 mb-2 tracking-widest">Gmail ID / Email</label>
            <input 
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email" 
              placeholder="rahul@gmail.com" 
              className={`w-full bg-white border-2 ${errors.email ? 'border-red-500 bg-red-50/10' : 'border-gray-100'} rounded-2xl px-6 py-4 text-[#1F2937] font-bold focus:outline-none focus:border-[#2563EB] transition-all placeholder:text-gray-300`} 
            />
            {errors.email && (
              <div className="flex items-center gap-1 mt-2 text-red-600">
                <ExclamationCircleIcon className="w-4 h-4" />
                <span className="text-[11px] font-black uppercase tracking-tight">{errors.email}</span>
              </div>
            )}
          </div>
          
          {/* Marketplace & SKU Count */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative">
              <label className="block text-xs font-black uppercase text-gray-400 mb-2 tracking-widest">Primary Marketplace</label>
              <select 
                name="marketplace"
                value={formData.marketplace}
                onChange={handleChange}
                className={`w-full bg-white border-2 ${errors.marketplace ? 'border-red-500 bg-red-50/10' : 'border-gray-100'} rounded-2xl px-6 py-4 text-[#1F2937] font-bold focus:outline-none focus:border-[#2563EB] transition-all appearance-none ${!formData.marketplace ? 'text-gray-300' : 'text-[#1F2937]'}`}
              >
                <option value="">Select Marketplace...</option>
                <option value="Amazon.in">Amazon.in</option>
                <option value="Flipkart">Flipkart</option>
                <option value="Meesho">Meesho</option>
                <option value="Multiple">All of the above</option>
              </select>
              {errors.marketplace && (
                <div className="flex items-center gap-1 mt-2 text-red-600">
                  <ExclamationCircleIcon className="w-4 h-4" />
                  <span className="text-[11px] font-black uppercase tracking-tight">{errors.marketplace}</span>
                </div>
              )}
            </div>
            <div className="relative">
              <label className="block text-xs font-black uppercase text-gray-400 mb-2 tracking-widest">Number of SKUs</label>
              <select 
                name="skus"
                value={formData.skus}
                onChange={handleChange}
                className={`w-full bg-white border-2 ${errors.skus ? 'border-red-500 bg-red-50/10' : 'border-gray-100'} rounded-2xl px-6 py-4 text-[#1F2937] font-bold focus:outline-none focus:border-[#2563EB] transition-all appearance-none ${!formData.skus ? 'text-gray-300' : 'text-[#1F2937]'}`}
              >
                <option value="">Select SKU count...</option>
                <option value="1-10">1-10 SKUs</option>
                <option value="11-50">11-50 SKUs</option>
                <option value="50+">50+ SKUs</option>
              </select>
              {errors.skus && (
                <div className="flex items-center gap-1 mt-2 text-red-600">
                  <ExclamationCircleIcon className="w-4 h-4" />
                  <span className="text-[11px] font-black uppercase tracking-tight">{errors.skus}</span>
                </div>
              )}
            </div>
          </div>
          
          {/* City */}
          <div className="relative">
            <label className="block text-xs font-black uppercase text-gray-400 mb-2 tracking-widest">City</label>
            <input 
              name="city"
              value={formData.city}
              onChange={handleChange}
              type="text" 
              placeholder="e.g. Surat" 
              className={`w-full bg-white border-2 ${errors.city ? 'border-red-500 bg-red-50/10' : 'border-gray-100'} rounded-2xl px-6 py-4 text-[#1F2937] font-bold focus:outline-none focus:border-[#2563EB] transition-all placeholder:text-gray-300`} 
            />
            {errors.city && (
              <div className="flex items-center gap-1 mt-2 text-red-600">
                <ExclamationCircleIcon className="w-4 h-4" />
                <span className="text-[11px] font-black uppercase tracking-tight">{errors.city}</span>
              </div>
            )}
          </div>
          
          <div className="pt-6">
            <button type="submit" className="w-full bg-[#F97316] text-white font-black py-6 rounded-2xl hover:bg-[#EA580C] transition-all transform active:scale-95 shadow-xl shadow-orange-500/30 text-xl">
              Join Early Access
            </button>
            <p className="text-center text-gray-400 text-xs mt-6 font-medium">We respect your privacy. No spam. Founders personally onboarding first 100 sellers.</p>
          </div>
        </form>
      </div>
    </div>
  );
};