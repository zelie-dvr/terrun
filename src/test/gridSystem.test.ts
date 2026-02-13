import { describe, it, expect } from 'vitest';
import { latLonToTileId, getTilePolygon, getVisibleTiles, getDistance } from '../lib/gridSystem';

describe('Terrun Grid System', () => {
    it('latLonToTileId should return consistent IDs', () => {
        // Coordinate A: close to origin
        const id1 = latLonToTileId(48.8566, 2.3522); // Paris
        const id2 = latLonToTileId(48.856605, 2.352205); // Very close point

        expect(id1).toBe(id2); // Should be in the same tile

        // Far point
        const id3 = latLonToTileId(48.9, 2.4);
        expect(id1).not.toBe(id3);
    });

    it('getTilePolygon should return 4 coordinates forming a rectangle', () => {
        const tileId = '0,0'; // Tile at 0,0
        const polygon = getTilePolygon(tileId);

        expect(polygon).toHaveLength(4);
        expect(polygon[0]).toEqual({ latitude: 0, longitude: 0 }); // Bottom-Left
        // Verify relative positions approximately
        expect(polygon[2].latitude).toBeGreaterThan(polygon[0].latitude); // Top is higher lat
        expect(polygon[2].longitude).toBeGreaterThan(polygon[0].longitude); // Right is higher lon
    });

    it('getVisibleTiles should return tiles within region', () => {
        const region = {
            latitude: 48.8566,
            longitude: 2.3522,
            latitudeDelta: 0.001, // Small delta, should cover ~2x2 tiles
            longitudeDelta: 0.001
        };

        const visibleTiles = getVisibleTiles(region);

        expect(visibleTiles.length).toBeGreaterThan(0);
        expect(visibleTiles.length).toBeLessThan(50); // Should be small number

        // The center point should be in the list
        const centerTile = latLonToTileId(region.latitude, region.longitude);
        expect(visibleTiles).toContain(centerTile);
    });

    it('getVisibleTiles should cap at MAX_TILES', () => {
        const region = {
            latitude: 0,
            longitude: 0,
            latitudeDelta: 10, // Huge delta
            longitudeDelta: 10
        };

        const visibleTiles = getVisibleTiles(region);
        expect(visibleTiles.length).toBeLessThanOrEqual(500); // Our hard cap
    });

    it('getDistance should calculate approximate meters', () => {
        // 1 degree latitude is approx 111km = 111,000m
        const coord1 = { latitude: 0, longitude: 0 };
        const coord2 = { latitude: 1, longitude: 0 };

        const dist = getDistance(coord1, coord2);
        expect(dist).toBeGreaterThan(110000);
        expect(dist).toBeLessThan(112000);
    });
});
