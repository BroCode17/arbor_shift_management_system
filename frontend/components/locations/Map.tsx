'use client'
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in Next.js
const icon = L.icon({
  iconUrl: '/images/marker-icon.png',
  iconRetinaUrl: '/images/marker-icon-2x.png',
  shadowUrl: '/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

interface MapProps {
  locations: Array<{
    id: number;
    name: string;
    coordinates: { lat: number; lng: number };
    status: string;
    capacity: number;
    occupancy: number;
  }>;
  selectedLocation: any;
  onLocationSelect: (location: any) => void;
}

const Map: React.FC<MapProps> = ({ locations, selectedLocation, onLocationSelect }) => {
  return (
    <MapContainer
      center={[40.7128, -74.0060]}
      zoom={13}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {locations.map((location) => (
        <Marker
          key={location.id}
          position={[location.coordinates.lat, location.coordinates.lng]}
          icon={icon}
          eventHandlers={{
            click: () => onLocationSelect(location),
          }}
        >
          <Popup>
            <div className="p-2">
              <h3 className="font-medium">{location.name}</h3>
              <div className="text-sm text-gray-600 mt-1">
                <div>Capacity: {location.capacity}</div>
                <div>Occupancy: {location.occupancy}%</div>
                <div className="mt-1">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    location.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {location.status}
                  </span>
                </div>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;