// events/[id].tsx
"use client"
import './eventPage.css'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ClickedEvent from '@/app/components/clickedEvent';

interface EventDetails {
    _id: { $oid: string }; // Adjusted based on JSON structure
    event_name?: string;
    date?: string;
    perpetrator?: string;
    location?: string;
    casualties?: number;
    summary?: string;
    motive?: string;
    //urls?: string;
    // add support for additional fields 
}

const EventDetail = ({ params }: { params: { id: string } }) => { 

    const [eventDetails, setEventDetails] = useState<EventDetails | null>(null);

    useEffect(() => {
        const fetchEventData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:5000/events/${params.id}`);
                const data = response.data.data[0]; // Assuming the data you need is located here.
                setEventDetails(data); // Now TypeScript knows what type of data to expect.
            } catch (error) {
                console.error("Error fetching event data:", error);
            }
        };
        fetchEventData(); // Fetch the event data on component mount
    }, [params.id]); // Dependency array: Re-run the effect if 'id' changes

    if (!eventDetails) {
        return <p>Loading...</p>;
    }
    
    return (
        <div>
            <ClickedEvent
            id={params.id} // assuming the ID is here
            event={eventDetails.event_name || "N/A"} // now TypeScript knows eventDetails might have the property 'event_name'
            date={eventDetails.date || "N/A"}
            perpetrator={eventDetails.perpetrator || "N/A"}
            location={eventDetails.location || "N/A"}
            numVictims={eventDetails.casualties || 0}
            summary={eventDetails.summary || "N/A"}
            motive={eventDetails.motive || "N/A"}
            />
        </div>
    );
};
export default EventDetail;


