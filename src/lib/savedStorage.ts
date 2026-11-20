import AsyncStorage from '@react-native-async-storage/async-storage';

export const SAVED_KEY = 'saved-event-ids';

export async function loadSavedIds(): Promise<number[]> {
  const text = await AsyncStorage.getItem(SAVED_KEY);
  if (text === null) {
    return [];
  }
  try {
    const value = JSON.parse(text);
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

export async function storeSavedIds(ids: number[]): Promise<void> {
  await AsyncStorage.setItem(SAVED_KEY, JSON.stringify(ids));
}