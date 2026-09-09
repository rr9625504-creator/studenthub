import React, { useState } from 'react';
import { Provider } from '../../data/initialData';
import { useGigGrid } from '../../context/GigGridContext';
import { X, Calendar, Clock, MapPin, IndianRupee, FileText, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import { useRouter } from '@tanstack/react-router';

interface BookingModalProps {
  provider: Provider;
  onClose: () => void;
  onSuccess?: (bookingId: string) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ provider, onClose, onSuccess }) => {
  const { currentUser, createBooking } = useGigGrid();
  const router = useRouter();

  const [date, setDate] = useState<string>(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [timeSlot, setTimeSlot] = useState<string>('10:00 AM - 12:00 PM');
  const [locality, setLocality] = useState<string>(currentUser.locality || provider.locality || 'Maduravoyal');
  const [address, setAddress] = useState<string>(
    'Flat 302, Green Meadows Apt, Nethaji Road, ' + (currentUser.locality || 'Maduravoyal')
  );
  const [requirement, setRequirement] = useState<string>(
    `Urgent ${provider.skill.toLowerCase()} service: pipe leakage inspection and tap replacement.`
  );
  const [estimatedBudget, setEstimatedBudget] = useState<number>(provider.hourlyRate * 2 || 1000);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdBookingId, setCreatedBookingId] = useState<string | null>(null);

  const workerShare = Math.round(estimatedBudget * 0.85);
  const coopShare = Math.round(estimatedBudget * 0.1);
  const opsShare = Math.round(estimatedBudget * 0.05);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!requirement.trim()) {
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const newBooking = createBooking({
        providerId: provider.id,
        date,
        timeSlot,
        requirement,
        estimatedBudget,
        customerAddress: address,
        customerLocality: locality,
      });

      setIsSubmitting(false);
      if (newBooking) {
        setCreatedBookingId(newBooking.id);
        onSuccess?.(newBooking.id);
      }
    }, 400);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white text-slate-900 rounded-2xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-emerald-600 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={provider.avatar}
              alt={provider.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-white/80 shadow-xs"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-lg leading-tight">{provider.name}</h3>
                <span className="bg-white/20 text-white text-[10px] px-2 py-0.5 rounded-full font-semibold">
                  {provider.skill}
                </span>
              </div>
              <p className="text-xs text-blue-100 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3" />
                <span>{provider.locality}</span>
                <span>•</span>
                <span>⭐ {provider.rating.toFixed(1)} ({provider.completedJobs} jobs)</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success Screen */}
        {createdBookingId ? (
          <div className="p-6 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider bg-blue-100 text-blue-800 px-2.5 py-1 rounded-full">
                Initial Status: REQUESTED
              </span>
              <h4 className="text-xl font-bold text-slate-900 mt-2">
                Booking Request Sent!
              </h4>
              <p className="text-sm text-slate-600 mt-1 max-w-md mx-auto">
                Booking <strong>#{createdBookingId}</strong> has been dispatched to <strong>{provider.name}</strong>.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-left text-xs space-y-2 max-w-md mx-auto">
              <div className="flex justify-between">
                <span className="text-slate-500">Service Date:</span>
                <span className="font-semibold text-slate-800">{date} ({timeSlot})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Estimated Total:</span>
                <span className="font-bold text-emerald-600">₹{estimatedBudget.toLocaleString()}</span>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-2 text-[11px] text-slate-500">
                <span>Worker Direct Share (85%): ₹{workerShare}</span>
                <span>Co-op Fund (10%): ₹{coopShare}</span>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-900 text-left">
              <strong>Hackathon Tip:</strong> To demonstrate status progression, switch to <strong>Provider Demo (Arun Kumar)</strong> in the top bar to accept this job!
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => {
                  onClose();
                  router.navigate({ to: '/customer' });
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition cursor-pointer"
              >
                Go to My Bookings
              </button>
              <button
                onClick={onClose}
                className="border border-slate-300 hover:bg-slate-50 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 transition cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          /* Booking Form */
          <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-sm">
            {/* Date & Time Slot */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-blue-600" />
                  Service Date
                </label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-blue-600" />
                  Preferred Time Slot
                </label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="09:00 AM - 11:00 AM">Morning (09:00 AM - 11:00 AM)</option>
                  <option value="10:00 AM - 12:00 PM">Late Morning (10:00 AM - 12:00 PM)</option>
                  <option value="01:00 PM - 03:00 PM">Afternoon (01:00 PM - 03:00 PM)</option>
                  <option value="04:00 PM - 06:00 PM">Evening (04:00 PM - 06:00 PM)</option>
                  <option value="06:00 PM - 08:00 PM">Night Slot (06:00 PM - 08:00 PM)</option>
                </select>
              </div>
            </div>

            {/* Locality & Address */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-blue-600" />
                Service Address (Maduravoyal / Chennai)
              </label>
              <input
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Door No, Street Name, Landmark"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Requirement Description */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-blue-600" />
                Describe the Job / Repair Requirement
              </label>
              <textarea
                required
                rows={3}
                value={requirement}
                onChange={(e) => setRequirement(e.target.value)}
                placeholder="E.g., Kitchen sink pipe leakage, replace tap, check overhead tank connection..."
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Estimated Budget & Transparent Breakdown */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                  <IndianRupee className="w-3.5 h-3.5 text-emerald-600" />
                  Estimated Service Budget
                </label>
                <div className="flex items-center gap-1 font-bold text-base text-slate-900">
                  <span>₹</span>
                  <input
                    type="number"
                    min={300}
                    max={10000}
                    step={50}
                    value={estimatedBudget}
                    onChange={(e) => setEstimatedBudget(Math.max(100, Number(e.target.value) || 0))}
                    className="w-24 bg-white border border-slate-300 rounded-lg px-2 py-0.5 text-right font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Co-op Split Pill */}
              <div className="bg-white p-3 rounded-lg border border-slate-200/80 space-y-1.5 text-xs">
                <div className="flex justify-between font-semibold text-emerald-700">
                  <span>Worker Direct Earning (85%):</span>
                  <span>₹{workerShare.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-blue-700">
                  <span>Co-op Emergency & Welfare Pool (10%):</span>
                  <span>₹{coopShare.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Platform Open-Source Operations (5%):</span>
                  <span>₹{opsShare.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Trust Notice */}
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Cooperative Guarantee: You only pay upon satisfactory completion.</span>
            </div>

            {/* Footer Buttons */}
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
                className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition cursor-pointer shadow-sm"
              >
                {isSubmitting ? (
                  <span>Dispatching...</span>
                ) : (
                  <>
                    <span>Request Booking</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
