import {ChangeDetectionStrategy, Component, inject, signal, computed} from '@angular/core';
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import {PortfolioState, Project} from '../../services/portfolio-state';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule],
  selector: 'app-admin',
  template: `
    <div class="animate-fade-in min-h-screen bg-background">
      @if (!state.adminMode()) {
        <!-- Secure Developer Access Pin Lock Screen -->
        <div class="min-h-screen w-full bg-background flex items-center justify-center p-6">
          <div class="bg-surface-container border border-outline-variant max-w-sm w-full rounded-2xl overflow-hidden shadow-2xl p-8 space-y-6 relative flex flex-col justify-between">
            <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary"></div>
            
            <div class="text-center space-y-2">
              <div class="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mx-auto border border-primary/20">
                <span class="material-symbols-outlined text-2xl">admin_panel_settings</span>
              </div>
              <h1 class="font-display text-xl font-extrabold text-on-surface">Acceso Programador</h1>
              <p class="font-sans text-xs text-on-surface-variant max-w-[28ch] mx-auto">
                Ingrese el código de acceso maestro para gestionar el portafolio en caliente.
              </p>
            </div>

            <form [formGroup]="loginForm" (ngSubmit)="onLoginSubmit()" class="space-y-4">
              <div class="flex flex-col gap-1.5">
                <span class="block font-mono text-xs text-on-surface-variant uppercase tracking-wider">Código de Seguridad</span>
                <input 
                  type="password" 
                  formControlName="pin"
                  placeholder="Introduzca la clave..." 
                  class="bg-background border border-outline-variant text-[1.4rem] text-center tracking-widest text-on-surface font-mono rounded px-4 py-3 focus:border-primary outline-none"
                />
                @if (loginError()) {
                  <span class="text-error text-center text-xs font-sans mt-1 block font-semibold">Código incorrecto. Intente con 'admin123'</span>
                }
              </div>

              <button 
                type="submit"
                class="w-full bg-primary text-background font-mono text-xs font-bold py-3.5 rounded hover:brightness-110 active:scale-95 transition-all uppercase cursor-pointer"
              >
                Iniciar Sesión &rarr;
              </button>
            </form>
          </div>
        </div>
      } @else {
        <!-- Authenticated Admin View -->
        <div class="min-h-screen flex text-on-surface">
          <!-- Admin Workspace Sidebar -->
          <aside class="w-64 bg-surface-container border-r border-outline-variant/60 flex flex-col p-6 space-y-6 shrink-0">
            <div>
              <h2 class="font-display text-xl font-extrabold text-primary tracking-wide">Panel Admin</h2>
              <p class="font-mono text-[1rem] text-on-surface-variant uppercase tracking-wider mt-1">Ingeniería de Software</p>
            </div>

            <!-- Sidebar Navigation menu buttons -->
            <nav class="flex-grow flex flex-col space-y-1 justify-between">
              <ul class="space-y-1">
                <li>
                  <button 
                    (click)="activeTab.set('dashboard')"
                    [class]="activeTab() === 'dashboard' 
                      ? 'w-full flex items-center gap-3 px-4 py-2.5 bg-primary-container text-on-primary-container font-medium text-sm rounded transition-all cursor-pointer'
                      : 'w-full flex items-center gap-3 px-4 py-2.5 text-on-surface-variant hover:bg-surface-variant/40 hover:text-on-surface font-medium text-sm rounded transition-all cursor-pointer'"
                  >
                    <span class="material-symbols-outlined text-base">dashboard</span>
                    <span>Dashboard</span>
                  </button>
                </li>
                <li>
                  <button 
                    (click)="activeTab.set('proyectos')"
                    [class]="activeTab() === 'proyectos' 
                      ? 'w-full flex items-center gap-3 px-4 py-2.5 bg-primary-container text-on-primary-container font-medium text-sm rounded transition-all cursor-pointer'
                      : 'w-full flex items-center gap-3 px-4 py-2.5 text-on-surface-variant hover:bg-surface-variant/40 hover:text-on-surface font-medium text-sm rounded transition-all cursor-pointer'"
                  >
                    <span class="material-symbols-outlined text-base">inventory_2</span>
                    <span>Gestionar Proyectos</span>
                  </button>
                </li>
                <li>
                  <button 
                    (click)="activeTab.set('mensajes')"
                    [class]="activeTab() === 'mensajes' 
                      ? 'w-full flex items-center gap-3 px-4 py-2.5 bg-primary-container text-on-primary-container font-medium text-sm rounded transition-all cursor-pointer'
                      : 'w-full flex items-center gap-3 px-4 py-2.5 text-on-surface-variant hover:bg-surface-variant/40 hover:text-on-surface font-medium text-sm rounded transition-all cursor-pointer'"
                  >
                    <span class="material-symbols-outlined text-base">mail</span>
                    <span>Mensajes</span>
                    @if (state.messages().length > 0) {
                      <span class="ml-auto bg-primary text-background font-mono text-[1rem] h-5 w-5 flex items-center justify-center rounded-full font-bold">
                        {{ state.messages().length }}
                      </span>
                    }
                  </button>
                </li>
                <li>
                  <button 
                    (click)="activeTab.set('configuracion')"
                    [class]="activeTab() === 'configuracion' 
                      ? 'w-full flex items-center gap-3 px-4 py-2.5 bg-primary-container text-on-primary-container font-medium text-sm rounded transition-all cursor-pointer'
                      : 'w-full flex items-center gap-3 px-4 py-2.5 text-on-surface-variant hover:bg-surface-variant/40 hover:text-on-surface font-medium text-sm rounded transition-all cursor-pointer'"
                  >
                    <span class="material-symbols-outlined text-base">settings</span>
                    <span>Configuración</span>
                  </button>
                </li>
              </ul>

              <div class="border-t border-outline-variant/50 pt-4 mt-auto">
                <div class="flex items-center gap-3 px-2 py-2 mb-4">
                  <div class="w-10 h-10 rounded-full border border-primary/20 overflow-hidden shrink-0">
                    <img 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuC2MsdOWnhlMAUG67S0duv1AUHd5olpoxS8PcfzYUFDd6Ab6JLSZkg4nTb8PQqVSTcQFvLGhpRjoTqSLO9ehiWhVexX9TCP3eMrY33Y4Rdgsk2036D-IJFtXcNahZQcYCYD3ocdgL2Ivb08wgzHJcDQwXAB4y16ZZX8eOuoXyL53Ol1men7HOXlgTo6_bSGLu0tvCD3uBbDL5Dl0L_5MWYpE9J8wPclxygV9PRajhC0bnP4C66pFz9gM7I43c6hELXwIUkoWTqlDjXe" 
                      alt="Gonzalo Ponce" 
                      referrerpolicy="no-referrer"
                      class="w-full h-full object-cover grayscale"
                    />
                  </div>
                  <div class="truncate">
                    <div class="font-sans text-xs font-bold text-on-surface truncate">Gonzalo Ponce</div>
                    <div class="font-mono text-[0.85rem] text-on-surface-variant truncate">Master Admin</div>
                  </div>
                </div>
                
                <button 
                  (click)="onLogout()"
                  class="w-full flex items-center gap-3 px-4 py-2.5 text-error hover:bg-error/10 hover:text-error font-medium text-sm rounded transition-all cursor-pointer"
                >
                  <span class="material-symbols-outlined text-base">logout</span>
                  <span>Cerrar Sesión</span>
                </button>
              </div>
            </nav>
          </aside>

          <!-- Main Panel Workspace -->
          <main class="flex-grow p-8 overflow-y-auto space-y-8 bg-background">
            
            <!-- Toast Notification Panel -->
            @if (toastMsg()) {
              <div class="fixed top-24 right-8 bg-surface-container border border-outline-variant px-5 py-3 rounded-xl flex items-center gap-3 z-50 animate-fade-in shadow-2xl">
                <span class="material-symbols-outlined text-secondary">check_circle</span>
                <span class="font-sans text-sm text-on-surface font-medium">{{ toastMsg() }}</span>
              </div>
            }

            <!-- TAB: Dashboard Summary -->
            @if (activeTab() === 'dashboard') {
              <div class="space-y-6">
                <header>
                  <h2 class="font-display text-3xl font-extrabold tracking-tight">Estadísticas del Portafolio</h2>
                  <p class="font-sans text-sm text-on-surface-variant">Resumen de almacenamiento, interacciones y métricas en vivo.</p>
                </header>

                <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div class="p-6 bg-surface-container border border-outline-variant/60 rounded-xl space-y-2 animate-fade-in">
                    <div class="flex justify-between items-center text-primary">
                      <span class="material-symbols-outlined text-3xl">inventory_2</span>
                      <span class="font-mono text-[1rem]">Durable</span>
                    </div>
                    <div class="font-display text-4xl font-extrabold">{{ state.projects().length }}</div>
                    <div class="font-sans text-xs text-on-surface-variant">Proyectos Registrados</div>
                  </div>

                  <div class="p-6 bg-surface-container border border-outline-variant/60 rounded-xl space-y-2 animate-fade-in">
                    <div class="flex justify-between items-center text-secondary">
                      <span class="material-symbols-outlined text-3xl">mail</span>
                      <span class="font-mono text-[1rem]">Inbox</span>
                    </div>
                    <div class="font-display text-4xl font-extrabold">{{ state.messages().length }}</div>
                    <div class="font-sans text-xs text-on-surface-variant">Mensajes Recibidos</div>
                  </div>

                  <div class="p-6 bg-surface-container border border-outline-variant/60 rounded-xl space-y-2 animate-fade-in">
                    <div class="flex justify-between items-center text-tertiary">
                      <span class="material-symbols-outlined text-3xl">health_and_safety</span>
                      <span class="font-mono text-[1rem]">OK</span>
                    </div>
                    <div class="font-display text-4xl font-extrabold">100%</div>
                    <div class="font-sans text-xs text-on-surface-variant">Disponibilidad Remota</div>
                  </div>
                </div>

                <!-- Developer Terminal Log -->
                <div class="bg-surface-container-low border border-outline-variant/60 rounded-xl p-6 font-mono text-xs space-y-2 text-on-surface-variant leading-relaxed">
                  <div class="text-primary font-bold"># system-diagnostics --status</div>
                  <div>[OK] Gonzalo Ponce Local Database initialized. Memory state synchronized with localStorage.</div>
                  <div>[OK] Reactive signals tracking active state edits.</div>
                  <div>[LIVE] Portafolio frontend running behind nginx reverse proxy in server container.</div>
                  <div>[INFO] Conexión de seguridad activa. Origen verificado en el sandbox de AI Studio.</div>
                </div>
              </div>
            }

            <!-- TAB: Gestionar Proyectos -->
            @if (activeTab() === 'proyectos') {
              <div class="space-y-6">
                <header class="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h2 class="font-display text-3xl font-extrabold tracking-tight">Gestionar Proyectos</h2>
                    <p class="font-sans text-sm text-on-surface-variant">Administra el portafolio y visualiza los cambios en tiempo real.</p>
                  </div>
                  <button (click)="openCreateForm()" class="bg-primary text-background font-mono text-xs font-semibold px-4 py-2.5 rounded flex items-center gap-1.5 hover:brightness-110 active:scale-95 transition-all uppercase cursor-pointer">
                    <span class="material-symbols-outlined text-base">add</span>
                    Nuevo Proyecto
                  </button>
                </header>

                <div class="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
                  <!-- Projects Table Column -->
                  <div class="xl:col-span-2 space-y-4">
                    <!-- Toolbar search -->
                    <div class="bg-surface-container border border-outline-variant/40 p-4 rounded-xl flex gap-4 items-center">
                      <div class="relative flex-1">
                        <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-base">search</span>
                        <input 
                          type="text" 
                          placeholder="Buscar proyectos en la tabla..." 
                          (input)="onSearch($event)"
                          class="w-full bg-background border border-outline-variant text-on-surface font-sans text-xs rounded px-4 py-2.5 pl-10 focus:border-primary outline-none transition-all"
                        />
                      </div>
                    </div>

                    <!-- Projects Collection list -->
                    <div class="bg-surface-container border border-outline-variant/50 rounded-xl overflow-hidden shadow-sm">
                      <div class="overflow-x-auto">
                        <table class="w-full text-left font-sans text-xs border-collapse">
                          <thead>
                            <tr class="bg-surface-container-high/40 border-b border-outline-variant/60">
                              <th class="font-mono text-xs text-on-surface-variant uppercase tracking-wider p-4">Proyecto</th>
                              <th class="font-mono text-xs text-on-surface-variant uppercase tracking-wider p-4">Estado</th>
                              <th class="font-mono text-xs text-on-surface-variant uppercase tracking-wider p-4">Tecnologías</th>
                              <th class="font-mono text-xs text-on-surface-variant uppercase tracking-wider p-4 text-right">Acciones</th>
                            </tr>
                          </thead>
                          <tbody class="divide-y divide-outline-variant/40">
                            @for (p of filteredProjects(); track p.id) {
                              <tr class="hover:bg-surface-variant/20 transition-colors group">
                                <td class="p-4">
                                  <div class="flex items-center gap-3">
                                    <div class="w-10 h-10 rounded bg-surface-container-highest border border-outline-variant/40 flex items-center justify-center text-primary flex-shrink-0">
                                      <span class="material-symbols-outlined text-lg">{{ p.iconName }}</span>
                                    </div>
                                    <div class="truncate">
                                      <div class="font-bold text-on-surface truncate">{{ p.title }}</div>
                                      <div class="text-[1.1rem] text-on-surface-variant truncate">ID: {{ p.id }} • Activo</div>
                                    </div>
                                  </div>
                                </td>
                                <td class="p-4">
                                  <span class="inline-flex items-center gap-1 bg-secondary-container/10 text-secondary border border-secondary/20 px-2 py-0.5 rounded font-mono text-[1.1rem]">
                                    <span class="w-1.5 h-1.5 rounded-full bg-secondary"></span> Activo
                                  </span>
                                </td>
                                <td class="p-4">
                                  <div class="flex gap-1 flex-wrap max-w-[200px]">
                                    @for (tech of p.techs.slice(0, 3); track tech) {
                                      <span class="bg-surface-variant text-on-surface-variant font-mono text-[1rem] px-1.5 py-0.5 rounded border border-outline-variant/20">{{ tech }}</span>
                                    }
                                  </div>
                                </td>
                                <td class="p-4 text-right">
                                  <div class="flex items-center justify-end gap-2">
                                    <button (click)="openEditForm(p)" class="text-on-surface-variant hover:text-primary transition-colors p-1 flex items-center justify-center" title="Editar">
                                      <span class="material-symbols-outlined text-lg">edit</span>
                                    </button>
                                    <button (click)="deleteSelectedProject(p.id)" class="text-on-surface-variant hover:text-error transition-colors p-1 flex items-center justify-center" title="Eliminar">
                                      <span class="material-symbols-outlined text-lg">delete</span>
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            } @empty {
                              <tr>
                                <td colspan="4" class="text-center p-8 text-on-surface-variant font-sans">
                                  No hay proyectos que coincidan con la búsqueda.
                                </td>
                              </tr>
                            }
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  <!-- Sidebar Form Edit/Create Column -->
                  <div 
                    class="p-6 bg-surface-container border border-outline-variant/60 rounded-xl flex flex-col space-y-4 shadow-md"
                    [class.opacity-55]="!formActive()"
                    [class.pointer-events-none]="!formActive()"
                  >
                    <div class="flex items-center justify-between border-b border-outline-variant/50 pb-3">
                      <h3 class="font-display text-lg font-bold text-on-surface">
                        {{ editMode() === 'Create' ? 'Nuevo Proyecto' : 'Editar Proyecto' }}
                      </h3>
                      @if (formActive()) {
                        <button (click)="cancelForm()" class="text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/60 p-1 rounded-full transition-all cursor-pointer flex items-center justify-center">
                          <span class="material-symbols-outlined text-base">close</span>
                        </button>
                      }
                    </div>

                    <form [formGroup]="projectForm" (ngSubmit)="saveProject()" class="space-y-4">
                      <div class="flex flex-col gap-1.5">
                        <span class="block font-mono text-[1.10rem] uppercase tracking-wider text-on-surface-variant">Título del Proyecto</span>
                        <input 
                          type="text" 
                          formControlName="title"
                          placeholder="Ej. Sistema de Autenticación" 
                          class="bg-background border border-outline-variant text-on-surface font-sans text-xs rounded px-3 py-22 focus:border-primary outline-none"
                        />
                      </div>

                      <div class="flex flex-col gap-1.5">
                        <span class="block font-mono text-[1.10rem] uppercase tracking-wider text-on-surface-variant">Resumen Corto</span>
                        <input 
                          type="text" 
                          formControlName="description"
                          placeholder="Breve resumen de una línea..." 
                          class="bg-background border border-outline-variant text-on-surface font-sans text-xs rounded px-3 py-20 focus:border-primary outline-none"
                        />
                      </div>

                      <div class="flex flex-col gap-1.5">
                        <span class="block font-mono text-[1.10rem] uppercase tracking-wider text-on-surface-variant">Descripción Detallada</span>
                        <textarea 
                          formControlName="detail"
                          placeholder="Resumen técnico extendido, objetivos, resultados..." 
                          rows="3"
                          class="bg-background border border-outline-variant text-on-surface font-sans text-xs rounded px-3 py-20 focus:border-primary outline-none resize-none"
                        ></textarea>
                      </div>

                      <div class="flex flex-col gap-1.5">
                        <span class="block font-mono text-[1.10rem] uppercase tracking-wider text-on-surface-variant">Tecnologías (Separadas por comas)</span>
                        <input 
                          type="text" 
                          formControlName="techs"
                          placeholder="React, Node.js, Supabase" 
                          class="bg-background border border-outline-variant text-on-surface font-sans text-xs rounded px-3 py-20 focus:border-primary outline-none"
                        />
                      </div>

                      <div class="flex flex-col gap-1.5">
                        <span class="block font-mono text-[1.10rem] uppercase tracking-wider text-on-surface-variant">Enlace GitHub</span>
                        <input 
                          type="text" 
                          formControlName="githubUrl"
                          placeholder="https://github.com/Go..." 
                          class="bg-background border border-outline-variant text-on-surface font-sans text-xs rounded px-3 py-20 focus:border-primary outline-none"
                        />
                      </div>

                      <div class="flex flex-col gap-1.5">
                        <span class="block font-mono text-[1.10rem] uppercase tracking-wider text-on-surface-variant">Ícono de Material Symbols</span>
                        <input 
                          type="text" 
                          formControlName="iconName"
                          placeholder="partly_cloudy_day, token, bar_code..." 
                          class="bg-background border border-outline-variant text-on-surface font-sans text-xs rounded px-3 py-20 focus:border-primary outline-none"
                        />
                      </div>

                      <div class="flex flex-col gap-1.5">
                        <span class="block font-mono text-[1.10rem] uppercase tracking-wider text-on-surface-variant">URL de la Imagen</span>
                        <input 
                          type="text" 
                          formControlName="imageUrl"
                          placeholder="https://images.unsplash..." 
                          class="bg-background border border-outline-variant text-on-surface font-sans text-xs rounded px-3 py-20 focus:border-primary outline-none"
                        />
                      </div>

                      <div class="pt-4 flex gap-3 border-t border-outline-variant/40 mt-4">
                        <button 
                          type="submit"
                          [disabled]="projectForm.invalid"
                          class="bg-primary text-background font-mono text-xs font-semibold px-4 py-2 rounded flex-1 justify-center transition-all disabled:opacity-50 hover:brightness-110 uppercase cursor-pointer"
                        >
                          Guardar Proyecto
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            }

            <!-- TAB: Mensajes Recibidos de Contacto -->
            @if (activeTab() === 'mensajes') {
              <div class="space-y-6">
                <header>
                  <h2 class="font-display text-3xl font-extrabold tracking-tight">Bandeja de Entrada</h2>
                  <p class="font-sans text-sm text-on-surface-variant">Gestiona y responde a los mensajes capturados en el formulario de contacto.</p>
                </header>

                <div class="space-y-4">
                  @for (msg of state.messages(); track msg.id) {
                    <div class="bg-surface-container border border-outline-variant/60 p-6 rounded-xl space-y-4 flex flex-col justify-between hover:border-primary transition-all duration-300">
                      <div class="flex justify-between items-start gap-4">
                        <div class="space-y-1">
                          <div class="font-sans font-bold text-base text-on-surface">{{ msg.subject }}</div>
                          <div class="font-mono text-xs text-primary flex flex-wrap gap-x-3 gap-y-1">
                            <span>De: {{ msg.name }} ({{ msg.email }})</span>
                            <span class="text-on-surface-variant">Recibido: {{ msg.createdAt }}</span>
                          </div>
                        </div>
                        
                        <button (click)="deleteContactMessage(msg.id)" class="text-on-surface-variant hover:text-error transition-colors p-1 flex items-center justify-center" title="Eliminar mensaje">
                          <span class="material-symbols-outlined text-lg">delete</span>
                        </button>
                      </div>

                      <p class="font-sans text-sm text-on-surface-variant leading-relaxed bg-background/50 p-4 border border-outline-variant/30 rounded">
                        {{ msg.message }}
                      </p>
                    </div>
                  } @empty {
                    <div class="text-center py-24 bg-surface-container-low rounded-xl border border-dashed border-outline-variant/60">
                      <span class="material-symbols-outlined text-4xl text-outline mb-2">mail</span>
                      <p class="text-on-surface-variant font-medium text-base">La bandeja de entrada está vacía.</p>
                      <p class="text-xs text-on-surface-variant mt-1.5 max-w-sm mx-auto">Vaya a la página de Contacto para emitir mensajes ficticios y visualizarlos inmediatamente aquí.</p>
                    </div>
                  }
                </div>
              </div>
            }

            <!-- TAB: Professional Configuration -->
            @if (activeTab() === 'configuracion') {
              <div class="space-y-6">
                <header>
                  <h2 class="font-display text-3xl font-extrabold tracking-tight">Configuración del Portafolio</h2>
                  <p class="font-sans text-sm text-on-surface-variant">Configure los datos de su cuenta profesional y el estado de disponibilidad remota.</p>
                </header>

                <div class="bg-surface-container border border-outline-variant/60 p-6 rounded-xl max-w-2xl space-y-6">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="flex flex-col gap-1.5">
                      <span class="block font-mono text-[1.10rem] uppercase tracking-wider text-on-surface-variant">Nombre Profesional</span>
                      <input type="text" value="Gonzalo Ponce" disabled class="bg-background border border-outline-variant/70 text-on-surface font-sans text-xs rounded px-4 py-2 focus:border-primary outline-none" />
                    </div>
                    <div class="flex flex-col gap-1.5">
                      <span class="block font-mono text-[1.10rem] uppercase tracking-wider text-on-surface-variant">Email de Contacto</span>
                      <input type="email" value="hello@gonzaloponce.dev" disabled class="bg-background border border-outline-variant/70 text-on-surface font-sans text-xs rounded px-4 py-2 focus:border-primary outline-none" />
                    </div>
                  </div>

                  <div class="flex flex-col gap-1.5">
                    <span class="block font-mono text-[1.10rem] uppercase tracking-wider text-on-surface-variant">Ubicación Profesional</span>
                    <input type="text" value="Montevideo, Uruguay" disabled class="bg-background border border-outline-variant/70 text-on-surface font-sans text-xs rounded px-4 py-2 focus:border-primary outline-none" />
                  </div>

                  <div class="p-4 bg-background border border-outline-variant/40 rounded flex items-center justify-between">
                    <div>
                      <div class="font-sans font-bold text-sm">Disponibilidad para Proyectos Activos</div>
                      <div class="text-xs text-on-surface-variant">Se muestra la etiqueta "Remoto Disponible" en la página de contacto.</div>
                    </div>
                    <span class="inline-flex items-center gap-1 bg-secondary-container/20 text-secondary border border-secondary/40 px-3 py-1 rounded font-mono text-xs uppercase font-bold">
                      Habilitado
                    </span>
                  </div>

                  <div class="pt-4 flex justify-end">
                    <button (click)="showToast('Configuraciones profesionales guardadas')" class="bg-primary text-background font-mono text-xs font-semibold px-4 py-2 rounded hover:brightness-110 active:scale-95 transition-all">
                      Guardar Configuración
                    </button>
                  </div>
                </div>
              </div>
            }

          </main>
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
export class Admin {
  protected state = inject(PortfolioState);
  private fb = inject(FormBuilder);

  // Secure PIN login states
  loginError = signal<boolean>(false);
  loginForm: FormGroup = this.fb.group({
    pin: ['', Validators.required]
  });

  // States
  activeTab = signal<'dashboard'|'proyectos'|'mensajes'|'configuracion'>('proyectos');
  tableSearch = signal<string>('');
  toastMsg = signal<string>('');
  formActive = signal<boolean>(false);
  editMode = signal<'Create'|'Edit'>('Create');
  selectedProjId = signal<string | null>(null);

  // Project Form
  projectForm: FormGroup = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    detail: ['', Validators.required],
    techs: ['', Validators.required],
    githubUrl: ['https://github.com/GonzaPonce1976/'],
    demoUrl: ['#'],
    imageUrl: [''],
    iconName: ['terminal', Validators.required]
  });

  // Filter project table list rows based on search
  filteredProjects = computed<Project[]>(() => {
    return this.state.projects().filter(p => 
      p.title.toLowerCase().includes(this.tableSearch()) || 
      p.description.toLowerCase().includes(this.tableSearch())
    );
  });

  onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.tableSearch.set(value.trim().toLowerCase());
  }

  onLoginSubmit() {
    if (this.loginForm.invalid) return;
    const pin = this.loginForm.value.pin;
    if (pin === 'admin123') {
      this.state.adminMode.set(true);
      this.loginError.set(false);
      this.loginForm.reset();
      this.showToast('Sesión de administrador iniciada');
    } else {
      this.loginError.set(true);
    }
  }

  // Set up forms
  openCreateForm() {
    this.editMode.set('Create');
    this.selectedProjId.set(null);
    this.projectForm.reset({
      title: '',
      description: '',
      detail: '',
      techs: '',
      githubUrl: 'https://github.com/GonzaPonce1976/',
      demoUrl: '#',
      imageUrl: '',
      iconName: 'terminal'
    });
    this.formActive.set(true);
  }

  openEditForm(project: Project) {
    this.editMode.set('Edit');
    this.selectedProjId.set(project.id);
    this.projectForm.patchValue({
      title: project.title,
      description: project.description,
      detail: project.detail,
      techs: project.techs.join(', '),
      githubUrl: project.githubUrl,
      demoUrl: project.demoUrl,
      imageUrl: project.imageUrl,
      iconName: project.iconName
    });
    this.formActive.set(true);
  }

  cancelForm() {
    this.formActive.set(false);
    this.projectForm.reset();
  }

  // Save changes handler (both creates & updates)
  saveProject() {
    if (this.projectForm.invalid) return;

    const values = this.projectForm.value;
    // Split tech tags input by commas
    const processedTechs = values.techs
      .split(',')
      .map((t: string) => t.trim())
      .filter((t: string) => t.length > 0);

    const dataPayload = {
      title: values.title,
      description: values.description,
      detail: values.detail,
      techs: processedTechs,
      githubUrl: values.githubUrl,
      demoUrl: values.demoUrl,
      imageUrl: values.imageUrl || '',
      iconName: values.iconName
    };

    if (this.editMode() === 'Create') {
      this.state.addProject(dataPayload);
      this.showToast('Proyecto creado exitosamente');
    } else {
      const id = this.selectedProjId();
      if (id) {
        this.state.updateProject(id, dataPayload);
        this.showToast('Proyecto guardado exitosamente');
      }
    }

    this.cancelForm();
  }

  deleteSelectedProject(id: string) {
    if (confirm('¿Estás seguro de que deseas eliminar este proyecto del portafolio?')) {
      this.state.deleteProject(id);
      this.showToast('Proyecto eliminado');
    }
  }

  deleteContactMessage(id: string) {
    this.state.deleteMessage(id);
    this.showToast('Mensaje eliminado');
  }

  // Helpers
  showToast(msg: string) {
    this.toastMsg.set(msg);
    setTimeout(() => {
      this.toastMsg.set('');
    }, 3000);
  }

  onLogout() {
    // Disable admin session state
    this.state.adminMode.set(false);
    this.showToast('Sesión de administrador finalizada');
  }
}
