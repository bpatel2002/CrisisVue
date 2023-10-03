"use client"
import React from 'react';
import MassShootingEvent from './components/massShootingEvent';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from '../../node_modules/axios/index';

export default function Home() {
  const [events, setEvents] = useState<any[]>([]);


  useEffect(() => {
    axios.get("http://localhost:5000/events")
      .then(response => {
        setEvents(response.data.data);
      
      })
      
  }, []);

  return (
    <div>
      {events.map((event, index) => (
        <MassShootingEvent
          key={index}
          event={event.event}
          date={event.date}
          perpetrator={event.perpetrator}
          location={event.location}
          numVictims={event.numVictims}
        />
      ))}
    </div>
  );
}