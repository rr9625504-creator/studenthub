import React, { useState } from 'react';
import { IndianRupee, ShieldCheck, HeartHandshake, Server, Sparkles, TrendingUp, HelpCircle } from 'lucide-react';

interface RevenueBreakdownCardProps {
  initialAmount?: number;
  interactive?: boolean;
}

export const RevenueBreakdownCard: React.FC<RevenueBreakdownCardProps> = ({
  initialAmount = 1000,
  interactive = true,
}) => {
  const [amount, setAmount] = useState<number>(initialAmount);

  const workerEarnings = Math.round(amount * 0.85);
  const coopFund = Math.round(amount * 0.1);
  const platformOps = Math.round(amount * 0.05);

  // Commercial comparison
  const commercialWorker = Math.round(amount * 0.7);
  const commercialCommission = Math.round(amount * 0.3);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200 mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            100% Transparent Cooperative Algorithm
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            Fair Revenue-Sharing Model
          </h3>
          <p className="text-sm text-slate-500 mt-1">
            Every rupee is accounted for. Zero hidden algorithm surcharges or predatory commissions.
          </p>
        </div>

        {/* Amount Selector */}
        {interactive && (
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center gap-3">
            <span className="text-xs font-medium text-slate-600">Sample Service:</span>
            <div className="flex items-center gap-1 font-bold text-lg text-blue-700">
              <span>₹</span>
              <input
                type="number"
                min={200}
                max={10000}
                step={50}
                value={amount}
                onChange={(e) => setAmount(Math.max(100, Number(e.target.value) || 0))}
                className="w-24 bg-white border border-slate-300 rounded-lg px-2.5 py-1 text-base font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        )}
      </div>

      {/* Preset Amount Chips */}
      {interactive && (
        <div className="flex items-center gap-2 mt-4 text-xs">
          <span className="text-slate-500 font-medium">Quick examples:</span>
          {[500, 1000, 2000, 3500].map((preset) => (
            <button
              key={preset}
              onClick={() => setAmount(preset)}
              className={`px-3 py-1 rounded-lg font-semibold transition cursor-pointer ${
                amount === preset
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              ₹{preset.toLocaleString()}
            </button>
          ))}
        </div>
      )}

      {/* Visual Multi-Segment Bar */}
      <div className="mt-6">
        <div className="flex items-center justify-between text-xs font-semibold mb-2 text-slate-600">
          <span>Customer Paid: ₹{amount.toLocaleString()}</span>
          <span>100% Cooperative Distribution</span>
        </div>

        <div className="h-6 w-full rounded-xl overflow-hidden flex shadow-inner bg-slate-100 border border-slate-200">
          <div
            className="bg-emerald-500 hover:bg-emerald-600 transition-all flex items-center justify-center text-[11px] font-bold text-white cursor-help"
            style={{ width: '85%' }}
            title={`Worker Direct Share: 85% (₹${workerEarnings})`}
          >
            85% Worker Direct
          </div>
          <div
            className="bg-blue-500 hover:bg-blue-600 transition-all flex items-center justify-center text-[11px] font-bold text-white cursor-help"
            style={{ width: '10%' }}
            title={`Cooperative Welfare Fund: 10% (₹${coopFund})`}
          >
            10% Co-op
          </div>
          <div
            className="bg-slate-400 hover:bg-slate-500 transition-all flex items-center justify-center text-[10px] font-bold text-white cursor-help"
            style={{ width: '5%' }}
            title={`Platform Operations: 5% (₹${platformOps})`}
          >
            5%
          </div>
        </div>
      </div>

      {/* Breakdown Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        {/* Worker Earnings */}
        <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-4.5 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
              85% Worker Direct
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shadow-xs">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-emerald-900">
              ₹{workerEarnings.toLocaleString()}
            </div>
            <p className="text-xs text-emerald-800 mt-1">
              Transferred instantly to provider UPI/bank. Zero delay, zero middleman cuts.
            </p>
          </div>
        </div>

        {/* Cooperative Fund */}
        <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-4.5 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-blue-800 uppercase tracking-wider">
              10% Co-op Welfare
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-xs">
              <HeartHandshake className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-blue-900">
              ₹{coopFund.toLocaleString()}
            </div>
            <p className="text-xs text-blue-800 mt-1">
              Provides health insurance, zero-interest tool loans, accident cover & annual dividend.
            </p>
          </div>
        </div>

        {/* Operations */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4.5 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              5% Lean Ops
            </span>
            <div className="w-8 h-8 rounded-lg bg-slate-700 text-white flex items-center justify-center shadow-xs">
              <Server className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-slate-800">
              ₹{platformOps.toLocaleString()}
            </div>
            <p className="text-xs text-slate-600 mt-1">
              Maintains open-source cloud hosting, SMS alerts, and customer grievance desk.
            </p>
          </div>
        </div>
      </div>

      {/* Comparison with Aggregators Banner */}
      <div className="mt-6 bg-slate-900 text-white rounded-xl p-4.5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase">
            <Sparkles className="w-4 h-4" />
            Commercial Aggregator vs GigGrid Cooperative
          </div>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            Commercial platforms take up to <strong>₹{commercialCommission.toLocaleString()} (30%)</strong> in commissions and surge penalties. On GigGrid, the worker keeps <strong>₹{(workerEarnings - commercialWorker).toLocaleString()} more</strong> on this exact job!
          </p>
        </div>
        <div className="bg-white/10 px-3.5 py-2 rounded-xl text-center shrink-0 border border-white/10">
          <div className="text-xs text-slate-300">Worker Extra Gain</div>
          <div className="text-lg font-black text-emerald-400">
            +₹{(workerEarnings - commercialWorker).toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
};
