'use client'
import React from 'react'
import BarChart from './components/barchart'
import axios from 'axios'
import { useState } from 'react';
import { useEffect } from 'react';
import'./visual.css'
function page() {
  const [events, setEvents] = useState([]);
  const [selectedEvents, setSelectedEvents] = useState([]);


const handleEventSelection = (event) => {
  let updatedSelection = [...selectedEvents];
  if (updatedSelection.includes(event)) {
      // If the event is already selected, deselect it
      updatedSelection = updatedSelection.filter(e => e !== event);
  } else {
      // If 2 events are already selected, remove the first one (oldest selection)
      if (updatedSelection.length === 2) {
          updatedSelection.shift();
      }
      updatedSelection.push(event);
  }
  setSelectedEvents(updatedSelection);
};



const handleCompare = () => {
  const selectedLabels = selectedEvents.map(event => event.event_name);
  const selectedCasualties = selectedEvents.map(event => event.casualties);
  
  const newChartData = {
      labels: selectedLabels,
      datasets: [
          {
              label: 'Casualties',
              data: selectedCasualties,
              backgroundColor: [
                  'rgba(234, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  // ... you can add more colors if you have more datasets ...
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  // ... corresponding border colors ...
              ],
              borderWidth: 1,
          },
      ],
  };

  setChartData(newChartData);
};

const [chartData, setChartData] = useState({ labels: [], datasets: [] });
useEffect(() => {
  axios.get("http://localhost:5000/events")
      .then(response => {
          const fetchedEvents = response.data;
          setEvents(fetchedEvents);

          const labels = fetchedEvents.map(event => event.event_name);
          const casualties = fetchedEvents.map(event => event.casualties);

          setChartData({
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
          });
      });   
}, []);

  // useEffect(() => {
  //   axios.get("http://localhost:5000/events")
  //     .then(response => {
  //       setEvents(response.data.data);

  //     })   
  // }, []);
  // const labels = events.map(event => event.event_name);
  // const casualties = events.map(event => event.casualties);
  // const data = {
  //   labels: labels,
  //   datasets: [
  //     {
  //       label: 'Casualties',
  //       data: casualties,
  //       backgroundColor: [
  //         'rgba(234, 99, 132, 0.2)',
  //         'rgba(54, 162, 235, 0.2)',

  //       ],
  //       borderColor: [
  //         'rgba(255, 99, 132, 1)',
  //         'rgba(54, 162, 235, 1)',
  //       ],
  //       borderWidth: 1,
  //     },
  //   ],
  // };

  // const [chartData, setChartData] = useState(data);

  return (
    <>
    <div style={{display: 'flex', gap: '20px', marginTop: '2em'}}>
    <div style = {{height: '20em', width: '40em'}}><BarChart chartData={chartData}/></div>
    <div className= "eventList">
            {events.map((event, index) => (
                <div key={index} className={`eventCard ${selectedEvents.includes(event) ? 'selected' : ''}`}
                 onClick={() => handleEventSelection(event)}
                >
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
        <button onClick={handleCompare}>Compare</button>
    </div>
    </>
  );
}

export default page