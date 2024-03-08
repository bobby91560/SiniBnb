import { GoogleMap } from "@react-google-maps/api";
import React, { useCallback, useState } from "react";

import { Place } from "@/types";

import Marker from "./Marker";

const containerStyle = {
  width: "100%",
  height: "100%",
} as const;

type MapProps = {
  isLoaded: boolean;
  center?: google.maps.LatLngLiteral;
  data: Place[];
  zoom?: number;
  onChange: (location?: google.maps.LatLngLiteral, zoom?: number) => void;
  isSearch: boolean;
};

const Map = ({
  isLoaded,
  center,
  data,
  onChange,
  zoom,
  isSearch,
}: MapProps) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [selectedMarker, setSelectedMarker] = useState<Place | null>(null);

  const onZoomChanged = () => {
    if (map) {
      const newCenter = map.getCenter()?.toJSON();
      onChange(newCenter, map.getZoom());
    }
  };

  const onIdle = () => {
    if (map) {
      const newCenter = map.getCenter()?.toJSON();
      if (
        (newCenter?.lat !== center?.lat || newCenter?.lng !== center?.lng) &&
        isSearch
      ) {
        onChange(newCenter, map.getZoom());
      }
    }
  };

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const onLoadMap = useCallback((map: google.maps.Map) => {
    map.setOptions({
      zoomControl: true,
      zoomControlOptions: {
        position: window.google.maps.ControlPosition.TOP_RIGHT,
      },
    });
    setMap(map);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={zoom || 10}
      onClick={() => setSelectedMarker(null)}
      onUnmount={onUnmount}
      onLoad={onLoadMap}
      onIdle={onIdle}
      onZoomChanged={onZoomChanged}
    >
      {data.map((place) =>
        isLoaded ? (
          <Marker
            key={place.id}
            onClick={() =>
              setSelectedMarker(selectedMarker === null ? place : null)
            }
            isSelected={selectedMarker?.id === place.id}
            value={place}
          />
        ) : null
      )}
    </GoogleMap>
  ) : null;
};

export default React.memo(Map);
