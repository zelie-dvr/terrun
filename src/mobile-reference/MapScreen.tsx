import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Platform, Dimensions } from 'react-native';
import MapView, { Polyline, Polygon, UrlTile, MAP_TYPES } from 'react-native-maps';
import * as Location from 'expo-location';
import { latLonToTileId, getTilePolygon, getVisibleTiles, getDistance, Coordinate } from '../lib/gridSystem';

export default function MapScreen() {
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [routeCoordinates, setRouteCoordinates] = useState<Coordinate[]>([]);
    const [conqueredTiles, setConqueredTiles] = useState<Set<string>>(new Set());
    const [visibleTiles, setVisibleTiles] = useState<string[]>([]);
    const [isTracking, setIsTracking] = useState(true);

    const mapRef = useRef<MapView>(null);

    // 1. Setup Location Services
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.warn('Permission to access location was denied');
                return;
            }

            const current = await Location.getCurrentPositionAsync({});
            setLocation(current);

            const sub = await Location.watchPositionAsync(
                {
                    accuracy: Location.Accuracy.High,
                    timeInterval: 1000,
                    distanceInterval: 5,
                },
                (newLocation) => {
                    setLocation(newLocation);
                    const { latitude, longitude } = newLocation.coords;

                    setRouteCoordinates(prev => [...prev, { latitude, longitude }]);

                    const tileId = latLonToTileId(latitude, longitude);
                    setConqueredTiles(prev => {
                        const newSet = new Set(prev);
                        if (!newSet.has(tileId)) {
                            newSet.add(tileId);
                        }
                        return newSet;
                    });
                }
            );

            return () => sub.remove();
        })();
    }, []);

    const onRegionChangeComplete = (region: any) => {
        const visibleIds = getVisibleTiles(region);
        const tilesToRender = visibleIds.filter(id => conqueredTiles.has(id));
        setVisibleTiles(tilesToRender);
    };

    const centerMap = () => {
        if (location && mapRef.current) {
            mapRef.current.animateToRegion({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            });
            setIsTracking(true);
        }
    };

    return (
        <View style={styles.container}>
            {/* 
        OpenStreetMap Implementation:
        - mapType="none" (Android): Disables the default Google maps tiles (saving API costs).
        - <UrlTile>: Fetches tiles from the OpenStreetMap server.
      */}
            <MapView
                ref={mapRef}
                style={StyleSheet.absoluteFill}
                mapType={Platform.OS === 'android' ? "none" : "standard"} // Android: None (use UrlTile). iOS: Standard (Apple Maps is free).
                showsUserLocation={true}
                showsMyLocationButton={false}
                compassEnabled={true}
                followsUserLocation={isTracking}
                onRegionChangeComplete={onRegionChangeComplete}
                onPanDrag={() => setIsTracking(false)}
                initialRegion={{
                    latitude: 48.8566,
                    longitude: 2.3522,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }}
            >
                {/* 
           OpenStreetMap Tile Layer 
           Only needed on Android if we set mapType="none".
        */}
                {Platform.OS === 'android' && (
                    <UrlTile
                        urlTemplate="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        maximumZ={19}
                        flipY={false}
                        zIndex={-1}
                    />
                )}

                {/* 1. The Route Path */}
                <Polyline
                    coordinates={routeCoordinates}
                    strokeColor="#007AFF"
                    strokeWidth={5}
                    lineJoin="round"
                />

                {/* 2. Conquered Zones Overlay */}
                {visibleTiles.map(tileId => (
                    <Polygon
                        key={tileId}
                        coordinates={getTilePolygon(tileId)}
                        fillColor="rgba(0, 122, 255, 0.3)"
                        strokeColor="rgba(0, 122, 255, 0.6)"
                        strokeWidth={1}
                    />
                ))}
            </MapView>

            {/* UI Overlay: Stats */}
            <View style={styles.statsCard}>
                <View style={styles.statItem}>
                    <Text style={styles.statValue}>{conqueredTiles.size}</Text>
                    <Text style={styles.statLabel}>Zones</Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.statItem}>
                    <Text style={styles.statValue}>
                        {routeCoordinates.length > 1
                            ? (getDistance(routeCoordinates[0], routeCoordinates[routeCoordinates.length - 1]) / 1000).toFixed(2)
                            : '0.00'}
                    </Text>
                    <Text style={styles.statLabel}>km</Text>
                </View>
            </View>

            {/* UI Overlay: Recenter Button */}
            <TouchableOpacity
                style={styles.fab}
                onPress={centerMap}
                activeOpacity={0.8}
            >
                <Text style={styles.fabIcon}>📍</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e6e3dd', // Fallback color
    },
    statsCard: {
        position: 'absolute',
        top: 60,
        left: 20,
        right: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderRadius: 16,
        paddingVertical: 15,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    statItem: {
        alignItems: 'center',
    },
    statValue: {
        fontSize: 24,
        fontWeight: '800',
        color: '#333',
    },
    statLabel: {
        fontSize: 12,
        color: '#666',
        fontWeight: '600',
        textTransform: 'uppercase',
    },
    divider: {
        width: 1,
        height: '80%',
        backgroundColor: '#ddd',
    },
    fab: {
        position: 'absolute',
        bottom: 40,
        right: 30,
        width: 60,
        height: 60,
        backgroundColor: '#007AFF', // Brand color
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#007AFF',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    fabIcon: {
        fontSize: 28,
    }
});
