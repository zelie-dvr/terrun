import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Polygon, Polyline, useMap, Marker, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { latLonToTileId, getTilePolygon, getVisibleTiles, getDistance, Coordinate, getTilesInPolygon } from '../../lib/gridSystem';
import { runnerIcon } from './RunnerIcon';

// Fix Leaflet's default icon issue in React
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// Custom hook to update map center when location changes
function MapCenterUpdater({ center }: { center: [number, number] }) {
    const map = useMap();
    useEffect(() => {
        map.setView(center);
    }, [center, map]);
    return null;
}

export interface WebMapProps {
    isRecording: boolean;
    route: Coordinate[];
    setRoute: React.Dispatch<React.SetStateAction<Coordinate[]>>;
    conqueredTiles: Set<string>;
    setConqueredTiles: React.Dispatch<React.SetStateAction<Set<string>>>;
}

export default function WebMap({ isRecording, route, setRoute, conqueredTiles, setConqueredTiles }: WebMapProps) {
    const [location, setLocation] = useState<Coordinate | null>(null);
    // visibleTiles derived from conqueredTiles prop
    const [visibleTiles, setVisibleTiles] = useState<string[]>([]);

    // 1. Web Geolocation Tracking
    useEffect(() => {
        if (!navigator.geolocation) {
            console.error("Geolocation is not supported by this browser.");
            return;
        }

        const watchId = navigator.geolocation.watchPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                console.log("Got location:", latitude, longitude); // Debug
                const newCoord = { latitude, longitude };

                setLocation(newCoord);
                setRoute(prev => [...prev, newCoord]);
            },
            (error) => {
                console.error("Error getting location:", error);
                alert("Error getting location: " + error.message);
            },
            { enableHighAccuracy: true, maximumAge: 0 }
        );

        return () => navigator.geolocation.clearWatch(watchId);
    }, []);

    // 2. Visible Tiles Logic (Simplified for Web)
    useEffect(() => {
        // In a real app we'd use map bounds, but here let's just show all conquered tiles
        setVisibleTiles(Array.from(conqueredTiles));
    }, [conqueredTiles]);

    if (!location) {
        return (
            <div className="flex flex-col items-center justify-center h-full w-full bg-gray-100 text-black p-4 z-50 relative">
                <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent mb-4"></div>
                <p className="font-bold">Waiting for GPS Location...</p>
                <p className="text-sm text-gray-500">Please verify browser permissions.</p>
            </div>
        );
    }

    const center: [number, number] = [location.latitude, location.longitude];

    return (
        <div className="relative h-full w-full">
            <MapContainer center={center} zoom={16} scrollWheelZoom={true} zoomControl={false} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                />

                <ZoomControl position="bottomright" />

                <MapCenterUpdater center={center} />

                {/* Runner Path */}
                <Polyline
                    positions={route.map(c => [c.latitude, c.longitude])}
                    pathOptions={{ color: '#000000', weight: 5 }}
                />

                {/* Conquered Tiles */}
                {visibleTiles.map(tileId => {
                    const poly = getTilePolygon(tileId);
                    // Leaflet expects [lat, lon] arrays
                    const positions = poly.map(c => [c.latitude, c.longitude] as [number, number]);

                    return (
                        <Polygon
                            key={tileId}
                            positions={positions}
                            pathOptions={{ fillColor: '#D7FF00', stroke: false, fillOpacity: 0.4 }}
                        />
                    );
                })}

                {/* Current Position Marker */}
                <Marker position={center} icon={runnerIcon} />
            </MapContainer>
        </div>
    );
}
