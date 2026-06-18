import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {RouterLink} from '@angular/router';
import {PortfolioState} from '../../services/portfolio-state';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-home',
  imports: [RouterLink],
  template: `
    <div class="animate-fade-in min-h-screen">

      <!-- ===================================================
           HERO SECTION
      =================================================== -->
      <section class="relative overflow-hidden" style="min-height:90vh; display:flex; align-items:center;">

        <!-- Background orbs decorativos -->
        <div class="orb-pink" style="width:600px; height:600px; top:-200px; right:-150px; opacity:0.7;"></div>
        <div class="orb-orange" style="width:400px; height:400px; bottom:-100px; left:-100px; opacity:0.6;"></div>
        <div class="orb-violet" style="width:350px; height:350px; top:30%; left:30%; opacity:0.4;"></div>

        <div class="max-w-6xl mx-auto px-6 py-16 md:py-24 w-full grid grid-cols-1 md:grid-cols-12 gap-12 items-center relative z-10">

          <!-- Left Column: Texto -->
          <div class="md:col-span-7 flex flex-col gap-6 animate-slide-left">

            <!-- Badge disponible -->
            <div>
              <span class="badge-available font-mono">Disponible para trabajar</span>
            </div>

            <!-- Headline -->
            <div>
              <h1 class="font-display font-black leading-none" style="font-size:clamp(4rem,7vw,7.5rem); letter-spacing:-0.03em;">
                <span style="color:#ffffff; display:block;">Desarrollador</span>
                <span class="gradient-text" style="display:block;">Full-Stack Senior</span>
              </h1>
            </div>

            <!-- Descripción -->
            <p class="font-sans" style="font-size:1.7rem; line-height:1.65; color:rgba(255,255,255,0.65); max-width:52ch;">
              Ayudo a empresas y emprendedores a construir aplicaciones web escalables y modernas.
              Con más de <strong style="color:#fff; font-weight:700;">12 años</strong> de experiencia dominando el ecosistema JavaScript.
            </p>

            <!-- CTA Buttons -->
            <div class="flex flex-wrap gap-4 pt-2">
              <a routerLink="/proyectos"
                 class="btn-gradient inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-display font-bold cursor-pointer"
                 style="font-size:1.5rem; text-decoration:none; letter-spacing:0.01em;">
                <span style="position:relative;z-index:1;">Ver Mis Proyectos</span>
                <span class="material-symbols-outlined" style="font-size:20px; position:relative; z-index:1;">arrow_forward</span>
              </a>
              <a routerLink="/contacto"
                 class="btn-outline-glow inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-display font-bold cursor-pointer"
                 style="font-size:1.5rem; text-decoration:none; letter-spacing:0.01em;">
                Contactar
              </a>
            </div>

            <!-- Stats rápidas -->
            <div class="flex flex-wrap gap-8 pt-4">
              <div>
                <div class="font-display font-black gradient-text" style="font-size:3.2rem; line-height:1;">+12</div>
                <div class="font-sans" style="font-size:1.3rem; color:rgba(255,255,255,0.50); margin-top:2px;">Años de Exp.</div>
              </div>
              <div style="width:1px; background:rgba(255,255,255,0.10);"></div>
              <div>
                <div class="font-display font-black gradient-text-alt" style="font-size:3.2rem; line-height:1;">{{ state.projects().length }}+</div>
                <div class="font-sans" style="font-size:1.3rem; color:rgba(255,255,255,0.50); margin-top:2px;">Proyectos</div>
              </div>
              <div style="width:1px; background:rgba(255,255,255,0.10);"></div>
              <div>
                <div class="font-display font-black" style="font-size:3.2rem; line-height:1; color:#a855f7;">6+</div>
                <div class="font-sans" style="font-size:1.3rem; color:rgba(255,255,255,0.50); margin-top:2px;">Tecnologías</div>
              </div>
            </div>
          </div>

          <!-- Right Column: Foto con Frame -->
          <div class="md:col-span-5 flex items-center justify-center">
            <div class="relative animate-float" style="width:100%; max-width:360px;">
              <!-- Glow detrás de la imagen -->
              <div style="position:absolute; inset:-20px; background:linear-gradient(135deg, rgba(255,0,128,0.25), rgba(255,107,0,0.20)); border-radius:32px; filter:blur(30px); z-index:0;"></div>

              <!-- Frame de la imagen -->
              <div style="position:relative; z-index:1; border-radius:24px; overflow:hidden; border:2px solid rgba(255,0,128,0.30); box-shadow:0 20px 60px rgba(0,0,0,0.50);">
                <div style="position:absolute; inset:0; background:linear-gradient(to top, rgba(18,7,31,0.60) 0%, transparent 50%); z-index:2;"></div>
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC2MsdOWnhlMAUG67S0duv1AUHd5olpoxS8PcfzYUFDd6Ab6JLSZkg4nTb8PQqVSTcQFvLGhpRjoTqSLO9ehiWhVexX9TCP3eMrY33Y4Rdgsk2036D-IJFtXcNahZQcYCYD3ocdgL2Ivb08wgzHJcDQwXAB4y16ZZX8eOuoXyL53Ol1men7HOXlgTo6_bSGLu0tvCD3uBbDL5Dl0L_5MWYpE9J8wPclxygV9PRajhC0bnP4C66pFz9gM7I43c6hELXwIUkoWTqlDjXe"
                  alt="Gonzalo Ponce"
                  style="width:100%; aspect-ratio:3/4; object-fit:cover; display:block;"
                  referrerpolicy="no-referrer"
                />
              </div>

              <!-- Corner accent badge -->
              <div style="position:absolute; bottom:20px; right:-16px; z-index:3; background:rgba(18,7,31,0.90); border:1px solid rgba(255,0,128,0.40); backdrop-filter:blur(10px); padding:10px 16px; border-radius:12px;">
                <div class="font-mono" style="font-size:1.1rem; color:#ff0080; font-weight:600;">Full-Stack</div>
                <div class="font-sans" style="font-size:1.2rem; color:#fff; font-weight:700;">Senior Dev</div>
              </div>
            </div>
          </div>

        </div>
      </section>

      <!-- ===================================================
           SECCIÓN 01 — SOBRE MÍ
      =================================================== -->
      <section style="border-top:1px solid rgba(255,255,255,0.07); padding:80px 0;">
        <div class="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          <div class="md:col-span-4">
            <div class="flex items-center gap-3 mb-4">
              <span class="section-num">01.</span>
              <h3 class="font-display font-bold" style="font-size:2.6rem; color:#fff;">Sobre Mí</h3>
            </div>
          </div>
          <div class="md:col-span-8 space-y-5">
            <p class="font-sans" style="font-size:1.7rem; line-height:1.70; color:rgba(255,255,255,0.65);">
              Soy un Ingeniero de Software apasionado por crear experiencias digitales escalables y precisas. Con un enfoque meticuloso en la arquitectura y el rendimiento, transformo ideas complejas en soluciones web robustas y elegantes.
            </p>
            <p class="font-sans" style="font-size:1.7rem; line-height:1.70; color:rgba(255,255,255,0.65);">
              Mi objetivo es siempre alcanzar la excelencia técnica, manteniendo un código limpio y mantenible, mientras entrego valor real a los usuarios a través de interfaces intuitivas y eficientes.
            </p>
          </div>
        </div>
      </section>

      <!-- ===================================================
           SECCIÓN 02 — EXPERIENCIA
      =================================================== -->
      <section style="border-top:1px solid rgba(255,255,255,0.07); padding:80px 0;">
        <div class="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          <div class="md:col-span-4">
            <div class="flex items-center gap-3 mb-4">
              <span class="section-num">02.</span>
              <h3 class="font-display font-bold" style="font-size:2.6rem; color:#fff;">Experiencia</h3>
            </div>
          </div>
          <div class="md:col-span-8 space-y-5">
            <p class="font-sans" style="font-size:1.7rem; line-height:1.70; color:rgba(255,255,255,0.65);">
              Con más de 12 años de experiencia profesional como Desarrollador Web, he liderado y contribuido en el diseño, desarrollo y despliegue de múltiples aplicaciones de misión crítica. Mi trayectoria abarca desde el desarrollo frontend de alto rendimiento hasta la arquitectura de sistemas complejos.
            </p>
            <p class="font-sans" style="font-size:1.7rem; line-height:1.70; color:rgba(255,255,255,0.65);">
              A lo largo de mi carrera, he trabajado en diversos sectores, adaptándome a nuevas tecnologías y metodologías ágiles. He sido responsable de optimizar flujos de trabajo, integrar soluciones impulsadas por IA y desarrollar plataformas de tokenización y contratos inteligentes.
            </p>
          </div>
        </div>
      </section>

      <!-- ===================================================
           SECCIÓN 03 — HABILIDADES PREVIEW
      =================================================== -->
      <section style="border-top:1px solid rgba(255,255,255,0.07); padding:80px 0;">
        <div class="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
          <div class="md:col-span-4 space-y-4">
            <div class="flex items-center gap-3 mb-4">
              <span class="section-num">03.</span>
              <h3 class="font-display font-bold" style="font-size:2.6rem; color:#fff;">Habilidades</h3>
            </div>
            <p class="font-sans" style="font-size:1.55rem; line-height:1.65; color:rgba(255,255,255,0.55);">
              Un repertorio de herramientas y tecnologías optimizado para velocidad, mantenibilidad y escalabilidad.
            </p>
            <a routerLink="/habilidades"
               class="inline-flex items-center gap-2 font-mono font-semibold"
               style="font-size:1.3rem; color:#ff0080; text-decoration:none; text-transform:uppercase; letter-spacing:0.07em; margin-top:8px;">
              Ver detalle técnico
              <span class="material-symbols-outlined" style="font-size:16px;">arrow_forward</span>
            </a>
          </div>
          <div class="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <!-- Card Lenguajes -->
            <div class="card-dark p-6 rounded-2xl space-y-3">
              <div style="width:44px; height:44px; background:rgba(255,0,128,0.12); border:1px solid rgba(255,0,128,0.25); border-radius:12px; display:flex; align-items:center; justify-content:center;">
                <span class="material-symbols-outlined" style="color:#ff0080; font-size:22px;">code</span>
              </div>
              <h4 class="font-display font-bold" style="font-size:1.8rem; color:#fff;">Lenguajes</h4>
              <p class="font-mono" style="font-size:1.2rem; color:rgba(255,255,255,0.50); line-height:1.6;">JavaScript · TypeScript · Python · C++ · Solidity · Shell</p>
            </div>
            <!-- Card Frameworks -->
            <div class="card-dark p-6 rounded-2xl space-y-3">
              <div style="width:44px; height:44px; background:rgba(255,107,0,0.12); border:1px solid rgba(255,107,0,0.25); border-radius:12px; display:flex; align-items:center; justify-content:center;">
                <span class="material-symbols-outlined" style="color:#ff6b00; font-size:22px;">integration_instructions</span>
              </div>
              <h4 class="font-display font-bold" style="font-size:1.8rem; color:#fff;">Frameworks</h4>
              <p class="font-mono" style="font-size:1.2rem; color:rgba(255,255,255,0.50); line-height:1.6;">React · Angular · Vue.js · Node.js · FastAPI</p>
            </div>
          </div>
        </div>
      </section>

      <!-- ===================================================
           SECCIÓN 04 — PROYECTOS RECIENTES
      =================================================== -->
      <section style="border-top:1px solid rgba(255,255,255,0.07); padding:80px 0;">
        <div class="max-w-6xl mx-auto px-6 space-y-10">
          <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <div class="flex items-center gap-3 mb-3">
                <span class="section-num">04.</span>
                <h3 class="font-display font-bold" style="font-size:2.6rem; color:#fff;">Proyectos Recientes</h3>
              </div>
              <p class="font-sans" style="font-size:1.55rem; color:rgba(255,255,255,0.50);">
                Últimos lanzamientos en software opensource y soluciones empresariales.
              </p>
            </div>
            <a routerLink="/proyectos"
               class="inline-flex items-center gap-2 font-mono font-semibold"
               style="font-size:1.3rem; color:#ff0080; text-decoration:none; text-transform:uppercase; letter-spacing:0.07em; white-space:nowrap;">
              Ver todos ({{ state.projects().length }})
              <span class="material-symbols-outlined" style="font-size:16px;">arrow_forward</span>
            </a>
          </div>

          <!-- Grid de proyectos -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            @for (project of state.projects().slice(0, 3); track project.id) {
              <article class="card-dark p-6 rounded-2xl flex flex-col justify-between" style="min-height:220px;">
                <div class="space-y-4">
                  <!-- Ícono -->
                  <div style="width:46px; height:46px; background:rgba(255,0,128,0.10); border:1px solid rgba(255,0,128,0.22); border-radius:12px; display:flex; align-items:center; justify-content:center;">
                    <span class="material-symbols-outlined" style="color:#ff0080; font-size:22px;">{{ project.iconName }}</span>
                  </div>
                  <h4 class="font-display font-bold" style="font-size:1.9rem; color:#fff; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">{{ project.title }}</h4>
                  <p class="font-sans" style="font-size:1.4rem; line-height:1.6; color:rgba(255,255,255,0.55); display:-webkit-box; -webkit-line-clamp:3; -webkit-box-orient:vertical; overflow:hidden;">{{ project.description }}</p>
                </div>
                <!-- Tech chips -->
                <div class="flex flex-wrap gap-1.5 pt-5">
                  @for (tech of project.techs.slice(0, 3); track tech) {
                    <span style="background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.10); color:rgba(255,255,255,0.60); font-family:'JetBrains Mono',monospace; font-size:1.1rem; padding:3px 10px; border-radius:6px;">{{ tech }}</span>
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
