import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Polygon, Polyline, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { getTilePolygon, Coordinate } from '../../lib/gridSystem';
import L from 'leaflet';

// Props definition
interface StaticWebMapProps {
    route: Coordinate[];
    conqueredTiles: Set<string>;
}

// Helper to fit bounds
function MapBoundsFitter({ route }: { route: Coordinate[] }) {
    const map = useMap();

    useEffect(() => {
        if (route.length > 0) {
            const bounds = L.latLngBounds(route.map(c => [c.latitude, c.longitude]));
            map.fitBounds(bounds, { padding: [50, 50] });
        }
    }, [route, map]);

    return null;
}

export default function StaticWebMap({ route, conqueredTiles }: StaticWebMapProps) {
    // Default center (Paris) if no route, otherwise the first point
    const center: [number, number] = route.length > 0
        ? [route[0].latitude, route[0].longitude]
        : [48.8566, 2.3522];

    const visibleTiles = Array.from(conqueredTiles);

    return (
        <MapContainer
            center={center}
            zoom={15}
            scrollWheelZoom={false}
            dragging={false}
            zoomControl={false}
            style={{ height: '100%', width: '100%' }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            />

            <MapBoundsFitter route={route} />

            {/* Runner Path */}
            <Polyline
                positions={route.map(c => [c.latitude, c.longitude])}
                pathOptions={{ color: '#000000', weight: 4 }}
            />

            {/* Conquered Tiles */}
            {visibleTiles.map(tileId => {
                const poly = getTilePolygon(tileId);
                const positions = poly.map(c => [c.latitude, c.longitude] as [number, number]);

                return (
                    <Polygon
                        key={tileId}
                        positions={positions}
                        pathOptions={{ fillColor: '#D7FF00', stroke: false, fillOpacity: 0.4 }}
                    />
                );
            })}
        </MapContainer>
    );
}
