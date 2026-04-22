"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default marker icons in Leaflet with Next.js
const DefaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface Event {
  id: string;
  title: string;
  location: string;
  price: string;
  img: string;
  lat?: number;
  lng?: number;
}

interface DiscoverMapProps {
  events: Event[];
}

// Component to handle map centering/bounds
function ChangeView({ events }: { events: Event[] }) {
  const map = useMap();
  
  useEffect(() => {
    if (events.length > 0) {
      const validEvents = events.filter(e => e.lat && e.lng);
      if (validEvents.length > 0) {
        const bounds = L.latLngBounds(validEvents.map(e => [e.lat!, e.lng!]));
        map.fitBounds(bounds, { padding: [50, 50] });
      }
    }
  }, [events, map]);

  return null;
}

export default function DiscoverMap({ events }: DiscoverMapProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <div className="w-full h-full bg-slate-800 animate-pulse" />;

  // Default center (San Francisco)
  const center: [number, number] = [37.7749, -122.4194];

  return (
    <MapContainer
      center={center}
      zoom={12}
      className="w-full h-full z-0"
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />
      
      {events.map((event) => (
        event.lat && event.lng && (
          <Marker key={event.id} position={[event.lat, event.lng]}>
            <Popup className="custom-popup">
              <div className="p-2 space-y-2">
                <img src={event.img} className="w-full h-20 object-cover rounded-lg" alt={event.title} />
                <h6 className="font-bold text-sm leading-tight">{event.title}</h6>
                <p className="text-xs text-slate-500">{event.location}</p>
                <div className="flex items-center justify-between">
                  <span className="text-primary font-bold">{event.price}</span>
                  <a 
                    href={`/events/${event.id}`} 
                    className="text-[10px] bg-primary text-white px-2 py-1 rounded font-bold hover:brightness-110"
                  >
                    View
                  </a>
                </div>
              </div>
            </Popup>
          </Marker>
        )
      ))}
      
      <ChangeView events={events} />
    </MapContainer>
  );
}
