import React from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { useGigGrid } from '../context/GigGridContext';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';
import { RevenueBreakdownCard } from '../components/cooperative/RevenueBreakdownCard';
import {
  HeartHandshake,
  ShieldCheck,
  TrendingUp,
  Award,
  Users,
  CheckCircle2,
  PieChart,
  HelpCircle,
  FileCheck,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

export const Route = createFileRoute('/cooperative')({
  component: CooperativePage,
});

function CooperativePage() {
  const { coopStats } = useGigGrid();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      {/* Hero Banner */}
      <section className="bg-gradient-to-b from-emerald-950 via-slate-900 to-slate-900 text-white py-16 lg:py-24 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Cooperative Platform Architecture • SIH26089</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Workers aren't just providers.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                They're part of the community.
              </span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
              Commercial platforms treat gig workers as dispensable algorithmic units, siphoning 25-30% of their earnings. GigGrid operates as a democratically owned multi-stakeholder cooperative where 95% of wealth stays within the worker community.
            </p>

            <div className="pt-4 flex flex-wrap gap-4 text-xs font-semibold">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <CheckCircle2 className="w-4 h-4" /> 85% Direct Worker Earnings
              </span>
              <span className="flex items-center gap-1.5 text-blue-400">
                <CheckCircle2 className="w-4 h-4" /> 10% Emergency & Tool Pool
              </span>
              <span className="flex items-center gap-1.5 text-slate-300">
                <CheckCircle2 className="w-4 h-4" /> 5% Open Platform Operations
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Interactive Revenue Breakdown */}
      <main className="flex-1 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Revenue Breakdown Card */}
          <div>
            <div className="text-center max-w-2xl mx-auto mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                Transparent Revenue Algorithm
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                Where Does Your Payment Actually Go?
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Interact with the model below to verify transparent rupee allocations for any service value.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <RevenueBreakdownCard initialAmount={1000} interactive={true} />
            </div>
          </div>

          {/* Detailed Pillars: Welfare Fund, Tools, Democratic Governance */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Pillar 1 */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-slate-900">Fair Earnings & Instant Pay</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                By eliminating venture-capital extraction and excessive intermediary layers, workers earn up to 40% higher net monthly take-home pay compared to traditional gig aggregators. Payouts occur instantly into verified UPI accounts.
              </p>
              <ul className="text-xs text-slate-500 space-y-1.5 pt-2 border-t border-slate-100">
                <li className="flex items-center gap-1.5 text-slate-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Zero dynamic commission surging
                </li>
                <li className="flex items-center gap-1.5 text-slate-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  No arbitrary account penalties or de-platforming
                </li>
              </ul>
            </div>

            {/* Pillar 2 */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-slate-900">Cooperative Welfare Pool (10%)</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                The 10% pooled fund provides workers with community-backed health insurance, accident compensation, emergency family relief, and zero-interest loans for high-grade diagnostic and repair tools.
              </p>
              <ul className="text-xs text-slate-500 space-y-1.5 pt-2 border-t border-slate-100">
                <li className="flex items-center gap-1.5 text-slate-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                  Accident & family hospitalization cover
                </li>
                <li className="flex items-center gap-1.5 text-slate-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                  Quarterly surplus dividend returned to active workers
                </li>
              </ul>
            </div>

            {/* Pillar 3 */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-slate-900">Worker Ownership & Voice</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Registered under the Cooperative Societies Act, members elect regional cluster representatives (e.g. Maduravoyal Chapter), vote on community service pricing standards, and directly govern dispute resolution.
              </p>
              <ul className="text-xs text-slate-500 space-y-1.5 pt-2 border-t border-slate-100">
                <li className="flex items-center gap-1.5 text-slate-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                  One member, one vote policy
                </li>
                <li className="flex items-center gap-1.5 text-slate-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                  Transparent public financial ledger
                </li>
              </ul>
            </div>
          </div>

          {/* Side-by-side Table: Aggregators vs GigGrid */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="p-6 border-b border-slate-200 bg-slate-50">
              <h3 className="font-bold text-lg text-slate-900">
                Structural Comparison: Commercial Marketplace vs GigGrid Cooperative
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Why cooperative gig delivery creates lasting value for both households and service workers
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-100 text-slate-700 uppercase font-bold text-[11px]">
                  <tr>
                    <th className="p-4">Feature</th>
                    <th className="p-4 text-red-600">Commercial Aggregators</th>
                    <th className="p-4 text-emerald-700">GigGrid Cooperative</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-600">
                  <tr>
                    <td className="p-4 font-semibold text-slate-900">Worker Take-Home Share</td>
                    <td className="p-4 text-red-600">70% to 75% (after fees)</td>
                    <td className="p-4 font-bold text-emerald-700">85% Direct to Worker</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-slate-900">Commission / Platform Cut</td>
                    <td className="p-4 text-red-600">25% to 30% for corporate profits</td>
                    <td className="p-4 font-bold text-emerald-700">5% Lean open-source ops only</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-slate-900">Social Safety & Insurance</td>
                    <td className="p-4">None (workers bear 100% liability)</td>
                    <td className="p-4 font-bold text-emerald-700">10% Dedicated welfare & health pool</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-slate-900">Surge Pricing & Penalties</td>
                    <td className="p-4 text-red-600">Opaque surge algorithms</td>
                    <td className="p-4 font-bold text-emerald-700">Zero surges. Fixed transparent rates</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-slate-900">Worker Governance</td>
                    <td className="p-4">Zero say. Instant algorithmic deactivations</td>
                    <td className="p-4 font-bold text-emerald-700">Elected regional co-op representatives</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-slate-900">Surplus Returns</td>
                    <td className="p-4">Distributed to venture shareholders</td>
                    <td className="p-4 font-bold text-emerald-700">Annual cooperative dividend to workers</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* CTA Box */}
          <div className="bg-gradient-to-r from-blue-600 to-emerald-600 rounded-2xl p-8 text-white text-center flex flex-col items-center justify-center gap-4">
            <h3 className="text-2xl font-bold">Support Your Neighborhood Workers</h3>
            <p className="text-xs sm:text-sm text-blue-100 max-w-xl leading-relaxed">
              When you book on GigGrid, you directly support local craftsmen in Maduravoyal and help build a self-sustaining cooperative economy.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                to="/services"
                className="bg-white text-blue-700 hover:bg-blue-50 font-bold px-6 py-3 rounded-xl text-xs transition shadow-sm"
              >
                Find a Service
              </Link>
              <Link
                to="/providers"
                className="bg-emerald-800 text-white hover:bg-emerald-900 border border-emerald-500 font-bold px-6 py-3 rounded-xl text-xs transition"
              >
                Browse Verified Providers
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
