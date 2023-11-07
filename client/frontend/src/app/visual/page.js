'use client'
import React from 'react'
import BarChart from './components/barchart'
import axios from 'axios'
import { useState } from 'react';
import { useEffect } from 'react';
import Compare from './components/compare'
function page() {
    const [events, setEvents] = useState([]);
    const [selectedEvents, setSelectedEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);

    const [originalChartData, setOriginalChartData] = useState([]);
    const [compareData, setCompareData] = useState([]);

    const [searchQuery, setSearchQuery] = useState("");
    const [displaySearchResults, setDisplaySearchReults] = useState(false);

    const [searchDate, setSearchDate] = useState("");



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
        if (selectedEvents.length < 2) {
            window.alert("Select 2 events");
            return;
        }
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
        setCompareData(selectedEvents);
    };

    const [chartData, setChartData] = useState({ labels: [], datasets: [] });
    useEffect(() => {
        axios.get("http://localhost:5000/events")
            .then(response => {
                const fetchedEvents = response.data;
                setEvents(fetchedEvents);
                setFilteredEvents(fetchedEvents);

                const labels = fetchedEvents.map(event => event.event_name);
                const casualties = fetchedEvents.map(event => event.casualties);
                const chartDatad = {
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



                setChartData(chartDatad);
                setOriginalChartData(chartDatad);

            });
    }, []);

    const resetChart = () => {
        setChartData(originalChartData);
        setSelectedEvents([]);
        setCompareData([]);
        setFilteredEvents(events);
    }
    useEffect(() => {
        if (searchQuery === "") {
            setFilteredEvents(events);
        } else {
            const results = events.filter(event =>
                event.event_name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredEvents(results);
        }
    }, [events, searchQuery]);

    const showAllEvents = () => {
        setSearchQuery("");
    }


    return (
        <>

            <div style={{ display: 'flex', gap: '20px', marginRight: '20px' }}>
                <div style={{ height: '20em', width: '60em' }}><BarChart chartData={chartData} />
                < Compare Data={compareData} />
                </div>
                <div className='eventlistWrapper'>
                    <section className="search-section">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button class="button-9" style={{ marginLeft: '5px' }} onClick={showAllEvents}>Clear</button>
                    </section>
                    <div className="eventList">
                        {filteredEvents.map((event, index) => (
                            <div key={index} className={`eventCard ${selectedEvents.includes(event) ? 'selected' : ''}`}
                                onClick={() => handleEventSelection(event)}
                            >
                                <div className="eventDetails">
                                    <div className="eventTitle">{event.event_name}</div>
                                    <div className="eventDate">Date: {event.date}</div>
                                    <div className='location'>Location: {event.location}</div>
                                </div>
                            </div>))}
                    </div>
                    
                    
                    <button class="button-9" onClick={handleCompare}>Compare</button>
                    <button style={{ float: "right" }} class="button-9" onClick={resetChart}>Reset</button>
                </div>

            </div>


        </>
    );
}

export default page