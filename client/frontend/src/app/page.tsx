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

  useEffect(() => {
    // Make a GET request to your API endpoint using Axios
    axios
      .get("http://127.0.0.1:5000/events")
      .then((response) => {
        // Assuming your API returns an array of event documents
        setEvents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }, []);

  return (
    <div className="page-container">
      <section className="search-section">
        <h2>Welcome to the Mass Shooting Events Digital Library</h2>
        <p>
          Explore important statistics and information about mass shooting
          events.
        </p>
        <input type="text" placeholder="Search..." />
        <button>Search</button>
      </section>

      <section className="recent-events">
        <h2>Recent Mass Shootings</h2>
        {events.map((event, index) => (
          <MassShootingEvent
            key={index} // Ensure each component maintains a unique key for optimal rendering performance
            event={event.event_name}
            date={event.date || "N/A"}
            perpetrator={event.perpetrator || "N/A"}
            location={event.location || "N/A"}
            numVictims={event.casualties || 0}
          />
        ))}
      </section>

      <section className="statistics">
        <h2>Mass Shooting Statistics</h2>
        {/* Graph here */}
      </section>

      <section className="advanced-search">
        <h2>Search Mass Shootings</h2>
        <input type="date" placeholder="Start Date" />
        <input type="text" placeholder="Location" />
        <button>Search</button>
      </section>
    </div>
  );
}
