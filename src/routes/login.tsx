import React, { useState } from 'react';
import { createFileRoute, Link, useRouter } from '@tanstack/react-router';
import { useGigGrid, UserRole } from '../context/GigGridContext';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';
import {
  Grid,
  User,
  Wrench,
  Shield,
  ArrowRight,
  Sparkles,
  Lock,
  Mail,
  CheckCircle2,
} from 'lucide-react';

export const Route = createFileRoute('/login')({
  component: LoginPage,
});

function LoginPage() {
  const { switchRole } = useGigGrid();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleDemoLogin = (role: UserRole) => {
    switchRole(role);
    if (role === 'customer') {
      router.navigate({ to: '/customer' });
    } else if (role === 'provider') {
      router.navigate({ to: '/provider' });
    } else if (role === 'admin') {
      router.navigate({ to: '/admin' });
    }
  };

  const handleManualLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default to customer on manual login
    handleDemoLogin('customer');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-lg">
          <div className="text-center">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-emerald-600 text-white flex items-center justify-center mx-auto shadow-md mb-3">
              <Grid className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-black text-slate-900">Sign in to GigGrid</h2>
            <p className="text-xs text-slate-500 mt-1">
              Cooperative Gig Services Platform (SIH26089)
            </p>
          </div>

          {/* Quick Mentor 1-Click Demo Logins */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Smart India Hackathon Quick Demo Logins:</span>
            </div>

            <button
              onClick={() => handleDemoLogin('customer')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded-xl text-xs font-bold transition flex items-center justify-between shadow-xs cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>Continue as Customer Demo</span>
              </div>
              <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded">Ramesh (Maduravoyal)</span>
            </button>

            <button
              onClick={() => handleDemoLogin('provider')}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 px-4 rounded-xl text-xs font-bold transition flex items-center justify-between shadow-xs cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Wrench className="w-4 h-4" />
                <span>Continue as Provider Demo</span>
              </div>
              <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded">Arun (Plumber)</span>
            </button>

            <button
              onClick={() => handleDemoLogin('admin')}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2.5 px-4 rounded-xl text-xs font-bold transition flex items-center justify-between shadow-xs cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>Continue as Admin Demo</span>
              </div>
              <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded">Co-op Director</span>
            </button>
          </div>

          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-slate-200" />
            <span className="flex-shrink mx-4 text-slate-400 text-xs font-medium uppercase">
              Or sign in with email
            </span>
            <div className="flex-grow border-t border-slate-200" />
          </div>

          {/* Manual Input Form */}
          <form onSubmit={handleManualLogin} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2.5 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2.5 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-xl transition cursor-pointer text-xs flex items-center justify-center gap-2"
            >
              <span>Sign In</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <p className="text-center text-xs text-slate-500">
            Don't have an account?{' '}
            <Link to="/register" className="font-bold text-blue-600 hover:underline">
              Register as Customer or Provider
            </Link>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
