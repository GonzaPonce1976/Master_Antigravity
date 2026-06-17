import {Injectable, signal, effect} from '@angular/core';

export interface Project {
  id: string;
  title: string;
  description: string;
  detail: string;
  techs: string[];
  githubUrl: string;
  demoUrl: string;
  imageUrl: string;
  iconName: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

const DEFAULT_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'clima-mundo-gonzalo',
    description: 'Aplicación web para visualizar el clima mundial.',
    detail: 'Aplicación global del clima con datos en tiempo real, mapas interactivos y pronósticos extendidos, optimizada para velocidad y precisión.',
    techs: ['React', 'TypeScript', 'API REST'],
    githubUrl: 'https://github.com/GonzaPonce1976/clima-mundo-gonzalo',
    demoUrl: '#',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCxTTewmIPT9nAjvaPaLKc0NbGOwPZXYw3V2lK02C-HscXjrMDgB_0NirpCKJoM7vX5Bi9t9-OKlkjy_t-h8Nduf_EOw5QfRmTOVdFpf2mPIvziOzQ0taSQbROrRzLpqf2V2MHJ2wrw5sJw2ZBIEdpilGiWUlO8z5p4ZOgPiPLI001RDf72deeTl-QxisNZ-vmQ-rO5rEntluArbFzwOXqcjhmfaTnepM_YCu1icuB364ln2YXNYfuQhMZuk3ys3CNNQTXu6-pzHiT1',
    iconName: 'partly_cloudy_day'
  },
  {
    id: '2',
    title: 'Litio_2026',
    description: 'Smart Contract - Tokenizacion - Trazabilidad - Cadena de Suministro.',
    detail: 'Plataforma de análisis de datos para proyecciones de recursos energéticos, con visualización avanzada e integración de modelos predictivos y blockchain.',
    techs: ['TypeScript', 'Solidity', 'Vue.js', 'Node.js', 'PostgreSQL'],
    githubUrl: 'https://github.com/GonzaPonce1976/Litio_2026',
    demoUrl: '#',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBusAOn-N2QFP2HNus9WtNeYQsDlooEYsZqd5n_qJWoRMxhvS3WW52gTH3QOPkM8GILrnnMLHxSiXEnKzUv9v6sK1UuSNM7OxOVMRgzDo9lKD6i2FB-NUm5K-AiuDPt_kg_xAvLld7ZoEc5DmCnzQuixNfF2mMPQQE9equ2N2T0_LVjBDH3xE44sQZRR-MJKcg4z6Cwe8Rw1q_dRjBkhd4-l_cydWPu1TONXdWb2-LoNR5KfUDxY0omCZyNo2jp7pMotAEVCvU_6FAy',
    iconName: 'token'
  },
  {
    id: '3',
    title: 'Master_Antigravity',
    description: 'Complejo Orestes - Barcode Management App.',
    detail: 'Motor de físicas experimentales renderizado en WebGL. Simula entornos de gravedad cero y colisiones complejas en tiempo real.',
    techs: ['TypeScript', 'WebGL', 'Three.js', 'JavaScript'],
    githubUrl: 'https://github.com/GonzaPonce1976/Master_Antigravity',
    demoUrl: '#',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBc_DeccAZgvkLinDVMlbHWiAsj2O25xe1CJYHDMAWzcDpwPNaZ1JsHUhjYe_mlUC2TqgiPMk-Zm-HdG7gWUTAbD2RHPziXvpt-lsf6ePPzB0Or4UmyP3nyUgtAAcBXpLmMixG7TflMv3pegifrTPkVBpzkdYF9iEtueqh59ZQEhUcCXmrDkluJQaO_qU_pWB5njC5XRPOZPKIhBEozCATY7Dt-xgXFvQBblM30E_XMldV4kO59bJwojg_C0U0LRxiS6XFpeR3hvO2f',
    iconName: 'barcode_scanner'
  },
  {
    id: '4',
    title: 'NLWeb',
    description: 'The main repo for NLWeb, implementado para AI web automation.',
    detail: 'Framework para el procesamiento de lenguaje natural integrado en aplicaciones web, facilitando la extracción de entidades y análisis de sentimiento.',
    techs: ['Python', 'FastAPI', 'React'],
    githubUrl: 'https://github.com/GonzaPonce1976/NLWeb',
    demoUrl: '#',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBv2VN2cPwEYMtaFUBxwJk3vYyvAbD5AGt0l6UG41WFbNcL2jxZxiXJbrqiiLzMfaHx-4Ev8QtKavgW46D9wlM_tMmUhb7ZojKWcew_rHzYYxP17uAo6ifAXkeNrviREVgwxqiTuXWvJN11ZgnNih2rQZtXm4bA4gnN-A4lw9nzFV1d8_UV06J2TOGNChYj7TNQ9QllwA7Bjc3dCLqlefxgSoH8McPLMMtLXpJJL0eMzjpG9NDQKuI0ldPDru6OOYK3SVl6BXCHLBQH',
    iconName: 'smart_toy'
  }
];

@Injectable({
  providedIn: 'root'
})
export class PortfolioState {
  private isBrowser = typeof window !== 'undefined';

  // Signals
  projects = signal<Project[]>(DEFAULT_PROJECTS);
  messages = signal<ContactMessage[]>([]);
  adminMode = signal<boolean>(false);

  constructor() {
    this.loadState();

    // Persist status updates automatically when signals change
    if (this.isBrowser) {
      effect(() => {
        localStorage.setItem('portfolio_projects', JSON.stringify(this.projects()));
      });
      effect(() => {
        localStorage.setItem('portfolio_messages', JSON.stringify(this.messages()));
      });
      effect(() => {
        localStorage.setItem('portfolio_admin_mode', JSON.stringify(this.adminMode()));
      });
    }
  }

  private loadState() {
    if (!this.isBrowser) return;
    try {
      const persistedProjects = localStorage.getItem('portfolio_projects');
      if (persistedProjects) {
        this.projects.set(JSON.parse(persistedProjects));
      }

      const persistedMessages = localStorage.getItem('portfolio_messages');
      if (persistedMessages) {
        this.messages.set(JSON.parse(persistedMessages));
      }

      const persistedAdmin = localStorage.getItem('portfolio_admin_mode');
      if (persistedAdmin) {
        this.adminMode.set(JSON.parse(persistedAdmin));
      }
    } catch (e) {
      console.error('Error loading portfolio state from localStorage', e);
    }
  }

  // Actions for Projects
  addProject(project: Omit<Project, 'id'>) {
    const newId = (Math.max(...this.projects().map(p => parseInt(p.id) || 0), 0) + 1).toString();
    const newProj: Project = { ...project, id: newId };
    this.projects.update(list => [...list, newProj]);
  }

  updateProject(id: string, updated: Partial<Project>) {
    this.projects.update(list => list.map(p => p.id === id ? { ...p, ...updated } : p));
  }

  deleteProject(id: string) {
    this.projects.update(list => list.filter(p => p.id !== id));
  }

  // Actions for Messages
  addMessage(name: string, email: string, subject: string, messageText: string) {
    const newMessage: ContactMessage = {
      id: Math.random().toString(36).substring(2, 9),
      name,
      email,
      subject,
      message: messageText,
      createdAt: new Date().toLocaleString()
    };
    this.messages.update(list => [newMessage, ...list]);
  }

  deleteMessage(id: string) {
    this.messages.update(list => list.filter(m => m.id !== id));
  }
}
