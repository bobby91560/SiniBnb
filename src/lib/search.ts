import { FilterKeys } from '@/store/filter';
import { Place } from '@/types';

export type SortCriterion = {
  key: FilterKeys;
  weight: number;
  max?: number;
};

export type FilterCriterion = {
  key: FilterKeys;
  value: number | number[];
};

const defaultSortCriterion: SortCriterion[] = [
  {
    key: 'distance',
    weight: 3,
  },
  {
    key: 'host_response_rate',
    weight: 1,
    max: 100,
  },
  {
    key: 'review_score',
    weight: 1,
    max: 5,
  },
  {
    key: 'extension_flexibility',
    weight: 1,
    max: 100,
  },
];

const filterPlaces = (places: Place[], filterCriterion?: FilterCriterion[]) => {
  return places.filter((place) => {
    if (!filterCriterion) return true;
    return filterCriterion.every((criterion) => {
      const placeValue = place[criterion.key];
      if (Array.isArray(criterion.value)) {
        return criterion.value[0] <= placeValue && criterion.value[1] >= placeValue;
      } else {
        return placeValue >= criterion.value;
      }
    });
  });
};

const sortPlaces = (
  places: Place[],
  sortCriterion: SortCriterion[],
  maxDistance?: number,
) => {
  return places.sort((a, b) => {
    let scoreA = 0;
    let scoreB = 0;

    sortCriterion?.forEach(({ key, weight, max }) => {
      if (key === 'distance' && maxDistance) {
        scoreA -= (a.distance / maxDistance) * weight;
        scoreB -= (b.distance / maxDistance) * weight;
      } else if (key !== 'distance' && max) {
        scoreA += (a[key] / max) * weight;
        scoreB += (b[key] / max) * weight;
      }
    });

    return scoreB - scoreA;
  });
};

export const filterAndSortPlaces = (
  places: Place[],
  sortCriterion: SortCriterion[] = defaultSortCriterion,
  filterCriterion?: FilterCriterion[],
): Promise<Place[]> => {
  const filteredPlaces = filterPlaces(places, filterCriterion);
  const calculateMaxDistance = Math.max(...filteredPlaces.map((place) => place.distance));
  const sortedPlaces = sortPlaces(filteredPlaces, sortCriterion, calculateMaxDistance);

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(sortedPlaces);
    }, 1000);
  });
};
