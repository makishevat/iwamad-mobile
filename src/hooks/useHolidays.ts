import { useQuery } from '@tanstack/react-query';
import { fetchHolidays } from '../lib/holidays';

export function useHolidays(year: number) {
  return useQuery({
    queryKey: ['holidays', year],
    queryFn: () => fetchHolidays(year),
    staleTime: 24 * 60 * 60 * 1000,
  });
}