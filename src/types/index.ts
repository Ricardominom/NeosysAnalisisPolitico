export type UncertaintyLevel = 'Baja' | 'Media' | 'Alta';

export interface Candidate {
  id: string;
  name: string;
  party: string;
  adjectives: string[];
  digitalSignal: string;
}

export interface BlockARow {
  id: string;
  party: string;
  duro: number;
  enojado: number;
  critico: number;
  oportunista: number;
}

export interface BlockBRow {
  id: string;
  segment: string;
  description: string;
  size: number;
}

export interface Study {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  archetype: string;
  archetypeUncertainty: UncertaintyLevel;
  positivePoints: string[];
  positivePointsUncertainty: UncertaintyLevel;
  negativePoints: string[];
  negativePointsUncertainty: UncertaintyLevel;
  candidates: Candidate[];
  candidatesUncertainty: UncertaintyLevel;
  digitalUniverse: number;
  digitalUniverseUncertainty: UncertaintyLevel;
  blockA: BlockARow[];
  blockAUncertainty: UncertaintyLevel;
  blockB: BlockBRow[];
  blockBUncertainty: UncertaintyLevel;
}

export interface User {
  email: string;
  name: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}
