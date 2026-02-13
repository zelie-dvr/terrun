import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import MapView, { Polyline, Polygon, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { latLonToTileId, getTilePolygon, getVisibleTiles, getDistance, Coordinate } from '../lib/gridSystem';

// Type definitions for React Native Maps props (simplified)
interface Region {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
}

export default function TerrunMap() {
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [routeCoordinates, setRouteCoordinates] = useState<Coordinate[]>([]);
    const [conqueredTiles, setConqueredTiles] = useState<Set<string>>(new Set());
    const [visibleTiles, setVisibleTiles] = useState<string[]>([]);

    const mapRef = useRef<MapView>(null);
    const lastPositionRef = useRef<Coordinate | null>(null);

    // 1. Request Permissions & Start Tracking
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            // Initial location
            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);

            // Start watching position
            await Location.watchPositionAsync(
                {
                    accuracy: Location.Accuracy.High,
                    timeInterval: 1000,
                    distanceInterval: 5, // Update every 5 meters
                },
                (newLocation) => {
                    const { latitude, longitude, speed } = newLocation.coords;

                    // Anti-Cheat: Speed Filter (e.g., max 25 km/h ≈ 7 m/s)
                    // Speed is in m/s. 7 m/s is roughly a 4 min/km pace.
                    // Let's be generous and say 10 m/s (36 km/h) for now.
                    if (speed && speed > 10) {
                        console.warn("Speed too high, ignoring update (Anti-Cheat)");
                        return;
                    }

                    const newCoord = { latitude, longitude };

                    setLocation(newLocation);

                    // Add to route
                    setRouteCoordinates(prev => [...prev, newCoord]);

                    // Check for conquered tile
                    const tileId = latLonToTileId(latitude, longitude);
                    setConqueredTiles(prev => {
                        const newSet = new Set(prev);
                        if (!newSet.has(tileId)) {
                            // Haptic feedback could be added here
                            newSet.add(tileId);
                        }
                        return newSet;
                    });

                    lastPositionRef.current = newCoord;
                }
            );
        })();
    }, []);

    // 2. Optimizing Rendering: Calculate visible tiles on region change
    const onRegionChangeComplete = (region: Region) => {
        // Get all potential tile IDs in view
        const visibleIds = getVisibleTiles(region);
        // Filter to only show conquered ones (or show all grid if designed that way)
        // For now, let's only render conquered tiles to save performance
        // OR render a "fog of war" style.
        // Let's render ONLY conquered tiles that are visible.

        // To see the "grid" effect, you might want to render ALL grid lines, but that's heavy.
        // Better: Render conquered tiles as filled polygons.

        // Intersection of visible & conquered
        const tilesToRender = visibleIds.filter(id => conqueredTiles.has(id));
        setVisibleTiles(tilesToRender);
    };

    if (errorMsg) {
        return (
            <View style={styles.container}>
                <Text>{errorMsg}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <MapView
                ref={mapRef}
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                showsUserLocation={true}
                followsUserLocation={true}
                onRegionChangeComplete={onRegionChangeComplete}
                initialRegion={{
                    latitude: location?.coords.latitude || 48.8566,
                    longitude: location?.coords.longitude || 2.3522,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }}
            >
                {/* Render the path run so far */}
                <Polyline
                    coordinates={routeCoordinates}
                    strokeColor="#000" // fallback for no theme
                    strokeWidth={6}
                />

                {/* Render Conquered Tiles */}
                {visibleTiles.map(tileId => {
                    const coords = getTilePolygon(tileId);
                    return (
                        <Polygon
                            key={tileId}
                            coordinates={coords}
                            fillColor="rgba(0, 200, 0, 0.5)" // Green with opacity
                            strokeColor="rgba(0, 100, 0, 0.8)"
                            strokeWidth={1}
                        />
                    );
                })}
            </MapView>

            <View style={styles.statsContainer}>
                <Text style={styles.statsText}>Captured: {conqueredTiles.size}</Text>
                <Text style={styles.statsText}>
                    Dist: {routeCoordinates.length > 1 ? Math.round(getDistance(routeCoordinates[0], routeCoordinates[routeCoordinates.length - 1])) : 0}m
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
    statsContainer: {
        position: 'absolute',
        bottom: 40,
        left: 20,
        backgroundColor: 'rgba(255,255,255,0.9)',
        padding: 10,
        borderRadius: 8,
        elevation: 5
    },
    statsText: {
        fontWeight: 'bold',
        fontSize: 16
    }
});
