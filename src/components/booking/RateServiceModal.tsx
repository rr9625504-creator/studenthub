import React, { useState } from 'react';
import { Booking } from '../../data/initialData';
import { useGigGrid } from '../../context/GigGridContext';
import { X, Star, HeartHandshake, CheckCircle2 } from 'lucide-react';

interface RateServiceModalProps {
  booking: Booking;
  onClose: () => void;
  onSuccess?: () => void;
}

export const RateServiceModal: React.FC<RateServiceModalProps> = ({ booking, onClose, onSuccess }) => {
  const { submitReview } = useGigGrid();
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [comment, setComment] = useState<string>(
    'Excellent and punctual service! Very courteous, diagnosed the issue quickly, and fair cooperative pricing with no surprise charges.'
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating < 1 || !comment.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const ok = submitReview(booking.id, rating, comment);
      setIsSubmitting(false);
      if (ok) {
        onSuccess?.();
        onClose();
      }
    }, 400);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white text-slate-900 rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HeartHandshake className="w-5 h-5" />
            <div>
              <h3 className="font-bold text-base">Rate Your Cooperative Service</h3>
              <p className="text-xs text-emerald-100">Booking #{booking.id} • {booking.serviceName}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
            <img
              src={booking.providerAvatar}
              alt={booking.providerName}
              className="w-12 h-12 rounded-full object-cover border border-slate-200"
            />
            <div>
              <h4 className="font-bold text-sm text-slate-900">{booking.providerName}</h4>
              <p className="text-xs text-slate-500">{booking.providerSkill} • {booking.customerLocality}</p>
            </div>
          </div>

          {/* Interactive Star Rating */}
          <div className="text-center py-2">
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
              Select Your Rating
            </label>
            <div className="flex items-center justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                  className="p-1 text-slate-300 transition transform hover:scale-125 focus:outline-none cursor-pointer"
                >
                  <Star
                    className={`w-8 h-8 ${
                      star <= (hoverRating || rating)
                        ? 'text-amber-400 fill-amber-400'
                        : 'text-slate-300'
                    }`}
                  />
                </button>
              ))}
            </div>
            <p className="text-xs font-semibold text-slate-700 mt-2">
              {rating === 5 && '⭐⭐⭐⭐⭐ Outstanding / Highly Recommended'}
              {rating === 4 && '⭐⭐⭐⭐ Very Good Service'}
              {rating === 3 && '⭐⭐⭐ Satisfactory Work'}
              {rating === 2 && '⭐⭐ Needs Improvement'}
              {rating === 1 && '⭐ Poor Experience'}
            </p>
          </div>

          {/* Written Feedback */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Written Community Review
            </label>
            <textarea
              required
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Describe your experience with the worker's punctuality, quality, and cooperative spirit..."
              className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
            <p className="text-[11px] text-slate-500 mt-1">
              Your feedback is published to the cooperative community bulletin and directly influences worker skill badges.
            </p>
          </div>

          {/* Buttons */}
          <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white px-5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition cursor-pointer shadow-sm"
            >
              {isSubmitting ? 'Posting Review...' : 'Submit Rating & Review'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
