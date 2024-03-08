import { Skeleton, Stack } from '@mui/material';

const numberSkeleton = Array(10)
  .fill(0)
  .map((_, index) => index);

export default function CardPlacesSkeleton() {
  return numberSkeleton.map((value) => (
    <Stack spacing={2} key={`cardPlacesSkeleton-${value}`}>
      <Skeleton variant="rectangular" height={200} />
      <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
      <Skeleton variant="rectangular" height={20} />
    </Stack>
  ));
}
