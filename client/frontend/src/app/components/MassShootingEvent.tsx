// // components/MassShootingEvent.tsx

import React from "react";
import Link from 'next/link';

interface MassShootingEventProps {
  id: string;
  event: string;
  date: string;
  perpetrator: string;
  location: string;
  numVictims: number;
}

const MassShootingEvent: React.FC<MassShootingEventProps> = ({ id, event, date, perpetrator, location, numVictims }) => {
  return (
    // using 'id' for dynamic routing
    <Link href={`../events/${id}`} passHref>
      <div className="event-card">
        <h3 className="event-card-title">{event}</h3>
        <p className="event-card-info"><strong>Date:</strong> {date}</p>
        <p className="event-card-info"><strong>Perpetrator:</strong> {perpetrator}</p>
        <p className="event-card-info"><strong>Location:</strong> {location}</p>
        <p className="event-card-info"><strong>Number of Victims:</strong> {numVictims}</p>
      </div>
    </Link>
  );
}

export default MassShootingEvent;
