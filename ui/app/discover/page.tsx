"use client";

import { useState, useMemo, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import dynamic from "next/dynamic";
import eventsData from "@/lib/data.json";
import { format, isSameDay, parseISO } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Calendar } from "@/components/ui/calendar";

// Dynamically import Map component (client-side only)
const DiscoverMap = dynamic(() => import("@/components/DiscoverMap"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-slate-800 animate-pulse flex items-center justify-center text-slate-500">Loading Map...</div>,
});

export default function Discover() {
  // --- State ---
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Events");
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");
  const [visibleCount, setVisibleCount] = useState(9);
  const [isVirtualOnly, setIsVirtualOnly] = useState(false);
  const [eventTypes, setEventTypes] = useState<string[]>(["In-person Racing"]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  // --- Derived Data ---
  const filteredEvents = useMemo(() => {
    return eventsData.filter((event) => {
      // Category filter (from pills)
      if (selectedCategory !== "All Events") {
        const catMap: Record<string, string> = {
          "Sprint Racing": "Racing",
          "Marathons": "Racing",
          "Cycling": "Cycling",
          "Obstacle Course": "OCR",
          "Fitness Meetups": "Fitness"
        };
        const targetCategory = catMap[selectedCategory] || selectedCategory;
        if (event.category !== targetCategory) return false;
      }

      // Search query
      if (searchQuery && !event.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;

      // Location query
      if (locationQuery && !event.location.toLowerCase().includes(locationQuery.toLowerCase())) return false;

      // Price filter
      if (event.numericPrice < priceRange[0] || event.numericPrice > priceRange[1]) return false;

      // Virtual Only filter
      if (isVirtualOnly && event.location.toLowerCase() !== "virtual") return false;

      // Date Filter
      if (selectedDate) {
        // Simple mock: check if month and day match (since our dummy dates are strings like "OCT 18")
        // In a real app, you'd compare actual Date objects. 
        // For this demo, we'll try to parse the 'date' field or just use a placeholder logic.
        // Let's assume most events are in late 2023 based on data.json
        const eventDateStr = event.fullDate; // e.g. "October 18, 2023"
        const eventDate = new Date(eventDateStr);
        if (!isSameDay(eventDate, selectedDate)) return false;
      }

      // Event Type filter (Checkboxes)
      if (eventTypes.length > 0) {
        const typeMatch = eventTypes.some(type => {
          if (type === "In-person Racing") return event.category === "Racing" || event.category === "Cycling" || event.category === "OCR";
          if (type === "Virtual Challenge") return event.location.toLowerCase() === "virtual";
          if (type === "Training Camps") return event.tags.toLowerCase().includes("training") || event.category === "Fitness";
          if (type === "Social Runs") return event.tags.toLowerCase().includes("social");
          return false;
        });
        if (!typeMatch) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "price-low") return a.numericPrice - b.numericPrice;
      return 0;
    });
  }, [searchQuery, locationQuery, selectedCategory, priceRange, sortBy, isVirtualOnly, eventTypes, selectedDate]);

  const trendingEvents = useMemo(() => eventsData.slice(0, 3), []);

  const activeFilters = useMemo(() => {
    const filters: { label: string; type: string; value: any }[] = [];
    if (selectedCategory !== "All Events") filters.push({ label: selectedCategory, type: "category", value: selectedCategory });
    if (priceRange[0] > 0 || priceRange[1] < 500) filters.push({ label: `$${priceRange[0]} - $${priceRange[1]}`, type: "price", value: priceRange });
    if (searchQuery) filters.push({ label: `Name: ${searchQuery}`, type: "search", value: searchQuery });
    if (locationQuery) filters.push({ label: `Location: ${locationQuery}`, type: "location", value: locationQuery });
    if (isVirtualOnly) filters.push({ label: "Virtual Only", type: "virtual", value: true });
    if (selectedDate) filters.push({ label: `Date: ${format(selectedDate, 'MMM d, yyyy')}`, type: "date", value: selectedDate });
    
    eventTypes.forEach(type => {
      filters.push({ label: type, type: "eventType", value: type });
    });

    return filters;
  }, [selectedCategory, priceRange, searchQuery, locationQuery, isVirtualOnly, selectedDate, eventTypes]);

  // --- Handlers ---
  const handleLoadMore = () => setVisibleCount((prev) => prev + 6);
  
  const removeFilter = (filter: { label: string; type: string; value: any }) => {
    switch (filter.type) {
      case "category": setSelectedCategory("All Events"); break;
      case "search": setSearchQuery(""); break;
      case "location": setLocationQuery(""); break;
      case "virtual": setIsVirtualOnly(false); break;
      case "price": setPriceRange([0, 500]); break;
      case "date": setSelectedDate(undefined); break;
      case "eventType": setEventTypes(eventTypes.filter(t => t !== filter.value)); break;
    }
  };

  return (
    <main className="min-h-screen flex flex-col bg-background-dark text-slate-100">
      <Navbar />
      
      {/* Search Hero Section */}
      <section className="pt-28 px-6 pb-8 mx-auto w-full">
        <div className="relative w-full rounded-3xl overflow-hidden bg-slate-900 p-8 md:p-12">
          <div className="absolute inset-0 opacity-30 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #7c3bed 0%, transparent 50%), radial-gradient(circle at 80% 80%, #bef264 0%, transparent 40%)' }}></div>
          <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-2">
              <h2 className="text-3xl md:text-4xl font-black text-white">Find Your Next <span className="text-accent">High-Energy</span> Experience</h2>
              <p className="text-slate-300">Discover tracks, meets, and races happening near you.</p>
            </div>
            {/* Compact Multi-Search Bar */}
            <div className="bg-background-dark/60 backdrop-blur-xl border border-white/10 rounded-2xl p-2 flex flex-col md:flex-row items-center gap-2 shadow-2xl">
              <div className="flex items-center flex-1 w-full gap-2 px-3 border-b md:border-b-0 md:border-r border-white/10 py-2">
                <span className="material-symbols-outlined text-accent">search</span>
                <input 
                  className="bg-transparent border-none text-white focus:ring-0 text-sm w-full placeholder:text-slate-500" 
                  placeholder="Athlete, event, or keyword" 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center flex-1 w-full gap-2 px-3 border-b md:border-b-0 md:border-r border-white/10 py-2">
                <span className="material-symbols-outlined text-primary">location_on</span>
                <input 
                  className="bg-transparent border-none text-white focus:ring-0 text-sm w-full placeholder:text-slate-500" 
                  placeholder="San Francisco, CA" 
                  type="text" 
                  value={locationQuery}
                  onChange={(e) => setLocationQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center flex-1 w-full gap-2 px-3 py-2">
                <span className="material-symbols-outlined text-slate-400">calendar_today</span>
                <input 
                  className="bg-transparent border-none text-white focus:ring-0 text-sm w-full placeholder:text-slate-500" 
                  placeholder={selectedDate ? format(selectedDate, 'MMM d, yyyy') : "Any Date"} 
                  type="text" 
                  readOnly
                />
              </div>
              <button className="w-full md:w-auto bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2">
                Explore
              </button>
            </div>
            {/* Category Pills */}
            <div className="flex flex-wrap justify-center gap-3">
              {["All Events", "Sprint Racing", "Marathons", "Cycling", "Obstacle Course"].map((cat) => (
                <button 
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-bold border transition-all ${selectedCategory === cat ? 'bg-primary text-white border-primary' : 'bg-white/5 hover:bg-white/10 text-white border-white/10'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Discovery Interface */}
      <section className="px-6 flex flex-col lg:flex-row gap-4 mx-auto w-full">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-80 flex-shrink-0 space-y-4 p-2">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg flex items-center gap-2 text-white">
              <span className="material-symbols-outlined text-primary">filter_list</span>
              Filters
            </h3>
            <button 
              onClick={() => {
                setSelectedCategory("All Events");
                setPriceRange([0, 500]);
                setSearchQuery("");
                setLocationQuery("");
                setSelectedDate(undefined);
                setEventTypes([]);
                setIsVirtualOnly(false);
              }}
              className="text-xs font-bold text-primary hover:underline"
            >
              Clear All
            </button>
          </div>

          {/* Date Picker */}
          <div className="space-y-4">
            <p className="text-sm font-bold uppercase tracking-wider text-slate-500">Date Range</p>
            <div className="bg-primary/5 rounded-xl p-2 border border-primary/10 flex justify-center">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border-0 text-white bg-transparent"
              />
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold uppercase tracking-wider text-slate-500">Price Range</p>
              <span className="text-xs font-bold text-accent">${priceRange[0]} - ${priceRange[1]}</span>
            </div>
            <Slider 
              value={priceRange} 
              onValueChange={setPriceRange}
              min={0} 
              max={500} 
              step={10} 
              className="[&_[role=slider]]:bg-primary [&_[role=slider]]:border-primary [&_[role=slider]]:size-5 [&_[role=slider]]:border-2 [&_[role=slider]]:shadow-none [&_[role=slider]]:hover:ring-4 [&_[role=slider]]:hover:ring-primary/20 [&_span.bg-muted]:bg-slate-700 [&_span.bg-primary]:bg-primary [&_span.bg-primary]:h-2"
            />
          </div>

          {/* Event Types */}
          <div className="space-y-4">
            <p className="text-sm font-bold uppercase tracking-wider text-slate-500">Event Type</p>
            <div className="space-y-3">
              {[
                { label: "In-person Racing" },
                { label: "Virtual Challenge" },
                { label: "Training Camps" },
                { label: "Social Runs" }
              ].map((type) => (
                <label key={type.label} className="flex items-center gap-3 cursor-pointer group">
                  <input 
                    checked={eventTypes.includes(type.label)} 
                    onChange={(e) => {
                      if (e.target.checked) setEventTypes([...eventTypes, type.label]);
                      else setEventTypes(eventTypes.filter(t => t !== type.label));
                    }}
                    className="rounded border-slate-700 text-primary focus:ring-primary bg-transparent" 
                    type="checkbox" 
                  />
                  <span className="text-sm font-medium group-hover:text-primary transition-colors">{type.label}</span>
                </label>
              ))}
            </div>
          </div>
          {/* Toggle Online */}
          <div className="flex items-center justify-between p-4 bg-accent/10 border border-accent/20 rounded-xl">
            <div className="flex flex-col">
              <span className="text-sm font-bold text-accent">Virtual Events Only</span>
              <span className="text-[10px] text-slate-400">Show only online tracks</span>
            </div>
            <button 
              onClick={() => setIsVirtualOnly(!isVirtualOnly)}
              className={`w-10 h-5 rounded-full relative flex items-center transition-colors ${isVirtualOnly ? 'bg-accent' : 'bg-slate-700'}`}
            >
              <div className={`absolute w-3 h-3 bg-white rounded-full transition-all ${isVirtualOnly ? 'left-6' : 'left-1'}`}></div>
            </button>
          </div>
        </aside>

        {/* Results Section */}
        <div className="flex-1 space-y-6 pt-2">
          {/* Filter Toolbar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              {activeFilters.map((filter, idx) => (
                <div key={idx} className="px-3 py-1 bg-primary/20 text-primary rounded-full text-xs font-bold flex items-center gap-2 border border-primary/30">
                  {filter.label}
                  <span onClick={() => removeFilter(filter)} className="material-symbols-outlined text-xs cursor-pointer">close</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <div className="flex bg-primary/10 rounded-lg p-1">
                <button 
                  onClick={() => setViewMode("grid")}
                  className={`px-1.5 rounded-md shadow-sm transition-all ${viewMode === "grid" ? "bg-primary" : "text-slate-400 hover:text-primary"}`}
                >
                  <span className="material-symbols-outlined text-sm block">grid_view</span>
                </button>
                <button 
                   onClick={() => setViewMode("map")}
                   className={`px-1.5 rounded-md shadow-sm transition-all ${viewMode === "map" ? "bg-primary" : "text-slate-400 hover:text-primary"}`}
                >
                  <span className="material-symbols-outlined text-sm block">map</span>
                </button>
              </div>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="bg-transparent border-none text-sm font-bold text-slate-400 focus:ring-0 cursor-pointer shadow-none gap-2 h-auto p-0">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent align="end" className="bg-slate-900 border-white/10 text-white">
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {viewMode === "grid" ? (
            <>
              {/* Trending Strip */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-accent">trending_up</span>
                  <h4 className="font-bold text-white">Trending This Week</h4>
                </div>
                <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
                  {trendingEvents.map((event) => (
                    <Link key={event.id} href={`/events/${event.id}`} className="flex-shrink-0 w-64 group cursor-pointer">
                      <div className="relative h-32 rounded-2xl overflow-hidden mb-2">
                        <img src={event.img} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt={event.title} />
                        <div className="absolute top-2 left-2 bg-accent text-slate-900 px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-tighter">Hot Now</div>
                      </div>
                      <h5 className="text-sm font-bold truncate text-white">{event.title}</h5>
                      <p className="text-[11px] text-slate-400">{event.date.split(' • ')[0]} • {event.location.split(',')[0]}</p>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Results Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredEvents.slice(0, visibleCount).map((event) => (
                  <div key={event.id} className="group bg-primary/5 rounded-3xl border border-primary/10 overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all">
                    <div className="relative h-48 overflow-hidden">
                      <img src={event.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt={event.title} />
                      <div className="absolute top-4 left-4 flex gap-2">
                        <span className={`${event.badgeColor} backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider`}>{event.category}</span>
                      </div>
                      <button className="absolute top-4 right-4 h-10 w-10 bg-white/20 hover:bg-white backdrop-blur-md rounded-full flex items-center justify-center text-white hover:text-red-500 transition-colors">
                        <span className="material-symbols-outlined font-light">favorite</span>
                      </button>
                    </div>
                    <div className="p-6 space-y-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase">
                          <span className="material-symbols-outlined text-sm">calendar_month</span>
                          {event.date}
                        </div>
                        <h3 className="text-lg font-extrabold text-white line-clamp-1 group-hover:text-primary transition-colors">{event.title}</h3>
                        <div className="flex items-center gap-1 text-sm text-slate-500 font-medium">
                          <span className="material-symbols-outlined text-sm">location_on</span>
                          {event.location}
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-primary/10">
                        <div className="flex flex-col">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Starting from</span>
                          <span className="text-xl font-black text-white">{event.price}</span>
                        </div>
                        <Link href={`/events/${event.id}`} className="bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg shadow-primary/20">
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Load More */}
              {visibleCount < filteredEvents.length && (
                <div className="py-12 flex justify-center">
                  <button 
                    onClick={handleLoadMore}
                    className="flex items-center gap-2 px-8 py-3 rounded-2xl bg-primary/10 font-bold border border-primary/20 hover:bg-primary hover:text-white transition-all"
                  >
                    Load More Events
                    <span className="material-symbols-outlined">expand_more</span>
                  </button>
                </div>
              )}
              {filteredEvents.length === 0 && (
                <div className="py-20 text-center space-y-4">
                  <span className="material-symbols-outlined text-6xl text-slate-700">search_off</span>
                  <p className="text-xl font-bold text-slate-500">No events found matching your criteria.</p>
                </div>
              )}
            </>
          ) : (
            <div className="w-full h-[600px] rounded-3xl overflow-hidden border border-primary/10 shadow-2xl">
              <DiscoverMap events={filteredEvents} />
            </div>
          )}
        </div>
        
        {/* Fixed Right Sidebar Map - Hidden if in Map view mode already */}
        {viewMode === "grid" && (
          <div className="hidden xl:block w-[450px] sticky top-28 h-[calc(100vh-140px)] rounded-3xl overflow-hidden border border-primary/10 shadow-2xl">
            <DiscoverMap events={filteredEvents} />
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
