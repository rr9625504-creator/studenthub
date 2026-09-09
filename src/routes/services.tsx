import React, { useState, useMemo } from 'react';
import { createFileRoute, Link, useRouter } from '@tanstack/react-router';
import { useGigGrid } from '../context/GigGridContext';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';
import { ServiceCard } from '../components/cards/ServiceCard';
import { Search, Filter, Wrench, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';

export const Route = createFileRoute('/services')({
  component: ServicesPage,
});

function ServicesPage() {
  const { services } = useGigGrid();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const router = useRouter();

  const categories = ['All', 'Home Repairs', 'Sanitation', 'Electronics', 'Education', 'Outdoors', 'Assistance'];

  const filteredServices = useMemo(() => {
    return services.filter((svc) => {
      const matchesSearch =
        svc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        svc.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        svc.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCat = selectedCategory === 'All' || svc.category === selectedCategory;

      return matchesSearch && matchesCat;
    });
  }, [services, searchQuery, selectedCategory]);

  const handleSelectService = (serviceId: string) => {
    router.navigate({
      to: '/providers',
      search: { service: serviceId },
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      {/* Header Banner */}
      <div className="bg-white border-b border-slate-200 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Cooperative Services Catalog
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mt-1">
              Explore Trusted Household & Community Services
            </h1>
            <p className="text-sm text-slate-500 mt-2 leading-relaxed">
              Every service is delivered by certified local cooperative members. Flat transparent pricing with 85% going directly into worker bank accounts.
            </p>
          </div>

          {/* Search & Category Filter Controls */}
          <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search plumbing, wiring, cleaning..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Category Chips */}
            <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <main className="flex-1 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs font-semibold text-slate-500">
              Showing {filteredServices.length} verified cooperative services
            </span>
            <Link
              to="/providers"
              className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              <span>View All Providers</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {filteredServices.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto">
              <Wrench className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="font-bold text-slate-800">No Services Found</h3>
              <p className="text-xs text-slate-500 mt-1">
                Try searching for a different keyword or choose 'All' categories.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="mt-4 text-xs font-semibold text-blue-600 hover:underline cursor-pointer"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredServices.map((svc) => (
                <ServiceCard key={svc.id} service={svc} onSelect={handleSelectService} />
              ))}
            </div>
          )}

          {/* Bottom Co-op Note */}
          <div className="mt-14 bg-gradient-to-r from-blue-50 to-emerald-50 border border-blue-200/80 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-900">Cooperative Workmanship Warranty</h4>
                <p className="text-xs text-slate-600 mt-0.5">
                  All service bookings on GigGrid come with a 7-day cooperative guarantee backed by the community welfare pool.
                </p>
              </div>
            </div>
            <Link
              to="/cooperative"
              className="bg-white border border-slate-200 text-slate-800 hover:bg-slate-50 font-bold px-4 py-2 rounded-xl text-xs transition shrink-0"
            >
              Learn More
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
