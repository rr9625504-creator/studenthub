import React, { useState, useMemo } from 'react';
import { createFileRoute, useSearch } from '@tanstack/react-router';
import { useGigGrid } from '../context/GigGridContext';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';
import { ProviderCard } from '../components/cards/ProviderCard';
import { Search, MapPin, Filter, ShieldCheck, Star, RotateCcw, Wrench } from 'lucide-react';
import { LOCALITIES } from '../data/initialData';

export const Route = createFileRoute('/providers')({
  validateSearch: (search: Record<string, unknown>) => {
    return {
      service: (search.service as string) || undefined,
      locality: (search.locality as string) || undefined,
      query: (search.query as string) || undefined,
    };
  },
  component: ProvidersPage,
});

function ProvidersPage() {
  const searchParams = useSearch({ from: '/providers' });
  const { providers, services } = useGigGrid();

  const [searchQuery, setSearchQuery] = useState(searchParams.query || '');
  const [selectedService, setSelectedService] = useState<string>(searchParams.service || 'all');
  const [selectedLocality, setSelectedLocality] = useState<string>(searchParams.locality || 'All Localities');
  const [minRating, setMinRating] = useState<number>(0);
  const [onlyVerified, setOnlyVerified] = useState<boolean>(true);
  const [onlyAvailableToday, setOnlyAvailableToday] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'rating' | 'jobs' | 'priceAsc'>('rating');

  // Filter & Sort Logic
  const filteredProviders = useMemo(() => {
    return providers
      .filter((p) => {
        // Query search
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const match =
            p.name.toLowerCase().includes(q) ||
            p.skill.toLowerCase().includes(q) ||
            p.locality.toLowerCase().includes(q) ||
            p.skillsList.some((s) => s.toLowerCase().includes(q));
          if (!match) return false;
        }

        // Service filter
        if (selectedService !== 'all') {
          if (p.serviceId !== selectedService && !p.skill.toLowerCase().includes(selectedService.toLowerCase())) {
            return false;
          }
        }

        // Locality filter
        if (selectedLocality !== 'All Localities') {
          if (p.locality.toLowerCase() !== selectedLocality.toLowerCase()) {
            return false;
          }
        }

        // Rating
        if (p.rating < minRating) return false;

        // Verified
        if (onlyVerified && !p.verified) return false;

        // Available Today
        if (onlyAvailableToday && !p.availableToday) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'jobs') return b.completedJobs - a.completedJobs;
        if (sortBy === 'priceAsc') return a.hourlyRate - b.hourlyRate;
        return 0;
      });
  }, [
    providers,
    searchQuery,
    selectedService,
    selectedLocality,
    minRating,
    onlyVerified,
    onlyAvailableToday,
    sortBy,
  ]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedService('all');
    setSelectedLocality('All Localities');
    setMinRating(0);
    setOnlyVerified(false);
    setOnlyAvailableToday(false);
    setSortBy('rating');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      {/* Header Bar */}
      <div className="bg-white border-b border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                  Direct Worker Directory
                </span>
                <span className="bg-blue-50 text-blue-700 text-[11px] px-2 py-0.5 rounded-full font-semibold border border-blue-200">
                  Maduravoyal Chapter
                </span>
              </div>
              <h1 className="text-3xl font-black text-slate-900 mt-1">
                Verified Cooperative Service Providers
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Direct booking with background-checked local craftspeople. Zero aggregator commission markups.
              </p>
            </div>

            {/* Quick Stats Pill */}
            <div className="flex items-center gap-4 bg-slate-50 p-3 rounded-2xl border border-slate-200 text-xs">
              <div className="text-center px-2">
                <span className="block font-black text-base text-slate-900">{providers.length}</span>
                <span className="text-slate-500 text-[10px]">Registered</span>
              </div>
              <div className="h-6 w-px bg-slate-200" />
              <div className="text-center px-2">
                <span className="block font-black text-base text-emerald-600">
                  {providers.filter((p) => p.verified).length}
                </span>
                <span className="text-slate-500 text-[10px]">Co-op Verified</span>
              </div>
              <div className="h-6 w-px bg-slate-200" />
              <div className="text-center px-2">
                <span className="block font-black text-base text-blue-600">85%</span>
                <span className="text-slate-500 text-[10px]">Direct Share</span>
              </div>
            </div>
          </div>

          {/* Filter Toolbar */}
          <div className="mt-6 pt-6 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search name, skill, tool..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2 text-xs focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Service Dropdown */}
            <div>
              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer"
              >
                <option value="all">All Services</option>
                {services.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Locality Dropdown */}
            <div>
              <select
                value={selectedLocality}
                onChange={(e) => setSelectedLocality(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold text-blue-900 bg-blue-50/50 border-blue-200 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer"
              >
                {LOCALITIES.map((loc) => (
                  <option key={loc} value={loc}>
                    📍 {loc}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Order */}
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer"
              >
                <option value="rating">Sort: Highest Rating (★)</option>
                <option value="jobs">Sort: Most Jobs Completed</option>
                <option value="priceAsc">Sort: Price (Lowest First)</option>
              </select>
            </div>

            {/* Quick Checkbox Toggles & Reset */}
            <div className="flex items-center justify-between gap-2">
              <label className="flex items-center gap-1.5 cursor-pointer text-slate-700 font-medium select-none">
                <input
                  type="checkbox"
                  checked={onlyVerified}
                  onChange={(e) => setOnlyVerified(e.target.checked)}
                  className="rounded text-blue-600 focus:ring-blue-500 w-3.5 h-3.5"
                />
                <span>Verified only</span>
              </label>

              <button
                onClick={handleResetFilters}
                className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition cursor-pointer"
                title="Reset all filters"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <main className="flex-1 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs font-semibold text-slate-500">
              Found {filteredProviders.length} providers matching your criteria
            </span>
            {selectedLocality === 'Maduravoyal' && (
              <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs px-2.5 py-0.5 rounded-full font-medium">
                Showing Maduravoyal neighborhood craftsmen
              </span>
            )}
          </div>

          {filteredProviders.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto">
              <Wrench className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="font-bold text-slate-800">No Providers Found</h3>
              <p className="text-xs text-slate-500 mt-1">
                Try loosening your filters, changing the locality, or searching for another trade.
              </p>
              <button
                onClick={handleResetFilters}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-xl text-xs font-semibold hover:bg-blue-700 transition cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProviders.map((provider) => (
                <ProviderCard key={provider.id} provider={provider} />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
