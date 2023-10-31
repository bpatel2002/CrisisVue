'use client'
import React from 'react'
import axios from 'axios'
import { useState } from 'react';
import { useEffect } from 'react';
import Timeline from './components/timeline'
function page() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/events")
            .then(response => {
                const fetchedEvents = response.data;
                setEvents(fetchedEvents);
            });
    }, []);

    return (
        <>
            <div>
                < Timeline Events={events} />
            </div>
        </>
    )
}

export default page