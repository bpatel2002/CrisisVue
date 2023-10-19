// events/[id].tsx
"use client"
import { useRouter } from 'next/navigation';
import './eventPage.css'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MassShootingEvent from '@/app/components/MassShootingEvent';
import ClickedEvent from '@/app/components/clickedEvent';

interface EventDetails {
    _id: { $oid: string }; // Adjusted based on JSON structure
    event_name: string;
    date?: string;
    perpetrator?: string;
    location?: string;
    casualties?: number;
    summary?: string;
    motive?: string;
}

const EventDetail = ({ params }: { params: { id: string, event_name: string } }) => {

    const [event, setEvent] = useState<EventDetails | null>(null);
    const axios = require('axios');


    // Function to make the GET request, taking 'eventId' as a parameter
    const getEventById = async (eventId: string) => {
        // Construct the complete URL to the specific event using the 'eventId'
        const eventUrl = `http://127.0.0.1:5000/events/${eventId}`;

        try {
            // Making a GET request using Axios
            const response = await axios.get(eventUrl);

            console.log('Event Data:', response.data.data[0]); // The response object will contain the event data you're looking for
        } catch (error) {
            console.error('Error fetching event:', error); // Handle any errors that occur during the request
        }
    };

    const [eventDetails, setEventDetails] = useState(null);
    const [loading, setLoading] = useState<boolean>(true); // State to handle loading status
    const router = useRouter();

    // useEffect(() => {
    //console.log(`Event ID: ${params.id}`);

    //     const eventId = Array.isArray(params.id) ? params.id[0] : params.id; // Ensure 'id' is a string
    //     console.log(`My event id: ${eventId}`);
    //     getEventById(params.id);
    // },
    //     [params.id]
    // );

    useEffect(() => {
        // This function fetches the data from the API
        const fetchEventData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:5000/events/${params.id}`);
                const data = response.data.data[0];
                setEventDetails(data);
            } catch (error) {
                console.error("Error fetching event data:", error);
            }
        };

        // Call the fetch function
        fetchEventData();
    }, []);

    if (!eventDetails) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <ClickedEvent
                id={params.id} // assuming the ID is here
                event={eventDetails.event_name}
                date={eventDetails.date || "N/A"}
                perpetrator={eventDetails.perpetrator || "N/A"}
                location={eventDetails.location || "N/A"}
                numVictims={eventDetails.casualties || 0}
                summary={eventDetails.summary || "N/A"}
                motive={eventDetails.motive || "N/A"}
            />
        </div>
    );
}
export default EventDetail;

