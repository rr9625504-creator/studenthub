import React, { useState } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';
import {
  User,
  Wrench,
  Search,
  Calendar,
  CheckCircle2,
  Star,
  ShieldCheck,
  FileCheck,
  CreditCard,
  HeartHandshake,
  ArrowRight,
  HelpCircle,
} from 'lucide-react';

export const Route = createFileRoute('/how-it-works')({
  component: HowItWorksPage,
});

function HowItWorksPage() {
  const [activeTab, setActiveTab] = useState<'customer' | 'provider'>('customer');

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      {/* Header */}
      <div className="bg-white border-b border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
            Simple, Transparent, Community-Driven
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2">
            How GigGrid Works
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
            Whether you are a household seeking trusted repairs or a craftsman seeking fair livelihoods, GigGrid provides a reliable, cooperative ecosystem.
          </p>

          {/* Persona Toggle */}
          <div className="mt-8 inline-flex items-center bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
            <button
              onClick={() => setActiveTab('customer')}
              className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer flex items-center gap-2 ${
                activeTab === 'customer'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <User className="w-4 h-4" />
              <span>For Customers & Households</span>
            </button>
            <button
              onClick={() => setActiveTab('provider')}
              className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer flex items-center gap-2 ${
                activeTab === 'provider'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Wrench className="w-4 h-4" />
              <span>For Service Providers & Workers</span>
            </button>
          </div>
        </div>
      </div>

      {/* Flow Steps */}
      <main className="flex-1 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {activeTab === 'customer' ? (
            /* Customer Flow */
            <div className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs relative">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold mb-4">
                    <Search className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-blue-600 uppercase">Step 1</span>
                  <h3 className="font-bold text-base text-slate-900 mt-1">Discover Local Experts</h3>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                    Search 10+ essential trade categories. Filter by your specific neighborhood (e.g. Maduravoyal or Porur) to find nearby verified craftsmen.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs relative">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold mb-4">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-blue-600 uppercase">Step 2</span>
                  <h3 className="font-bold text-base text-slate-900 mt-1">Request Service Slot</h3>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                    Choose a date and convenient time slot. Describe your issue with upfront transparent pricing (no surge fees or unexpected charges).
                  </p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs relative">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold mb-4">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-blue-600 uppercase">Step 3</span>
                  <h3 className="font-bold text-base text-slate-900 mt-1">Vetted On-Site Work</h3>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                    A background-checked, trade-certified cooperative craftsman arrives with genuine parts, resolves your problem, and demonstrates testing.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs relative">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold mb-4">
                    <Star className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-blue-600 uppercase">Step 4</span>
                  <h3 className="font-bold text-base text-slate-900 mt-1">Rate & Support Local</h3>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                    Submit your rating and feedback. 85% goes directly to the worker, 10% fuels their welfare pool, and you get a 7-day cooperative warranty.
                  </p>
                </div>
              </div>

              <div className="text-center pt-4">
                <Link
                  to="/services"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl text-xs transition inline-flex items-center gap-2 shadow-sm"
                >
                  <span>Book Your First Service</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ) : (
            /* Provider Flow */
            <div className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs relative">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold mb-4">
                    <FileCheck className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-emerald-600 uppercase">Step 1</span>
                  <h3 className="font-bold text-base text-slate-900 mt-1">Join Cooperative</h3>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                    Submit your Aadhaar, ITI trade certification or experience references to the local Maduravoyal Cluster Verification Desk.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs relative">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold mb-4">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-emerald-600 uppercase">Step 2</span>
                  <h3 className="font-bold text-base text-slate-900 mt-1">Get Certified</h3>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                    Receive your Verified Member badge, digital ID (e.g. GG-MAD-0012), and onboarding into the community tool-sharing registry.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs relative">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold mb-4">
                    <Wrench className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-emerald-600 uppercase">Step 3</span>
                  <h3 className="font-bold text-base text-slate-900 mt-1">Accept Nearby Jobs</h3>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                    Set your daily availability. Receive booking requests directly on your Provider Portal without paying to see customer leads.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs relative">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold mb-4">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-emerald-600 uppercase">Step 4</span>
                  <h3 className="font-bold text-base text-slate-900 mt-1">85% Instant Earnings</h3>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                    Take home 85% directly to your bank account with zero platform clawbacks. Earn dividend share from the 10% cooperative welfare fund.
                  </p>
                </div>
              </div>

              <div className="text-center pt-4">
                <Link
                  to="/provider"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-xl text-xs transition inline-flex items-center gap-2 shadow-sm"
                >
                  <span>Open Provider Portal Demo</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          )}

          {/* Frequently Asked Questions */}
          <div className="mt-16 max-w-3xl mx-auto space-y-6">
            <div className="text-center">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Cooperative Clarity
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-1">Frequently Asked Questions</h3>
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="bg-white p-4.5 rounded-2xl border border-slate-200">
                <h4 className="font-bold text-slate-900">How is GigGrid different from Urban Company or Sulekha?</h4>
                <p className="text-slate-600 text-xs mt-1 leading-relaxed">
                  Commercial platforms charge workers 25-30% commissions and sell customer leads with no guarantee of work. GigGrid is a registered community cooperative where workers take home 85% directly, with 10% pooled into worker health, tool loans, and annual dividend distributions.
                </p>
              </div>

              <div className="bg-white p-4.5 rounded-2xl border border-slate-200">
                <h4 className="font-bold text-slate-900">How are service workers verified?</h4>
                <p className="text-slate-600 text-xs mt-1 leading-relaxed">
                  Every applicant submits government Aadhaar credentials, trade certificate or apprenticeship verification, and undergoes a local peer verification process managed by the elected cluster admin.
                </p>
              </div>

              <div className="bg-white p-4.5 rounded-2xl border border-slate-200">
                <h4 className="font-bold text-slate-900">What does the 10% Cooperative Welfare Fund cover?</h4>
                <p className="text-slate-600 text-xs mt-1 leading-relaxed">
                  The fund provides health insurance, accidental hospital cover on job duty, micro-loans for diagnostic tools, and emergency family assistance. Any annual surplus is paid back as cooperative dividends to members in proportion to jobs completed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
