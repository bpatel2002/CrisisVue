'use client'
import React, { Component } from 'react';
import MassShootingEvent from "../../components/MassShootingEvent";
import { useState } from 'react';
import { useEffect } from 'react';
import '../visual.css'

const Compare = ({ Data }) => {    // State to manage animation
    const [shouldAnimate, setShouldAnimate] = useState(true);

    useEffect(() => {
        // Reset animation state when Data prop changes
        setShouldAnimate(false);
        setTimeout(() => setShouldAnimate(true), 1);
    }, [Data]);
    return (
        <>
        <div style={{display: 'flex', padding: '10px'}}>
        {Data.map((event, index) => (
            <div className='eventCard compare' style={{ margin: '10px'}}>
            <MassShootingEvent
              key={index} // Ensure each component maintains a unique key for optimal rendering performance
              id = {event._id.$oid}
              event={event.event_name}
              date={event.date || "N/A"}
              perpetrator={event.perpetrator || "N/A"}
              location={event.location || "N/A"}
              numVictims={event.casualties || 0}
            />
            </div>
          ))}
        </div>
        </>

    )
}

export default Compare