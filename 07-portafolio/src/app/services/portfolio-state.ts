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
    title: 'Litio_2026',
    description: 'Smart Contract · Tokenización · Trazabilidad · Cadena de Suministro.',
    detail: 'Plataforma blockchain para la trazabilidad del litio en la cadena de suministro. Implementa Smart Contracts en Solidity para tokenización de activos, trazabilidad end-to-end y auditoría inmutable en la red. Interfaz Vue.js con integración Web3 y almacenamiento descentralizado.',
    techs: ['Solidity', 'TypeScript', 'Vue.js', 'Node.js', 'PostgreSQL', 'Web3.js'],
    githubUrl: 'https://github.com/GonzaPonce1976/Litio_2026',
    demoUrl: 'https://litio-2026.vercel.app',
    imageUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2672&auto=format&fit=crop',
    iconName: 'token'
  },
  {
    id: '2',
    title: 'CYBERSECURITY',
    description: 'Dashboard de Ciberseguridad · Monitoreo de amenazas en tiempo real.',
    detail: 'Panel de control de ciberseguridad con monitoreo de amenazas en tiempo real, análisis de vulnerabilidades y gestión de incidentes. Incluye visualización de logs, alertas automáticas, análisis de tráfico de red y reportes de seguridad con inteligencia artificial integrada.',
    techs: ['React', 'TypeScript', 'Python', 'FastAPI', 'PostgreSQL', 'Docker'],
    githubUrl: 'https://github.com/GonzaPonce1976/CYBERSECURITY',
    demoUrl: 'https://cybersecurity-gonzalo.vercel.app',
    imageUrl: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=2670&auto=format&fit=crop',
    iconName: 'security'
  },
  {
    id: '3',
    title: 'Control-financiero',
    description: 'Sistema de control financiero personal y empresarial.',
    detail: 'Aplicación web para el control y seguimiento de finanzas personales y empresariales. Gestión de ingresos, egresos, presupuestos y reportes visuales interactivos. Dashboard con gráficos en tiempo real, categorización automática y exportación de datos en múltiples formatos.',
    techs: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Chart.js'],
    githubUrl: 'https://github.com/GonzaPonce1976/Control-financiero',
    demoUrl: 'https://control-financiero.vercel.app',
    imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2611&auto=format&fit=crop',
    iconName: 'account_balance'
  },
  {
    id: '4',
    title: 'Conversor de monedas',
    description: 'Conversor de divisas en tiempo real con más de 170 monedas.',
    detail: 'Herramienta de conversión de monedas con tasas de cambio actualizadas en tiempo real. Soporta más de 170 divisas internacionales, historial de conversiones, gráficos de evolución del tipo de cambio y cálculo de comisiones. Interfaz responsive optimizada para móvil y desktop.',
    techs: ['JavaScript', 'HTML5', 'CSS3', 'API REST', 'Chart.js'],
    githubUrl: 'https://github.com/GonzaPonce1976/Conversor-de-monedas',
    demoUrl: 'https://conversor-de-monedas-gonzalo.vercel.app',
    imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2670&auto=format&fit=crop',
    iconName: 'currency_exchange'
  },
  {
    id: '5',
    title: 'Tareas Pendientes',
    description: 'Gestor de tareas con drag & drop, prioridades y categorías.',
    detail: 'Aplicación de gestión de tareas con funcionalidades avanzadas: drag & drop para reordenar, sistema de prioridades, etiquetas personalizables, fechas límite con notificaciones, filtros inteligentes y persistencia local. Diseño minimalista y altamente funcional para productividad diaria.',
    techs: ['JavaScript', 'HTML5', 'CSS3', 'LocalStorage'],
    githubUrl: 'https://github.com/GonzaPonce1976/Tareas-Pendientes',
    demoUrl: 'https://tareas-pendientes-gonzalo.vercel.app',
    imageUrl: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=2672&auto=format&fit=crop',
    iconName: 'task_alt'
  },
  {
    id: '6',
    title: 'Gestion de usuarios',
    description: 'Sistema CRUD completo de gestión de usuarios con autenticación JWT.',
    detail: 'Sistema completo de gestión de usuarios con CRUD, autenticación JWT, roles y permisos, búsqueda avanzada y paginación. Backend RESTful con Node.js y base de datos relacional. Panel administrativo con estadísticas, auditoría de acciones y exportación de reportes.',
    techs: ['React', 'Node.js', 'PostgreSQL', 'JWT', 'Express'],
    githubUrl: 'https://github.com/GonzaPonce1976/Gestion-de-usuarios',
    demoUrl: 'https://gestion-de-usuarios-gonzalo.vercel.app',
    imageUrl: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2670&auto=format&fit=crop',
    iconName: 'manage_accounts'
  },
  {
    id: '7',
    title: 'clima-mundo-gonzalo',
    description: 'Aplicación del clima mundial con datos en tiempo real y mapas interactivos.',
    detail: 'Aplicación global del clima con datos en tiempo real, mapas interactivos y pronósticos extendidos para cualquier ciudad del mundo. Visualización con índices UV, calidad del aire, humedad y alertas meteorológicas. Geolocalización automática y búsqueda por coordenadas.',
    techs: ['React', 'TypeScript', 'API REST', 'Leaflet.js', 'CSS3'],
    githubUrl: 'https://github.com/GonzaPonce1976/clima-mundo-gonzalo',
    demoUrl: 'https://clima-mundo-gonzalo.vercel.app',
    imageUrl: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?q=80&w=2565&auto=format&fit=crop',
    iconName: 'partly_cloudy_day'
  },
  {
    id: '8',
    title: 'Master_Antigravity',
    description: 'Complejo Orestes · Barcode Management App · Gestión de activos.',
    detail: 'Sistema de gestión integral con módulo de códigos de barras, control de inventario y seguimiento de activos en tiempo real. Implementa lectura QR/barcode, reportes avanzados, dashboard de métricas y sincronización multi-dispositivo. Arquitectura modular Angular y TypeScript.',
    techs: ['TypeScript', 'Angular', 'Node.js', 'PostgreSQL', 'JavaScript'],
    githubUrl: 'https://github.com/GonzaPonce1976/Master_Antigravity',
    demoUrl: 'https://master-antigravity.vercel.app',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop',
    iconName: 'barcode_scanner'
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
      // Version-based cache invalidation: bump version to force reload of DEFAULT_PROJECTS
      const DATA_VERSION = 'v3-8projects';
      const storedVersion = localStorage.getItem('portfolio_data_version');

      if (storedVersion !== DATA_VERSION) {
        // New version detected — clear project cache so DEFAULT_PROJECTS are used
        localStorage.removeItem('portfolio_projects');
        localStorage.setItem('portfolio_data_version', DATA_VERSION);
      }

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
