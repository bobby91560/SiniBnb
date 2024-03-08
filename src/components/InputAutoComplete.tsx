import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment, TextField, useTheme } from '@mui/material';
import { Autocomplete } from '@react-google-maps/api';
import { useState } from 'react';

type InputAutoCompleteProps = {
  onChange: (coordonate?: google.maps.LatLngLiteral) => void;
};

const autocompleteOptions = {
  componentRestrictions: { country: 'ca' },
  types: ['address'],
};

export default function InputAutoComplete({ onChange }: InputAutoCompleteProps) {
  const theme = useTheme();
  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);

  const handleOnLoad = (autocomp: google.maps.places.Autocomplete) => {
    setAutocomplete(autocomp);
  };

  const onPlaceChanged = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      if (place.geometry?.location) {
        const coordinates = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
        onChange(coordinates);
      }
    }
  };

  return (
    <>
      <Autocomplete
        onLoad={handleOnLoad}
        onPlaceChanged={onPlaceChanged}
        options={autocompleteOptions}
      >
        <TextField
          fullWidth
          type="search"
          size={'small'}
          placeholder="Chercher un lieu atypique"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            sx: {
              border: 'none',
              borderRadius: 5,
              background: theme.palette.background.default,
            },
          }}
          variant="outlined"
        />
      </Autocomplete>
    </>
  );
}
