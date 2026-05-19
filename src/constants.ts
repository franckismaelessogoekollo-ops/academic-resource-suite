import { Major, Room, ExamSession } from "./types";

export const MAJORS: Major[] = [
  // SECTION FRANCOPHONE
  // I. ECOLE DE GESTION
  { id: "fr-grh", name: "Gestion des Ressources Humaines", abbreviation: "GRH", section: "Francophone", school: "ECOLE DE GESTION" },
  { id: "fr-cge", name: "Comptabilité et Gestions des Entreprises", abbreviation: "CGE", section: "Francophone", school: "ECOLE DE GESTION" },
  { id: "fr-gctd", name: "Gestion des Collectivités Territoriales Décentralisées", abbreviation: "GCTD", section: "Francophone", school: "ECOLE DE GESTION" },
  { id: "fr-satt", name: "Statistiques", abbreviation: "SATT", section: "Francophone", school: "ECOLE DE GESTION" },
  { id: "fr-bf", name: "Banque et Finance", abbreviation: "BF", section: "Francophone", school: "ECOLE DE GESTION" },
  { id: "fr-gsi", name: "Gestion des Systèmes d' Informations", abbreviation: "GSI", section: "Francophone", school: "ECOLE DE GESTION" },
  { id: "fr-ass", name: "Assurances", abbreviation: "ASS", section: "Francophone", school: "ECOLE DE GESTION" },
  { id: "fr-proj", name: "Gestion des Projets", abbreviation: "PROJ", section: "Francophone", school: "ECOLE DE GESTION" },
  { id: "fr-glt", name: "Gestion Logistique et Transport", abbreviation: "GLT", section: "Francophone", school: "ECOLE DE GESTION" },
  { id: "fr-cv", name: "Commerce-Vente", abbreviation: "CV", section: "Francophone", school: "ECOLE DE GESTION" },
  { id: "fr-mcv", name: "Marketing-Commerce-Vente", abbreviation: "MCV", section: "Francophone", school: "ECOLE DE GESTION" },
  { id: "fr-ci", name: "Commerce International", abbreviation: "CI", section: "Francophone", school: "ECOLE DE GESTION" },

  // II. École Supérieure des Sciences Sociales
  { id: "fr-dae", name: "Droit des Affaires et de l'Entreprise", abbreviation: "DAE", section: "Francophone", school: "ESSS - Carrières Juridiques" },
  { id: "fr-dt", name: "Douane et Transit", abbreviation: "DT", section: "Francophone", school: "ESSS - Carrières Juridiques" },
  { id: "fr-co", name: "Communication des Organisations", abbreviation: "CO", section: "Francophone", school: "ESSS - Communication" },

  // III. Ecole Supérieure Polytechnique Saint Joseph Travailleur
  { id: "fr-gc", name: "Génie Civil", abbreviation: "GC", section: "Francophone", school: "Polytechnique Saint Joseph" },
  { id: "fr-gi", name: "Génie Informatique", abbreviation: "GI", section: "Francophone", school: "Polytechnique Saint Joseph" },

  // IV. École Supérieure Vogt High-Tech
  { id: "fr-dl", name: "Développement Logiciel", abbreviation: "DL", section: "Francophone", school: "Vogt High-Tech - Informatique & IA" },
  { id: "fr-ia", name: "Intelligence Artificielle", abbreviation: "IA", section: "Francophone", school: "Vogt High-Tech - Informatique & IA" },
  { id: "fr-ds", name: "Data Science", abbreviation: "DS", section: "Francophone", school: "Vogt High-Tech - Informatique & IA" },
  { id: "fr-elec", name: "Electronique", abbreviation: "ELEC", section: "Francophone", school: "Vogt High-Tech - Electronique & Mécatronique" },
  { id: "fr-meca", name: "Mécatronique", abbreviation: "MECA", section: "Francophone", school: "Vogt High-Tech - Electronique & Mécatronique" },

  // SECTION ANGLOPHONE
  // HIGHER SCHOOL OF MANAGEMENT
  { id: "en-ltm", name: "Logistics and Transport Management", abbreviation: "LTM", section: "Anglophone", school: "HIGHER SCHOOL OF MANAGEMENT" },
  { id: "en-pm", name: "Project Management", abbreviation: "PM", section: "Anglophone", school: "HIGHER SCHOOL OF MANAGEMENT" },
  { id: "en-hrm", name: "Human Resource Management", abbreviation: "HRM", section: "Anglophone", school: "HIGHER SCHOOL OF MANAGEMENT" },
  { id: "en-lgm", name: "Local Government Management", abbreviation: "LGM", section: "Anglophone", school: "HIGHER SCHOOL OF MANAGEMENT" },
  { id: "en-baf", name: "Banking and Finance", abbreviation: "BAF", section: "Anglophone", school: "HIGHER SCHOOL OF MANAGEMENT" },
  { id: "en-acc", name: "Accountancy", abbreviation: "ACC", section: "Anglophone", school: "HIGHER SCHOOL OF MANAGEMENT" },
  { id: "en-mts", name: "Marketing - Trade - Sales", abbreviation: "MTS", section: "Anglophone", school: "HIGHER SCHOOL OF MANAGEMENT" },

  // HIGHER SCHOOL OF LEGAL CAREERS
  { id: "en-bl", name: "Business Law", abbreviation: "BL", section: "Anglophone", school: "HIGHER SCHOOL OF LEGAL CAREERS" },
  { id: "en-cut", name: "Customs and Transit", abbreviation: "CUT", section: "Anglophone", school: "HIGHER SCHOOL OF LEGAL CAREERS" },

  // HIGHER SCHOOL OF COMMUNICATION
  { id: "en-jr", name: "Journalism", abbreviation: "JR", section: "Anglophone", school: "HIGHER SCHOOL OF COMMUNICATION" },
  { id: "en-mc", name: "Mass Communication", abbreviation: "MC", section: "Anglophone", school: "HIGHER SCHOOL OF COMMUNICATION" },
  { id: "en-af", name: "Accounting and Finance", abbreviation: "AF", section: "Anglophone", school: "HIGHER SCHOOL OF COMMUNICATION" },
  { id: "en-lgdm", name: "Local Government and Decentralized Management", abbreviation: "LGDM", section: "Anglophone", school: "HIGHER SCHOOL OF COMMUNICATION" },
  { id: "en-as", name: "Administration Assistance", abbreviation: "AS", section: "Anglophone", school: "HIGHER SCHOOL OF COMMUNICATION" },
  { id: "en-aitm", name: "Aviation and Air Transport Management", abbreviation: "AITM", section: "Anglophone", school: "HIGHER SCHOOL OF COMMUNICATION" },
  { id: "en-ct", name: "Customs Administration", abbreviation: "CT", section: "Anglophone", school: "HIGHER SCHOOL OF COMMUNICATION" },

  // SCHOOL OF FINANCE, BUSINESS AND MANAGEMENT SCIENCES
  { id: "en-pm-finance", name: "Project Management", abbreviation: "PM", section: "Anglophone", school: "SCHOOL OF FINANCE & BUSINESS" },
  { id: "en-lgdm-finance", name: "Local Government and Decentralized Management", abbreviation: "LGDM", section: "Anglophone", school: "SCHOOL OF FINANCE & BUSINESS" },
  { id: "en-bfaf", name: "Banking and Finance Accounting and Finance", abbreviation: "BFAF", section: "Anglophone", school: "SCHOOL OF FINANCE & BUSINESS" },
  { id: "en-ca", name: "Customs Administration", abbreviation: "CA", section: "Anglophone", school: "SCHOOL OF FINANCE & BUSINESS" },
  { id: "en-amc", name: "Auditing and Management Control", abbreviation: "AMC", section: "Anglophone", school: "SCHOOL OF FINANCE & BUSINESS" },
  { id: "en-is", name: "Insurance", abbreviation: "IS", section: "Anglophone", school: "SCHOOL OF FINANCE & BUSINESS" },
  { id: "en-lm", name: "Leadership Management", abbreviation: "LM", section: "Anglophone", school: "SCHOOL OF FINANCE & BUSINESS" },
  { id: "en-mm", name: "Marketing Management", abbreviation: "MM", section: "Anglophone", school: "SCHOOL OF FINANCE & BUSINESS" },
  { id: "en-hrm-finance", name: "Human Resource Management", abbreviation: "HRM", section: "Anglophone", school: "SCHOOL OF FINANCE & BUSINESS" },

  // SCHOOL OF LOGISTIC AND SUPPLY CHAIN MANAGEMENT
  { id: "en-atm", name: "Air Transport and Management", abbreviation: "ATM", section: "Anglophone", school: "SCHOOL OF LOGISTIC" },
  { id: "en-ltm-log", name: "Logistics and Transport Management", abbreviation: "LTM", section: "Anglophone", school: "SCHOOL OF LOGISTIC" },
  { id: "en-psm", name: "Ports and Shipping Management", abbreviation: "PSM", section: "Anglophone", school: "SCHOOL OF LOGISTIC" },
  { id: "en-scm", name: "Supply Chain Management", abbreviation: "SCM", section: "Anglophone", school: "SCHOOL OF LOGISTIC" },
];

export const DEFAULT_EXAM_SESSIONS: ExamSession[] = [
  { id: "cc", name: "Contrôle Continu", requiredPercentage: 30 },
  { id: "normal", name: "Session Normale", requiredPercentage: 70 },
  { id: "rattrapage", name: "Rattrapage", requiredPercentage: 100 },
];

export const INITIAL_ROOMS: Room[] = [
  { id: "amphi-a", name: "Amphithéâtre A", rows: 10, cols: 5 },
  { id: "salle-101", name: "Salle 101", rows: 6, cols: 4 },
];