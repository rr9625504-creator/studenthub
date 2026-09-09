import React, { useState } from 'react';
import { Provider } from '../../data/initialData';
import { MapPin, Briefcase, Calendar, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import { RatingStars } from '../common/RatingStars';
import { VerifiedBadge } from '../common/VerifiedBadge';
import { BookingModal } from '../booking/BookingModal';
import { ProviderProfileModal } from './ProviderProfileModal';

interface ProviderCardProps {
  provider: Provider;
}

export const ProviderCard: React.FC<ProviderCardProps> = ({ provider }) => {
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  return (
    <>
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all duration-200 p-5 flex flex-col justify-between group hover:border-blue-300">
        <div>
          {/* Header row: Avatar + Name + Badges */}
          <div className="flex items-start gap-3.5">
            <img
              src={provider.avatar}
              alt={provider.name}
              className="w-14 h-14 rounded-2xl object-cover border-2 border-slate-100 group-hover:border-blue-200 transition shrink-0"
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-1">
                <h3 className="font-bold text-base text-slate-900 truncate group-hover:text-blue-600 transition">
                  {provider.name}
                </h3>
              </div>

              <p className="text-xs font-semibold text-emerald-700 mt-0.5">{provider.skill}</p>

              <div className="flex items-center gap-2 mt-1">
                <RatingStars rating={provider.rating} reviewCount={provider.reviewCount} size="sm" />
              </div>
            </div>
          </div>

          {/* Verification Badge */}
          <div className="mt-3 flex flex-wrap items-center gap-1.5">
            {provider.verified ? (
              <VerifiedBadge size="sm" label="Verified Craftsman" />
            ) : (
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 font-medium">
                Verification Pending
              </span>
            )}
            <span
              className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${
                provider.availableToday
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'bg-slate-100 text-slate-600'
              }`}
            >
              {provider.availableToday ? '● Available Today' : 'Schedule Next Day'}
            </span>
          </div>

          {/* Key Attributes */}
          <div className="grid grid-cols-2 gap-2 mt-3.5 pt-3 border-t border-slate-100 text-xs text-slate-600">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-blue-500 shrink-0" />
              <span className="truncate font-medium">{provider.locality}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>{provider.experienceYears} yrs experience</span>
            </div>
          </div>

          {/* Skills Snippet */}
          <div className="flex flex-wrap gap-1 mt-3">
            {provider.skillsList.slice(0, 2).map((sk, idx) => (
              <span
                key={idx}
                className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md truncate max-w-[130px]"
              >
                {sk}
              </span>
            ))}
            {provider.skillsList.length > 2 && (
              <span className="text-[10px] text-slate-400 self-center">
                +{provider.skillsList.length - 2} more
              </span>
            )}
          </div>
        </div>

        {/* Footer with Rate and Actions */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <div>
            <span className="text-[10px] text-slate-400 block uppercase font-medium">Base Wage</span>
            <span className="text-base font-bold text-slate-900">
              ₹{provider.hourlyRate}
              <span className="text-xs font-normal text-slate-500">/hr</span>
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setShowProfileModal(true)}
              className="px-2.5 py-1.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition cursor-pointer"
            >
              Profile
            </button>
            <button
              onClick={() => setShowBookingModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-1.5 rounded-xl text-xs font-semibold shadow-xs transition flex items-center gap-1 cursor-pointer"
            >
              <span>Book</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {showBookingModal && (
        <BookingModal provider={provider} onClose={() => setShowBookingModal(false)} />
      )}

      {showProfileModal && (
        <ProviderProfileModal provider={provider} onClose={() => setShowProfileModal(false)} />
      )}
    </>
  );
};
