// // components/MassShootingEvent.tsx

import React from 'react';

interface MassShootingEventProps {
  event: string;
  date: string;
  perpetrator: string;
  location: string;
  numVictims: number;

}

// const MassShootingEvent: React.FC<MassShootingEventProps> = ({
//   event,
//   date,
//   perpetrator,
//   location,
//   numVictims,
// }) => {
//   return (
//     <div>
//       <h2>{event}</h2>
//       <p>Date: {date}</p>
//       <p>Perpetrator: {perpetrator}</p>
//       <p>Location: {location}</p>
//       <p>Number of Victims: {numVictims}</p>
//     </div>
//   );
// };

function MassShootingEvent({ event, date, perpetrator, location, numVictims }) {
  return (
    <div className="event-card">
      <h3>{event}</h3>
      <p>Date: {date}</p>
      <p>Perpetrator: {perpetrator}</p>
      <p>Location: {location}</p>
      <p>Number of Victims: {numVictims}</p>
    </div>
  );
}

export default MassShootingEvent; 

