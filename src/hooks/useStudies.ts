import { useState, useEffect } from 'react';
import type { Study } from '@/types';
import { studiesService } from '@/services/studies.service';

export function useStudies() {
  const [studies, setStudies] = useState<Study[]>([]);
  const [loading, setLoading] = useState(true);

  const loadStudies = () => {
    setLoading(true);
    const data = studiesService.getAll();
    setStudies(data);
    setLoading(false);
  };

  useEffect(() => {
    loadStudies();
  }, []);

  const createStudy = (study: Omit<Study, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newStudy = studiesService.create(study);
    loadStudies();
    return newStudy;
  };

  const updateStudy = (id: string, updates: Partial<Study>) => {
    const updated = studiesService.update(id, updates);
    loadStudies();
    return updated;
  };

  const deleteStudy = (id: string) => {
    const success = studiesService.delete(id);
    if (success) {
      loadStudies();
    }
    return success;
  };

  const duplicateStudy = (id: string) => {
    const duplicate = studiesService.duplicate(id);
    loadStudies();
    return duplicate;
  };

  return {
    studies,
    loading,
    createStudy,
    updateStudy,
    deleteStudy,
    duplicateStudy,
    refreshStudies: loadStudies,
  };
}
