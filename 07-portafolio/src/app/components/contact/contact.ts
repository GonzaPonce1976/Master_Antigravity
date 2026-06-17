import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import {PortfolioState} from '../../services/portfolio-state';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-contact',
  imports: [ReactiveFormsModule],
  template: `
    <div class="animate-fade-in max-w-6xl mx-auto px-6 py-12 md:py-16">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        <!-- Left Column: Context & Form -->
        <div class="lg:col-span-7 space-y-8">
          <header class="space-y-4">
            <div class="inline-flex items-center gap-1.5 text-primary font-mono text-sm uppercase block bg-surface-container-low px-3 py-1 rounded">
              <span class="material-symbols-outlined text-base">terminal</span>
              <span>/contacto</span>
            </div>
            <h1 class="font-display text-4xl md:text-6xl font-extrabold text-on-surface tracking-tight">Contacto</h1>
            <p class="font-sans text-base md:text-lg text-on-surface-variant max-w-[60ch] leading-relaxed">
              ¿Interesado en colaborar o tienes una consulta técnica? Completa el formulario a continuación y me pondré en contacto a la brevedad.
            </p>
          </header>

          <div class="bg-surface-container border border-outline-variant/60 rounded-2xl p-6 md:p-8 relative overflow-hidden">
            <!-- Subtle decorative top bar accent -->
            <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-transparent opacity-60"></div>
            
            <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" class="space-y-5">
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="flex flex-col gap-1.5">
                  <label class="font-mono text-xs text-on-surface-variant uppercase tracking-wider" for="name">Nombre Completo</label>
                  <input 
                    id="name" 
                    type="text" 
                    formControlName="name"
                    placeholder="Ej. Ada Lovelace" 
                    class="bg-background border border-outline-variant text-on-surface font-sans text-sm rounded px-4 py-2 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                    [class.border-error]="isFieldInvalid('name')"
                  />
                  @if (isFieldInvalid('name')) {
                    <span class="text-error text-xs font-sans">El nombre es requerido</span>
                  }
                </div>
                
                <div class="flex flex-col gap-1.5">
                  <label class="font-mono text-xs text-on-surface-variant uppercase tracking-wider" for="email">Email</label>
                  <input 
                    id="email" 
                    type="email" 
                    formControlName="email"
                    placeholder="hola@ejemplo.com" 
                    class="bg-background border border-outline-variant text-on-surface font-sans text-sm rounded px-4 py-2 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                    [class.border-error]="isFieldInvalid('email')"
                  />
                  @if (isFieldInvalid('email')) {
                    <span class="text-error text-xs font-sans">Introduce un email válido</span>
                  }
                </div>
              </div>

              <div class="flex flex-col gap-1.5">
                <label class="font-mono text-xs text-on-surface-variant uppercase tracking-wider" for="subject">Asunto</label>
                <input 
                  id="subject" 
                  type="text" 
                  formControlName="subject"
                  placeholder="Propuesta de proyecto, consulta técnica..." 
                  class="bg-background border border-outline-variant text-on-surface font-sans text-sm rounded px-4 py-2 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                  [class.border-error]="isFieldInvalid('subject')"
                />
                @if (isFieldInvalid('subject')) {
                  <span class="text-error text-xs font-sans">El asunto es requerido</span>
                }
              </div>

              <div class="flex flex-col gap-1.5">
                <label class="font-mono text-xs text-on-surface-variant uppercase tracking-wider" for="message">Mensaje</label>
                <textarea 
                  id="message" 
                  formControlName="message"
                  placeholder="Describe los detalles aquí..." 
                  rows="5"
                  class="bg-background border border-outline-variant text-on-surface font-sans text-sm rounded px-4 py-2 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none resize-none"
                  [class.border-error]="isFieldInvalid('message')"
                ></textarea>
                @if (isFieldInvalid('message')) {
                  <span class="text-error text-xs font-sans">El mensaje es requerido</span>
                }
              </div>

              <div class="pt-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div class="font-mono text-xs text-secondary transition-all" [class.opacity-0]="!showSuccessMsg()">
                  <span class="inline-flex items-center gap-1.5 bg-secondary-container/10 px-3 py-1.5 rounded border border-secondary/20">
                    <span class="material-symbols-outlined text-sm">check_circle</span>
                    Mensaje registrado en la cola de administración.
                  </span>
                </div>

                <button 
                  type="submit"
                  [disabled]="isLoading() || contactForm.invalid"
                  class="bg-primary text-background font-mono text-xs font-semibold px-6 py-3 rounded hover:brightness-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all inline-flex items-center gap-1.5 self-end uppercase cursor-pointer"
                >
                  @if (isLoading()) {
                    <span class="material-symbols-outlined animate-spin text-base">progress_activity</span>
                    Registrando...
                  } @else {
                    Enviar Mensaje
                    <span class="material-symbols-outlined text-base">send</span>
                  }
                </button>
              </div>

            </form>
          </div>
        </div>

        <!-- Right Column: Bento Direct Info Links -->
        <div class="lg:col-span-5 flex flex-col gap-6 lg:mt-32">
          
          <!-- Email Card -->
          <a href="mailto:hello@gonzaloponce.dev" class="group bg-surface-container-low border border-outline-variant/60 p-6 rounded-xl flex items-center gap-5 hover:bg-surface-container hover:border-primary transition-all duration-300">
            <div class="w-12 h-12 rounded-lg bg-surface-container-highest flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
              <span class="material-symbols-outlined text-2xl">mail</span>
            </div>
            <div class="flex-grow">
              <div class="font-mono text-xs text-on-surface-variant mb-1">Email Directo</div>
              <div class="font-sans text-base font-bold text-on-surface group-hover:text-primary transition-colors">hello@gonzaloponce.dev</div>
            </div>
            <span class="material-symbols-outlined text-outline group-hover:text-primary transition-colors opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0">arrow_forward</span>
          </a>

          <!-- Location Card -->
          <div class="bg-surface-container-low border border-outline-variant/60 p-6 rounded-xl flex items-center gap-5 relative overflow-hidden">
            <div class="w-12 h-12 rounded-lg bg-surface-container-highest flex items-center justify-center text-primary">
              <span class="material-symbols-outlined text-2xl">location_on</span>
            </div>
            <div class="flex-grow">
              <div class="font-mono text-xs text-on-surface-variant mb-1">Ubicación Base</div>
              <div class="font-sans text-base font-bold text-on-surface">Montevideo, Uruguay</div>
              <span class="inline-block mt-2 bg-surface-variant text-on-surface-variant font-mono text-[1rem] px-2 py-0.5 rounded border border-outline-variant/40">
                Remoto Disponible
              </span>
            </div>
          </div>

          <!-- Social Presencia -->
          <div class="bg-surface-container-low border border-outline-variant/60 p-6 rounded-xl space-y-4">
            <div class="font-mono text-xs text-on-surface-variant uppercase tracking-wider">Presencia Digital</div>
            <div class="grid grid-cols-2 gap-4">
              <a href="https://github.com/GonzaPonce1976" target="_blank" rel="noopener noreferrer" class="flex items-center justify-center gap-2 bg-surface-variant hover:bg-surface-bright border border-outline-variant/40 hover:border-primary text-on-surface py-3 rounded transition-all group">
                <span class="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors text-base">code</span>
                <span class="font-sans font-semibold text-sm">GitHub</span>
              </a>
              <a href="#" class="flex items-center justify-center gap-2 bg-surface-variant hover:bg-surface-bright border border-outline-variant/40 hover:border-primary text-on-surface py-3 rounded transition-all group">
                <span class="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors text-base">work</span>
                <span class="font-sans font-semibold text-sm">LinkedIn</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  `,
  styles: `
    :host {
      display: block;
    }
  `
})
export class Contact {
  private fb = inject(FormBuilder);
  protected state = inject(PortfolioState);

  contactForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', Validators.required],
    message: ['', Validators.required]
  });

  isLoading = signal<boolean>(false);
  showSuccessMsg = signal<boolean>(false);

  isFieldInvalid(field: string): boolean {
    const control = this.contactForm.get(field);
    return !!(control && control.touched && control.invalid);
  }

  onSubmit() {
    if (this.contactForm.invalid) return;

    this.isLoading.set(true);
    this.showSuccessMsg.set(false);

    // Simulate database network saving call
    setTimeout(() => {
      const {name, email, subject, message} = this.contactForm.value;
      
      // Save directly to static store messages
      this.state.addMessage(name, email, subject, message);

      this.isLoading.set(false);
      this.showSuccessMsg.set(true);
      this.contactForm.reset();

      // Clear successful submission badge after a moment
      setTimeout(() => {
        this.showSuccessMsg.set(false);
      }, 5000);
    }, 1200);
  }
}
