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
        <div class="inline-flex items-center gap-2 font-mono font-semibold" style="background:rgba(255,0,128,0.10); border:1px solid rgba(255,0,128,0.28); color:#ff0080; padding:5px 14px; border-radius:100px; font-size:1.2rem; letter-spacing:0.08em; text-transform:uppercase;">
          <span class="material-symbols-outlined" style="font-size:15px;">folder_open</span>
          Portafolio
        </div>
        <h1 class="font-display font-black" style="font-size:clamp(3.5rem,6vw,6.5rem); letter-spacing:-0.03em; color:#fff; line-height:1.05;">
          Mis<span class="gradient-text"> Proyectos</span>
        </h1>
        <p class="font-sans" style="font-size:1.7rem; line-height:1.65; color:rgba(255,255,255,0.55); max-width:65ch;">
          Una selección de mis trabajos más recientes en desarrollo de software, enfocados en rendimiento, escalabilidad y una experiencia de usuario impecable.
        </p>
      </header>

      <!-- Search & Filters -->
      <div style="background:rgba(22,9,42,0.85); border:1px solid rgba(255,255,255,0.08); padding:20px 24px; border-radius:16px; margin-bottom:36px;" class="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div class="relative w-full md:max-w-xs">
          <span class="material-symbols-outlined" style="position:absolute; left:12px; top:50%; transform:translateY(-50%); color:rgba(255,255,255,0.35); font-size:20px;">search</span>
          <input
            type="text"
            placeholder="Buscar proyectos..."
            (input)="onSearchChange($event)"
            class="form-input"
            style="padding-left:40px;"
          />
        </div>

        <!-- Filter Pills -->
        <div class="flex flex-wrap gap-2 w-full md:w-auto justify-start md:justify-end">
          @for (tag of techCategories; track tag) {
            <button
              (click)="selectedTech.set(tag)"
              [style]="selectedTech() === tag
                ? 'background:linear-gradient(135deg,#ff0080,#ff6b00); color:#fff; border:1px solid transparent;'
                : 'background:rgba(255,255,255,0.05); color:rgba(255,255,255,0.55); border:1px solid rgba(255,255,255,0.10);'"
              style="font-family:'JetBrains Mono',monospace; font-size:1.2rem; font-weight:600; padding:6px 14px; border-radius:8px; transition:all 0.2s; cursor:pointer;"
            >
              {{ tag }}
            </button>
          }
        </div>
      </div>

      <!-- Empty State -->
      @if (filteredProjects().length === 0) {
        <div class="text-center py-24 rounded-2xl" style="background:rgba(22,9,42,0.60); border:1px dashed rgba(255,255,255,0.10);">
          <span class="material-symbols-outlined" style="font-size:48px; color:rgba(255,255,255,0.25); display:block; margin-bottom:12px;">search_off</span>
          <p class="font-sans font-medium" style="font-size:1.6rem; color:rgba(255,255,255,0.45);">No se encontraron proyectos con los criterios de búsqueda.</p>
          <button (click)="resetFilters()" style="margin-top:12px; color:#ff0080; background:none; border:none; font-family:'JetBrains Mono',monospace; font-size:1.3rem; cursor:pointer; text-decoration:underline;">Restablecer filtros</button>
        </div>
      } @else {
        <!-- Projects Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          @for (project of filteredProjects(); track project.id) {
            <article class="card-dark rounded-2xl overflow-hidden flex flex-col" style="position:relative;">
              <!-- Image header -->
              <div style="height:220px; overflow:hidden; position:relative; background:rgba(10,3,20,0.80); border-bottom:1px solid rgba(255,255,255,0.07);">
                <img
                  [src]="project.imageUrl || 'https://picsum.photos/seed/' + project.title + '/640/360'"
                  [alt]="project.title"
                  style="width:100%; height:100%; object-fit:cover; transition:transform 0.7s ease;"
                  class="project-img"
                  (error)="handleImageError($event, project)"
                  referrerpolicy="no-referrer"
                />
                <!-- Glass label -->
                <div style="position:absolute; top:16px; right:16px; background:rgba(18,7,31,0.85); backdrop-filter:blur(10px); border:1px solid rgba(255,0,128,0.30); padding:6px 12px; border-radius:8px; display:flex; align-items:center; gap:6px; z-index:10;">
                  <span class="material-symbols-outlined" style="color:#ff0080; font-size:16px;">{{ project.iconName }}</span>
                  <span class="font-mono" style="font-size:1.2rem; color:#fff; font-weight:600;">{{ project.title }}</span>
                </div>
              </div>

              <!-- Content -->
              <div class="flex-grow flex flex-col justify-between" style="padding:24px 28px; gap:20px;">
                <div class="space-y-3">
                  <h2 class="font-display font-extrabold" style="font-size:2.2rem; color:#fff; letter-spacing:-0.02em;">{{ project.title }}</h2>
                  <p class="font-sans" style="font-size:1.45rem; line-height:1.65; color:rgba(255,255,255,0.55);">{{ project.detail }}</p>
                </div>

                <div class="space-y-5">
                  <!-- Tech chips -->
                  <div class="flex flex-wrap gap-1.5">
                    @for (tech of project.techs; track tech) {
                      <span style="background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.10); color:rgba(255,255,255,0.60); font-family:'JetBrains Mono',monospace; font-size:1.15rem; padding:3px 10px; border-radius:6px;">{{ tech }}</span>
                    }
                  </div>

                  <!-- CTAs -->
                  <div class="flex gap-3 pt-1">
                    <button
                      (click)="triggerDemo(project)"
                      class="btn-gradient inline-flex items-center gap-2 px-5 py-2.5 rounded-lg cursor-pointer font-display font-bold"
                      style="font-size:1.35rem; border:none;"
                    >
                      <span class="material-symbols-outlined" style="font-size:17px; position:relative; z-index:1;">rocket_launch</span>
                      <span style="position:relative; z-index:1;">Demo</span>
                    </button>
                    <a
                      [href]="project.githubUrl"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="btn-outline-glow inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-display font-bold"
                      style="font-size:1.35rem; text-decoration:none;"
                    >
                      <span class="material-symbols-outlined" style="font-size:17px;">code</span>
                      Código
                    </a>
                  </div>
                </div>
              </div>
            </article>
          }
        </div>
      }

      <!-- Modal Demo -->
      @if (activeDemoProject()) {
        <div style="position:fixed; inset:0; background:rgba(10,3,20,0.88); backdrop-filter:blur(8px); display:flex; align-items:center; justify-content:center; padding:16px; z-index:50;">
          <div style="background:rgba(22,9,42,0.98); border:1px solid rgba(255,0,128,0.25); max-width:480px; width:100%; border-radius:20px; overflow:hidden; box-shadow:0 20px 80px rgba(255,0,128,0.20);" class="animate-fade-in">
            <!-- Top gradient bar -->
            <div style="height:4px; background:linear-gradient(90deg,#ff0080,#ff6b00,#a855f7);"></div>

            <button
              (click)="activeDemoProject.set(null)"
              style="position:absolute; top:20px; right:20px; background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.10); color:rgba(255,255,255,0.55); width:32px; height:32px; border-radius:8px; display:flex; align-items:center; justify-content:center; cursor:pointer; transition:all 0.2s;"
            >
              <span class="material-symbols-outlined" style="font-size:18px;">close</span>
            </button>

            <div style="padding:28px 28px 24px;">
              <div class="flex items-center gap-4 mb-6">
                <div style="width:48px; height:48px; background:rgba(255,0,128,0.12); border:1px solid rgba(255,0,128,0.30); border-radius:12px; display:flex; align-items:center; justify-content:center;">
                  <span class="material-symbols-outlined" style="color:#ff0080; font-size:24px;">{{ activeDemoProject()?.iconName }}</span>
                </div>
                <div>
                  <h3 class="font-display font-bold" style="font-size:2rem; color:#fff;">{{ activeDemoProject()?.title }}</h3>
                  <p class="font-mono" style="font-size:1.2rem; color:#ff6b00; font-weight:600;">Demo Interactiva</p>
                </div>
              </div>

              <!-- Terminal simulado -->
              <div style="background:rgba(10,3,20,0.80); border:1px solid rgba(255,255,255,0.08); border-radius:12px; padding:16px; font-family:'JetBrains Mono',monospace; font-size:1.25rem; line-height:1.75; color:rgba(255,255,255,0.55); margin-bottom:20px;">
                <div style="color:#ff0080; font-weight:600; margin-bottom:4px;">$ initialized --project={{ activeDemoProject()?.title }}</div>
                <div>[OK] Carga del módulo completada.</div>
                <div>[INFO] Conectando con variables de entorno del sistema...</div>
                <div>[LIVE] Puerto de simulación en vivo: <span style="color:#ff6b00; font-weight:700;">PORT: 3000</span></div>
                <div>[OK] Estado del sistema: <span style="color:#4ade80;">ACTIVO y optimizado.</span></div>
              </div>

              <div class="flex justify-end">
                <button
                  (click)="activeDemoProject.set(null)"
                  class="btn-gradient inline-flex items-center gap-2 px-5 py-2.5 rounded-lg cursor-pointer font-display font-bold"
                  style="font-size:1.35rem; border:none;"
                >
                  <span style="position:relative;z-index:1;">Cerrar Simulación</span>
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
    .project-img:hover {
      transform: scale(1.05);
    }
  `
})
export class Projects {
  protected state = inject(PortfolioState);

  searchQuery = signal<string>('');
  selectedTech = signal<string>('TODOS');
  activeDemoProject = signal<Project | null>(null);

  get techCategories(): string[] {
    const list = new Set<string>();
    this.state.projects().forEach(p => p.techs.forEach(t => list.add(t)));
    return ['TODOS', ...Array.from(list)];
  }

  onSearchChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchQuery.set(value.trim().toLowerCase());
  }

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
    const target = event.target as HTMLImageElement;
    target.src = `https://picsum.photos/seed/${project.id}/640/360`;
  }
}
