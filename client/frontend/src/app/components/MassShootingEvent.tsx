import React from 'react';
import Link from 'next/link';
import EventMiniMap from './EventMiniMap';

interface MassShootingEventProps {
  id: string;
  event: string;
  date: string;
  perpetrator: string;
  location: string;
  numVictims: number;
  lat: number;
  long: number;
}

const MassShootingEvent: React.FC<MassShootingEventProps> = ({
  id,
  event,
  date,
  perpetrator,
  location,
  numVictims,
  lat,
  long,
}) => {
  // Make sure lat and long are numbers and not undefined/null
  const validLatLong = typeof lat === 'number' && typeof long === 'number';

  return (
    <Link href={`/events/${id}`} passHref>
  
        <div className="event-card">
          <div className="event-details">
            <h3 className="event-card-title">{event}</h3>
            <p className="event-card-info"><strong>Date:</strong> {date}</p>
            <p className="event-card-info"><strong>Perpetrator:</strong> {perpetrator}</p>
            <p className="event-card-info"><strong>Location:</strong> {location}</p>
            <p className="event-card-info"><strong>Number of Victims:</strong> {numVictims}</p>
          </div>
          {validLatLong && (
            <div className="event-mini-map">
              <EventMiniMap lat={lat} long={long} />
            </div>
          )}
        </div>
      
    </Link>
  );
};

export default MassShootingEvent;
