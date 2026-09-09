import React from 'react';
import { ServiceItem } from '../../data/initialData';
import {
  Wrench,
  Zap,
  Sparkles,
  Hammer,
  Cpu,
  Palette,
  Sprout,
  BookOpen,
  Laptop,
  Package,
  Users,
  ArrowRight,
} from 'lucide-react';
import { Link } from '@tanstack/react-router';

const ICON_MAP: Record<string, React.ReactNode> = {
  Wrench: <Wrench className="w-6 h-6" />,
  Zap: <Zap className="w-6 h-6" />,
  Sparkles: <Sparkles className="w-6 h-6" />,
  Hammer: <Hammer className="w-6 h-6" />,
  Cpu: <Cpu className="w-6 h-6" />,
  Palette: <Palette className="w-6 h-6" />,
  Sprout: <Sprout className="w-6 h-6" />,
  BookOpen: <BookOpen className="w-6 h-6" />,
  Laptop: <Laptop className="w-6 h-6" />,
  Package: <Package className="w-6 h-6" />,
};

interface ServiceCardProps {
  service: ServiceItem;
  onSelect?: (serviceId: string) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, onSelect }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all duration-200 p-5 flex flex-col justify-between group hover:border-blue-300">
      <div>
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-2xs">
            {ICON_MAP[service.icon] || <Wrench className="w-6 h-6" />}
          </div>
          <div className="flex flex-col items-end">
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/60">
              Starts ₹{service.startingPrice}
            </span>
            {service.popular && (
              <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wider mt-1">
                Popular
              </span>
            )}
          </div>
        </div>

        <h3 className="font-bold text-base text-slate-900 group-hover:text-blue-600 transition-colors">
          {service.name}
        </h3>
        <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
          {service.shortDesc}
        </p>
      </div>

      <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
        <span className="text-slate-500 flex items-center gap-1">
          <Users className="w-3.5 h-3.5 text-slate-400" />
          <span>{service.providerCount} Verified Co-op Workers</span>
        </span>

        {onSelect ? (
          <button
            onClick={() => onSelect(service.id)}
            className="font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform cursor-pointer"
          >
            <span>Browse</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        ) : (
          <Link
            to="/providers"
            search={{ service: service.id }}
            className="font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
          >
            <span>Browse</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        )}
      </div>
    </div>
  );
};
