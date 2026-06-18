import {ChangeDetectionStrategy, Component, inject, signal, OnInit} from '@angular/core';
import {Router, RouterOutlet, RouterLink, RouterLinkActive, NavigationEnd} from '@angular/router';
import {filter} from 'rxjs/operators';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="min-h-screen flex flex-col" style="background:#12071f; color:#fff;">

      <!-- ===== NAVBAR GLOBAL ===== -->
      @if (showLandingHeader()) {
        <nav style="background:rgba(18,7,31,0.80); backdrop-filter:blur(16px); border-bottom:1px solid rgba(255,255,255,0.08);" class="sticky top-0 z-40 transition-all">
          <div class="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

            <!-- Brand Logo -->
            <a routerLink="/" class="flex items-center gap-2.5 group" style="text-decoration:none;">
              <span style="background:linear-gradient(135deg,#ff0080,#ff6b00); border-radius:8px; width:32px; height:32px; display:flex; align-items:center; justify-content:center;">
                <span class="material-symbols-outlined text-white" style="font-size:18px;">terminal</span>
              </span>
              <span class="font-display font-extrabold text-white" style="font-size:1.7rem; letter-spacing:-0.02em;">
                Gonzalo<span style="background:linear-gradient(135deg,#ff0080,#ff6b00); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;"> Ponce</span>
              </span>
            </a>

            <!-- Navigation Links -->
            <ul class="hidden md:flex items-center gap-8" style="list-style:none; margin:0; padding:0;">
              <li>
                <a routerLink="/"
                   [routerLinkActiveOptions]="{exact: true}"
                   routerLinkActive="active"
                   class="nav-link font-sans"
                   style="text-decoration:none; font-size:1.4rem; font-weight:500;">
                  Inicio
                </a>
              </li>
              <li>
                <a routerLink="/habilidades"
                   routerLinkActive="active"
                   class="nav-link font-sans"
                   style="text-decoration:none; font-size:1.4rem; font-weight:500;">
                  Habilidades
                </a>
              </li>
              <li>
                <a routerLink="/proyectos"
                   routerLinkActive="active"
                   class="nav-link font-sans"
                   style="text-decoration:none; font-size:1.4rem; font-weight:500;">
                  Proyectos
                </a>
              </li>
              <li>
                <a routerLink="/contacto"
                   routerLinkActive="active"
                   class="nav-link font-sans"
                   style="text-decoration:none; font-size:1.4rem; font-weight:500;">
                  Contacto
                </a>
              </li>
            </ul>

            <!-- Actions -->
            <div class="flex items-center gap-3">
              <button
                (click)="downloadCV()"
                class="btn-gradient font-display font-bold px-5 py-2 rounded-lg inline-flex items-center gap-2 cursor-pointer"
                style="font-size:1.3rem; border:none; letter-spacing:0.02em;"
              >
                <span class="material-symbols-outlined" style="font-size:17px; position:relative; z-index:1;">download</span>
                <span style="position:relative; z-index:1;">Ver CV</span>
              </button>

              <!-- Admin Lock -->
              <a
                routerLink="/admin"
                routerLinkActive="text-primary border-primary/40"
                style="border:1px solid rgba(255,255,255,0.15); color:rgba(255,255,255,0.55); border-radius:8px; padding:6px; display:flex; align-items:center; justify-content:center; transition:all 0.2s; text-decoration:none;"
                title="Panel de Administración"
              >
                <span class="material-symbols-outlined" style="font-size:18px;">lock</span>
              </a>
            </div>
          </div>
        </nav>
      }

      <!-- Main Routing Canvas -->
      <main class="flex-grow">
        <router-outlet />
      </main>

      <!-- ===== FOOTER GLOBAL ===== -->
      @if (showLandingHeader()) {
        <footer style="background:rgba(10,3,20,0.95); border-top:1px solid rgba(255,255,255,0.07); padding:40px 0;">
          <div class="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
            <div class="text-center md:text-left space-y-1">
              <p class="font-display font-bold" style="font-size:1.5rem; color:#fff;">
                Gonzalo<span style="background:linear-gradient(135deg,#ff0080,#ff6b00); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;"> Ponce</span>
              </p>
              <p class="font-sans" style="font-size:1.25rem; color:rgba(255,255,255,0.40);">
                &copy; {{ currentYear }} · Construido con Angular 21, TypeScript &amp; TailwindCSS
              </p>
            </div>

            <div class="flex items-center gap-5">
              <a routerLink="/admin" style="color:rgba(255,255,255,0.40); font-size:1.2rem; font-family:'Space Grotesk',sans-serif; display:flex; align-items:center; gap:6px; text-decoration:none; transition:color 0.2s;" class="hover:text-white">
                <span class="material-symbols-outlined" style="font-size:16px;">admin_panel_settings</span>
                Consola Maestro
              </a>
            </div>
          </div>
        </footer>
      }

      <!-- Toast Notifications -->
      @if (globalToast()) {
        <div style="position:fixed; bottom:32px; left:32px; background:rgba(30,15,56,0.95); border:1px solid rgba(255,0,128,0.30); box-shadow:0 4px 40px rgba(255,0,128,0.18); padding:14px 20px; border-radius:14px; display:flex; align-items:center; gap:12px; z-index:50;" class="animate-fade-in">
          <span class="material-symbols-outlined" style="color:#ff0080;">check_circle</span>
          <span class="font-sans font-medium" style="font-size:1.4rem; color:#fff;">{{ globalToast() }}</span>
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
    this.updateNavbarVisibility(this.router.url);

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
