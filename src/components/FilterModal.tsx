import TuneIcon from '@mui/icons-material/Tune';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import React, { PropsWithChildren, useState } from 'react';

import { FilterKeys, FilterValues, useFilterStore } from '../store/filter';
import Filter from './Filter';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.default',
  boxShadow: 24,
  borderRadius: 4,
  p: 6,
} as const;

export type FilterInfo = {
  key: FilterKeys;
  displayName: string;
  componentType: 'rating' | 'slider';
  min: number;
  max: number;
  weight: number;
};

type FilterModalProps = {
  onSave: (filters: FilterValues[]) => void;
} & PropsWithChildren;

const filterInfos: FilterInfo[] = [
  {
    key: 'review_score',
    displayName: 'Score',
    weight: 1,
    componentType: 'rating',
    min: 1,
    max: 5,
  },
  {
    key: 'distance',
    displayName: 'Distance',
    min: 1,
    max: 1000,
    weight: 1,
    componentType: 'slider',
  },
  {
    key: 'extension_flexibility',
    displayName: 'Flexibilité',
    min: 1,
    max: 100,
    weight: 1,
    componentType: 'slider',
  },
  {
    key: 'host_response_rate',
    displayName: 'Score de réponse',
    min: 1,
    max: 100,
    weight: 1,
    componentType: 'slider',
  },
];

export default function FilterModal({ onSave }: FilterModalProps) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { filterSelected, setFilterSelected, resetFilters } = useFilterStore();

  const handleOnChange = (filterValues: FilterValues) => {
    setFilterSelected(filterValues);
  };

  const handleOnSave = () => {
    handleClose();
    onSave(filterSelected);
  };

  return (
    <>
      <Button startIcon={<TuneIcon />} onClick={handleOpen}>
        Ouvrir les filtres
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} display={'flex'} flexDirection={'column'} gap={4} width={'100%'}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Filtres
          </Typography>
          <Typography id="modal-modal-description">
            <Box display={'flex'} width={'100%'} flexDirection={'column'} gap={4}>
              {filterInfos.map((value) => (
                <Filter
                  key={value.key}
                  onChange={handleOnChange}
                  filterInfo={value}
                  filterValues={filterSelected.find((filter) => filter.key === value.key)}
                />
              ))}
            </Box>
          </Typography>
          <Box display={'flex'} justifyContent={'space-between'}>
            <Button
              sx={{
                alignSelf: 'flex-end',
              }}
              onClick={resetFilters}
              variant="outlined"
            >
              Réinitialiser les filtres
            </Button>
            <Button
              sx={{
                alignSelf: 'flex-end',
              }}
              onClick={handleOnSave}
              variant="contained"
            >
              Sauvegarder
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
