import {ChangeDetectionStrategy, Component, inject, signal, OnInit} from '@angular/core';
import {Router, RouterOutlet, RouterLink, RouterLinkActive, NavigationEnd} from '@angular/router';
import {filter} from 'rxjs/operators';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="min-h-screen flex flex-col bg-background text-on-surface">
      <!-- Global Top Landing Navbar (Hidden on /admin page) -->
      @if (showLandingHeader()) {
        <nav class="bg-surface-container-low/65 backdrop-blur-md sticky top-0 z-40 border-b border-outline-variant/40 transition-all">
          <div class="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
            <!-- Brand Logo -->
            <a routerLink="/" class="flex items-center gap-2 group">
              <span class="font-display text-lg font-extrabold tracking-tight text-on-surface group-hover:text-primary transition-colors flex items-center gap-1.5">
                <span class="material-symbols-outlined text-primary text-xl">terminal</span>
                <span>Gonzalo Ponce</span>
              </span>
            </a>

            <!-- Navigation Links -->
            <ul class="hidden md:flex items-center gap-8">
              <li>
                <a 
                  routerLink="/" 
                  [routerLinkActiveOptions]="{exact: true}"
                  routerLinkActive="text-primary font-semibold"
                  class="font-mono text-xs uppercase text-on-surface-variant hover:text-primary transition-all tracking-wider"
                >
                  Inicio
                </a>
              </li>
              <li>
                <a 
                  routerLink="/habilidades" 
                  routerLinkActive="text-primary font-semibold"
                  class="font-mono text-xs uppercase text-on-surface-variant hover:text-primary transition-all tracking-wider"
                >
                  Habilidades
                </a>
              </li>
              <li>
                <a 
                  routerLink="/proyectos" 
                  routerLinkActive="text-primary font-semibold"
                  class="font-mono text-xs uppercase text-on-surface-variant hover:text-primary transition-all tracking-wider"
                >
                  Proyectos
                </a>
              </li>
              <li>
                <a 
                  routerLink="/contacto" 
                  routerLinkActive="text-primary font-semibold"
                  class="font-mono text-xs uppercase text-on-surface-variant hover:text-primary transition-all tracking-wider"
                >
                  Contacto
                </a>
              </li>
            </ul>

            <!-- Actions and Admin Trigger -->
            <div class="flex items-center gap-3">
              <!-- Download resume simulation -->
              <button 
                (click)="downloadCV()"
                class="hidden sm:inline-flex items-center gap-1.5 border border-outline hover:bg-surface-container hover:text-primary text-on-surface font-mono text-xs font-semibold px-4 py-2 rounded transition-all active:scale-95 cursor-pointer"
              >
                <span class="material-symbols-outlined text-sm">download</span>
                <span>Descargar CV</span>
              </button>

              <!-- Link to Admin portal lock -->
              <a 
                routerLink="/admin" 
                routerLinkActive="bg-primary/20 text-primary border-primary/40"
                class="border border-outline-variant/60 hover:bg-surface-variant/40 text-on-surface-variant hover:text-primary p-2 rounded transition-all flex items-center justify-center cursor-pointer"
                title="Panel de Administración"
              >
                <span class="material-symbols-outlined text-base">lock</span>
              </a>
            </div>
          </div>
        </nav>
      }

      <!-- Main Central Routing Canvas -->
      <main class="flex-grow">
        <router-outlet />
      </main>

      <!-- Global Website Footer (Hidden on /admin page) -->
      @if (showLandingHeader()) {
        <footer class="bg-surface-container-low border-t border-outline-variant/40 py-10 mt-auto">
          <div class="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
            <div class="text-center md:text-left space-y-1">
              <p class="font-mono text-xs text-on-surface-variant">
                &copy; {{ currentYear }} Gonzalo Ponce. Todos los derechos reservados.
              </p>
              <p class="font-sans text-[1.10rem] text-on-surface-variant/70">
                Construido con Angular 21, TypeScript y Tailwind CSS en Cloud Environment.
              </p>
            </div>
            
            <div class="flex items-center gap-6 font-mono text-xs">
              <a routerLink="/admin" class="text-on-surface-variant hover:text-primary flex items-center gap-1.5 transition-colors">
                <span class="material-symbols-outlined text-sm">admin_panel_settings</span>
                <span>Consola Maestro</span>
              </a>
            </div>
          </div>
        </footer>
      }

      <!-- Global App Notification Toasts -->
      @if (globalToast()) {
        <div class="fixed bottom-8 left-8 bg-surface-container border border-outline-variant px-5 py-3 rounded-xl flex items-center gap-3 z-50 animate-fade-in shadow-2xl">
          <span class="material-symbols-outlined text-secondary">check_circle</span>
          <span class="font-sans text-sm text-on-surface font-medium">{{ globalToast() }}</span>
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
export class App implements OnInit {
  private router = inject(Router);

  showLandingHeader = signal<boolean>(true);
  globalToast = signal<string>('');
  currentYear = new Date().getFullYear();

  ngOnInit() {
    // Initial active route path hook to hide navigation bars on /admin
    this.updateNavbarVisibility(this.router.url);

    // Watch router events to detect path transitions
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.updateNavbarVisibility(event.urlAfterRedirects || event.url);
    });
  }

  private updateNavbarVisibility(url: string) {
    const isEditingMode = url.includes('/admin');
    this.showLandingHeader.set(!isEditingMode);
  }

  downloadCV() {
    this.globalToast.set('Curriculum Vitae descargado en formato PDF.');
    setTimeout(() => {
      this.globalToast.set('');
    }, 4000);
  }
}
