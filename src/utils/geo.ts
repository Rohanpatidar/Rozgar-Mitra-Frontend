import type { GeoCoordinates } from '../components/location/location.types';
export const DEFAULT_MAP_CENTER: GeoCoordinates = { lat: 22.7196, lng: 75.8577 };

const EARTH_RADIUS_KM = 6371;

const toRadians = (degrees: number): number => (degrees * Math.PI) / 180;
export const getDistanceKm = (a: GeoCoordinates, b: GeoCoordinates): number => {
    const dLat = toRadians(b.lat - a.lat);
    const dLng = toRadians(b.lng - a.lng);
    const lat1 = toRadians(a.lat);
    const lat2 = toRadians(b.lat);

    const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;

    return EARTH_RADIUS_KM * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
};
