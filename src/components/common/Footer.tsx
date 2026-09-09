import React from 'react';
import { Link } from '@tanstack/react-router';
import { Grid, HeartHandshake, ShieldCheck, Award, MapPin, Phone, Mail, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-emerald-500 flex items-center justify-center text-white shadow-md">
                <Grid className="w-6 h-6" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                Gig<span className="text-emerald-400">Grid</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              “Trusted local services. Fair work. Stronger communities.”
            </p>
            <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
              A community-owned cooperative gig platform connecting households with vetted plumbers, electricians, cleaners, and technicians while redistributing 95% of revenues directly back to workers and their emergency welfare pool.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 text-[11px] bg-blue-950 text-blue-300 border border-blue-800 px-2.5 py-1 rounded-full">
                <Award className="w-3.5 h-3.5 text-blue-400" />
                SIH Problem ID: SIH26089
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] bg-emerald-950 text-emerald-300 border border-emerald-800 px-2.5 py-1 rounded-full">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Cooperative Certified
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Platform</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link to="/services" className="hover:text-white transition">
                  Browse 10+ Services
                </Link>
              </li>
              <li>
                <Link to="/providers" className="hover:text-white transition">
                  Verified Local Providers
                </Link>
              </li>
              <li>
                <Link to="/cooperative" className="hover:text-white transition">
                  Transparent Revenue Split
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="hover:text-white transition">
                  How Cooperative Works
                </Link>
              </li>
              <li>
                <Link to="/customer" className="hover:text-white transition">
                  Customer Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Cooperative Ecosystem */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Cooperative</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link to="/provider" className="hover:text-white transition">
                  Worker Portal & Earnings
                </Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-white transition">
                  Admin Verification Desk
                </Link>
              </li>
              <li>
                <span className="text-slate-400">Maduravoyal Community Cluster</span>
              </li>
              <li>
                <span className="text-slate-400">Zero-Interest Tool Loan Pool</span>
              </li>
              <li>
                <span className="text-slate-400">Fair Wages Guarantee</span>
              </li>
            </ul>
          </div>

          {/* Contact & Local Chapter */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Regional Chapter</h4>
            <div className="space-y-2 text-xs text-slate-400">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Maduravoyal & Porur Hub, Chennai West, Tamil Nadu - 600095</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <span>1800-GIG-GRID (Toll-free Co-op Helpline)</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-teal-400 shrink-0" />
                <span>support@giggrid.coop</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2024 GigGrid Cooperative Platform. Smart India Hackathon Demo Project.</p>
          <div className="flex items-center gap-4">
            <span className="text-emerald-400 font-medium">85% Direct Worker Share</span>
            <span>•</span>
            <span className="text-blue-400 font-medium">10% Welfare Fund</span>
            <span>•</span>
            <span className="text-slate-400 font-medium">5% Open Platform</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
