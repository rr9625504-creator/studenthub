import React, { useState } from 'react';
import { Booking, BookingStatus } from '../../data/initialData';
import { useGigGrid } from '../../context/GigGridContext';
import {
  Calendar,
  Clock,
  MapPin,
  IndianRupee,
  CheckCircle,
  PlayCircle,
  XCircle,
  Star,
  ShieldCheck,
  ChevronRight,
  FileText,
  User,
  Wrench,
} from 'lucide-react';
import { BookingTimeline } from '../common/BookingTimeline';
import { RateServiceModal } from '../booking/RateServiceModal';
import { RatingStars } from '../common/RatingStars';

interface BookingCardProps {
  booking: Booking;
  viewMode?: 'customer' | 'provider' | 'admin';
}

export const BookingCard: React.FC<BookingCardProps> = ({ booking, viewMode }) => {
  const { currentUser, updateBookingStatus } = useGigGrid();
  const [showRateModal, setShowRateModal] = useState(false);

  const activeMode = viewMode || currentUser.role;

  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case 'REQUESTED':
        return (
          <span className="bg-amber-50 text-amber-700 border border-amber-200 text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
            ● Requested
          </span>
        );
      case 'ACCEPTED':
        return (
          <span className="bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
            ✓ Accepted
          </span>
        );
      case 'IN PROGRESS':
        return (
          <span className="bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider animate-pulse">
            ⚡ In Progress
          </span>
        );
      case 'COMPLETED':
        return (
          <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
            ✓ Completed
          </span>
        );
      case 'RATED':
        return (
          <span className="bg-purple-50 text-purple-700 border border-purple-200 text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
            ⭐ Reviewed ({booking.rating}★)
          </span>
        );
      case 'CANCELLED':
        return (
          <span className="bg-red-50 text-red-700 border border-red-200 text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
            ✕ Cancelled
          </span>
        );
    }
  };

  return (
    <>
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-sm transition-all p-5 sm:p-6 space-y-4">
        {/* Top bar: ID + Status + Amount */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-xs font-bold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg">
              #{booking.id}
            </span>
            <span className="text-xs text-slate-400">
              {new Date(booking.createdAt).toLocaleDateString()}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {getStatusBadge(booking.status)}
            <div className="text-right">
              <span className="text-xs text-slate-400 block -mb-1">Total</span>
              <span className="text-base font-black text-slate-900">
                ₹{booking.estimatedBudget.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Counterpart Info (Provider sees Customer, Customer sees Provider) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/80 p-3.5 rounded-xl border border-slate-100">
          <div className="flex items-center gap-3">
            <img
              src={booking.providerAvatar}
              alt={booking.providerName}
              className="w-12 h-12 rounded-xl object-cover border border-slate-200 shadow-2xs shrink-0"
            />
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-sm text-slate-900">{booking.providerName}</h4>
                <span className="bg-blue-100 text-blue-800 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                  {booking.serviceName}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1.5">
                <User className="w-3 h-3 text-slate-400" />
                <span>Customer: {booking.customerName} ({booking.customerLocality})</span>
              </p>
            </div>
          </div>

          <div className="flex sm:flex-col justify-between items-end text-xs text-slate-600 gap-1 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-200/60">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-blue-500" />
              <strong>{booking.date}</strong>
            </span>
            <span className="flex items-center gap-1 text-slate-500">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              {booking.timeSlot}
            </span>
          </div>
        </div>

        {/* Requirement & Address Details */}
        <div className="space-y-1.5 text-xs text-slate-600">
          <div className="flex items-start gap-2">
            <FileText className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
            <p className="flex-1 text-slate-700">
              <strong className="text-slate-900">Job Requirement: </strong>
              {booking.requirement}
            </p>
          </div>
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <p className="flex-1 text-slate-500">{booking.customerAddress}</p>
          </div>
        </div>

        {/* Transparent Co-op Allocation Pill */}
        <div className="bg-emerald-50/50 border border-emerald-200/70 p-2.5 rounded-xl flex flex-wrap items-center justify-between text-[11px] text-emerald-900 gap-2">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span className="font-semibold">Cooperative Split:</span>
          </div>
          <div className="flex items-center gap-3">
            <span>Worker Direct (85%): <strong>₹{booking.workerShare}</strong></span>
            <span>•</span>
            <span>Co-op Welfare (10%): <strong>₹{booking.coopShare}</strong></span>
            <span>•</span>
            <span>Ops (5%): <strong>₹{booking.platformShare}</strong></span>
          </div>
        </div>

        {/* Timeline Progression */}
        <BookingTimeline status={booking.status} rating={booking.rating} />

        {/* Existing Rating / Review Display if Rated */}
        {booking.status === 'RATED' && booking.review && (
          <div className="bg-purple-50/70 border border-purple-200 p-3 rounded-xl text-xs space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-purple-900">Customer Verified Review</span>
              <RatingStars rating={booking.rating || 5} showText={false} size="sm" />
            </div>
            <p className="text-purple-800 italic">"{booking.review}"</p>
          </div>
        )}

        {/* Action Controls Bar */}
        <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs text-slate-400">
            {booking.status === 'REQUESTED' && 'Waiting for provider to accept...'}
            {booking.status === 'ACCEPTED' && 'Provider scheduled. Awaiting arrival.'}
            {booking.status === 'IN PROGRESS' && 'Service currently underway.'}
            {booking.status === 'COMPLETED' && 'Service delivered. Rate your experience!'}
            {booking.status === 'RATED' && 'Booking complete & community rated.'}
          </span>

          <div className="flex items-center gap-2">
            {/* Provider Actions */}
            {booking.status === 'REQUESTED' && (
              <>
                <button
                  onClick={() => updateBookingStatus(booking.id, 'ACCEPTED')}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer shadow-xs"
                >
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Accept Request (Provider)</span>
                </button>
                <button
                  onClick={() => updateBookingStatus(booking.id, 'CANCELLED')}
                  className="text-red-600 hover:bg-red-50 border border-red-200 px-3 py-2 rounded-xl text-xs font-semibold transition cursor-pointer"
                >
                  Reject
                </button>
              </>
            )}

            {booking.status === 'ACCEPTED' && (
              <button
                onClick={() => updateBookingStatus(booking.id, 'IN PROGRESS')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer shadow-xs"
              >
                <PlayCircle className="w-3.5 h-3.5" />
                <span>Start Service (Provider)</span>
              </button>
            )}

            {booking.status === 'IN PROGRESS' && (
              <button
                onClick={() => updateBookingStatus(booking.id, 'COMPLETED')}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer shadow-xs"
              >
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Complete Service (Provider)</span>
              </button>
            )}

            {/* Customer Rating Action */}
            {booking.status === 'COMPLETED' && (
              <button
                onClick={() => setShowRateModal(true)}
                className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer shadow-xs animate-bounce"
              >
                <Star className="w-3.5 h-3.5 fill-white" />
                <span>Rate Your Service (Customer)</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {showRateModal && (
        <RateServiceModal booking={booking} onClose={() => setShowRateModal(false)} />
      )}
    </>
  );
};
