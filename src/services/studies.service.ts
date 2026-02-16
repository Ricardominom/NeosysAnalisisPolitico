import type { Study } from '@/types';
import { getSeedData } from '@/utils/seedData';

const STORAGE_KEY = 'ipd_studies';
const INITIALIZED_KEY = 'ipd_initialized';

export const studiesService = {
  getAll(): Study[] {
    this.ensureInitialized();
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  getById(id: string): Study | null {
    const studies = this.getAll();
    return studies.find(s => s.id === id) || null;
  },

  create(study: Omit<Study, 'id' | 'createdAt' | 'updatedAt'>): Study {
    const studies = this.getAll();
    const newStudy: Study = {
      ...study,
      id: this.generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    studies.push(newStudy);
    this.saveAll(studies);
    return newStudy;
  },

  update(id: string, updates: Partial<Study>): Study | null {
    const studies = this.getAll();
    const index = studies.findIndex(s => s.id === id);
    if (index === -1) return null;

    studies[index] = {
      ...studies[index],
      ...updates,
      id,
      updatedAt: new Date().toISOString(),
    };
    this.saveAll(studies);
    return studies[index];
  },

  delete(id: string): boolean {
    const studies = this.getAll();
    const filtered = studies.filter(s => s.id !== id);
    if (filtered.length === studies.length) return false;
    this.saveAll(filtered);
    return true;
  },

  duplicate(id: string): Study | null {
    const original = this.getById(id);
    if (!original) return null;

    const duplicate = this.create({
      ...original,
      title: `${original.title} (Copia)`,
    });
    return duplicate;
  },

  saveAll(studies: Study[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(studies));
  },

  ensureInitialized(): void {
    const initialized = localStorage.getItem(INITIALIZED_KEY);
    if (!initialized) {
      const seedData = getSeedData();
      this.saveAll(seedData);
      localStorage.setItem(INITIALIZED_KEY, 'true');
    }
  },

  generateId(): string {
    return `study_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  },
};
