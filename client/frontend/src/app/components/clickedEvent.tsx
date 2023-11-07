// // components/clickedEvent.tsx

"use client";

import React from "react";
import Link from 'next/link';
import { StringLiteral } from "typescript";

interface ClickedEventProps {
    id: string;
    event: string;
    date: string;
    perpetrator: string;
    location: string;
    numVictims: number;
    summary: string;
    motive: string;
    place: string;
}



const ClickedEvent: React.FC<ClickedEventProps> = ({ id, event, date, perpetrator, location, numVictims, summary, motive, place }) => {
    return (
        // using 'id' for dynamic routing

        <div className="event-details-container">
            <h2 className="event-title">{event}</h2>
            <p className="event-info"><strong>Date:</strong> {date}</p>
            <p className="event-info"><strong>Perpetrator:</strong> {perpetrator}</p>
            <p className="event-info"><strong>Location:</strong> {location}</p>
            <p className="event-info"><strong>Place:</strong> {place}</p>
            <p className="event-info"><strong>Number of Victims:</strong> {numVictims}</p>
            <p className="event-info event-summary"><strong>Summary:</strong> {summary}</p>
            <p className="event-info"><strong>Motive:</strong> {motive}</p>
        </div>

    );
}

export default ClickedEvent;


