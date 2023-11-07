"use client";

import Image from "next/image";
import styles from "./page.module.css";
import React from "react";
import "./page.css";
import { useState, useEffect } from "react";
import axios from "axios";
import MassShootingEvent from "./components/MassShootingEvent";
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
// import L from 'leaflet';

import 'leaflet/dist/leaflet.css';
import Link from 'next/link'

export default function Home() {

  const redDotIcon = L.divIcon({
    className: 'red-dot-icon',
    iconSize: [10, 10]
  });

  const [events, setEvents] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [displaySearchResults, setDisplaySearchReults] = useState(false);

  const [searchDate, setSearchDate] = useState<string | null>(null);
  const [searchLocation, setSearchLocation] = useState<string | null>(null);

  const fetchEvents = (filters?: string, date?: string, location?: string) => {
    if (filters != "") {
      setSearchDate("");
      setSearchLocation("");
      date = undefined;
      location = undefined;
    }

    axios
      .get("http://127.0.0.1:5000/events", {
        params: {
          filters: filters || undefined,
          date: date || undefined,
          location: location || undefined,
        },
      })
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  };

  useEffect(() => {
    // Make a GET request to your API endpoint using Axios
    fetchEvents();
  }, []);

  const handleSearch = () => {
    fetchEvents(searchQuery, searchDate, searchLocation);
    setDisplaySearchReults(true);
  };

  return (
    <div className="page-container">
      <section className="search-section">
        <h2>Welcome to the Mass Shooting Events Digital Library</h2>
        <p>
          Explore important statistics and information about mass shooting
          events.
        </p>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </section>

      {!displaySearchResults && (
        <section className="recent-events">
          <h2>Recent Mass Shootings</h2>
          {events.map((event, index) => (
            <MassShootingEvent
              key={index} // Ensure each component maintains a unique key for optimal rendering performance
              id={event._id.$oid}
              event={event.event_name}
              date={event.date || "N/A"}
              perpetrator={event.perpetrator || "N/A"}
              location={event.location || "N/A"}
              numVictims={event.casualties || 0}
              lat={event.lat || 0}
              long={event.long || 0}
            />
          ))}
        </section>
      )}

      {displaySearchResults && (
        <section className="recent-events">
          <h2>Search Results: </h2>
          {events.map((event, index) => (
            <MassShootingEvent
              key={index} // Ensure each component maintains a unique key for optimal rendering performance
              id={event._id.$oid}
              event={event.event_name}
              date={event.date || "N/A"}
              perpetrator={event.perpetrator || "N/A"}
              location={event.location || "N/A"}
              numVictims={event.casualties || 0}
            />
          ))}
        </section>
      )}

      <section className="statistics">
        <h2>Mass Shootings Statistics</h2>
        {/* Insert your timeline here */}
        {/* Other components or elements */}
      </section>

      <section className="advanced-search">
        <h2>Search Mass Shootings</h2>
        <input
          type="date"
          value={searchDate || ""}
          onChange={(e) => setSearchDate(e.target.value)}
        />
        <input
          type="text"
          placeholder="Location"
          value={searchLocation || ""}
          onChange={(e) => setSearchLocation(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </section>

      <section className="map-container">
        <h2>Map of Mass Shootings</h2>
        <MapContainer center={[38.9072, -77.0369]} zoom={5} style={{ width: '100%', height: '400px' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {events.filter(event => event.lat && event.long).map((event, index) => (
            <Marker key={index} position={[event.lat, event.long]} icon={redDotIcon}>
              <Popup>
                <Link key={event._id.$oid} href={`/events/${event._id.$oid}`}>{event.event_name}</Link>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </section>

    </div>
  );
}



