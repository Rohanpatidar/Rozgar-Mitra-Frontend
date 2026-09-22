import type { GeoCoordinates } from '../components/location/location.types';
import { apiGet } from './client';
export const reverseGeocode = async ({ lat, lng }: GeoCoordinates): Promise<string> => {
    const response = await apiGet<{ display_name: string }>('/geocode/reverse', {
        lat: lat.toString(),
        lon: lng.toString(),
    });

    return response.data.display_name ?? '';
};
