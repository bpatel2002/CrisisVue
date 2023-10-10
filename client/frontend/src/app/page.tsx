'use client';

import Image from 'next/image'
import styles from './page.module.css'
import React from 'react';
import './page.css';
import MassShootingEvent from './components/massShootingEvent';
import { useState, useEffect } from 'react';
import axios from 'axios';


export default function Home() {

  const [events, setEvents] = useState<any[]>([])

  useEffect(() => {
    console.log("inside use effect");
    // Make a GET request to your API endpoint using Axios
    axios.get('http://127.0.0.1:5000/events')
      .then((response) => {
        // Assuming your API returns an array of event documents
        console.log("inside get lets gooo");
        setEvents(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching events:', error);
      });
  }, []);

  console.log("outside use effect")


  // return (
  //   <main className={styles.main}>
  //     <div className={styles.description}>
  //       <p>
  //         Get started by editing&nbsp;
  //         <code className={styles.code}>src/app/page.tsx</code>
  //       </p>
  //     </div>


  //   </main>
  // )

  return (
    <div className="page-container">
      <section className="search-section">
        <h2>Welcome to the Mass Shooting Events Digital Library</h2>
        <p>Explore important statistics and information about mass shooting events.</p>
        <input type="text" placeholder="Search..." />
        <button>Search</button>
      </section>

      <section className="recent-events">
        <h2>Recent Mass Shootings</h2>
        {/* This can be a component */}
        <div className={styles.grid}>
          {events.map((event_document, index) => (
            <MassShootingEvent
              key={index}
              event={event_document.event_name}
              date={event_document.date}
              perpetrator={event_document.perpetrator}
              location={event_document.location}
              numVictims={event_document.casualties}
            />
          ))}
        </div>
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
};

