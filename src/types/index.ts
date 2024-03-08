export type PlaceDTO = {
  id: number;
  name: string;
  address: string;
  city: string;
  latitude: number;
  longitude: number;
  host_response_rate: number;
  review_score: number;
  extension_flexibility: number;
};

export type Place = {
  id: number;
  name: string;
  address: string;
  city: string;
  distance: number;
  location: google.maps.LatLng;
  host_response_rate: number;
  review_score: number;
  extension_flexibility: number;
};
