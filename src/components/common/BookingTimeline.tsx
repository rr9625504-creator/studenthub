import React from 'react';
import { BookingStatus } from '../../data/initialData';
import { CheckCircle2, Circle, Clock, PlayCircle, Star, AlertCircle } from 'lucide-react';

interface BookingTimelineProps {
  status: BookingStatus;
  createdAt?: string;
  rating?: number;
}

const STEPS: { status: BookingStatus; label: string; description: string }[] = [
  { status: 'REQUESTED', label: 'Requested', description: 'Booking received by cooperative provider' },
  { status: 'ACCEPTED', label: 'Accepted', description: 'Provider confirmed appointment' },
  { status: 'IN PROGRESS', label: 'In Progress', description: 'Provider on-site performing service' },
  { status: 'COMPLETED', label: 'Completed', description: 'Job finished & transparent earnings allocated' },
  { status: 'RATED', label: 'Reviewed', description: 'Community rating & feedback submitted' },
];

export const BookingTimeline: React.FC<BookingTimelineProps> = ({ status, rating }) => {
  const isCancelled = status === 'CANCELLED';

  const getStepIndex = (st: BookingStatus): number => {
    switch (st) {
      case 'REQUESTED':
        return 0;
      case 'ACCEPTED':
        return 1;
      case 'IN PROGRESS':
        return 2;
      case 'COMPLETED':
        return 3;
      case 'RATED':
        return 4;
      default:
        return -1;
    }
  };

  const currentIndex = getStepIndex(status);

  if (isCancelled) {
    return (
      <div className="bg-red-50 border border-red-200 p-4 rounded-xl flex items-center gap-3 text-red-800">
        <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
        <div>
          <h4 className="font-semibold text-sm">Booking Cancelled</h4>
          <p className="text-xs text-red-600">This service request was cancelled.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-2">
      {/* Desktop Horizontal Stepper */}
      <div className="hidden sm:flex items-center justify-between relative">
        <div className="absolute top-4 left-6 right-6 h-0.5 bg-slate-200 -z-0" />
        <div
          className="absolute top-4 left-6 h-0.5 bg-emerald-500 transition-all duration-500 -z-0"
          style={{ width: `${Math.max(0, (currentIndex / (STEPS.length - 1)) * 100)}%` }}
        />

        {STEPS.map((step, idx) => {
          const isDone = idx < currentIndex || (idx === 4 && status === 'RATED');
          const isCurrent = idx === currentIndex;
          const isFuture = idx > currentIndex;

          return (
            <div key={step.status} className="flex flex-col items-center text-center relative z-10 w-24">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-xs ${
                  isDone
                    ? 'bg-emerald-600 text-white ring-4 ring-emerald-100'
                    : isCurrent
                    ? 'bg-blue-600 text-white ring-4 ring-blue-100 animate-pulse'
                    : 'bg-white border-2 border-slate-300 text-slate-400'
                }`}
              >
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : isCurrent ? (
                  idx === 2 ? (
                    <PlayCircle className="w-4 h-4" />
                  ) : idx === 4 ? (
                    <Star className="w-4 h-4" />
                  ) : (
                    <Clock className="w-4 h-4" />
                  )
                ) : (
                  <span>{idx + 1}</span>
                )}
              </div>
              <span
                className={`text-xs mt-2 font-semibold ${
                  isCurrent ? 'text-blue-600' : isDone ? 'text-slate-800' : 'text-slate-400'
                }`}
              >
                {step.label}
              </span>
              <span className="text-[10px] text-slate-500 hidden md:block max-w-[100px] leading-tight mt-0.5">
                {step.description}
              </span>
            </div>
          );
        })}
      </div>

      {/* Mobile Vertical Stepper */}
      <div className="sm:hidden space-y-3">
        {STEPS.map((step, idx) => {
          const isDone = idx < currentIndex || (idx === 4 && status === 'RATED');
          const isCurrent = idx === currentIndex;

          return (
            <div key={step.status} className="flex items-start gap-3">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                  isDone
                    ? 'bg-emerald-600 text-white'
                    : isCurrent
                    ? 'bg-blue-600 text-white ring-2 ring-blue-200'
                    : 'bg-slate-100 text-slate-400 border border-slate-300'
                }`}
              >
                {isDone ? <CheckCircle2 className="w-3.5 h-3.5" /> : idx + 1}
              </div>
              <div>
                <p
                  className={`text-xs font-semibold ${
                    isCurrent ? 'text-blue-600' : isDone ? 'text-slate-800' : 'text-slate-400'
                  }`}
                >
                  {step.label}
                </p>
                <p className="text-[11px] text-slate-500">{step.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
