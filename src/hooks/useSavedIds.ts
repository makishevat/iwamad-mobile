import { useEffect, useState } from 'react';
import { loadSavedIds, storeSavedIds } from '../lib/savedStorage';

export function useSavedIds() {
  const [savedIds, setSavedIds] = useState<number[]>([]);

  useEffect(() => {
    loadSavedIds().then(setSavedIds);
  }, []);

  function toggleSaved(id: number) {
    const next = savedIds.includes(id)
      ? savedIds.filter((x) => x !== id)
      : [...savedIds, id];
    setSavedIds(next);
    storeSavedIds(next);
  }

  return { savedIds, toggleSaved };
}