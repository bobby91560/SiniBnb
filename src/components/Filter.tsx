import { Box, Rating, Slider, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import { FilterValues, useFilterStore } from '../store/filter';
import { FilterInfo } from './FilterModal';

type FilterProps = {
  filterInfo: FilterInfo;
  onChange: (value: FilterValues) => void;
  filterValues?: FilterValues;
};

export default function Filter({ filterInfo, onChange }: FilterProps) {
  const [filterInformation, setFilterInfomation] = useState(filterInfo);
  const filterSelected = useFilterStore((store) => store.filterSelected);

  const filterValue = filterSelected.find(
    (filter) => filter.key === filterInformation.key,
  );

  const handleOnChangeFilter = (value: number | number[], key: 'value' | 'weight') => {
    let filterChange: FilterValues;
    if (filterValue) {
      filterChange = {
        ...filterValue,
        [key]: value,
        max: filterInformation.max,
      };
    } else {
      filterChange = {
        key: filterInfo.key,
        [key]: value,
        max: filterInformation.max,
      };
    }
    onChange(filterChange);
  };

  useEffect(() => {
    setFilterInfomation(filterInfo);
  }, [filterInfo]);

  const filterComponent = (component: 'rating' | 'slider'): React.ReactNode => {
    switch (component) {
      case 'rating':
        return (
          <Rating
            name="simple-controlled"
            value={(filterValue?.value as number) || 1}
            onChange={(_, value) => handleOnChangeFilter(value || 1, 'value')}
          />
        );
      default:
        return (
          <Slider
            size="small"
            getAriaLabel={() => filterInformation.displayName}
            onChange={(_, value) => handleOnChangeFilter(value, 'value')}
            value={filterValue?.value || [filterInformation.min, filterInformation.max]}
            valueLabelDisplay="auto"
            min={filterInformation.min}
            max={filterInformation.max}
          />
        );
    }
  };

  return (
    <Box display="flex" flexDirection={'column'} width={'100%'}>
      <Typography id="input-slider" gutterBottom>
        {filterInformation.displayName}
      </Typography>
      <Box display="flex" alignItems={'center'} width={'100%'} gap={4}>
        {filterComponent(filterInformation.componentType)}
        <TextField
          sx={{
            marginLeft: 'auto',
            maxWidth: '100px',
          }}
          label="Pondération"
          id="ponderate-adornment"
          type="number"
          value={filterValue?.weight || filterInfo.weight}
          onChange={(event) =>
            handleOnChangeFilter(parseInt(event.target.value, 10), 'weight')
          }
        />
      </Box>
    </Box>
  );
}
