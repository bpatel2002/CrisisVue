'use client'
import React, { Component } from 'react';
import MassShootingEvent from "../../components/MassShootingEvent";
import '../visual.css'

const Compare = ({ Data }) => {
    return (
        <>
        <div style={{display: 'flex', paddingTop: '10px'}}>
        {Data.map((event, index) => (
            <div className='eventCard'>
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