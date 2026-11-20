export type Holiday = { 
  date: string; 
  localName: string; 
  name: string; 
}; 
  
export const HOLIDAYS_URL = 'https://date.nager.at/api/v3/PublicHolidays'; 
  
export async function fetchHolidays(year: number): Promise<Holiday[]> { 
  const response = await fetch(`${HOLIDAYS_URL}/${year}/KZ`); 
  if (!response.ok) { 
    throw new Error(`HTTP ${response.status}`); 
  } 
  return response.json(); 
} 