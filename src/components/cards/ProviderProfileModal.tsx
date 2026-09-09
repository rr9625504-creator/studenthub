import React, { useState } from 'react';
import { Provider } from '../../data/initialData';
import { useGigGrid } from '../../context/GigGridContext';
import {
  X,
  MapPin,
  Calendar,
  Briefcase,
  ShieldCheck,
  Star,
  Award,
  Phone,
  Mail,
  HeartHandshake,
  CheckCircle2,
} from 'lucide-react';
import { RatingStars } from '../common/RatingStars';
import { VerifiedBadge } from '../common/VerifiedBadge';
import { BookingModal } from '../booking/BookingModal';

interface ProviderProfileModalProps {
  provider: Provider;
  onClose: () => void;
}

export const ProviderProfileModal: React.FC<ProviderProfileModalProps> = ({ provider, onClose }) => {
  const { reviews } = useGigGrid();
  const [showBooking, setShowBooking] = useState(false);

  // Reviews for this provider
  const providerReviews = reviews.filter((r) => r.providerId === provider.id);

  return (
    <>
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
        <div className="bg-white text-slate-900 rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
          {/* Cover / Header */}
          <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-emerald-600 text-white p-6 relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white/80 hover:text-white p-1.5 rounded-xl hover:bg-white/10 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
              <img
                src={provider.avatar}
                alt={provider.name}
                className="w-20 h-20 rounded-2xl object-cover border-2 border-white shadow-md shrink-0"
              />
              <div className="text-center sm:text-left flex-1">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <h2 className="text-2xl font-black text-white">{provider.name}</h2>
                  {provider.verified && (
                    <span className="bg-white/20 text-white text-xs px-2.5 py-0.5 rounded-full font-medium flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Verified Co-op Craftsman
                    </span>
                  )}
                </div>

                <p className="text-blue-100 font-medium text-sm mt-0.5">{provider.skill}</p>

                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-blue-100 mt-2">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-blue-200" />
                    {provider.locality}, Chennai
                  </span>
                  <span>•</span>
                  <span>{provider.experienceYears} Years Trade Exp</span>
                  <span>•</span>
                  <span>Co-op ID: {provider.coopMemberNumber}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Body Content */}
          <div className="p-6 overflow-y-auto space-y-6 text-sm">
            {/* Trust Indicators Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 text-center">
              <div>
                <div className="text-lg font-black text-slate-900">{provider.rating.toFixed(1)} ⭐</div>
                <div className="text-[11px] text-slate-500">Rating ({provider.reviewCount})</div>
              </div>
              <div>
                <div className="text-lg font-black text-slate-900">{provider.completedJobs}</div>
                <div className="text-[11px] text-slate-500">Jobs Completed</div>
              </div>
              <div>
                <div className="text-lg font-black text-emerald-600">₹{provider.hourlyRate}/hr</div>
                <div className="text-[11px] text-slate-500">Base Wage</div>
              </div>
              <div>
                <div className="text-lg font-black text-blue-600">
                  {provider.availableToday ? 'Available' : 'Book Slots'}
                </div>
                <div className="text-[11px] text-slate-500">Today Status</div>
              </div>
            </div>

            {/* About Section */}
            <div>
              <h4 className="font-bold text-slate-900 mb-2">About Craftsman</h4>
              <p className="text-slate-600 leading-relaxed text-xs sm:text-sm">
                {provider.about}
              </p>
            </div>

            {/* Skills Pills */}
            <div>
              <h4 className="font-bold text-slate-900 mb-2">Verified Skill Sets</h4>
              <div className="flex flex-wrap gap-1.5">
                {provider.skillsList.map((skill, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 text-xs bg-slate-100 text-slate-700 px-3 py-1 rounded-lg border border-slate-200"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Cooperative Trust Charter */}
            <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-4 flex items-start gap-3">
              <HeartHandshake className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div className="text-xs">
                <h5 className="font-bold text-emerald-900">Cooperative Guarantee & Welfare Member</h5>
                <p className="text-emerald-800 mt-1">
                  Arun receives 85% directly from your booking and has contributed ₹{provider.coopContribution.toLocaleString()} into the local Maduravoyal Community Emergency Fund.
                </p>
              </div>
            </div>

            {/* Verified Community Reviews */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-bold text-slate-900">Community Reviews ({providerReviews.length})</h4>
                <RatingStars rating={provider.rating} reviewCount={providerReviews.length} />
              </div>

              {providerReviews.length === 0 ? (
                <p className="text-xs text-slate-400 bg-slate-50 p-4 rounded-xl text-center">
                  No public reviews posted yet. Be the first to book and rate!
                </p>
              ) : (
                <div className="space-y-3">
                  {providerReviews.map((rev) => (
                    <div key={rev.id} className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 text-xs">
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <img
                            src={rev.customerAvatar}
                            alt={rev.customerName}
                            className="w-6 h-6 rounded-full object-cover"
                          />
                          <span className="font-semibold text-slate-800">{rev.customerName}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <RatingStars rating={rev.rating} showText={false} size="sm" />
                          <span className="text-[10px] text-slate-400">{rev.date}</span>
                        </div>
                      </div>
                      <p className="text-slate-600 mt-1 leading-relaxed">"{rev.comment}"</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Footer Action */}
          <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
            <div className="text-xs text-slate-500">
              Transparent rate: <strong className="text-slate-800">₹{provider.hourlyRate}/hr</strong>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="px-4 py-2 border border-slate-300 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 transition cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => setShowBooking(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl text-xs font-semibold shadow-sm transition cursor-pointer"
              >
                Book Service Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {showBooking && (
        <BookingModal
          provider={provider}
          onClose={() => setShowBooking(false)}
          onSuccess={() => {
            setShowBooking(false);
            onClose();
          }}
        />
      )}
    </>
  );
};
