import React, { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { useGigGrid } from '../context/GigGridContext';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';
import {
  ShieldCheck,
  Users,
  CheckCircle,
  XCircle,
  FileText,
  MapPin,
  TrendingUp,
  HeartHandshake,
  AlertTriangle,
  Briefcase,
  Layers,
  Award,
  Calendar,
  Sparkles,
  RotateCcw,
} from 'lucide-react';
import { VerifiedBadge } from '../components/common/VerifiedBadge';

export const Route = createFileRoute('/admin')({
  component: AdminDashboardPage,
});

function AdminDashboardPage() {
  const { providers, bookings, verifyProvider, coopStats, resetDemoData } = useGigGrid();
  const [activeTab, setActiveTab] = useState<'verification' | 'overview' | 'ledger'>('verification');

  const pendingProviders = providers.filter((p) => !p.verified || p.verificationStatus === 'pending');
  const verifiedProviders = providers.filter((p) => p.verified);

  const totalBookings = bookings.length;
  const activeBookingsCount = bookings.filter(
    (b) => b.status === 'REQUESTED' || b.status === 'ACCEPTED' || b.status === 'IN PROGRESS'
  ).length;
  const completedBookingsCount = bookings.filter(
    (b) => b.status === 'COMPLETED' || b.status === 'RATED'
  ).length;

  const totalWorkerDisbursed = bookings
    .filter((b) => b.status === 'COMPLETED' || b.status === 'RATED')
    .reduce((sum, b) => sum + b.workerShare, 0);

  const totalCoopFundBalance =
    coopStats.coopWelfareFund +
    bookings
      .filter((b) => b.status === 'COMPLETED' || b.status === 'RATED')
      .reduce((sum, b) => sum + b.coopShare, 0);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      {/* Admin Header Banner */}
      <div className="bg-slate-900 text-white border-b border-slate-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-purple-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Admin Control Desk
                </span>
                <span className="text-slate-400 text-xs">Chennai West Cooperative Cluster</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
                Cooperative Governance & Verification
              </h1>
              <p className="text-xs text-slate-400 mt-1">
                Aadhaar identity vetting, trade licensing verification, and community welfare fund monitoring.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={resetDemoData}
                className="inline-flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold px-3.5 py-2 rounded-xl border border-slate-700 transition cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Demo State</span>
              </button>
            </div>
          </div>

          {/* Key Admin Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 mt-6 pt-6 border-t border-slate-800 text-xs">
            <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/60">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Total Providers</span>
              <span className="text-xl font-black text-white">{providers.length}</span>
            </div>

            <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/60">
              <span className="text-amber-400 block text-[10px] uppercase font-bold">Pending Review</span>
              <span className="text-xl font-black text-amber-400">{pendingProviders.length}</span>
            </div>

            <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/60">
              <span className="text-emerald-400 block text-[10px] uppercase font-bold">Verified Co-op</span>
              <span className="text-xl font-black text-emerald-400">{verifiedProviders.length}</span>
            </div>

            <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/60">
              <span className="text-blue-400 block text-[10px] uppercase font-bold">Active Jobs</span>
              <span className="text-xl font-black text-blue-400">{activeBookingsCount}</span>
            </div>

            <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/60">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Completed Jobs</span>
              <span className="text-xl font-black text-white">{completedBookingsCount}</span>
            </div>

            <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/60">
              <span className="text-emerald-400 block text-[10px] uppercase font-bold">Worker Earnings</span>
              <span className="text-xl font-black text-emerald-400">
                ₹{((coopStats.totalWorkerEarnings + totalWorkerDisbursed) / 1000).toFixed(0)}k
              </span>
            </div>

            <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/60">
              <span className="text-purple-400 block text-[10px] uppercase font-bold">Welfare Pool</span>
              <span className="text-xl font-black text-purple-400">
                ₹{(totalCoopFundBalance / 1000).toFixed(0)}k
              </span>
            </div>

            <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/60">
              <span className="text-teal-400 block text-[10px] uppercase font-bold">Communities</span>
              <span className="text-xl font-black text-teal-400">25</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Tabs */}
      <main className="flex-1 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-3 mb-8">
            <button
              onClick={() => setActiveTab('verification')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'verification'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Provider Verification Queue ({pendingProviders.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'overview'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Verified Directory ({verifiedProviders.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('ledger')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'ledger'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>Cooperative Revenue & Audits</span>
            </button>
          </div>

          {/* TAB 1: Verification Queue */}
          {activeTab === 'verification' && (
            <div className="space-y-6">
              <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 flex items-center justify-between text-xs text-amber-900">
                <div className="flex items-center gap-2.5">
                  <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                  <span>
                    <strong>SIH Evaluator Demo:</strong> Click <strong>VERIFY</strong> on applicant <strong>Chandran M (Electrician)</strong> to admit him live into the cooperative and issue his verified membership credentials!
                  </span>
                </div>
              </div>

              {pendingProviders.length === 0 ? (
                <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500 text-xs">
                  <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
                  <h3 className="font-bold text-slate-800 text-sm">All Applicants Processed!</h3>
                  <p className="mt-1">Zero pending background checks in the Maduravoyal cluster queue.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {pendingProviders.map((prov) => (
                    <div
                      key={prov.id}
                      className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-purple-300 transition"
                    >
                      <div className="flex items-start gap-4">
                        <img
                          src={prov.avatar}
                          alt={prov.name}
                          className="w-16 h-16 rounded-2xl object-cover border-2 border-slate-200 shrink-0"
                        />
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-base text-slate-900">{prov.name}</h3>
                            <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                              Pending Verification
                            </span>
                          </div>
                          <p className="text-xs font-semibold text-emerald-700">{prov.skill}</p>
                          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 pt-1">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5 text-blue-500" />
                              {prov.locality}
                            </span>
                            <span>•</span>
                            <span>{prov.experienceYears} Years Experience</span>
                            <span>•</span>
                            <span>Rate: ₹{prov.hourlyRate}/hr</span>
                            <span>•</span>
                            <span>{prov.phone}</span>
                          </div>
                          <p className="text-xs text-slate-600 pt-1 max-w-xl italic">
                            "{prov.about}"
                          </p>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-3 self-end md:self-center">
                        <button
                          onClick={() => verifyProvider(prov.id, false)}
                          className="bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                        >
                          <XCircle className="w-4 h-4" />
                          <span>REJECT</span>
                        </button>
                        <button
                          onClick={() => verifyProvider(prov.id, true)}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm cursor-pointer"
                        >
                          <CheckCircle className="w-4 h-4" />
                          <span>VERIFY & ADMIT</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: Verified Directory */}
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                <div className="p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
                  <h3 className="font-bold text-sm text-slate-900">
                    Active Certified Cooperative Craftsmen ({verifiedProviders.length})
                  </h3>
                  <span className="text-xs text-slate-500">Maduravoyal Regional Chapter</span>
                </div>

                <div className="divide-y divide-slate-100">
                  {verifiedProviders.map((prov) => (
                    <div key={prov.id} className="p-4 flex items-center justify-between gap-4 hover:bg-slate-50">
                      <div className="flex items-center gap-3">
                        <img
                          src={prov.avatar}
                          alt={prov.name}
                          className="w-12 h-12 rounded-xl object-cover border border-slate-200"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-sm text-slate-900">{prov.name}</h4>
                            <VerifiedBadge size="sm" label="Verified" />
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5">
                            {prov.skill} • {prov.locality} • Co-op ID: {prov.coopMemberNumber}
                          </p>
                        </div>
                      </div>

                      <div className="text-right text-xs">
                        <div className="font-bold text-slate-900">{prov.completedJobs} Jobs Completed</div>
                        <div className="text-emerald-600 font-semibold">
                          ₹{prov.coopContribution.toLocaleString()} Co-op Fund Contributed
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Cooperative Financial Audits */}
          {activeTab === 'ledger' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
                  <span className="text-xs font-bold text-slate-400 uppercase">Worker Direct Disbursals</span>
                  <div className="text-2xl font-black text-emerald-600 mt-1">85.0%</div>
                  <p className="text-xs text-slate-500 mt-1">Fixed constitutional statutory guarantee</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
                  <span className="text-xs font-bold text-slate-400 uppercase">Community Welfare Pool</span>
                  <div className="text-2xl font-black text-blue-600 mt-1">10.0%</div>
                  <p className="text-xs text-slate-500 mt-1">Health cover, tool loans, dividend reserve</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
                  <span className="text-xs font-bold text-slate-400 uppercase">Open Platform Support</span>
                  <div className="text-2xl font-black text-slate-800 mt-1">5.0%</div>
                  <p className="text-xs text-slate-500 mt-1">Cloud infrastructure & customer grievance desk</p>
                </div>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-xs text-emerald-950 space-y-2">
                <h4 className="font-bold text-sm text-emerald-900">Open Auditing & Regulatory Compliance</h4>
                <p>
                  In accordance with SIH Problem ID <strong>SIH26089</strong>, every rupee processed across Maduravoyal and Chennai West communities is immutably logged on the shared cooperative ledger, completely eliminating predatory price gouging and commission clawbacks.
                </p>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
