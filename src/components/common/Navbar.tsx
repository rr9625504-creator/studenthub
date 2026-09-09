import React, { useState } from 'react';
import { Link, useRouter } from '@tanstack/react-router';
import { useGigGrid } from '../../context/GigGridContext';
import {
  Grid,
  Bell,
  User,
  ShieldCheck,
  Menu,
  X,
  HeartHandshake,
  Wrench,
  Search,
  CheckCircle,
  Briefcase,
  ChevronDown,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currentUser, switchRole, notifications, unreadCount, markNotificationAsRead } = useGigGrid();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const router = useRouter();

  const userNotifications = notifications.filter(
    (n) => n.recipientRole === currentUser.role || n.recipientId === currentUser.id
  );

  return (
    <header className="bg-white/95 backdrop-blur-md sticky top-[33px] z-40 border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-2.5 group cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-emerald-600 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <Grid className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black tracking-tight text-slate-900 group-hover:text-blue-600 transition">
                  Gig<span className="text-emerald-600">Grid</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                  Co-op
                </span>
              </div>
              <p className="text-[10px] text-slate-500 -mt-1 hidden sm:block">
                Trusted Local Services • Fair Work
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-medium text-slate-600">
            <Link
              to="/"
              activeProps={{ className: 'text-blue-600 bg-blue-50 font-semibold' }}
              className="px-3 py-2 rounded-lg hover:text-slate-900 hover:bg-slate-100 transition"
            >
              Home
            </Link>
            <Link
              to="/services"
              activeProps={{ className: 'text-blue-600 bg-blue-50 font-semibold' }}
              className="px-3 py-2 rounded-lg hover:text-slate-900 hover:bg-slate-100 transition flex items-center gap-1.5"
            >
              <Search className="w-4 h-4 text-blue-500" />
              <span>Services</span>
            </Link>
            <Link
              to="/providers"
              activeProps={{ className: 'text-blue-600 bg-blue-50 font-semibold' }}
              className="px-3 py-2 rounded-lg hover:text-slate-900 hover:bg-slate-100 transition flex items-center gap-1.5"
            >
              <Wrench className="w-4 h-4 text-emerald-500" />
              <span>Providers</span>
            </Link>
            <Link
              to="/cooperative"
              activeProps={{ className: 'text-blue-600 bg-blue-50 font-semibold' }}
              className="px-3 py-2 rounded-lg hover:text-slate-900 hover:bg-slate-100 transition flex items-center gap-1.5"
            >
              <HeartHandshake className="w-4 h-4 text-teal-600" />
              <span>Cooperative Model</span>
            </Link>
            <Link
              to="/how-it-works"
              activeProps={{ className: 'text-blue-600 bg-blue-50 font-semibold' }}
              className="px-3 py-2 rounded-lg hover:text-slate-900 hover:bg-slate-100 transition"
            >
              How It Works
            </Link>
          </nav>

          {/* Right Action Icons & Portal Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Notification Bell Dropdown */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 relative transition cursor-pointer"
                title="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Popover */}
              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-200 p-4 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-bold text-sm text-slate-900">Notifications</h4>
                      <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-semibold">
                        {userNotifications.length}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400">Live Demo Feed</span>
                  </div>

                  <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto mt-2">
                    {userNotifications.length === 0 ? (
                      <p className="text-xs text-slate-400 text-center py-6">No notifications yet</p>
                    ) : (
                      userNotifications.map((n) => (
                        <div
                          key={n.id}
                          onClick={() => markNotificationAsRead(n.id)}
                          className={`py-2.5 px-2 rounded-lg cursor-pointer transition flex items-start gap-2.5 ${
                            !n.read ? 'bg-blue-50/50 hover:bg-blue-50' : 'hover:bg-slate-50'
                          }`}
                        >
                          <div
                            className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                              !n.read ? 'bg-blue-600' : 'bg-transparent'
                            }`}
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-slate-900">{n.title}</p>
                            <p className="text-xs text-slate-600 line-clamp-2 mt-0.5">{n.message}</p>
                            <span className="text-[10px] text-slate-400 mt-1 block">{n.time}</span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => setNotificationsOpen(false)}
                      className="text-xs text-slate-500 hover:text-slate-800"
                    >
                      Close
                    </button>
                    <Link
                      to={
                        currentUser.role === 'customer'
                          ? '/customer'
                          : currentUser.role === 'provider'
                          ? '/provider'
                          : '/admin'
                      }
                      onClick={() => setNotificationsOpen(false)}
                      className="text-xs font-semibold text-blue-600 hover:text-blue-700"
                    >
                      Go to Dashboard →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Dashboard Shortcut Button based on role */}
            {currentUser.role === 'customer' && (
              <Link
                to="/customer"
                className="hidden sm:inline-flex items-center gap-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 px-3 py-1.5 rounded-xl text-xs font-semibold transition"
              >
                <Briefcase className="w-3.5 h-3.5" />
                <span>My Bookings</span>
              </Link>
            )}

            {currentUser.role === 'provider' && (
              <Link
                to="/provider"
                className="hidden sm:inline-flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 px-3 py-1.5 rounded-xl text-xs font-semibold transition"
              >
                <Wrench className="w-3.5 h-3.5" />
                <span>Provider Portal</span>
              </Link>
            )}

            {currentUser.role === 'admin' && (
              <Link
                to="/admin"
                className="hidden sm:inline-flex items-center gap-1.5 bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 px-3 py-1.5 rounded-xl text-xs font-semibold transition"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Admin Portal</span>
              </Link>
            )}

            {/* Current User Chip */}
            <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
              <img
                src={currentUser.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80'}
                alt={currentUser.name}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-slate-100"
              />
              <div className="hidden md:block text-left">
                <p className="text-xs font-bold text-slate-800 leading-tight truncate max-w-[110px]">
                  {currentUser.name}
                </p>
                <span className="text-[10px] font-medium text-slate-500 capitalize">
                  {currentUser.role}
                </span>
              </div>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 animate-in fade-in">
          <nav className="flex flex-col space-y-1">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Home
            </Link>
            <Link
              to="/services"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 flex items-center justify-between"
            >
              <span>Explore Services</span>
              <Search className="w-4 h-4 text-slate-400" />
            </Link>
            <Link
              to="/providers"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 flex items-center justify-between"
            >
              <span>Verified Providers</span>
              <Wrench className="w-4 h-4 text-slate-400" />
            </Link>
            <Link
              to="/cooperative"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 flex items-center justify-between"
            >
              <span>Cooperative Model & Sharing</span>
              <HeartHandshake className="w-4 h-4 text-slate-400" />
            </Link>
            <Link
              to="/how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              How It Works
            </Link>
          </nav>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <Link
              to="/customer"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center bg-blue-600 text-white py-2.5 rounded-xl text-xs font-semibold"
            >
              Customer Dashboard
            </Link>
            <Link
              to="/provider"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center bg-emerald-600 text-white py-2.5 rounded-xl text-xs font-semibold"
            >
              Provider Portal (Requests & Earnings)
            </Link>
            <Link
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center bg-purple-600 text-white py-2.5 rounded-xl text-xs font-semibold"
            >
              Admin Dashboard (Verification Queue)
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
