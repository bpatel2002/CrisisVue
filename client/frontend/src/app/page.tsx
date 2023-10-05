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
      <div className="section section1">
        <div className="section-left">
          <h2>Welcome to the Mass Shooting Events Digital Library</h2>
        </div>
        <div className="section-right">
        <img
            src="/map.jpg" 
            alt="Map"
            className="map-image"
          />
        </div>
      </div>
      <div className="section section2">
        {/* <h2>Section 2</h2> */}
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
      </div>
      <div className="section section3">
        <h2>Mass Shooting Statistics</h2>
        <p>//content</p>
      </div>
      <div className="section section4">
        <h2>Search Mass Shootings</h2>
        <p>//content</p>
      </div>
    </div>
  );
};

