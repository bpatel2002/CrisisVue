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

const ClickedEvent: React.FC<ClickedEventProps & Record<string, any>> = ({
    id,
    event,
    date,
    perpetrator,
    location,
    numVictims,
    summary,
    motive,
    place,
    ...additionalFields // Capture additional dynamic fields

}) => {
    // Function to render additional fields is no longer needed
    //console.log("Additional Fields" + additionalFields); // Add this inside the ClickedEvent component
    // console.log(event)
     console.log("ClickedEvent props", {
      id,
      event,
      date,
      perpetrator,
      location,
      numVictims,
      summary,
      motive,
      place,
      additionalFields // This contains all other fields that are not explicitly destructured
    });

    return (
        <div className="event-details-container">
            <h2 className="event-title">{event}</h2>
            <p className="event-info"><strong>Date:</strong> {date}</p>
            <p className="event-info"><strong>Perpetrator:</strong> {perpetrator}</p>
            <p className="event-info"><strong>Location:</strong> {location}</p>
            <p className="event-info"><strong>Place:</strong> {place}</p>
            <p className="event-info"><strong>Number of Victims:</strong> {numVictims}</p>
            <p className="event-info event-summary"><strong>Summary:</strong> {summary}</p>
            <p className="event-info"><strong>Motive:</strong> {motive}</p>

            {/* Render additional fields if they exist */}
            {Object.entries(additionalFields).map(([key, value]) => {
                // Check if value is an object and stringify it, otherwise return the value directly
                const displayValue = typeof value === 'object' && value !== null ? JSON.stringify(value) : value;
                return (
                    <p className="event-info" key={key}><strong>{key}:</strong> {displayValue}</p>
                );
            })}
        </div>
    );
}

export default ClickedEvent;
