import {ChangeDetectionStrategy, Component, OnInit, signal} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-skills',
  imports: [],
  template: `
    <div class="animate-fade-in max-w-6xl mx-auto px-6 py-12 md:py-16">

      <!-- Header -->
      <header class="mb-12 text-center md:text-left space-y-4">
        <div class="inline-flex items-center gap-2 font-mono font-semibold" style="background:rgba(255,0,128,0.10); border:1px solid rgba(255,0,128,0.28); color:#ff0080; padding:5px 14px; border-radius:100px; font-size:1.2rem; letter-spacing:0.08em; text-transform:uppercase;">
          <span class="material-symbols-outlined" style="font-size:15px;">psychology</span>
          Habilidades
        </div>
        <h1 class="font-display font-black" style="font-size:clamp(3.5rem,6vw,6.5rem); letter-spacing:-0.03em; color:#fff; line-height:1.05;">
          Habilidades<span class="gradient-text"> Técnicas</span>
        </h1>
        <p class="font-sans" style="font-size:1.7rem; line-height:1.65; color:rgba(255,255,255,0.55); max-width:65ch;">
          Un ecosistema de herramientas y lenguajes optimizado para la construcción de soluciones de software robustas, escalables y seguras.
        </p>
      </header>

      <!-- Bento Grid -->
      <div class="grid grid-cols-1 md:grid-cols-12 gap-6">

        <!-- Bento 1: Lenguajes Base — col-span-8 -->
        <section class="col-span-12 md:col-span-8 rounded-2xl p-6 md:p-8 relative overflow-hidden" style="background:rgba(22,9,42,0.85); border:1px solid rgba(255,255,255,0.08);">
          <!-- Accent line top -->
          <div style="position:absolute; top:0; left:0; right:0; height:3px; background:linear-gradient(90deg,#ff0080,#ff6b00);"></div>
          <div class="orb-pink" style="width:300px; height:300px; top:-100px; right:-80px; opacity:0.4;"></div>

          <div class="relative z-10 space-y-6">
            <div class="flex items-center gap-3">
              <div style="width:40px; height:40px; background:rgba(255,0,128,0.12); border:1px solid rgba(255,0,128,0.28); border-radius:10px; display:flex; align-items:center; justify-content:center;">
                <span class="material-symbols-outlined" style="color:#ff0080; font-size:20px;">code</span>
              </div>
              <h2 class="font-display font-bold" style="font-size:2.2rem; color:#fff;">Lenguajes Base</h2>
            </div>

            <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
              @for (lang of languages; track lang.name) {
                <div style="padding:16px; background:rgba(10,3,20,0.55); border:1px solid rgba(255,255,255,0.08); border-radius:12px; transition:all 0.25s ease;" class="hover-card-lang">
                  <div class="font-mono font-bold" style="font-size:1.5rem; color:#ff0080; margin-bottom:4px;">{{ lang.name }}</div>
                  <div class="font-sans" style="font-size:1.2rem; color:rgba(255,255,255,0.45);">{{ lang.desc }}</div>
                </div>
              }
            </div>
          </div>
        </section>

        <!-- Bento 2: Stack & Tools — col-span-4 -->
        <section class="col-span-12 md:col-span-4 rounded-2xl p-6 md:p-8 flex flex-col justify-between" style="background:rgba(22,9,42,0.85); border:1px solid rgba(255,255,255,0.08);">
          <!-- Accent top -->
          <div style="position:absolute; top:0; left:0; right:0; height:3px; background:linear-gradient(90deg,#ff6b00,#a855f7); border-radius:2px;"></div>

          <div class="space-y-5">
            <div class="flex items-center gap-3">
              <div style="width:40px; height:40px; background:rgba(255,107,0,0.12); border:1px solid rgba(255,107,0,0.28); border-radius:10px; display:flex; align-items:center; justify-content:center;">
                <span class="material-symbols-outlined" style="color:#ff6b00; font-size:20px;">build</span>
              </div>
              <h2 class="font-display font-bold" style="font-size:2.2rem; color:#fff;">Stack &amp; Tools</h2>
            </div>
            <div class="flex flex-wrap gap-2">
              @for (tool of tools; track tool) {
                <span style="padding:6px 14px; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.10); border-radius:8px; font-family:'JetBrains Mono',monospace; font-size:1.2rem; color:rgba(255,255,255,0.70); cursor:default; transition:all 0.2s ease;">{{ tool }}</span>
              }
            </div>
          </div>

          <div style="padding-top:20px; border-top:1px solid rgba(255,255,255,0.07); margin-top:20px;">
            <p class="font-sans" style="font-size:1.25rem; color:rgba(255,255,255,0.40); line-height:1.6;">
              Herramientas y tecnologías principales utilizadas en el flujo de trabajo diario para desarrollo full-stack robusto.
            </p>
          </div>
        </section>

        <!-- Bento 3: Especialización — col-span-12 -->
        <section class="col-span-12 rounded-2xl p-6 md:p-8 relative overflow-hidden" style="background:rgba(22,9,42,0.85); border:1px solid rgba(255,255,255,0.08);">
          <div class="orb-violet" style="width:400px; height:400px; bottom:-150px; right:-100px; opacity:0.35;"></div>
          <div style="position:absolute; top:0; left:0; right:0; height:3px; background:linear-gradient(90deg,#a855f7,#ff0080);"></div>

          <div class="flex items-center gap-3 mb-8 relative z-10">
            <div style="width:40px; height:40px; background:rgba(168,85,247,0.12); border:1px solid rgba(168,85,247,0.28); border-radius:10px; display:flex; align-items:center; justify-content:center;">
              <span class="material-symbols-outlined" style="color:#a855f7; font-size:20px;">star</span>
            </div>
            <h2 class="font-display font-bold" style="font-size:2.2rem; color:#fff;">Especialización</h2>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            <!-- Desarrollo Web -->
            <div class="space-y-3">
              <div class="flex justify-between items-end">
                <span class="font-sans font-semibold" style="font-size:1.5rem; color:#fff;">Desarrollo Web</span>
                <span class="font-mono font-bold gradient-text" style="font-size:1.4rem;">95%</span>
              </div>
              <div class="progress-track">
                <div class="progress-fill-pink" [style.width]="triggerProgress() ? '95%' : '0%'"></div>
              </div>
              <p class="font-sans" style="font-size:1.25rem; color:rgba(255,255,255,0.45); line-height:1.55;">Arquitectura frontend y backend, optimización extrema de rendimiento.</p>
            </div>

            <!-- Inteligencia Artificial -->
            <div class="space-y-3">
              <div class="flex justify-between items-end">
                <span class="font-sans font-semibold" style="font-size:1.5rem; color:#fff;">Inteligencia Artificial</span>
                <span class="font-mono font-bold gradient-text-alt" style="font-size:1.4rem;">80%</span>
              </div>
              <div class="progress-track">
                <div class="progress-fill-orange" [style.width]="triggerProgress() ? '80%' : '0%'"></div>
              </div>
              <p class="font-sans" style="font-size:1.25rem; color:rgba(255,255,255,0.45); line-height:1.55;">Integración de LLMs, prompting avanzado, RAG y automatización inteligente.</p>
            </div>

            <!-- Diseño UI/UX -->
            <div class="space-y-3">
              <div class="flex justify-between items-end">
                <span class="font-sans font-semibold" style="font-size:1.5rem; color:#fff;">Diseño UI/UX</span>
                <span class="font-mono font-bold" style="font-size:1.4rem; color:#a855f7;">75%</span>
              </div>
              <div class="progress-track">
                <div class="progress-fill-violet" [style.width]="triggerProgress() ? '75%' : '0%'"></div>
              </div>
              <p class="font-sans" style="font-size:1.25rem; color:rgba(255,255,255,0.45); line-height:1.55;">Sistemas de diseño, prototipado funcional, experiencia de usuario impecable.</p>
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
    .hover-card-lang:hover {
      border-color: rgba(255, 0, 128, 0.35) !important;
      background: rgba(255, 0, 128, 0.06) !important;
      transform: translateY(-2px);
    }
  `
})
export class Skills implements OnInit {
  protected triggerProgress = signal<boolean>(false);

  languages = [
    { name: 'JavaScript', desc: 'Desarrollo Web Dinámico' },
    { name: 'TypeScript', desc: 'Tipado Estricto de Producción' },
    { name: 'Python', desc: 'Automatización & IA' },
    { name: 'C++', desc: 'Rendimiento & Algoritmia' },
    { name: 'Solidity', desc: 'Smart Contracts' },
    { name: 'Shell', desc: 'Scripts & DevOps' },
  ];

  tools = ['React', 'Angular', 'Node.js', 'Supabase', 'Docker', 'Git', 'FastAPI', 'Vue.js'];

  ngOnInit() {
    setTimeout(() => {
      this.triggerProgress.set(true);
    }, 150);
  }
}
