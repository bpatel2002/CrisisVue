import React from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

type EventMiniMapProps = {
    lat: number;
    long: number;
};

const EventMiniMap: React.FC<EventMiniMapProps> = ({ lat, long }) => {
    // Before defining the position, check if the latitude and longitude are valid
    if (typeof lat !== 'number' || typeof long !== 'number' || isNaN(lat) || isNaN(long)) {
        return <p></p>;
    }

    const position: [number, number] = [lat, long];

    // Define the red dot icon using L.divIcon
    const redDotIcon = L.divIcon({
        className: 'red-dot-icon',
        iconSize: [10, 10] // Size of the icon, you can adjust as needed
    });

    return (
        <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ height: '165px', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={position} icon={redDotIcon} />
        </MapContainer>
    );
};

export default EventMiniMap;