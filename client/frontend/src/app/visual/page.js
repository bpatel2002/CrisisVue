'use client'
import React from 'react'
import BarChart from './components/barchart'
import axios from 'axios'
import { useState } from 'react';
import { useEffect } from 'react';
import'./visual.css'
function page() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/events")
      .then(response => {
        setEvents(response.data.data);
      })   
  }, []);
  const labels = events.map(event => event.event_name);
  const casualties = events.map(event => event.casualties);
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Casualties',
        data: casualties,
        backgroundColor: [
          'rgba(234, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',

        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };


  // async function getShootings() {
  //   var result = await axios.get("http://127.0.0.1:5000/events");   
  // }
  return (
    <>
    <div style={{display: 'flex', gap: '20px', marginTop: '2em'}}>
    <div style = {{height: '20em', width: '40em'}}><BarChart chartData={data}/></div>
    <div className= "eventList">
            {events.map((event, index) => (
                <div key={index} className="eventCard">
                    <div className="eventDetails">
                        <div className="eventTitle">{event.event_name}</div>
                        <div className="eventDate">Date: {event.date}</div>
                        <div className="eventDescription">{event.summary}</div>
                        <div className='location'>Location: {event.location}</div>
                        <div className="eventFooter">

                        </div>
                    </div>
                </div>
            ))}
        </div>

    </div>
    </>
  );
}

export default page