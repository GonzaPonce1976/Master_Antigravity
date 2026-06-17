import {ChangeDetectionStrategy, Component, OnInit, signal} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-skills',
  imports: [],
  template: `
    <div class="animate-fade-in max-w-6xl mx-auto px-6 py-12 md:py-16">
      
      <!-- Header -->
      <header class="mb-12 text-center md:text-left space-y-4">
        <div class="inline-flex items-center gap-1 text-primary font-mono text-sm uppercase tracking-widest block bg-surface-container-low px-3 py-1 rounded">
          <span class="material-symbols-outlined text-base">psychology</span>
          <span>Habilidades</span>
        </div>
        <h1 class="font-display text-4xl md:text-6xl font-extrabold text-on-surface tracking-tight">Habilidades Técnicas</h1>
        <p class="font-sans text-base md:text-lg text-on-surface-variant max-w-2xl leading-relaxed">
          Un ecosistema de herramientas y lenguajes optimizado para la construcción de soluciones de software robustas, escalables y seguras.
        </p>
      </header>

      <!-- Bento Grid layout -->
      <div class="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        <!-- Bento Item 1: Lenguajes Base -->
        <section class="col-span-12 md:col-span-8 bg-surface-container-low border border-outline-variant/60 rounded-2xl p-6 md:p-8 relative overflow-hidden group hover:bg-surface-container transition-all duration-300">
          <div class="absolute inset-0 bg-gradient-to-br from-surface-container-low to-surface-container-high opacity-50 z-0"></div>
          <div class="relative z-10 flex flex-col justify-between h-full space-y-6">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-primary text-3xl">code</span>
              <h2 class="font-display text-2xl font-bold text-on-surface">Lenguajes Base</h2>
            </div>
            
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <!-- Lang cards -->
              <div class="flex flex-col p-4 bg-background border border-outline-variant/40 rounded-lg space-y-2 hover:border-primary transition-colors">
                <span class="font-mono text-primary font-bold text-sm">JavaScript</span>
                <span class="text-on-surface-variant text-xs font-sans">Desarrollo Web Dinámico</span>
              </div>
              <div class="flex flex-col p-4 bg-background border border-outline-variant/40 rounded-lg space-y-2 hover:border-primary transition-colors">
                <span class="font-mono text-primary font-bold text-sm">TypeScript</span>
                <span class="text-on-surface-variant text-xs font-sans">Tipado Estricto de Producción</span>
              </div>
              <div class="flex flex-col p-4 bg-background border border-outline-variant/40 rounded-lg space-y-2 hover:border-primary transition-colors">
                <span class="font-mono text-primary font-bold text-sm">Python</span>
                <span class="text-on-surface-variant text-xs font-sans">Automatización & IA</span>
              </div>
              <div class="flex flex-col p-4 bg-background border border-outline-variant/40 rounded-lg space-y-2 hover:border-primary transition-colors">
                <span class="font-mono text-primary font-bold text-sm">C++</span>
                <span class="text-on-surface-variant text-xs font-sans">Rendimiento & Algoritmia</span>
              </div>
              <div class="flex flex-col p-4 bg-background border border-outline-variant/40 rounded-lg space-y-2 hover:border-primary transition-colors">
                <span class="font-mono text-primary font-bold text-sm">Solidity</span>
                <span class="text-on-surface-variant text-xs font-sans">Smart Contracts</span>
              </div>
              <div class="flex flex-col p-4 bg-background border border-outline-variant/40 rounded-lg space-y-2 hover:border-primary transition-colors">
                <span class="font-mono text-primary font-bold text-sm">Shell</span>
                <span class="text-on-surface-variant text-xs font-sans">Scripts & DevOps</span>
              </div>
            </div>
          </div>
        </section>

        <!-- Bento Item 2: Stack & Tools -->
        <section class="col-span-12 md:col-span-4 bg-surface-container border border-outline-variant/60 rounded-2xl p-6 md:p-8 flex flex-col justify-between group hover:border-secondary transition-all duration-300">
          <div class="space-y-6">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-secondary text-3xl">build</span>
              <h2 class="font-display text-2xl font-bold text-on-surface mr-auto">Stack & Tools</h2>
            </div>
            <div class="flex flex-wrap gap-2">
              <span class="px-3 py-1.5 bg-surface-bright text-on-surface font-mono text-xs rounded border border-outline-variant/50 hover:text-secondary hover:border-secondary transition-colors cursor-default">React</span>
              <span class="px-3 py-1.5 bg-surface-bright text-on-surface font-mono text-xs rounded border border-outline-variant/50 hover:text-secondary hover:border-secondary transition-colors cursor-default">Angular</span>
              <span class="px-3 py-1.5 bg-surface-bright text-on-surface font-mono text-xs rounded border border-outline-variant/50 hover:text-secondary hover:border-secondary transition-colors cursor-default">Node.js</span>
              <span class="px-3 py-1.5 bg-surface-bright text-on-surface font-mono text-xs rounded border border-outline-variant/50 hover:text-secondary hover:border-secondary transition-colors cursor-default">Supabase</span>
              <span class="px-3 py-1.5 bg-surface-bright text-on-surface font-mono text-xs rounded border border-outline-variant/50 hover:text-secondary hover:border-secondary transition-colors cursor-default">Docker</span>
              <span class="px-3 py-1.5 bg-surface-bright text-on-surface font-mono text-xs rounded border border-outline-variant/50 hover:text-secondary hover:border-secondary transition-colors cursor-default">Git</span>
            </div>
          </div>
          <div class="pt-6 border-t border-outline-variant/30 mt-6 md:mt-0">
            <p class="font-sans text-xs text-on-surface-variant leading-relaxed">
              Herramientas y tecnologías principales utilizadas en el flujo de trabajo diario para desarrollo full-stack robusto.
            </p>
          </div>
        </section>

        <!-- Bento Item 3: Especialización (Full Width bottom card with animated progress bars) -->
        <section class="col-span-12 bg-surface-container-low border border-outline-variant/60 rounded-2xl p-6 md:p-8 relative overflow-hidden group">
          <div class="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_bottom_right,rgba(77,142,255,0.03),transparent_70%)]"></div>
          
          <div class="flex items-center gap-2 mb-8 relative z-10">
            <span class="material-symbols-outlined text-tertiary text-3xl">star</span>
            <h2 class="font-display text-2xl font-bold text-on-surface">Especialización</h2>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            <!-- Web dev -->
            <div class="space-y-3">
              <div class="flex justify-between items-end">
                <span class="font-sans font-medium text-base text-on-surface">Desarrollo Web</span>
                <span class="font-mono text-sm text-primary">95%</span>
              </div>
              <div class="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
                <div class="h-full bg-primary rounded-full transition-all duration-1000 ease-out" [style.width]="triggerProgress() ? '95%' : '0%'"></div>
              </div>
              <p class="text-xs text-on-surface-variant font-sans leading-relaxed">Arquitectura frontend y backend, optimización extrema de rendimiento.</p>
            </div>

            <!-- AI dev -->
            <div class="space-y-3">
              <div class="flex justify-between items-end">
                <span class="font-sans font-medium text-base text-on-surface">Inteligencia Artificial</span>
                <span class="font-mono text-sm text-secondary">80%</span>
              </div>
              <div class="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
                <div class="h-full bg-secondary rounded-full transition-all duration-1000 ease-out" [style.width]="triggerProgress() ? '80%' : '0%'"></div>
              </div>
              <p class="text-xs text-on-surface-variant font-sans leading-relaxed">Integración de LLMs, prompting avanzado, RAG y automatización inteligente.</p>
            </div>

            <!-- UI/UX -->
            <div class="space-y-3">
              <div class="flex justify-between items-end">
                <span class="font-sans font-medium text-base text-on-surface">Diseño UI/UX</span>
                <span class="font-mono text-sm text-tertiary">75%</span>
              </div>
              <div class="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
                <div class="h-full bg-tertiary rounded-full transition-all duration-1000 ease-out" [style.width]="triggerProgress() ? '75%' : '0%'"></div>
              </div>
              <p class="text-xs text-on-surface-variant font-sans leading-relaxed">Sistemas de diseño, prototipado funcional, experiencia de usuario impecable.</p>
            </div>
          </div>
        </section>

      </div>
    </div>
  `,
  styles: `
    :host {
      display: block;
    }
  `
})
export class Skills implements OnInit {
  protected triggerProgress = signal<boolean>(false);

  ngOnInit() {
    // Delay progress bar animation slightly so it visually slides on load
    setTimeout(() => {
      this.triggerProgress.set(true);
    }, 150);
  }
}
