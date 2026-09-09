import React, { useState } from 'react';
import { useGigGrid, UserRole } from '../../context/GigGridContext';
import { ShieldCheck, RotateCcw, User, Wrench, Shield, Compass, CheckCircle2, ChevronRight, X } from 'lucide-react';
import { Link, useRouter } from '@tanstack/react-router';

export const DemoSwitcherBar: React.FC = () => {
  const { currentUser, switchRole, resetDemoData, unreadCount } = useGigGrid();
  const [showGuide, setShowGuide] = useState(false);
  const router = useRouter();

  const handleRoleSwitch = (role: UserRole) => {
    switchRole(role);
    // Optionally navigate to that role's home or dashboard
    if (role === 'customer') {
      router.navigate({ to: '/customer' });
    } else if (role === 'provider') {
      router.navigate({ to: '/provider' });
    } else if (role === 'admin') {
      router.navigate({ to: '/admin' });
    }
  };

  return (
    <>
      <div className="bg-slate-900 text-white text-xs border-b border-slate-800 sticky top-0 z-50 px-3 py-2">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Brand & Project Info */}
          <div className="flex items-center gap-2">
            <span className="bg-blue-600 text-white px-2 py-0.5 rounded font-bold uppercase tracking-wider text-[10px]">
              SIH26089
            </span>
            <span className="font-semibold text-slate-200 hidden sm:inline">
              GigGrid Cooperative Platform
            </span>
            <button
              onClick={() => setShowGuide(true)}
              className="inline-flex items-center gap-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded text-[11px] font-medium transition cursor-pointer"
            >
              <Compass className="w-3 h-3 text-amber-400" />
              <span>Mentor Demo Flow Guide</span>
            </button>
          </div>

          {/* Persona Switchers */}
          <div className="flex items-center gap-1 sm:gap-2">
            <span className="text-slate-400 hidden md:inline text-[11px]">Live Persona:</span>

            {/* Customer Demo */}
            <button
              onClick={() => handleRoleSwitch('customer')}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition cursor-pointer ${
                currentUser.role === 'customer'
                  ? 'bg-blue-600 text-white shadow-sm ring-2 ring-blue-400/40'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
              title="Switch to Customer: Ramesh Patel (Maduravoyal)"
            >
              <User className="w-3.5 h-3.5 text-blue-300" />
              <span>Customer Demo</span>
              {currentUser.role === 'customer' && (
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              )}
            </button>

            {/* Provider Demo */}
            <button
              onClick={() => handleRoleSwitch('provider')}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition cursor-pointer ${
                currentUser.role === 'provider'
                  ? 'bg-emerald-600 text-white shadow-sm ring-2 ring-emerald-400/40'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
              title="Switch to Provider: Arun Kumar (Plumber)"
            >
              <Wrench className="w-3.5 h-3.5 text-emerald-300" />
              <span>Provider Demo</span>
              {currentUser.role === 'provider' && (
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              )}
            </button>

            {/* Admin Demo */}
            <button
              onClick={() => handleRoleSwitch('admin')}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition cursor-pointer ${
                currentUser.role === 'admin'
                  ? 'bg-purple-600 text-white shadow-sm ring-2 ring-purple-400/40'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
              title="Switch to Admin: Co-op Director"
            >
              <Shield className="w-3.5 h-3.5 text-purple-300" />
              <span>Admin Demo</span>
              {currentUser.role === 'admin' && (
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              )}
            </button>
          </div>

          {/* Quick Actions & Reset */}
          <div className="flex items-center gap-2">
            <button
              onClick={resetDemoData}
              className="inline-flex items-center gap-1 text-slate-400 hover:text-white px-2 py-0.5 rounded hover:bg-slate-800 transition cursor-pointer"
              title="Reset all demo data back to clean initial state"
            >
              <RotateCcw className="w-3 h-3" />
              <span className="hidden sm:inline">Reset Demo</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mentor Demo Flow Guide Modal */}
      {showGuide && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white text-slate-900 rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="bg-blue-600 p-1.5 rounded-lg text-white">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base">SIH Mentor Golden Demo Flow</h3>
                  <p className="text-xs text-slate-400">
                    Step-by-step checklist to demonstrate live to Smart India Hackathon evaluators
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowGuide(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 text-sm">
              <div className="bg-blue-50 border border-blue-200 p-3.5 rounded-xl text-blue-900 text-xs flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Cooperative Differentiator:</strong> Unlike commercial aggregators charging 25-30% commission, GigGrid gives <strong>85% directly to workers</strong>, with <strong>10% pooled into a worker welfare & emergency fund</strong>, and only 5% for lean operations.
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 rounded-xl border border-slate-100 hover:border-blue-200 bg-slate-50/50">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                    1
                  </span>
                  <div>
                    <h4 className="font-semibold text-slate-900">Discover Local Verified Service</h4>
                    <p className="text-slate-600 text-xs mt-0.5">
                      Navigate to <strong>Find a Service</strong> or <strong>Providers</strong>. Filter locality to <strong>Maduravoyal</strong> and select <strong>Plumbing</strong> to see <strong>Arun Kumar</strong>.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl border border-slate-100 hover:border-blue-200 bg-slate-50/50">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                    2
                  </span>
                  <div>
                    <h4 className="font-semibold text-slate-900">Request Booking (Customer Mode)</h4>
                    <p className="text-slate-600 text-xs mt-0.5">
                      Click <strong>Book Service</strong> on Arun Kumar's profile. Choose date/slot and enter requirement (e.g., "Kitchen sink leakage"). Submit to create booking with status <strong>REQUESTED</strong>.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl border border-slate-100 hover:border-blue-200 bg-slate-50/50">
                  <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                    3
                  </span>
                  <div>
                    <h4 className="font-semibold text-slate-900">Switch to Provider Demo & Progress Job</h4>
                    <p className="text-slate-600 text-xs mt-0.5">
                      Click <strong>Provider Demo</strong> in the top bar. Open Arun's dashboard to see the new request. Click <strong>Accept Request</strong> (status: ACCEPTED), then <strong>Start Service</strong> (IN PROGRESS), and finally <strong>Complete Service</strong> (COMPLETED).
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl border border-slate-100 hover:border-blue-200 bg-slate-50/50">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                    4
                  </span>
                  <div>
                    <h4 className="font-semibold text-slate-900">Switch Back & Rate Service</h4>
                    <p className="text-slate-600 text-xs mt-0.5">
                      Switch to <strong>Customer Demo</strong>. Go to <strong>My Bookings</strong>, click <strong>Rate Service</strong> on the completed job, give 5 stars and submit. Watch provider rating & review update in real time!
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl border border-slate-100 hover:border-blue-200 bg-slate-50/50">
                  <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                    5
                  </span>
                  <div>
                    <h4 className="font-semibold text-slate-900">Inspect Cooperative Revenue & Provider Earnings</h4>
                    <p className="text-slate-600 text-xs mt-0.5">
                      Open <strong>Cooperative</strong> page to show the transparent ₹1,000 → ₹850 / ₹100 / ₹50 revenue breakdown chart. Then open <strong>Provider Earnings</strong> to show transparent dividend and contribution logs!
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl border border-slate-100 hover:border-blue-200 bg-slate-50/50">
                  <span className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                    6
                  </span>
                  <div>
                    <h4 className="font-semibold text-slate-900">Admin Provider Verification</h4>
                    <p className="text-slate-600 text-xs mt-0.5">
                      Switch to <strong>Admin Demo</strong>. Check pending applicant <strong>Chandran M (Electrician)</strong>, review credentials, and click <strong>Verify</strong> to admit him into the cooperative!
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 px-6 py-3.5 border-t border-slate-200 flex items-center justify-between">
              <span className="text-xs text-slate-500">Ready for Live Presentation</span>
              <button
                onClick={() => setShowGuide(false)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer"
              >
                Start Demo
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
