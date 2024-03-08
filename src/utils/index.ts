export const calculateDistance = (
  referentialPosition: google.maps.LatLngLiteral,
  positionToCompare: google.maps.LatLngLiteral
): number => {
  const earthRadius = 6371; // Rayon de la Terre en kilomètres
  const latitudeDistance =
    (positionToCompare.lat - referentialPosition.lat) * (Math.PI / 180);
  const longitudeDistance =
    (positionToCompare.lng - referentialPosition.lng) * (Math.PI / 180);
  const a =
    Math.sin(latitudeDistance / 2) * Math.sin(latitudeDistance / 2) +
    Math.cos(referentialPosition.lat * (Math.PI / 180)) *
      Math.cos(positionToCompare.lat * (Math.PI / 180)) *
      Math.sin(longitudeDistance / 2) *
      Math.sin(longitudeDistance / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = earthRadius * c;
  return distance;
};
