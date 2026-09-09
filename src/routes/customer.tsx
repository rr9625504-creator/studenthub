import React, { useState } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { useGigGrid } from '../context/GigGridContext';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';
import { BookingCard } from '../components/cards/BookingCard';
import {
  User,
  Search,
  Briefcase,
  Clock,
  CheckCircle2,
  Star,
  MapPin,
  Bell,
  ShieldCheck,
  ArrowRight,
  PlusCircle,
  Filter,
} from 'lucide-react';

export const Route = createFileRoute('/customer')({
  component: CustomerDashboardPage,
});

function CustomerDashboardPage() {
  const { currentUser, bookings, notifications, providers, markNotificationAsRead } = useGigGrid();
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'completed'>('all');

  // Customer's bookings (either by customerId or if Ramesh Patel)
  const myBookings = bookings.filter(
    (b) => b.customerId === currentUser.id || b.customerName === currentUser.name
  );

  const activeBookings = myBookings.filter(
    (b) => b.status === 'REQUESTED' || b.status === 'ACCEPTED' || b.status === 'IN PROGRESS'
  );

  const completedBookings = myBookings.filter(
    (b) => b.status === 'COMPLETED' || b.status === 'RATED'
  );

  const displayBookings =
    activeTab === 'all'
      ? myBookings
      : activeTab === 'active'
      ? activeBookings
      : completedBookings;

  const myNotifications = notifications
    .filter((n) => n.recipientRole === 'customer' || n.recipientId === currentUser.id)
    .slice(0, 3);

  const recentProviders = providers.filter((p) => p.verified).slice(0, 3);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      {/* Top Banner / Welcome */}
      <div className="bg-white border-b border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img
                src={currentUser.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80'}
                alt={currentUser.name}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-blue-500 shadow-sm"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-black text-slate-900">
                    Welcome back, {currentUser.name}!
                  </h1>
                  <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                    Customer Portal
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-blue-600" />
                  <span>{currentUser.locality || 'Maduravoyal'}, Chennai</span>
                  <span>•</span>
                  <span>{currentUser.phone || '+91 98840 11223'}</span>
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-3">
              <Link
                to="/services"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition flex items-center gap-2 shadow-sm"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Book New Service</span>
              </Link>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-100">
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <span className="text-[11px] text-slate-500 font-medium">Total Bookings</span>
              <div className="text-xl font-black text-slate-900 mt-0.5">{myBookings.length}</div>
            </div>
            <div className="bg-blue-50/60 p-3.5 rounded-xl border border-blue-200">
              <span className="text-[11px] text-blue-700 font-medium">Active In-Progress</span>
              <div className="text-xl font-black text-blue-900 mt-0.5">{activeBookings.length}</div>
            </div>
            <div className="bg-emerald-50/60 p-3.5 rounded-xl border border-emerald-200">
              <span className="text-[11px] text-emerald-700 font-medium">Completed & Verified</span>
              <div className="text-xl font-black text-emerald-900 mt-0.5">{completedBookings.length}</div>
            </div>
            <div className="bg-purple-50/60 p-3.5 rounded-xl border border-purple-200">
              <span className="text-[11px] text-purple-700 font-medium">Cooperative Contribution</span>
              <div className="text-xl font-black text-purple-900 mt-0.5">
                ₹{myBookings.reduce((sum, b) => sum + (b.coopShare || 0), 0)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left 2 Columns: Bookings Feed */}
            <div className="lg:col-span-2 space-y-6">
              {/* Tab Navigation */}
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveTab('all')}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                      activeTab === 'all'
                        ? 'bg-slate-900 text-white'
                        : 'text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    All Bookings ({myBookings.length})
                  </button>
                  <button
                    onClick={() => setActiveTab('active')}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                      activeTab === 'active'
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    Active / In-Progress ({activeBookings.length})
                  </button>
                  <button
                    onClick={() => setActiveTab('completed')}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                      activeTab === 'completed'
                        ? 'bg-emerald-600 text-white'
                        : 'text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    Completed ({completedBookings.length})
                  </button>
                </div>

                <span className="text-xs text-slate-400 hidden sm:inline">
                  Real-time lifecycle tracking
                </span>
              </div>

              {/* Bookings List */}
              {displayBookings.length === 0 ? (
                <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
                  <Briefcase className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <h3 className="font-bold text-slate-800">No Bookings in this Tab</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Ready to book a verified plumber, electrician, or cleaner?
                  </p>
                  <Link
                    to="/services"
                    className="mt-4 inline-flex bg-blue-600 text-white font-bold px-4 py-2 rounded-xl text-xs hover:bg-blue-700 transition"
                  >
                    Find a Service
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {displayBookings.map((booking) => (
                    <BookingCard key={booking.id} booking={booking} viewMode="customer" />
                  ))}
                </div>
              )}
            </div>

            {/* Right Column: Notifications & Saved Providers */}
            <div className="space-y-6">
              {/* Notifications Widget */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
                  <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                    <Bell className="w-4 h-4 text-blue-600" />
                    <span>Recent Updates</span>
                  </h3>
                  <span className="text-[10px] text-slate-400">Live Feed</span>
                </div>

                <div className="space-y-3">
                  {myNotifications.length === 0 ? (
                    <p className="text-xs text-slate-400 text-center py-4">No recent notifications</p>
                  ) : (
                    myNotifications.map((n) => (
                      <div
                        key={n.id}
                        onClick={() => markNotificationAsRead(n.id)}
                        className={`p-3 rounded-xl text-xs border transition cursor-pointer ${
                          !n.read
                            ? 'bg-blue-50/70 border-blue-200 text-blue-900'
                            : 'bg-slate-50 border-slate-100 text-slate-700'
                        }`}
                      >
                        <div className="font-bold flex items-center justify-between">
                          <span>{n.title}</span>
                          <span className="text-[10px] text-slate-400 font-normal">{n.time}</span>
                        </div>
                        <p className="mt-1 text-[11px] leading-relaxed">{n.message}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Verified Community Craftsmen in Maduravoyal */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
                  <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Neighborhood Craftsmen</span>
                  </h3>
                  <Link to="/providers" className="text-xs text-blue-600 hover:underline">
                    View all
                  </Link>
                </div>

                <div className="space-y-3">
                  {recentProviders.map((prov) => (
                    <div
                      key={prov.id}
                      className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 border border-slate-100 transition"
                    >
                      <div className="flex items-center gap-2.5">
                        <img
                          src={prov.avatar}
                          alt={prov.name}
                          className="w-10 h-10 rounded-xl object-cover border border-slate-200"
                        />
                        <div>
                          <h4 className="font-bold text-xs text-slate-900">{prov.name}</h4>
                          <p className="text-[11px] text-slate-500">
                            {prov.skill} • {prov.locality}
                          </p>
                          <span className="text-[10px] text-amber-500 font-semibold">
                            ⭐ {prov.rating.toFixed(1)}
                          </span>
                        </div>
                      </div>

                      <Link
                        to="/providers"
                        className="text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg"
                      >
                        Book
                      </Link>
                    </div>
                  ))}
                </div>
              </div>

              {/* Co-op Impact Card */}
              <div className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white rounded-2xl p-5 shadow-sm space-y-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-200" />
                  <h4 className="font-bold text-sm">You Support Fair Work</h4>
                </div>
                <p className="text-xs text-emerald-100 leading-relaxed">
                  Your bookings on GigGrid have directly delivered fair earnings to Chennai craftsmen, bypassing commercial middlemen.
                </p>
                <Link
                  to="/cooperative"
                  className="inline-block bg-white text-emerald-800 text-xs font-bold px-3.5 py-1.5 rounded-xl hover:bg-emerald-50 transition"
                >
                  View Co-op Financial Split →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
