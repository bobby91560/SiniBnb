import { Place } from '@/types';

import db from '../data/database.json';
import { calculateDistance } from '../utils';

export const placeDTOtoPlace = async (
  center: google.maps.LatLngLiteral,
): Promise<Place[]> => {
  const geocoder = new window.google.maps.Geocoder();
  const places: Place[] = await Promise.all(
    db.map(async (value) => {
      const trueAddress = await geocoder.geocode({
        location: { lat: value.latitude, lng: value.longitude },
      });
      const location = trueAddress.results[0].geometry.location;

      return {
        ...value,
        host_response_rate: Math.ceil(value.host_response_rate * 100),
        extension_flexibility: Math.ceil(value.extension_flexibility * 100),
        location,
        distance: calculateDistance(center, location.toJSON()),
        address: trueAddress.results[0].formatted_address,
      } as Place;
    }),
  );
  return places;
};
