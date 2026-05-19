export type Section = "Francophone" | "Anglophone";

export interface Major {
  id: string;
  name: string;
  abbreviation: string;
  section: Section;
  school: string;
}

export interface Student {
  id: string; // Matricule
  name: string;
  majorId: string;
  level: number;
  payments: {
    inscription: number;
    tranche1: number;
    tranche2: number;
    tranche3: number;
    tranche4: number;
  };
  hasPolo: boolean;
  hasLivret: boolean;
}

export interface Room {
  id: string;
  name: string;
  rows: number;
  cols: number; // Number of benches per row
}

export interface ExamSession {
  id: string;
  name: "Contrôle Continu" | "Session Normale" | "Rattrapage";
  requiredPercentage: number; // 0 to 100
}

export interface User {
  id: string;
  username: string;
  role: "admin" | "staff";
  permissions: string[];
}