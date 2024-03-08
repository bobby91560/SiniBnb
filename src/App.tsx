import './App.css';

import { Backdrop, Box, CircularProgress, useMediaQuery, useTheme } from '@mui/material';
import { Libraries, useJsApiLoader } from '@react-google-maps/api';
import { useState } from 'react';

import CardPlace from './components/CardPlace';
import CardPlaceSkeleton from './components/CardPlaceSkeleton';
import FilterModal from './components/FilterModal';
import Header from './components/Header';
import Map from './components/Map/Map';
import { filterAndSortPlaces, FilterCriterion, SortCriterion } from './lib/search';
import { placeDTOtoPlace } from './mappers';
import { FilterValues } from './store/filter';
import { Place } from './types';

const libraries: Libraries = ['places'];

const initialCenter = {
  lat: 45.5052525,
  lng: -73.56416,
} as const;

function App() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY,
    libraries,
  });

  const [center, setCenter] = useState<google.maps.LatLngLiteral>(initialCenter);
  const [zoom, setZoom] = useState(10);
  const [sortedData, setSortedData] = useState<Place[]>([]);
  const [search, setSearch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDataUpdate = async (center: google.maps.LatLngLiteral) => {
    setIsLoading(true);
    const places: Place[] = await placeDTOtoPlace(center);

    const dbFiltered = await filterAndSortPlaces(places);
    setIsLoading(false);
    setSortedData(dbFiltered);
  };

  const handleOnSelectLocation = async (
    coordonnate?: google.maps.LatLngLiteral,
    zoom?: number,
  ) => {
    setCenter(coordonnate || initialCenter);
    setZoom(zoom || 13);
    setSearch(true);

    await handleDataUpdate(coordonnate || initialCenter);
  };

  const handleOnSaveFilter = async (filters: FilterValues[]) => {
    setIsLoading(true);
    const sortCriteria: SortCriterion[] = filters.map((value) => ({
      key: value.key,
      weight: value.weight || 0,
      max: value.max,
    }));
    const filterCriteria: FilterCriterion[] = filters.map((value) => ({
      key: value.key,
      value: value.value || 0,
    }));

    const places: Place[] = await placeDTOtoPlace(center);

    const filteredAndSortPlaces = await filterAndSortPlaces(
      places,
      sortCriteria,
      filterCriteria,
    );

    setSortedData([...filteredAndSortPlaces]);
    setCenter(filteredAndSortPlaces[0]?.location.toJSON() || initialCenter);
    setIsLoading(false);
  };

  if (!isLoaded)
    return (
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <CircularProgress />
      </Backdrop>
    );

  return (
    <Box sx={{ height: '100vh' }}>
      <Header handleOnSelectLocation={handleOnSelectLocation} setSearch={setSearch} />
      <Box height={'100%'}>
        <Box
          component="main"
          display={'flex'}
          flexDirection={'column'}
          gap={4}
          width={'100%'}
          height={'100%'}
        >
          <Box
            display="flex"
            flexDirection={isMobile ? 'column-reverse' : 'row'}
            justifyContent={'space-between'}
            height={'100%'}
            padding={4}
            gap={4}
          >
            <Box
              width={'100%'}
              height={isMobile ? '60%' : '100%'}
              component={'section'}
              overflow={isMobile ? 'initial' : 'auto'}
              display={'flex'}
              flexDirection={'column'}
              gap={2}
              sx={{
                scrollbarWidth: 'none',
                order: isMobile ? 1 : 0,
                zIndex: 3,
              }}
            >
              <Box
                component={'section'}
                display={'flex'}
                sx={{
                  order: 0,
                }}
              >
                <FilterModal onSave={handleOnSaveFilter} />
              </Box>
              <Box
                gap={2}
                gridTemplateColumns={isMobile ? '1fr' : '1fr 1fr'}
                gridAutoRows={'1fr'}
                display={'grid'}
              >
                {!isLoading && search && sortedData.length === 0 && (
                  <>Aucun bien n&apos;a été trouvé</>
                )}
                {!isLoading ? (
                  sortedData.map((value) => <CardPlace key={value.id} value={value} />)
                ) : (
                  <CardPlaceSkeleton />
                )}
              </Box>
            </Box>
            <Box
              width={'100%'}
              sx={{
                height: 'calc(100% - 180px)',
                order: isMobile ? 3 : 0,
              }}
              component={'section'}
            >
              <Map
                isSearch={search}
                onChange={handleOnSelectLocation}
                center={center}
                isLoaded={isLoaded}
                zoom={zoom}
                data={sortedData}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default App;
