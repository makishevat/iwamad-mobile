import type { CampusEvent } from '../data/events';

export const API_URL = 'https://makishevat.github.io/iwamad-mobile/api/events.json';

export async function fetchEvents(): Promise<CampusEvent[]> {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  return response.json();
}