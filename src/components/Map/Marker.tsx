import { InfoWindow, Marker as GoogleMarker } from '@react-google-maps/api';

import { Place } from '@/types';

import CardPlace from '../CardPlace';

type CustomMarkerProps = {
  value: Place;
  onClick: () => void;
  isSelected: boolean;
};

export default function Marker({ value, onClick, isSelected }: CustomMarkerProps) {
  return (
    <GoogleMarker position={value.location} onClick={onClick}>
      {isSelected && (
        <InfoWindow position={value.location} onCloseClick={onClick}>
          <CardPlace size={'small'} value={value} />
        </InfoWindow>
      )}
    </GoogleMarker>
  );
}
