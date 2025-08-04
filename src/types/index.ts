export interface Task {
  numero: number;
  phase: 'Inception' | 'Élaboration' | 'Construction' | 'Transition';
  titre: string;
  description: string;
  acteur: string;
  statut: 'à faire' | 'en cours' | 'terminée';
  note: number | null;
  commentaire: string;
}

export interface User {
  login: string;
  password: string;
  nom: string;
  role: 'chef_projet' | 'developpeur';
  code: string;
}

export interface AuthUser {
  nom: string;
  role: 'chef_projet' | 'developpeur';
  code: string;
} 

export type Phase = 'Inception' | 'Élaboration' | 'Construction' | 'Transition';
export type TaskStatus = 'à faire' | 'en cours' | 'terminée';