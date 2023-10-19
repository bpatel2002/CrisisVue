"use client";

import Image from "next/image";
import styles from "./page.module.css";
import React from "react";
import "./page.css";
import { useState, useEffect } from "react";
import axios from "axios";
import MassShootingEvent from "./components/MassShootingEvent";

export default function Home() {
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
              id = {event._id.$oid}
              event={event.event_name}
              date={event.date || "N/A"}
              perpetrator={event.perpetrator || "N/A"}
              location={event.location || "N/A"}
              numVictims={event.casualties || 0}
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
              id = {event._id.$oid}
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
        <h2>Mass Shooting Statistics</h2>
        {/* Graph here */}
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
    </div>
  );
}
