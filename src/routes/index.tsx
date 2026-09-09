import React, { useState } from 'react';
import { createFileRoute, Link, useRouter } from '@tanstack/react-router';
import { useGigGrid } from '../context/GigGridContext';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';
import { ServiceCard } from '../components/cards/ServiceCard';
import { ProviderCard } from '../components/cards/ProviderCard';
import { RevenueBreakdownCard } from '../components/cooperative/RevenueBreakdownCard';
import {
  Search,
  MapPin,
  ShieldCheck,
  Star,
  IndianRupee,
  HeartHandshake,
  Users,
  Award,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  Sparkles,
  ChevronRight,
  Briefcase,
  Compass,
} from 'lucide-react';
import { LOCALITIES } from '../data/initialData';

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  const { services, providers, coopStats, switchRole } = useGigGrid();
  const [selectedLocality, setSelectedLocality] = useState('Maduravoyal');
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  // Featured verified providers
  const featuredProviders = providers.filter((p) => p.verified).slice(0, 4);

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.navigate({
      to: '/providers',
      search: {
        query: searchQuery,
        locality: selectedLocality !== 'All Localities' ? selectedLocality : undefined,
      },
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-10 pb-20 lg:pt-16 lg:pb-28 bg-gradient-to-b from-blue-50/60 via-emerald-50/30 to-slate-50 border-b border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Hero Column */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Co-op Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 border border-blue-200 text-blue-800 text-xs font-semibold shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span className="font-bold">SIH26089 Cooperative Model</span>
                <span>•</span>
                <span>Maduravoyal & Chennai West</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
                Trusted local services.{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600">
                  Fair work.
                </span>{' '}
                Stronger communities.
              </h1>

              {/* Supporting Text */}
              <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                GigGrid connects customers with trusted local service providers while giving workers transparent earnings and a stronger cooperative community.
              </p>

              {/* Quick Search Box */}
              <form
                onSubmit={handleHeroSearch}
                className="bg-white p-2 sm:p-3 rounded-2xl shadow-lg border border-slate-200/80 flex flex-col sm:flex-row gap-2 max-w-2xl mx-auto lg:mx-0"
              >
                {/* Locality Dropdown */}
                <div className="flex items-center gap-2 px-3 py-2 border-b sm:border-b-0 sm:border-r border-slate-200 sm:w-48">
                  <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                  <select
                    value={selectedLocality}
                    onChange={(e) => setSelectedLocality(e.target.value)}
                    className="w-full bg-transparent text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none cursor-pointer"
                  >
                    {LOCALITIES.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Service Query */}
                <div className="flex-1 flex items-center gap-2 px-3 py-2">
                  <Search className="w-4 h-4 text-blue-600 shrink-0" />
                  <input
                    type="text"
                    placeholder="Search plumber, electrician, cleaning, carpenter..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
                  />
                </div>

                {/* Find Button */}
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm px-6 py-3 rounded-xl transition flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                >
                  <span>Find a Service</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {/* Action Buttons & Fast Demos */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  to="/services"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-sm font-bold transition shadow-sm inline-flex items-center gap-2"
                >
                  <span>Explore 10+ Services</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/provider"
                  onClick={() => switchRole('provider')}
                  className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 px-6 py-3 rounded-xl text-sm font-bold transition inline-flex items-center gap-2"
                >
                  <Briefcase className="w-4 h-4 text-emerald-600" />
                  <span>Join as a Provider</span>
                </Link>
              </div>

              {/* Key Trust Stats */}
              <div className="pt-4 grid grid-cols-3 gap-4 border-t border-slate-200/80 max-w-xl mx-auto lg:mx-0">
                <div>
                  <div className="text-xl sm:text-2xl font-black text-slate-900">85%</div>
                  <div className="text-xs text-slate-500 font-medium">Worker Direct Share</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black text-emerald-600">500+</div>
                  <div className="text-xs text-slate-500 font-medium">Empowered Workers</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black text-blue-600">4.9 ★</div>
                  <div className="text-xs text-slate-500 font-medium">Verified Rating</div>
                </div>
              </div>
            </div>

            {/* Right Hero Column: Workers Grid + Floating Badges */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md">
                {/* Hero Main Composite Visual */}
                <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 relative">
                  <img
                    src="https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=800&q=80"
                    alt="Indian Skilled Craftsman"
                    className="w-full h-96 object-cover opacity-90 hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="font-bold text-sm">Arun Kumar & Priya S</p>
                    <p className="text-xs text-slate-300">Cooperative Founding Craftsmen • Maduravoyal Chapter</p>
                  </div>
                </div>

                {/* Floating UI Card 1: Verified Worker */}
                <div className="absolute -top-4 -left-4 sm:-left-6 bg-white p-3 rounded-2xl shadow-xl border border-slate-200/90 flex items-center gap-2.5 animate-bounce duration-1000">
                  <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">✓ Verified Worker</div>
                    <div className="text-[10px] text-slate-500">Police & Trade Vetted</div>
                  </div>
                </div>

                {/* Floating UI Card 2: 4.9 Rating */}
                <div className="absolute top-1/3 -right-4 sm:-right-6 bg-white p-3 rounded-2xl shadow-xl border border-slate-200/90 flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
                    <Star className="w-5 h-5 fill-amber-500" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">⭐ 4.9 Rating</div>
                    <div className="text-[10px] text-slate-500">1,400+ Genuine Reviews</div>
                  </div>
                </div>

                {/* Floating UI Card 3: Nearby Maduravoyal */}
                <div className="absolute -bottom-4 -left-4 sm:-left-6 bg-white p-3 rounded-2xl shadow-xl border border-slate-200/90 flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">📍 Nearby in Maduravoyal</div>
                    <div className="text-[10px] text-slate-500">Fast 30-min Arrival</div>
                  </div>
                </div>

                {/* Floating UI Card 4: Fair Earnings */}
                <div className="absolute -bottom-6 -right-2 sm:-right-4 bg-emerald-600 text-white p-3 rounded-2xl shadow-xl flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
                    <IndianRupee className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold">₹ Fair Earnings</div>
                    <div className="text-[10px] text-emerald-100">85% Goes to Worker</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Services Grid */}
      <section className="py-16 bg-white border-b border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                On-Demand Household Assistance
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                Popular Cooperative Services
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Transparent flat pricing with zero surge charges and verified local craftspeople.
              </p>
            </div>
            <Link
              to="/services"
              className="text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 self-start sm:self-auto"
            >
              <span>View All 10 Services</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {services.slice(0, 8).map((svc) => (
              <ServiceCard key={svc.id} service={svc} />
            ))}
          </div>
        </div>
      </section>

      {/* How GigGrid Works */}
      <section className="py-16 bg-slate-50 border-b border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
              Simple & Transparent Flow
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              How GigGrid Works
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Built on community trust, clear timelines, and direct cooperative payments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs relative">
              <span className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm mb-4">
                1
              </span>
              <h3 className="font-bold text-base text-slate-900">Choose Service & Locality</h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Select from plumbing, electrical, cleaning, and more. Filter by your neighborhood (e.g. Maduravoyal or Porur).
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs relative">
              <span className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm mb-4">
                2
              </span>
              <h3 className="font-bold text-base text-slate-900">Request Booking</h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Pick your preferred date and time slot. Describe the repair requirement. Initial status is set to REQUESTED.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs relative">
              <span className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-sm mb-4">
                3
              </span>
              <h3 className="font-bold text-base text-slate-900">Worker Delivers Service</h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                The cooperative provider accepts the appointment, travels to your doorstep, and performs the work safely.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs relative">
              <span className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-sm mb-4">
                4
              </span>
              <h3 className="font-bold text-base text-slate-900">Rate & Fair Split</h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Rate your service. 85% goes directly to the worker, 10% supports the community emergency pool, and 5% funds operations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Cooperative? Section with Live Revenue Breakdown */}
      <section className="py-16 bg-white border-b border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
              The Hackathon Differentiator
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2">
              Workers aren't just providers.{' '}
              <span className="text-emerald-600">They're part of the community.</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
              Traditional aggregator platforms extract 25-30% commissions, trap workers in arbitrary algorithmic penalties, and offer zero safety net. GigGrid turns gig workers into co-owners.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <RevenueBreakdownCard initialAmount={1000} interactive={true} />
          </div>

          {/* 4 Pillars of Cooperative Model */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3">
                <IndianRupee className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-slate-900">Fair Earnings (85%)</h4>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                Workers take home the majority of every rupee paid. Instant payouts with zero commission creep.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-3">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-slate-900">Welfare & Tool Loans (10%)</h4>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                A shared safety net providing health insurance, accident cover, and zero-interest tool equipment loans.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center mb-3">
                <Users className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-slate-900">Democratic Governance</h4>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                Workers vote on platform rules, service quality standards, and annual cooperative dividend distribution.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-3">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-slate-900">Skill Development</h4>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                Certified vocational upskilling with government ITI modules, expanding trades and customer trust.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Verified Workers Directory Preview */}
      <section className="py-16 bg-slate-50 border-b border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                Locality-Based Discovery
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                Verified Local Craftsmen
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Explore vetted plumbers, electricians, tutors, and technicians in Maduravoyal & Porur.
              </p>
            </div>
            <Link
              to="/providers"
              className="text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 self-start sm:self-auto"
            >
              <span>Explore All Providers</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProviders.map((prov) => (
              <ProviderCard key={prov.id} provider={prov} />
            ))}
          </div>
        </div>
      </section>

      {/* Community Impact Metrics */}
      <section className="py-16 bg-gradient-to-r from-blue-900 via-slate-900 to-emerald-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            Social & Economic Empowerment
          </span>
          <h2 className="text-2xl sm:text-4xl font-black mt-2">
            “Technology should create opportunity, not just convenience.”
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-xl mx-auto">
            Live cooperative indicators across Maduravoyal and Chennai West communities.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mt-10">
            <div className="bg-white/10 backdrop-blur-xs p-5 rounded-2xl border border-white/10">
              <div className="text-2xl sm:text-3xl font-black text-emerald-400">500+</div>
              <div className="text-xs text-slate-300 mt-1">Workers Empowered</div>
            </div>

            <div className="bg-white/10 backdrop-blur-xs p-5 rounded-2xl border border-white/10">
              <div className="text-2xl sm:text-3xl font-black text-blue-400">1,480+</div>
              <div className="text-xs text-slate-300 mt-1">Jobs Completed</div>
            </div>

            <div className="bg-white/10 backdrop-blur-xs p-5 rounded-2xl border border-white/10">
              <div className="text-2xl sm:text-3xl font-black text-amber-400">₹8.4L+</div>
              <div className="text-xs text-slate-300 mt-1">Worker Direct Earnings</div>
            </div>

            <div className="bg-white/10 backdrop-blur-xs p-5 rounded-2xl border border-white/10">
              <div className="text-2xl sm:text-3xl font-black text-teal-300">25</div>
              <div className="text-xs text-slate-300 mt-1">Communities Served</div>
            </div>

            <div className="col-span-2 md:col-span-1 bg-white/10 backdrop-blur-xs p-5 rounded-2xl border border-white/10">
              <div className="text-2xl sm:text-3xl font-black text-purple-300">4.9/5</div>
              <div className="text-xs text-slate-300 mt-1">Customer Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="py-16 bg-white border-b border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Real Neighborhood Feedback
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              Trusted by Chennai Families
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Read how fair cooperative service builds stronger accountability and quality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <div className="flex items-center gap-1 text-amber-400 mb-3">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs text-slate-700 leading-relaxed italic">
                “Arun arrived within 25 minutes to fix our burst kitchen tap in Maduravoyal. No hidden charges or surge pricing. Knowing that 85% goes directly to him makes all the difference!”
              </p>
              <div className="mt-4 pt-3 border-t border-slate-200 flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80"
                  alt="Ramesh Patel"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div>
                  <div className="text-xs font-bold text-slate-900">Ramesh Patel</div>
                  <div className="text-[10px] text-slate-500">Resident, Maduravoyal</div>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <div className="flex items-center gap-1 text-amber-400 mb-3">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs text-slate-700 leading-relaxed italic">
                “Priya did a marvelous deep cleaning of our apartment before Diwali. Extremely polite, brought all organic materials, and represented the women's self-help cooperative proudly.”
              </p>
              <div className="mt-4 pt-3 border-t border-slate-200 flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80"
                  alt="Kavitha R"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div>
                  <div className="text-xs font-bold text-slate-900">Kavitha R</div>
                  <div className="text-[10px] text-slate-500">Resident, Porur</div>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <div className="flex items-center gap-1 text-amber-400 mb-3">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs text-slate-700 leading-relaxed italic">
                “Karthik diagnosed our tripping MCB switchboard safely. Other commercial apps wanted ₹2,500 advance. GigGrid cost ₹450 with genuine safety certificate. True community service.”
              </p>
              <div className="mt-4 pt-3 border-t border-slate-200 flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80"
                  alt="Venkatesh B"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div>
                  <div className="text-xs font-bold text-slate-900">Venkatesh Babu</div>
                  <div className="text-[10px] text-slate-500">Resident, Koyambedu</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-emerald-600 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-black">
            Ready to experience fair, trusted local services?
          </h2>
          <p className="text-sm sm:text-base text-blue-100 max-w-xl mx-auto">
            Join thousands of residents and hundreds of empowered craftsmen transforming Indian gig work into a thriving community cooperative.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              to="/services"
              className="bg-white text-blue-700 hover:bg-blue-50 font-bold px-7 py-3.5 rounded-xl text-sm transition shadow-md inline-flex items-center gap-2"
            >
              <span>Find a Service</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/cooperative"
              className="bg-emerald-700/60 hover:bg-emerald-700 text-white border border-emerald-400/40 font-bold px-7 py-3.5 rounded-xl text-sm transition shadow-md"
            >
              Explore Cooperative Model
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
