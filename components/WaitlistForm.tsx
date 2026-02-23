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
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [formData, setFormData] = useState<FormState>({
    fullName: '',
    mobile: '',
    email: '',
    marketplace: '',
    skus: '',
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setSubmitError('');

    try {
      const web3FormData = new FormData();
      web3FormData.append("access_key", "b54ffb0d-1d4f-4ca2-8c60-482bfa67e4ce");
      web3FormData.append("Full Name", formData.fullName);
      web3FormData.append("Mobile/WhatsApp", formData.mobile);
      web3FormData.append("Email", formData.email);
      web3FormData.append("Primary Marketplace", formData.marketplace);
      web3FormData.append("Number of SKUs", formData.skus);
      web3FormData.append("City", formData.city);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: web3FormData,
      });

      const data = await response.json();

      if (data.success) {
        setSubmitted(true);
      } else {
        setSubmitError(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      setSubmitError("Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof ErrorState]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6">

      {/* ── Success Popup Modal ── */}
      {submitted && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)' }}
        >
          <div
            className="relative bg-white rounded-[2rem] p-10 md:p-14 max-w-md w-full text-center shadow-2xl"
            style={{ animation: 'popIn 0.4s cubic-bezier(0.34,1.56,0.64,1) both' }}
          >
            {/* Animated checkmark circle */}
            <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6 shadow-lg"
              style={{ animation: 'popIn 0.5s 0.1s cubic-bezier(0.34,1.56,0.64,1) both' }}>
              <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center shadow-md">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            {/* Confetti dots decoration */}
            <div className="absolute top-6 left-8 w-3 h-3 rounded-full bg-orange-400 opacity-70" style={{ animation: 'floatDot 3s ease-in-out infinite' }} />
            <div className="absolute top-10 right-10 w-2 h-2 rounded-full bg-green-400 opacity-60" style={{ animation: 'floatDot 2.5s 0.5s ease-in-out infinite' }} />
            <div className="absolute bottom-10 left-10 w-2 h-2 rounded-full bg-blue-400 opacity-50" style={{ animation: 'floatDot 3.5s 1s ease-in-out infinite' }} />
            <div className="absolute bottom-8 right-8 w-3 h-3 rounded-full bg-purple-400 opacity-60" style={{ animation: 'floatDot 2.8s 0.3s ease-in-out infinite' }} />

            <p className="text-xs font-black uppercase tracking-widest text-green-600 mb-2">Registration Successful</p>
            <h3 className="text-3xl md:text-4xl font-black text-[#1F2937] mb-4 tracking-tight leading-tight">
              Thank You! 🎉
            </h3>
            <p className="text-gray-500 font-semibold text-base mb-1">
              You're on the early access list.
            </p>
            <p className="text-gray-700 font-bold text-base">
              We'll connect with you shortly on WhatsApp.
            </p>

            <div className="mt-8 pt-6 border-t border-gray-100">
              <p className="text-[11px] font-black uppercase tracking-widest text-gray-400">
                Founders personally onboarding first 100 sellers 🚀
              </p>
            </div>
          </div>

          {/* Keyframe styles */}
          <style>{`
            @keyframes popIn {
              0%   { opacity: 0; transform: scale(0.7); }
              100% { opacity: 1; transform: scale(1); }
            }
            @keyframes floatDot {
              0%, 100% { transform: translateY(0px); }
              50%       { transform: translateY(-8px); }
            }
          `}</style>
        </div>
      )}
      <div className="bg-[#F9FAFB] rounded-[2.5rem] border border-gray-100 p-8 md:p-16 shadow-xl relative">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#1F2937] mb-4 tracking-tight">Get Started in 2 Minutes</h2>
          <p className="text-gray-500 font-medium">Enter your details for the beta waitlist</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          {/* Honeypot – spam protection (hidden from real users, bots fill it) */}
          <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

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

          {/* Global submit error */}
          {submitError && (
            <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-600">
              <ExclamationCircleIcon className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm font-bold">{submitError}</span>
            </div>
          )}

          <div className="pt-6">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#F97316] text-white font-black py-6 rounded-2xl hover:bg-[#EA580C] transition-all transform active:scale-95 shadow-xl shadow-orange-500/30 text-xl disabled:opacity-70 disabled:cursor-not-allowed disabled:active:scale-100"
            >
              {isLoading ? 'Submitting...' : 'Join Early Access'}
            </button>
            <p className="text-center text-gray-400 text-xs mt-6 font-medium">We respect your privacy. No spam. Founders personally onboarding first 100 sellers.</p>
          </div>
        </form>
      </div>
    </div>
  );
};