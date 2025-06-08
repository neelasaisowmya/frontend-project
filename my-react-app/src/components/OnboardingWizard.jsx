import React, { useState } from "react";
import ConfettiEffect from "./ConfettiEffect";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

const steps = [
  { label: "Welcome" },
  { label: "Personal Info" },
  { label: "Business Info" },
  { label: "Preferences" },
];

const initialData = {
  name: "",
  email: "",
  company: "",
  industry: "",
  size: "",
  theme: "light",
  layout: "default",
};

const OnboardingWizard = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const { updateUser } = useUser();

  // Validation logic per step
  const validate = () => {
    const newErrors = {};
    if (step === 1) {
      if (!formData.name) newErrors.name = "Name is required";
      if (!formData.email) newErrors.email = "Email is required";
      else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email)) newErrors.email = "Invalid email";
    }
    if (step === 2) {
      if (!formData.company) newErrors.company = "Company name is required";
      if (!formData.industry) newErrors.industry = "Industry is required";
      if (!formData.size) newErrors.size = "Company size is required";
    }
    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    let validation = {};
    if (step === 0) {
      // Validate name/email
      if (!formData.name) validation.name = "Name is required";
      if (!formData.email) validation.email = "Email is required";
      else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email)) validation.email = "Invalid email";
      if (Object.keys(validation).length === 0) {
        setErrors({});
        setStep((prev) => prev + 1);
      } else {
        setErrors(validation);
      }
    } else if (step === 1) {
      // Validate company/industry/size
      if (!formData.company) validation.company = "Company name is required";
      if (!formData.industry) validation.industry = "Industry is required";
      if (!formData.size) validation.size = "Company size is required";
      if (Object.keys(validation).length === 0) {
        setErrors({});
        setStep((prev) => prev + 1);
      } else {
        setErrors(validation);
      }
    } else {
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setErrors({});
    setStep((prev) => prev - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted at step:', step, 'FormData:', formData);
    const validation = validate();
    if (Object.keys(validation).length === 0) {
      setErrors({});
      if (step < steps.length - 1) {
        setStep((prev) => {
          console.log('Advancing to step', prev + 1);
          return prev + 1;
        });
      } else {
        setSubmitted(true);
        updateUser(formData);
        setTimeout(() => {
          navigate("/dashboard");
        }, 1200); // Redirect after 1.2s for feedback
      }
    } else {
      setErrors(validation);
      console.log('Validation errors:', validation);
    }
  };



  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gradientStart via-lightBg to-gradientEnd py-12 font-body">
      <div className="w-full max-w-xl mx-auto p-8 bg-white shadow-lg rounded-2xl transition-all duration-300 border border-gray-100">
        {/* Progress Bar */}
        <div className="flex items-center mb-10 animate-progress-shimmer">
          {steps.map((s, idx) => (
            <div key={s.label} className="flex-1 flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-extrabold shadow-md transition-all duration-300 border-4 font-display ${
                  idx < step
                    ? "bg-gradient-to-br from-primary-400 to-accent-400 text-white border-primary-200 scale-100"
                    : idx === step
                    ? "bg-white text-primary-700 border-primary-400 scale-110"
                    : "bg-accent-50 text-accent-300 border-accent-50"
                }`}
              >
                {idx + 1}
              </div>
              {idx < steps.length - 1 && (
                <div className={`flex-1 h-1 mx-1 rounded-full transition-all duration-300 ${idx < step ? "bg-gradient-to-r from-blue-400 to-purple-400" : "bg-gray-200"}`}></div>
              )}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 backdrop-blur-[2px]">
          {step === 0 && (
            <div className="flex flex-col items-center justify-center min-h-[360px]">
              <div className="relative bg-white rounded-xl shadow-lg p-8 w-full max-w-sm flex flex-col items-center">
                {/* Theme toggle icon */}
                <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 focus:outline-none" type="button" tabIndex={-1} aria-label="Toggle theme">
                  <svg xmlns="http://www.w3.org/2000/svg" width="5mm" height="5mm" style={{minWidth:'18.9px',minHeight:'18.9px'}} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" /></svg>
                </button>
                <h1 className="text-2xl font-bold mb-2 text-gray-900 w-full text-left">Welcome</h1>
                <p className="text-gray-600 text-sm mb-6 w-full text-left">Thank you for choosing our platform. Let's get you started with the onboarding process.</p>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-full py-2 rounded-md bg-[#2874f0] text-white font-bold text-base shadow hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  Start Onboarding
                </button>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4 transition-all">
              <h2 className="text-xl font-semibold mb-2">Personal Info</h2>
              <div>
                <div className="relative mb-2">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`font-semibold px-5 py-2 rounded-lg bg-gradient-to-r from-[#2874f0] to-[#06b6d4] text-white shadow-lg hover:scale-110 hover:shadow-2xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#2874f0]/50 focus:border-[#2874f0] border-gray-300 focus:bg-white focus:shadow-lg focus:shadow-[#2874f0]/20 text-sm ${errors.name ? 'border-red-400' : ''}`}
                    autoComplete="off"
                    placeholder="Full Name *"
                  />
                  {errors.name && <div className="text-red-700 text-xs mt-1 font-semibold bg-red-100 rounded px-2 py-1 shadow-sm animate-pulse">{errors.name}</div>}
                </div>
              </div>
              <div>
                <div className="relative mb-2">
                  <span className="absolute left-1.5 top-1/2 -translate-y-1/2 text-sm transition-transform duration-300 ease-in-out icon-animate group-focus-within:scale-110 group-focus-within:rotate-6">
                    <svg xmlns="http://www.w3.org/2000/svg" width="5mm" height="5mm" style={{minWidth:'18.9px',minHeight:'18.9px'}} fill="none" viewBox="0 0 24 24" stroke="#f59e42"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12H8m8 0a4 4 0 11-8 0 4 4 0 018 0zm2 4v1a3 3 0 01-3 3H7a3 3 0 01-3-3v-1a9 9 0 0118 0z" /></svg>
                  </span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`font-semibold px-5 py-2 rounded-lg bg-gradient-to-r from-[#2874f0] to-[#06b6d4] text-white shadow-lg hover:scale-110 hover:shadow-2xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#2874f0]/50 focus:border-[#2874f0] border-gray-300 focus:bg-white focus:shadow-lg focus:shadow-[#2874f0]/20 text-sm ${errors.email ? 'border-red-400' : ''}`}
                    autoComplete="off"
                    placeholder=" "
                  />
                  <label className={`absolute left-8 top-1/2 -translate-y-1/2 bg-white/95 px-1 text-gray-500 pointer-events-none transition-all duration-300 ease-in-out opacity-80 peer-focus:text-[#2874f0] peer-focus:top-2 peer-focus:text-xs peer-focus:opacity-100 peer-focus:translate-y-0 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-xs peer-placeholder-shown:text-gray-400 peer-placeholder-shown:opacity-80 text-xs ${formData.email ? 'top-2 text-xs text-[#2874f0]' : ''}`}>Email *</label>
                  {errors.email && <div className="text-red-700 text-xs mt-1 font-semibold bg-red-100 rounded px-2 py-1 shadow-sm animate-pulse">{errors.email}</div>}
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-2 mt-3 rounded-md bg-[#2874f0] text-white font-bold text-base shadow hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                Next
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 transition-all">
              <h2 className="text-xl font-semibold mb-2">Business Info</h2>
              <div>
                <div className="relative mb-2">
                  <span className="absolute left-2 top-1/2 -translate-y-1/2 text-sm transition-transform duration-300 ease-in-out icon-animate group-focus-within:scale-110 group-focus-within:rotate-6">
                    <svg xmlns="http://www.w3.org/2000/svg" width="5mm" height="5mm" style={{minWidth:'18.9px',minHeight:'18.9px'}} fill="none" viewBox="0 0 24 24" stroke="#2874f0"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21V7a2 2 0 012-2h2a2 2 0 012 2v14M13 21V3a2 2 0 012-2h2a2 2 0 012 2v18M9 21h6" /></svg>
                  </span>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    required
                    className={`font-semibold px-5 py-2 rounded-lg bg-gradient-to-r from-[#2874f0] to-[#06b6d4] text-white shadow-lg hover:scale-110 hover:shadow-2xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#2874f0]/50" focus:border-[#2874f0] border-gray-300 focus:bg-white focus:shadow-lg focus:shadow-[#2874f0]/20 text-sm" ${errors.company ? 'border-red-400' : ''}`}
                    autoComplete="off"
                    placeholder=" "
                  />
                  <label className={`absolute left-8 top-1/2 -translate-y-1/2 bg-white/95 px-1 text-gray-500 pointer-events-none transition-all duration-300 ease-in-out opacity-80 peer-focus:text-[#2874f0] peer-focus:top-2 peer-focus:text-xs peer-focus:opacity-100 peer-focus:translate-y-0 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-xs peer-placeholder-shown:text-gray-400 peer-placeholder-shown:opacity-80 text-xs ${formData.company ? 'top-2 text-xs text-[#2874f0]' : ''}`}>Company Name *</label>
                  {errors.company && <div className="text-red-700 text-xs mt-1 font-semibold bg-red-100 rounded px-2 py-1 shadow-sm animate-pulse">{errors.company}</div>}
                </div>
              </div>
              <div>
                <div className="relative mb-2">
                  <span className="absolute left-2 top-1/2 -translate-y-1/2 text-sm transition-transform duration-300 ease-in-out icon-animate group-focus-within:scale-110 group-focus-within:rotate-6">
                    <svg xmlns="http://www.w3.org/2000/svg" width="5mm" height="5mm" style={{minWidth:'18.9px',minHeight:'18.9px'}} fill="none" viewBox="0 0 24 24" stroke="#22c55e"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3C7.03 3 3 7.03 3 12s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 0c2.21 0 4 4.03 4 9s-1.79 9-4 9-4-4.03-4-9 1.79-9 4-9zm0 0v18" /></svg>
                  </span>
                  <input
                    type="text"
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    required
                    className={`font-semibold px-5 py-2 rounded-lg bg-gradient-to-r from-[#2874f0] to-[#06b6d4] text-white shadow-lg hover:scale-110 hover:shadow-2xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#2874f0]/50" focus:border-[#2874f0] border-gray-300 focus:bg-white focus:shadow-lg focus:shadow-[#2874f0]/20 text-sm" ${errors.industry ? 'border-red-400' : ''}`}
                    autoComplete="off"
                    placeholder=" "
                  />
                  <label className={`absolute left-8 top-1/2 -translate-y-1/2 bg-white/95 px-1 text-gray-500 pointer-events-none transition-all duration-300 ease-in-out opacity-80 peer-focus:text-[#2874f0] peer-focus:top-2 peer-focus:text-xs peer-focus:opacity-100 peer-focus:translate-y-0 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-xs peer-placeholder-shown:text-gray-400 peer-placeholder-shown:opacity-80 text-xs ${formData.industry ? 'top-2 text-xs text-[#2874f0]' : ''}`}>Industry *</label>
                  {errors.industry && <div className="text-red-700 text-xs mt-1 font-semibold bg-red-100 rounded px-2 py-1 shadow-sm animate-pulse">{errors.industry}</div>}
                </div>
              </div>
              <div>
                <div className="relative mb-2">
                  <span className="absolute left-2 top-1/2 -translate-y-1/2 text-sm transition-transform duration-300 ease-in-out icon-animate group-focus-within:scale-110 group-focus-within:rotate-6">
                    <svg xmlns="http://www.w3.org/2000/svg" width="4mm" height="4mm" style={{minWidth:'15.1px',minHeight:'15.1px'}} fill="none" viewBox="0 0 24 24" stroke="#a78bfa"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20v-2a4 4 0 00-3-3.87M7 20v-2a4 4 0 013-3.87m5-7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                  </span>
                  <select
                    name="size"
                    value={formData.size}
                    onChange={handleChange}
                    required
                    className={`font-semibold px-5 py-2 rounded-lg bg-gradient-to-r from-[#2874f0] to-[#06b6d4] text-white shadow-lg hover:scale-110 hover:shadow-2xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#2874f0]/50" focus:border-[#2874f0] border-gray-300 focus:bg-white focus:shadow-lg focus:shadow-[#2874f0]/20 text-sm" ${errors.size ? 'border-red-400' : ''}`}
                  >
                    <option value="">Select size</option>
                    <option value="1-10">1-10</option>
                    <option value="11-50">11-50</option>
                    <option value="51-200">51-200</option>
                    <option value=">200">200+</option>
                  </select>
                  <label className={`absolute left-8 top-1/2 -translate-y-1/2 bg-white/95 px-1 text-gray-500 pointer-events-none transition-all duration-300 ease-in-out opacity-80 peer-focus:text-[#2874f0] peer-focus:top-2 peer-focus:text-xs peer-focus:opacity-100 peer-focus:translate-y-0 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-xs peer-placeholder-shown:text-gray-400 peer-placeholder-shown:opacity-80 text-xs ${formData.size ? 'top-2 text-xs text-[#2874f0]' : ''}`}>Company Size *</label>
                  {errors.size && <div className="text-red-700 text-xs mt-1 font-semibold bg-red-100 rounded px-2 py-1 shadow-sm animate-pulse">{errors.size}</div>}
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-2 mt-3 rounded-md bg-[#2874f0] text-white font-bold text-base shadow hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                Next
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4 transition-all">
              <h2 className="text-xl font-semibold mb-2">Preferences</h2>
              <div>
                <div className="relative mb-2">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-lg transition-transform duration-300 ease-in-out icon-animate group-focus-within:scale-110 group-focus-within:rotate-6">
                    <svg xmlns="http://www.w3.org/2000/svg" width="5mm" height="5mm" style={{minWidth:'18.9px',minHeight:'18.9px'}} fill="none" viewBox="0 0 24 24" stroke="#facc15"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m8.66-13.66l-.71.71M4.05 19.07l-.71.71M21 12h1M3 12H2m16.24 7.07l-.71-.71M6.34 6.34l-.71-.71M12 8a4 4 0 100 8 4 4 0 000-8z" /></svg>
                  </span>
                  <select
                    name="theme"
                    value={formData.theme}
                    onChange={handleChange}
                    required
                    className={`font-semibold px-6 py-2 rounded-lg bg-gradient-to-r from-[#2874f0] to-[#06b6d4] text-white shadow-lg hover:scale-110 hover:shadow-2xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#2874f0]/50" focus:border-[#2874f0] border-gray-300 focus:bg-white focus:shadow-lg focus:shadow-[#2874f0]/20 text-sm"`}
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                  </select>
                  <label className={`absolute left-10 top-1/2 -translate-y-1/2 bg-white/95 px-1 text-gray-500 pointer-events-none transition-all duration-300 ease-in-out opacity-80 peer-focus:text-[#2874f0] peer-focus:top-2 peer-focus:text-xs peer-focus:opacity-100 peer-focus:translate-y-0 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-xs peer-placeholder-shown:text-gray-400 peer-placeholder-shown:opacity-80 text-xs ${formData.theme ? 'top-2 text-xs text-[#2874f0]' : ''}`}>Theme</label>
                </div>
              </div>
              <div>
                <div className="relative mb-2">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-lg transition-transform duration-300 ease-in-out icon-animate group-focus-within:scale-110 group-focus-within:rotate-6">
                    <svg xmlns="http://www.w3.org/2000/svg" width="5mm" height="5mm" style={{minWidth:'18.9px',minHeight:'18.9px'}} fill="none" viewBox="0 0 24 24" stroke="#06b6d4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
                  </span>
                  <select
                    name="layout"
                    value={formData.layout}
                    onChange={handleChange}
                    required
                    className={`font-semibold px-6 py-2 rounded-lg bg-gradient-to-r from-[#2874f0] to-[#06b6d4] text-white shadow-lg hover:scale-110 hover:shadow-2xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#2874f0]/50" focus:border-[#2874f0] border-gray-300 focus:bg-white focus:shadow-lg focus:shadow-[#2874f0]/20 text-sm"`}
                  >
                    <option value="default">Default</option>
                    <option value="compact">Compact</option>
                    <option value="spacious">Spacious</option>
                  </select>
                  <label className={`absolute left-10 top-1/2 -translate-y-1/2 bg-white/95 px-1 text-gray-500 pointer-events-none transition-all duration-300 ease-in-out opacity-80 peer-focus:text-[#2874f0] peer-focus:top-2 peer-focus:text-xs peer-focus:opacity-100 peer-focus:translate-y-0 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-xs peer-placeholder-shown:text-gray-400 peer-placeholder-shown:opacity-80 text-xs ${formData.layout ? 'top-2 text-xs text-[#2874f0]' : ''}`}>Default Dashboard Layout</label>
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-2 mt-3 rounded-md bg-[#2874f0] text-white font-bold text-base shadow hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                Submit
              </button>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            {step > 0 && (
              <button
                type="button"
                onClick={handleBack}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition duration-200"
              >
                Back
              </button>
            )}
            {step < steps.length - 1 && (
              <button
                type="button"
                onClick={handleNext}
                className="ml-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
              >
                Next
              </button>
            )}
            {step === steps.length - 1 && (
              <button
                type="submit"
                className="ml-auto px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition duration-200"
              >
                Submit
              </button>
            )}
          </div>
        </form>

        {submitted && (
          <>
            <div className="mt-8 p-4 bg-gradient-to-r from-green-200 to-green-100 border border-green-300 rounded-xl text-green-800 shadow-md animate-fade-in relative overflow-hidden">
              <span className="font-semibold">Onboarding complete!</span> Redirecting to dashboard...
              <ConfettiEffect />
            </div>
          </>
        )}
      </div>
      <div className="absolute top-0 left-0 w-full h-60 bg-gradient-to-br from-blue-400/30 to-purple-300/20 blur-2xl -z-10"></div>
    </div>
  );
};
export default OnboardingWizard;
