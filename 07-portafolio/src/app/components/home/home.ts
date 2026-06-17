import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {RouterLink} from '@angular/router';
import {PortfolioState} from '../../services/portfolio-state';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-home',
  imports: [RouterLink],
  template: `
    <div class="animate-fade-in min-h-screen">
      <!-- Hero Section -->
      <section class="max-w-6xl mx-auto px-6 py-12 md:py-24 grid grid-cols-1 md:grid-cols-12 gap-12 items-center relative overflow-hidden">
        <div class="absolute -top-40 -right-40 w-96 h-96 bg-primary/5 rounded-full filter blur-3xl pointer-events-none"></div>
        <div class="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary/5 rounded-full filter blur-3xl pointer-events-none"></div>

        <!-- Left Column: Intro -->
        <div class="md:col-span-7 flex flex-col justify-center space-y-6">
          <span class="font-mono text-primary text-sm md:text-base tracking-wider block bg-surface-container-low px-4 py-2 rounded-md self-start border border-outline-variant/30">
            const greeting = "Hola, mundo";
          </span>
          <h1 class="font-display text-4xl md:text-6xl font-extrabold text-on-surface tracking-tight leading-none">
            Gonzalo Ponce.
          </h1>
          <h2 class="font-sans text-xl md:text-3xl text-on-surface-variant font-light leading-relaxed">
            Desarrollador Web Experto construyendo experiencias digitales precisas y escalables.
          </h2>
          <div class="flex flex-wrap gap-4 pt-4">
            <a routerLink="/proyectos" class="inline-flex items-center gap-2 bg-primary text-background font-mono font-medium px-6 py-3 rounded hover:brightness-110 active:scale-95 transition-all text-sm uppercase">
              Ver Proyectos 
              <span class="material-symbols-outlined text-base">arrow_forward</span>
            </a>
            <a routerLink="/contacto" class="inline-flex items-center gap-2 border border-outline text-primary font-mono font-medium px-6 py-3 rounded hover:bg-surface-container active:scale-95 transition-all text-sm uppercase">
              Contacto
            </a>
          </div>
        </div>

        <!-- Right Column: Avatar Frame -->
        <div class="md:col-span-5 flex items-center justify-center">
          <div class="relative w-full max-w-[340px] aspect-[3/4] rounded-2xl overflow-hidden border-4 border-surface-container-highest shadow-2xl group">
            <div class="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-40 z-10"></div>
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC2MsdOWnhlMAUG67S0duv1AUHd5olpoxS8PcfzYUFDd6Ab6JLSZkg4nTb8PQqVSTcQFvLGhpRjoTqSLO9ehiWhVexX9TCP3eMrY33Y4Rdgsk2036D-IJFtXcNahZQcYCYD3ocdgL2Ivb08wgzHJcDQwXAB4y16ZZX8eOuoXyL53Ol1men7HOXlgTo6_bSGLu0tvCD3uBbDL5Dl0L_5MWYpE9J8wPclxygV9PRajhC0bnP4C66pFz9gM7I43c6hELXwIUkoWTqlDjXe" 
              alt="Gonzalo Ponce" 
              class="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
              referrerpolicy="no-referrer"
            />
          </div>
        </div>
      </section>

      <!-- Section: Sobre Mí (01) -->
      <section class="border-t border-outline-variant/60 py-16 md:py-24">
        <div class="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          <div class="md:col-span-4">
            <h3 class="font-display text-2xl md:text-3xl font-bold text-on-surface flex items-center gap-2">
              <span class="text-primary font-mono text-sm block">01.</span> Sobre Mí
            </h3>
          </div>
          <div class="md:col-span-8 space-y-6 text-on-surface-variant font-sans text-base md:text-lg leading-relaxed">
            <p>
              Soy un Ingeniero de Software apasionado por crear experiencias digitales escalables y precisas. Con un enfoque meticuloso en la arquitectura y el rendimiento, transformo ideas complejas en soluciones web robustas y elegantes.
            </p>
            <p>
              Mi objetivo es siempre alcanzar la excelencia técnica, manteniendo un código limpio y mantenible, mientras entrego valor real a los usuarios a través de interfaces intuitivas y eficientes.
            </p>
          </div>
        </div>
      </section>

      <!-- Section: Experiencia (02) -->
      <section class="border-t border-outline-variant/60 py-16 md:py-24">
        <div class="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          <div class="md:col-span-4">
            <h3 class="font-display text-2xl md:text-3xl font-bold text-on-surface flex items-center gap-2">
              <span class="text-primary font-mono text-sm block">02.</span> Experiencia
            </h3>
          </div>
          <div class="md:col-span-8 space-y-6 text-on-surface-variant font-sans text-base md:text-lg leading-relaxed">
            <p>
              Con más de 12 años de experiencia profesional como Desarrollador Web, he liderado y contribuido en el diseño, desarrollo y despliegue de múltiples aplicaciones de misión crítica. Mi trayectoria abarca desde el desarrollo frontend de alto rendimiento hasta la arquitectura de sistemas complejos.
            </p>
            <p>
              A lo largo de mi carrera, he trabajado en diversos sectores, adaptándome a nuevas tecnologías y metodologías ágiles. He sido responsable de optimizar flujos de trabajo, integrar soluciones impulsadas por IA y desallorar plataformas de tokenización y contratos inteligentes.
            </p>
          </div>
        </div>
      </section>

      <!-- Preview Teaser Section: Habilidades (03) -->
      <section class="border-t border-outline-variant/60 py-16 md:py-24">
        <div class="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
          <div class="md:col-span-4 space-y-4">
            <h3 class="font-display text-2xl md:text-3xl font-bold text-on-surface flex items-center gap-2">
              <span class="text-primary font-mono text-sm block">03.</span> Habilidades
            </h3>
            <p class="text-on-surface-variant text-sm md:text-base leading-relaxed">
              Un repertorio de herramientas y tecnologías optimizado para velocidad, mantenibilidad y escalabilidad.
            </p>
            <div>
              <a routerLink="/habilidades" class="inline-flex items-center gap-2 text-primary hover:text-primary-container transition-all font-mono text-sm uppercase mt-2">
                Ver detalle técnico &rarr;
              </a>
            </div>
          </div>
          <div class="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="p-6 bg-surface-container border border-outline-variant/40 rounded-xl space-y-2">
              <span class="material-symbols-outlined text-primary text-3xl">code</span>
              <h4 class="font-display text-lg font-bold text-on-surface">Lenguajes</h4>
              <p class="text-on-surface-variant text-xs font-mono">JavaScript, C++, TypeScript, Python, Solidity, Shell</p>
            </div>
            <div class="p-6 bg-surface-container border border-outline-variant/40 rounded-xl space-y-2">
              <span class="material-symbols-outlined text-secondary text-3xl">integration_instructions</span>
              <h4 class="font-display text-lg font-bold text-on-surface">Frameworks</h4>
              <p class="text-on-surface-variant text-xs font-mono">React, Angular, Vue.js, Node.js, FastAPI</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Featured Projects Teaser Section (04) -->
      <section class="border-t border-outline-variant/60 py-16 md:py-24">
        <div class="max-w-6xl mx-auto px-6 space-y-12">
          <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div class="space-y-2">
              <h3 class="font-display text-2xl md:text-3xl font-bold text-on-surface flex items-center gap-2">
                <span class="text-primary font-mono text-sm block">04.</span> Proyectos Recientes
              </h3>
              <p class="text-on-surface-variant max-w-lg text-sm md:text-base">
                Explore mis últimos lanzamientos en software opensource y soluciones empresariales.
              </p>
            </div>
            <div>
              <a routerLink="/proyectos" class="inline-flex items-center gap-2 text-primary hover:text-primary-container transition-all font-mono text-sm uppercase">
                Ver todos ({{ state.projects().length }}) &rarr;
              </a>
            </div>
          </div>

          <!-- Dynamic Projects Grid (First 3 Only for Home page preview) -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            @for (project of state.projects().slice(0, 3); track project.id) {
              <article class="p-6 bg-surface-container-low border border-outline-variant/50 rounded-xl flex flex-col justify-between hover:border-primary transition-all duration-300">
                <div class="space-y-4">
                  <!-- Tag Icon Style -->
                  <div class="w-12 h-12 rounded-lg bg-surface-container-highest border border-outline-variant/40 flex items-center justify-center text-primary">
                    <span class="material-symbols-outlined text-2xl">{{ project.iconName }}</span>
                  </div>
                  <h4 class="font-display text-xl font-bold text-on-surface truncate">{{ project.title }}</h4>
                  <p class="text-on-surface-variant text-sm line-clamp-3">{{ project.description }}</p>
                </div>
                <div class="pt-6 flex flex-wrap gap-1.5">
                  @for (tech of project.techs.slice(0, 3); track tech) {
                    <span class="bg-surface-variant text-on-surface-variant font-mono text-[1rem] px-2 py-0.5 rounded border border-outline-variant/30">{{ tech }}</span>
                  }
                </div>
              </article>
            }
          </div>
        </div>
      </section>
    </div>
  `,
  styles: `
    :host {
      display: block;
    }
  `
})
export class Home {
  protected state = inject(PortfolioState);
}
