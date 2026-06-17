import {ChangeDetectionStrategy, Component, inject, signal, computed} from '@angular/core';
import {PortfolioState, Project} from '../../services/portfolio-state';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-projects',
  imports: [],
  template: `
    <div class="animate-fade-in max-w-6xl mx-auto px-6 py-12 md:py-16">
      <!-- Header -->
      <header class="mb-12 text-center md:text-left space-y-4">
        <div class="inline-flex items-center gap-1 text-primary font-mono text-sm uppercase tracking-widest block bg-surface-container-low px-3 py-1 rounded">
          <span class="material-symbols-outlined text-base">folder_open</span>
          <span>Portafolio</span>
        </div>
        <h1 class="font-display text-4xl md:text-6xl font-extrabold text-on-surface tracking-tight">Proyectos</h1>
        <p class="font-sans text-base md:text-lg text-on-surface-variant max-w-2xl leading-relaxed">
          Una selección de mis trabajos más recientes en desarrollo de software, enfocados en rendimiento, escalabilidad y una experiencia de usuario impecable.
        </p>
      </header>

      <!-- Search & Filters -->
      <div class="bg-surface-container border border-outline-variant/60 p-6 rounded-xl mb-10 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div class="relative w-full md:max-w-xs">
          <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-xl">search</span>
          <input 
            type="text" 
            placeholder="Buscar proyectos..." 
            (input)="onSearchChange($event)"
            class="w-full bg-background border border-outline-variant text-on-surface font-sans text-sm rounded px-4 py-2 pl-10 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
          />
        </div>
        
        <!-- Filter Pills -->
        <div class="flex flex-wrap gap-2 w-full md:w-auto justify-start md:justify-end">
          @for (tag of techCategories; track tag) {
            <button 
              (click)="selectedTech.set(tag)"
              [class]="selectedTech() === tag 
                ? 'bg-primary text-background font-mono text-xs px-3 py-1.5 rounded transition-all cursor-pointer' 
                : 'bg-surface-variant text-on-surface-variant border border-outline-variant/40 hover:text-primary font-mono text-xs px-3 py-1.5 rounded transition-all cursor-pointer'"
            >
              {{ tag }}
            </button>
          }
        </div>
      </div>

      <!-- Projects Bento/Grid Layout -->
      @if (filteredProjects().length === 0) {
        <div class="text-center py-24 bg-surface-container-low rounded-xl border border-dashed border-outline-variant/60">
          <span class="material-symbols-outlined text-4xl text-outline mb-2">search_off</span>
          <p class="text-on-surface-variant font-medium text-base">No se encontraron proyectos con los criterios de búsqueda.</p>
          <button (click)="resetFilters()" class="text-primary hover:underline font-mono text-sm mt-2">Restablecer filtros</button>
        </div>
      } @else {
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          @for (project of filteredProjects(); track project.id) {
            <article class="bg-surface-container-low border border-outline-variant/60 rounded-xl overflow-hidden flex flex-col hover:border-primary transition-all duration-300">
              <!-- Visual Header with Image/Gradient Glow fallback -->
              <div class="h-64 overflow-hidden relative bg-surface-container-highest border-b border-outline-variant/30">
                <img 
                  [src]="project.imageUrl || 'https://picsum.photos/seed/' + project.title + '/640/360'" 
                  [alt]="project.title" 
                  class="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  (error)="handleImageError($event, project)"
                  referrerpolicy="no-referrer"
                />
                <!-- Glass tag icon -->
                <div class="absolute top-4 right-4 bg-background/80 backdrop-blur-md px-3 py-1.5 rounded border border-white/10 flex items-center gap-1.5 z-10 text-primary font-mono text-xs">
                  <span class="material-symbols-outlined text-sm">{{ project.iconName }}</span>
                  <span>{{ project.title }}</span>
                </div>
              </div>

              <!-- Content Body -->
              <div class="p-6 md:p-8 flex-grow flex flex-col justify-between space-y-6">
                <div class="space-y-3">
                  <h2 class="font-display text-2xl font-extrabold text-on-surface tracking-tight">{{ project.title }}</h2>
                  <p class="text-on-surface-variant font-sans text-sm leading-relaxed">{{ project.detail }}</p>
                </div>

                <div class="space-y-6">
                  <!-- Tech chips -->
                  <div class="flex flex-wrap gap-1.5">
                    @for (tech of project.techs; track tech) {
                      <span class="bg-surface-variant text-on-surface-variant font-mono text-[1.1rem] px-3 py-0.5 rounded border border-outline-variant/30">
                        {{ tech }}
                      </span>
                    }
                  </div>

                  <!-- CTAs -->
                  <div class="flex gap-4 pt-2">
                    <button 
                      (click)="triggerDemo(project)"
                      class="bg-primary text-background font-mono text-xs font-semibold px-4 py-2.5 rounded flex items-center gap-1.5 hover:brightness-110 transition-all cursor-pointer active:scale-95"
                    >
                      <span class="material-symbols-outlined text-base">rocket_launch</span>
                      Demo
                    </button>
                    <a 
                      [href]="project.githubUrl" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      class="border border-outline text-primary font-mono text-xs font-semibold px-4 py-2.5 rounded flex items-center gap-1.5 hover:bg-surface-bright transition-all cursor-pointer active:scale-95"
                    >
                      <span class="material-symbols-outlined text-base">code</span>
                      Código
                    </a>
                  </div>
                </div>
              </div>
            </article>
          }
        </div>
      }

      <!-- Simulation Modal (Demo Trigger) -->
      @if (activeDemoProject()) {
        <div class="fixed inset-0 bg-background/85 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div class="bg-surface-container border border-outline-variant max-w-md w-full rounded-2xl overflow-hidden shadow-2xl animate-fade-in relative">
            <button 
              (click)="activeDemoProject.set(null)"
              class="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface hover:bg-surface-variant p-1 rounded-full transition-all"
            >
              <span class="material-symbols-outlined">close</span>
            </button>

            <!-- Decorative header -->
            <div class="h-2 bg-gradient-to-r from-primary via-secondary to-tertiary"></div>
            
            <div class="p-6 space-y-6">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                  <span class="material-symbols-outlined text-2xl">{{ activeDemoProject()?.iconName }}</span>
                </div>
                <div>
                  <h3 class="font-display text-lg font-bold text-on-surface">{{ activeDemoProject()?.title }}</h3>
                  <p class="text-xs text-secondary font-mono">Demo Interactiva</p>
                </div>
              </div>

              <!-- Simulated output -->
              <div class="space-y-3">
                <p class="text-on-surface-variant text-sm text-[1.4rem]">
                  Has iniciado el entorno de demostración para <strong>{{ activeDemoProject()?.title }}</strong>. Aquí tienes detalles sobre la simulación activa:
                </p>
                <div class="bg-surface-container-lowest border border-outline-variant/60 rounded p-4 font-mono text-xs space-y-1 text-on-surface-variant leading-relaxed">
                  <div class="text-primary font-semibold">$ initialized --project={{ activeDemoProject()?.title }}</div>
                  <div>[OK] Carga del módulo completada.</div>
                  <div>[INFO] Conectando con variables de entorno del sistema...</div>
                  <div>[LIVE] Puerto de simulación en vivo: <span class="text-secondary font-bold">PORT: 3000</span></div>
                  <div>[OK] Estado del sistema: ACTIVO y optimizado.</div>
                </div>
              </div>

              <div class="flex justify-end pt-2">
                <button 
                  (click)="activeDemoProject.set(null)"
                  class="bg-primary text-background font-mono text-xs font-semibold px-4 py-2 rounded hover:brightness-110 transition-all cursor-pointer"
                >
                  Cerrar Simulación
                </button>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  `,
  styles: `
    :host {
      display: block;
    }
  `
})
export class Projects {
  protected state = inject(PortfolioState);

