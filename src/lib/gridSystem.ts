import * as turf from '@turf/turf';

/**
 * Terrun Grid System
 * 
 * We divide the world into a grid of roughly 11m x 11m tiles (0.0001 degrees).
 * Use a fixed precision step for simplicity.
 */

const TILE_STEP = 0.0001;

export interface Coordinate {
    latitude: number;
    longitude: number;
}

export interface Region {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
}

/**
 * Converts a latitude/longitude to a unique Tile ID.
 * Format: "lat_index,lon_index"
 */
export function latLonToTileId(latitude: number, longitude: number): string {
    const latIndex = Math.floor(latitude / TILE_STEP);
    const lonIndex = Math.floor(longitude / TILE_STEP);
    return `${latIndex},${lonIndex}`;
}

/**
 * Returns the 4 coordinates of the polygon for a given Tile ID.
 * Useful for rendering the tile on the map.
 */
export function getTilePolygon(tileId: string): Coordinate[] {
    const [latIndex, lonIndex] = tileId.split(',').map(Number);

    const latStart = latIndex * TILE_STEP;
    const lonStart = lonIndex * TILE_STEP;

    const latEnd = latStart + TILE_STEP;
    const lonEnd = lonStart + TILE_STEP;

    return [
        { latitude: latStart, longitude: lonStart },   // Bottom-Left
        { latitude: latEnd, longitude: lonStart },     // Top-Left
        { latitude: latEnd, longitude: lonEnd },       // Top-Right
        { latitude: latStart, longitude: lonEnd },     // Bottom-Right
    ];
}

/**
 * Returns a set of all Tile IDs visible in a given region.
 * Capped (MAX_TILES) to avoid rendering issues if zoomed out too far.
 */
export function getVisibleTiles(region: Region): string[] {
    // Region bounds: center +/- delta/2
    const minLat = region.latitude - region.latitudeDelta / 2;
    const maxLat = region.latitude + region.latitudeDelta / 2;
    const minLon = region.longitude - region.longitudeDelta / 2;
    const maxLon = region.longitude + region.longitudeDelta / 2;

    const startLatIndex = Math.floor(minLat / TILE_STEP);
    const endLatIndex = Math.floor(maxLat / TILE_STEP);
    const startLonIndex = Math.floor(minLon / TILE_STEP);
    const endLonIndex = Math.floor(maxLon / TILE_STEP);

    const tileIds: string[] = [];
    const MAX_TILES = 1500;
    let count = 0;

    for (let lat = startLatIndex; lat <= endLatIndex; lat++) {
        for (let lon = startLonIndex; lon <= endLonIndex; lon++) {
            tileIds.push(`${lat},${lon}`);
            count++;
            if (count >= MAX_TILES) break;
        }
        if (count >= MAX_TILES) break;
    }

    return tileIds;
}

/**
 * Calculates the distance between two coordinates in meters.
 * (Haversine formula approximation)
 */
export function getDistance(coord1: Coordinate, coord2: Coordinate): number {
    const R = 6371e3; // Earth radius in meters
    const toRad = (deg: number) => (deg * Math.PI) / 180;

    const lat1 = toRad(coord1.latitude);
    const lat2 = toRad(coord2.latitude);
    const deltaLat = toRad(coord2.latitude - coord1.latitude);
    const deltaLon = toRad(coord2.longitude - coord1.longitude);

    const a =
        Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
        Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
}

/**
 * Identifies all grid tiles completely or partially inside the user's path polygon.
 * Optimization: Uses Bounding Box (BBox) to limit the search area.
 */
export function getTilesInPolygon(pathCoordinates: Coordinate[]): string[] {
    if (pathCoordinates.length < 3) return [];

    // 1. Create Turf Polygon
    // Verify closure: The first and last positions must be equivalent
    // Turf expects [lon, lat]
    const coords = pathCoordinates.map(c => [c.longitude, c.latitude]);

    // Ensure loop is closed
    const first = coords[0];
    const last = coords[coords.length - 1];
    if (first[0] !== last[0] || first[1] !== last[1]) {
        coords.push(first);
    }

    const polygon = turf.polygon([coords]);

    // 2. Calculate Bounding Box (BBox)
    // [minX, minY, maxX, maxY] -> [minLon, minLat, maxLon, maxLat]
    const bbox = turf.bbox(polygon);
    const [minLon, minLat, maxLon, maxLat] = bbox;

    // 3. Iterate over tiles within BBox
    console.log(`Checking tiles in bbox: ${minLon},${minLat} to ${maxLon},${maxLat}`);

    // Quick Area check
    const area = turf.area(polygon);
    console.log(`Polygon Area: ${area.toFixed(2)} m²`);

    const startLatIndex = Math.floor(minLat / TILE_STEP);
    const endLatIndex = Math.floor(maxLat / TILE_STEP);
    const startLonIndex = Math.floor(minLon / TILE_STEP);
    const endLonIndex = Math.floor(maxLon / TILE_STEP);

    const tilesInside: string[] = [];
    // Safety break to prevent freezing if bbox is massive (e.g. GPS error)
    // Increased safety break for smaller tiles
    const MAX_TILES_CHECK = 25000;
    let checkCount = 0;

    for (let lat = startLatIndex; lat <= endLatIndex; lat++) {
        for (let lon = startLonIndex; lon <= endLonIndex; lon++) {
            checkCount++;
            if (checkCount > MAX_TILES_CHECK) {
                console.warn("Polygon too large, stopping tile check.");
                return tilesInside;
            }

            // Get tile center
            const tileCenterLat = (lat * TILE_STEP) + (TILE_STEP / 2);
            const tileCenterLon = (lon * TILE_STEP) + (TILE_STEP / 2);
            const point = turf.point([tileCenterLon, tileCenterLat]);

            // Check if center is inside polygon
            if (turf.booleanPointInPolygon(point, polygon)) {
                tilesInside.push(`${lat},${lon}`);
            }
        }
    }

    return tilesInside;
}
