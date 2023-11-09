"use client";
import Image from "next/image";
import styles from "./page.module.css";
import React from "react";
import "./page.css";
import { useState, useEffect } from "react";
import axios from "axios";
import MassShootingEvent from "./components/MassShootingEvent";
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import L from "leaflet";

import "leaflet/dist/leaflet.css";
import Link from "next/link";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  const redDotIcon = L.divIcon({
    className: "red-dot-icon",
    iconSize: [10, 10],
  });

  const [events, setEvents] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [displaySearchResults, setDisplaySearchResults] = useState(false);
  const [searchDate, setSearchDate] = useState<string | null>(null);
  const [searchLocation, setSearchLocation] = useState<string | null>(null);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);

  const toggleAdvancedSearch = () => {
    setShowAdvancedSearch(!showAdvancedSearch); // This will toggle the state
  };
  const fetchEvents = (filters?: string, date?: string, location?: string) => {
    axios
      .get("http://127.0.0.1:5000/events", {
        params: {
          filters: filters || undefined,
          date: date || undefined,
          location: location || undefined,
          sort: -1,
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
    fetchEvents();
  }, []);

  const handleSearch = () => {
    if (searchQuery == "" && !searchDate && !searchLocation) {
      toast.error("Search box is empty!")
    } else{
      fetchEvents(
        searchQuery,
        searchDate ?? undefined,
        searchLocation ?? undefined
      );
      setDisplaySearchResults(true);
    }
  };

  const handleReset = () => {
    setSearchQuery("");
    setSearchDate(null);
    setSearchLocation(null);
    fetchEvents();
    setDisplaySearchResults(false);
  };

  return (
    <div className="page-container">
      <section className="search-section">
        <h2>Welcome to the Mass Shooting Events Digital Library</h2>
        <section className="map-container">
          <MapContainer center={[38.9072, -90.0369]} zoom={4.3} style={{ width: '100%', height: '400px' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {events
              .filter((event) => event.lat && event.long)
              .map((event, index) => (
                <Marker
                  key={index}
                  position={[event.lat, event.long]}
                  icon={redDotIcon}
                >
                  <Popup>
                    <Link
                      key={event._id.$oid}
                      href={`/events/${event._id.$oid}`}
                    >
                      {event.event_name}
                    </Link>
                  </Popup>
                </Marker>
              ))}
          </MapContainer>
        </section>
        <p>
          Explore important statistics and information about mass shooting
          events.
        </p>
        <div style={{ display: "flex" }}>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {!showAdvancedSearch && (
            <div>
              <ToastContainer/>
              <button onClick={handleSearch} style={{ marginRight: "8px" }}>
                Search
              </button>
              <button onClick={handleReset}>Reset</button>
            </div>
          )}
        </div>
        <div style={{ marginTop: "10px" }}>
        <button onClick={toggleAdvancedSearch} >Advanced Search</button>
        </div>
        {showAdvancedSearch && (
          <section className= {`${showAdvancedSearch ? 'advanced-Search' : 'advanced-SearchOut'}`}>
            <h2>Advanced Search</h2>
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

            <div style={{ marginTop: "10px" }}>
              <button onClick={handleSearch} style={{ marginRight: "8px" }}>
                Search
              </button>{" "}
              {/* Add right margin to the Search button */}
              <button onClick={handleReset}>Reset</button>
            </div>
          </section>
        )}
      </section>

      {!displaySearchResults && (
        <section className="recent-events">
          <h2>Recent Mass Shootings</h2>
          {events.map((event, index) => (
            <MassShootingEvent
              key={index}
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
          <h2>Search Results:</h2>
          {events.length > 0 ? (
            events.map((event, index) => (
              <MassShootingEvent
                key={index}
                id={event._id.$oid}
                event={event.event_name}
                date={event.date || "N/A"}
                perpetrator={event.perpetrator || "N/A"}
                location={event.location || "N/A"}
                numVictims={event.casualties || 0}
                lat={event.lat || 0}
                long={event.long || 0}
              />
            ))
          ) : (
            <p>No results found.</p>
          )}
        </section>
      )}
    </div>
  );
}