  // Filter signals
  searchQuery = signal<string>('');
  selectedTech = signal<string>('TODOS');
  activeDemoProject = signal<Project | null>(null);

  // Extract all unique techs from portfolio list for categories
  get techCategories(): string[] {
    const list = new Set<string>();
    this.state.projects().forEach(p => p.techs.forEach(t => list.add(t)));
    return ['TODOS', ...Array.from(list)];
  }

  // Handle live search
  onSearchChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchQuery.set(value.trim().toLowerCase());
  }

  // Core project filter logic
  filteredProjects = computed<Project[]>(() => {
    return this.state.projects().filter(p => {
      const matchSearch = p.title.toLowerCase().includes(this.searchQuery()) || 
                          p.description.toLowerCase().includes(this.searchQuery()) ||
                          p.techs.some(t => t.toLowerCase().includes(this.searchQuery()));
      const select = this.selectedTech();
      const matchTech = select === 'TODOS' || p.techs.includes(select);
      return matchSearch && matchTech;
    });
  });

  resetFilters() {
    this.selectedTech.set('TODOS');
    this.searchQuery.set('');
  }

  triggerDemo(project: Project) {
    this.activeDemoProject.set(project);
  }

  handleImageError(event: Event, project: Project) {
    // If exact image fails to resolve (or offline), fallback to dynamic placeholder with project aesthetic colors
    const target = event.target as HTMLImageElement;
    target.src = `https://picsum.photos/seed/${project.id}/640/360`;
  }
}
