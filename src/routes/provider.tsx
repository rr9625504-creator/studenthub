import React, { useState } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { useGigGrid } from '../context/GigGridContext';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';
import { BookingCard } from '../components/cards/BookingCard';
import {
  Wrench,
  CheckCircle,
  IndianRupee,
  Calendar,
  Clock,
  MapPin,
  TrendingUp,
  HeartHandshake,
  ShieldCheck,
  Star,
  ToggleLeft,
  ToggleRight,
  AlertCircle,
  FileText,
  User,
  ArrowRight,
} from 'lucide-react';
import { RatingStars } from '../components/common/RatingStars';
import { toast } from 'sonner';

export const Route = createFileRoute('/provider')({
  component: ProviderDashboardPage,
});

function ProviderDashboardPage() {
  const { currentUser, providers, bookings, reviews, updateBookingStatus } = useGigGrid();
  const [activeTab, setActiveTab] = useState<'jobs' | 'earnings' | 'reviews'>('jobs');
  const [availableToday, setAvailableToday] = useState(true);

  // Find active provider record (default to Arun Kumar if provider)
  const currentProvider =
    providers.find((p) => p.id === currentUser.providerId || p.name === currentUser.name) ||
    providers[0]; // fallback to Arun Kumar

  // Bookings for this provider
  const providerBookings = bookings.filter(
    (b) => b.providerId === currentProvider.id || b.providerName === currentProvider.name
  );

  const pendingRequests = providerBookings.filter((b) => b.status === 'REQUESTED');
  const activeJobs = providerBookings.filter(
    (b) => b.status === 'ACCEPTED' || b.status === 'IN PROGRESS'
  );
  const completedJobs = providerBookings.filter(
    (b) => b.status === 'COMPLETED' || b.status === 'RATED'
  );

  // Calculate dynamic earnings from completed jobs + base historical earnings
  const completedEarnings = completedJobs.reduce((sum, b) => sum + b.workerShare, 0);
  const totalEarnings = 24850 + completedEarnings;
  const totalCoopContribution = currentProvider.coopContribution || 3840;

  const providerReviews = reviews.filter((r) => r.providerId === currentProvider.id);

  const toggleAvailability = () => {
    setAvailableToday(!availableToday);
    toast.success(
      !availableToday
        ? 'You are now marked AVAILABLE for Maduravoyal neighborhood calls'
        : 'You are now marked UNAVAILABLE for on-demand calls today'
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      {/* Provider Header Banner */}
      <div className="bg-white border-b border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img
                src={currentProvider.avatar}
                alt={currentProvider.name}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-500 shadow-sm"
              />
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl font-black text-slate-900">{currentProvider.name}</h1>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                    {currentProvider.skill}
                  </span>
                  {currentProvider.verified && (
                    <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 border border-blue-200">
                      <ShieldCheck className="w-3 h-3" />
                      Verified Co-op Craftsman
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-500 mt-1 flex flex-wrap items-center gap-2">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-blue-500" />
                    {currentProvider.locality}, Chennai
                  </span>
                  <span>•</span>
                  <span>Co-op ID: {currentProvider.coopMemberNumber}</span>
                  <span>•</span>
                  <span className="font-semibold text-slate-800">
                    ⭐ {currentProvider.rating.toFixed(1)} ({currentProvider.reviewCount} reviews)
                  </span>
                </p>
              </div>
            </div>

            {/* Today's Availability Toggle */}
            <div className="flex items-center gap-3 bg-slate-50 p-2.5 rounded-2xl border border-slate-200">
              <div className="text-right">
                <span className="text-xs font-bold block text-slate-800">
                  {availableToday ? 'Available for Jobs' : 'Unavailable Today'}
                </span>
                <span className="text-[10px] text-slate-400">Maduravoyal & Porur Cluster</span>
              </div>
              <button
                onClick={toggleAvailability}
                className={`p-1.5 rounded-xl transition cursor-pointer ${
                  availableToday
                    ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                    : 'bg-slate-300 text-slate-600 hover:bg-slate-400'
                }`}
                title="Click to toggle availability"
              >
                {availableToday ? <ToggleRight className="w-6 h-6" /> : <ToggleLeft className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Key Metric Tiles */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-100">
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <span className="text-[11px] text-slate-500 font-medium">New Job Requests</span>
              <div className="text-2xl font-black text-amber-600 mt-0.5">
                {pendingRequests.length}
              </div>
            </div>

            <div className="bg-blue-50/60 p-3.5 rounded-xl border border-blue-200">
              <span className="text-[11px] text-blue-700 font-medium">Active In-Progress</span>
              <div className="text-2xl font-black text-blue-900 mt-0.5">{activeJobs.length}</div>
            </div>

            <div className="bg-emerald-50/60 p-3.5 rounded-xl border border-emerald-200">
              <span className="text-[11px] text-emerald-700 font-medium">Total Lifetime Earnings</span>
              <div className="text-2xl font-black text-emerald-900 mt-0.5">
                ₹{totalEarnings.toLocaleString()}
              </div>
            </div>

            <div className="bg-purple-50/60 p-3.5 rounded-xl border border-purple-200">
              <span className="text-[11px] text-purple-700 font-medium">Co-op Welfare Contribution</span>
              <div className="text-2xl font-black text-purple-900 mt-0.5">
                ₹{totalCoopContribution.toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Tabs & Body */}
      <main className="flex-1 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tab bar */}
          <div className="flex items-center gap-2 border-b border-slate-200 pb-3 mb-8">
            <button
              onClick={() => setActiveTab('jobs')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'jobs'
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Wrench className="w-3.5 h-3.5" />
              <span>Jobs & Requests ({pendingRequests.length + activeJobs.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('earnings')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'earnings'
                  ? 'bg-emerald-600 text-white'
                  : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              <IndianRupee className="w-3.5 h-3.5" />
              <span>Earnings & Co-op Ledger</span>
            </button>

            <button
              onClick={() => setActiveTab('reviews')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'reviews'
                  ? 'bg-amber-500 text-white'
                  : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Star className="w-3.5 h-3.5" />
              <span>Reviews & Ratings ({providerReviews.length})</span>
            </button>
          </div>

          {/* TAB 1: Jobs & Requests */}
          {activeTab === 'jobs' && (
            <div className="space-y-8">
              {/* Urgent New Requests Alert */}
              {pendingRequests.length > 0 && (
                <div className="bg-amber-50 border border-amber-300 rounded-2xl p-5 shadow-xs">
                  <div className="flex items-center gap-2 text-amber-900 font-bold text-sm mb-3">
                    <AlertCircle className="w-5 h-5 text-amber-600" />
                    <span>Action Required: {pendingRequests.length} New Booking Request(s)</span>
                  </div>
                  <p className="text-xs text-amber-800 mb-4">
                    Review customer issue details and accept to schedule on-site service.
                  </p>
                  <div className="space-y-4">
                    {pendingRequests.map((booking) => (
                      <BookingCard key={booking.id} booking={booking} viewMode="provider" />
                    ))}
                  </div>
                </div>
              )}

              {/* Active Jobs in Progress */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <span>Active & Confirmed Appointments ({activeJobs.length})</span>
                  </h3>
                </div>

                {activeJobs.length === 0 ? (
                  <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-xs text-slate-500">
                    No active appointments currently in progress.
                  </div>
                ) : (
                  activeJobs.map((booking) => (
                    <BookingCard key={booking.id} booking={booking} viewMode="provider" />
                  ))
                )}
              </div>

              {/* Completed Jobs History */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Completed Work History ({completedJobs.length})</span>
                </h3>

                {completedJobs.length === 0 ? (
                  <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-xs text-slate-500">
                    No completed jobs yet.
                  </div>
                ) : (
                  completedJobs.map((booking) => (
                    <BookingCard key={booking.id} booking={booking} viewMode="provider" />
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 2: Earnings & Cooperative Ledger */}
          {activeTab === 'earnings' && (
            <div className="space-y-8">
              {/* Top Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Total Worker Earnings
                  </span>
                  <div className="text-3xl font-black text-emerald-600 mt-2">
                    ₹{totalEarnings.toLocaleString()}
                  </div>
                  <p className="text-xs text-slate-500 mt-1">85% direct payout from all completed jobs</p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Completed Jobs
                  </span>
                  <div className="text-3xl font-black text-slate-900 mt-2">
                    {32 + completedJobs.length}
                  </div>
                  <p className="text-xs text-slate-500 mt-1">100% verified customer sign-offs</p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Average Service Value
                  </span>
                  <div className="text-3xl font-black text-blue-600 mt-2">₹920</div>
                  <p className="text-xs text-slate-500 mt-1">Fair hourly trade benchmark</p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Cooperative Contribution
                  </span>
                  <div className="text-3xl font-black text-purple-600 mt-2">
                    ₹{totalCoopContribution.toLocaleString()}
                  </div>
                  <p className="text-xs text-slate-500 mt-1">10% pooled into emergency & welfare</p>
                </div>
              </div>

              {/* Cooperative Transparency Banner */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <HeartHandshake className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-emerald-950">
                      Cooperative Dividend & Welfare Entitlement
                    </h4>
                    <p className="text-xs text-emerald-800 mt-0.5">
                      As an active co-op member, Arun has qualified for <strong>₹1,50,000 Group Hospitalization Insurance</strong> and <strong>₹25,000 Zero-Interest Diagnostic Tool Credit</strong>.
                    </p>
                  </div>
                </div>
                <span className="bg-emerald-600 text-white text-xs font-bold px-3 py-1.5 rounded-xl shrink-0">
                  Status: Full Welfare Active
                </span>
              </div>

              {/* Transactions Ledger Table */}
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                <div className="p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
                  <h3 className="font-bold text-sm text-slate-900">
                    Recent Job Settlements & Direct Revenue Allocations
                  </h3>
                  <span className="text-xs text-slate-500">Auto-settled via Unified Cooperative Protocol</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-100 text-slate-700 font-bold uppercase text-[10px]">
                      <tr>
                        <th className="p-3.5">Booking ID</th>
                        <th className="p-3.5">Date</th>
                        <th className="p-3.5">Customer & Locality</th>
                        <th className="p-3.5">Service</th>
                        <th className="p-3.5">Total Paid</th>
                        <th className="p-3.5 text-emerald-700 font-bold">Worker Direct (85%)</th>
                        <th className="p-3.5 text-blue-700 font-bold">Co-op Fund (10%)</th>
                        <th className="p-3.5 text-slate-500">Ops (5%)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {providerBookings.map((b) => (
                        <tr key={b.id} className="hover:bg-slate-50">
                          <td className="p-3.5 font-mono font-bold text-slate-900">#{b.id}</td>
                          <td className="p-3.5">{b.date}</td>
                          <td className="p-3.5">
                            <span className="font-semibold">{b.customerName}</span>
                            <span className="text-slate-400 block text-[10px]">{b.customerLocality}</span>
                          </td>
                          <td className="p-3.5">{b.serviceName}</td>
                          <td className="p-3.5 font-bold">₹{b.estimatedBudget.toLocaleString()}</td>
                          <td className="p-3.5 font-bold text-emerald-700">
                            ₹{b.workerShare.toLocaleString()}
                          </td>
                          <td className="p-3.5 font-bold text-blue-700">
                            ₹{b.coopShare.toLocaleString()}
                          </td>
                          <td className="p-3.5 text-slate-500">₹{b.platformShare.toLocaleString()}</td>
                        </tr>
                      ))}
                      {/* Seed historical rows */}
                      <tr className="hover:bg-slate-50 text-slate-500">
                        <td className="p-3.5 font-mono font-bold text-slate-700">#BK-0985</td>
                        <td className="p-3.5">2024-09-04</td>
                        <td className="p-3.5">Srinivasan K (Porur)</td>
                        <td className="p-3.5">Plumbing</td>
                        <td className="p-3.5 font-bold">₹1,200</td>
                        <td className="p-3.5 font-bold text-emerald-700">₹1,020</td>
                        <td className="p-3.5 font-bold text-blue-700">₹120</td>
                        <td className="p-3.5 text-slate-500">₹60</td>
                      </tr>
                      <tr className="hover:bg-slate-50 text-slate-500">
                        <td className="p-3.5 font-mono font-bold text-slate-700">#BK-0974</td>
                        <td className="p-3.5">2024-09-02</td>
                        <td className="p-3.5">Lakshmi Narayanan (Maduravoyal)</td>
                        <td className="p-3.5">Plumbing</td>
                        <td className="p-3.5 font-bold">₹950</td>
                        <td className="p-3.5 font-bold text-emerald-700">₹807.5</td>
                        <td className="p-3.5 font-bold text-blue-700">₹95</td>
                        <td className="p-3.5 text-slate-500">₹47.5</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Reviews & Ratings */}
          {activeTab === 'reviews' && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-black text-slate-900">
                    Community Reviews & Reputation Score
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Direct feedback from verified Maduravoyal and Porur households.
                  </p>
                </div>
                <div className="flex items-center gap-3 bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-200">
                  <div className="text-2xl font-black text-amber-500">
                    {currentProvider.rating.toFixed(1)}
                  </div>
                  <div>
                    <RatingStars rating={currentProvider.rating} showText={false} size="sm" />
                    <span className="text-[10px] text-slate-400 block mt-0.5">
                      {providerReviews.length} Verified Reviews
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {providerReviews.map((rev) => (
                  <div key={rev.id} className="bg-white p-5 rounded-2xl border border-slate-200 text-xs shadow-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={rev.customerAvatar}
                          alt={rev.customerName}
                          className="w-8 h-8 rounded-full object-cover border border-slate-200"
                        />
                        <div>
                          <h4 className="font-bold text-slate-900">{rev.customerName}</h4>
                          <span className="text-[10px] text-slate-400">{rev.serviceName} • {rev.date}</span>
                        </div>
                      </div>
                      <RatingStars rating={rev.rating} showText={false} size="sm" />
                    </div>
                    <p className="text-slate-600 leading-relaxed italic bg-slate-50 p-3 rounded-xl">
                      "{rev.comment}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
