import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import {PortfolioState} from '../../services/portfolio-state';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-contact',
  imports: [ReactiveFormsModule],
  template: `
    <div class="animate-fade-in max-w-6xl mx-auto px-6 py-12 md:py-16 relative">

      <!-- Background orbs -->
      <div class="orb-pink" style="width:500px; height:500px; top:-100px; right:-200px; opacity:0.40;"></div>
      <div class="orb-orange" style="width:350px; height:350px; bottom:-100px; left:-150px; opacity:0.30;"></div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative z-10">

        <!-- ======== Left Column: Form ======== -->
        <div class="lg:col-span-7 space-y-8">
          <header class="space-y-4">
            <div class="inline-flex items-center gap-2 font-mono font-semibold" style="background:rgba(255,0,128,0.10); border:1px solid rgba(255,0,128,0.28); color:#ff0080; padding:5px 14px; border-radius:100px; font-size:1.2rem; letter-spacing:0.08em; text-transform:uppercase;">
              <span class="material-symbols-outlined" style="font-size:15px;">terminal</span>
              /contacto
            </div>
            <h1 class="font-display font-black" style="font-size:clamp(3.5rem,6vw,6.5rem); letter-spacing:-0.03em; color:#fff; line-height:1.05;">
              Hablemos<span class="gradient-text">.</span>
            </h1>
            <p class="font-sans" style="font-size:1.7rem; line-height:1.65; color:rgba(255,255,255,0.55); max-width:56ch;">
              ¿Interesado en colaborar o tienes una consulta técnica? Completa el formulario y me pondré en contacto a la brevedad.
            </p>
          </header>

          <!-- Form Card -->
          <div style="background:rgba(22,9,42,0.85); border:1px solid rgba(255,255,255,0.08); border-radius:20px; padding:32px; position:relative; overflow:hidden;">
            <!-- Accent top line -->
            <div style="position:absolute; top:0; left:0; right:0; height:3px; background:linear-gradient(90deg,#ff0080,#ff6b00);"></div>

            <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" class="space-y-5">

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <!-- Nombre -->
                <div class="flex flex-col gap-2">
                  <label class="font-mono" style="font-size:1.15rem; color:rgba(255,255,255,0.50); text-transform:uppercase; letter-spacing:0.08em;" for="name">Nombre Completo</label>
                  <input
                    id="name"
                    type="text"
                    formControlName="name"
                    placeholder="Ej. Ada Lovelace"
                    class="form-input"
                    [style.borderColor]="isFieldInvalid('name') ? '#ff4d6d' : ''"
                  />
                  @if (isFieldInvalid('name')) {
                    <span style="color:#ff4d6d; font-size:1.2rem;" class="font-sans">El nombre es requerido</span>
                  }
                </div>

                <!-- Email -->
                <div class="flex flex-col gap-2">
                  <label class="font-mono" style="font-size:1.15rem; color:rgba(255,255,255,0.50); text-transform:uppercase; letter-spacing:0.08em;" for="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    formControlName="email"
                    placeholder="hola@ejemplo.com"
                    class="form-input"
                    [style.borderColor]="isFieldInvalid('email') ? '#ff4d6d' : ''"
                  />
                  @if (isFieldInvalid('email')) {
                    <span style="color:#ff4d6d; font-size:1.2rem;" class="font-sans">Introduce un email válido</span>
                  }
                </div>
              </div>

              <!-- Asunto -->
              <div class="flex flex-col gap-2">
                <label class="font-mono" style="font-size:1.15rem; color:rgba(255,255,255,0.50); text-transform:uppercase; letter-spacing:0.08em;" for="subject">Asunto</label>
                <input
                  id="subject"
                  type="text"
                  formControlName="subject"
                  placeholder="Propuesta de proyecto, consulta técnica..."
                  class="form-input"
                  [style.borderColor]="isFieldInvalid('subject') ? '#ff4d6d' : ''"
                />
                @if (isFieldInvalid('subject')) {
                  <span style="color:#ff4d6d; font-size:1.2rem;" class="font-sans">El asunto es requerido</span>
                }
              </div>

              <!-- Mensaje -->
              <div class="flex flex-col gap-2">
                <label class="font-mono" style="font-size:1.15rem; color:rgba(255,255,255,0.50); text-transform:uppercase; letter-spacing:0.08em;" for="message">Mensaje</label>
                <textarea
                  id="message"
                  formControlName="message"
                  placeholder="Describe los detalles aquí..."
                  rows="5"
                  class="form-input"
                  style="resize:none;"
                  [style.borderColor]="isFieldInvalid('message') ? '#ff4d6d' : ''"
                ></textarea>
                @if (isFieldInvalid('message')) {
                  <span style="color:#ff4d6d; font-size:1.2rem;" class="font-sans">El mensaje es requerido</span>
                }
              </div>

              <!-- Submit Row -->
              <div class="pt-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div [style.opacity]="showSuccessMsg() ? '1' : '0'" style="transition:opacity 0.3s;">
                  <span class="inline-flex items-center gap-2 font-mono" style="font-size:1.3rem; color:#4ade80; background:rgba(74,222,128,0.08); border:1px solid rgba(74,222,128,0.20); padding:8px 16px; border-radius:8px;">
                    <span class="material-symbols-outlined" style="font-size:16px;">check_circle</span>
                    Mensaje registrado correctamente.
                  </span>
                </div>

                <button
                  type="submit"
                  [disabled]="isLoading() || contactForm.invalid"
                  class="btn-gradient inline-flex items-center gap-2 px-6 py-3 rounded-xl font-display font-bold cursor-pointer"
                  style="font-size:1.4rem; border:none; white-space:nowrap;"
                  [style.opacity]="contactForm.invalid ? '0.55' : '1'"
                >
                  @if (isLoading()) {
                    <span class="material-symbols-outlined animate-spin" style="font-size:18px; position:relative; z-index:1;">progress_activity</span>
                    <span style="position:relative;z-index:1;">Enviando...</span>
                  } @else {
                    <span style="position:relative;z-index:1;">Enviar Mensaje</span>
                    <span class="material-symbols-outlined" style="font-size:18px; position:relative; z-index:1;">send</span>
                  }
                </button>
              </div>

            </form>
          </div>
        </div>

        <!-- ======== Right Column: Info ======== -->
        <div class="lg:col-span-5 flex flex-col gap-5 lg:mt-32">

          <!-- Email Card -->
          <a href="mailto:hello@gonzaloponce.dev" class="card-dark p-6 rounded-2xl flex items-center gap-5" style="text-decoration:none; cursor:pointer;">
            <div style="width:48px; height:48px; background:rgba(255,0,128,0.12); border:1px solid rgba(255,0,128,0.28); border-radius:14px; display:flex; align-items:center; justify-content:center; flex-shrink:0; transition:transform 0.2s;">
              <span class="material-symbols-outlined" style="color:#ff0080; font-size:22px;">mail</span>
            </div>
            <div class="flex-grow">
              <div class="font-mono" style="font-size:1.15rem; color:rgba(255,255,255,0.40); margin-bottom:4px; text-transform:uppercase; letter-spacing:0.06em;">Email Directo</div>
              <div class="font-display font-bold" style="font-size:1.6rem; color:#fff;">hello&#64;gonzaloponce.dev</div>
            </div>
            <span class="material-symbols-outlined" style="color:rgba(255,0,128,0.50); font-size:20px;">arrow_forward</span>
          </a>

          <!-- Location Card -->
          <div class="card-dark p-6 rounded-2xl flex items-center gap-5">
            <div style="width:48px; height:48px; background:rgba(255,107,0,0.12); border:1px solid rgba(255,107,0,0.28); border-radius:14px; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
              <span class="material-symbols-outlined" style="color:#ff6b00; font-size:22px;">location_on</span>
            </div>
            <div class="flex-grow">
              <div class="font-mono" style="font-size:1.15rem; color:rgba(255,255,255,0.40); margin-bottom:4px; text-transform:uppercase; letter-spacing:0.06em;">Ubicación Base</div>
              <div class="font-display font-bold" style="font-size:1.6rem; color:#fff;">Montevideo, Uruguay</div>
              <span style="display:inline-block; margin-top:8px; background:rgba(255,107,0,0.10); border:1px solid rgba(255,107,0,0.25); color:#ff6b00; font-family:'JetBrains Mono',monospace; font-size:1.15rem; padding:3px 12px; border-radius:100px;">🌐 Remoto Disponible</span>
            </div>
          </div>

          <!-- Social Card -->
          <div class="card-dark p-6 rounded-2xl space-y-4">
            <div class="font-mono" style="font-size:1.15rem; color:rgba(255,255,255,0.40); text-transform:uppercase; letter-spacing:0.08em;">Presencia Digital</div>
            <div class="grid grid-cols-2 gap-4">
              <a href="https://github.com/GonzaPonce1976" target="_blank" rel="noopener noreferrer"
                 style="display:flex; align-items:center; justify-content:center; gap:8px; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.10); border-radius:12px; padding:14px 0; text-decoration:none; transition:all 0.2s;"
                 class="social-btn">
                <span class="material-symbols-outlined" style="font-size:18px; color:rgba(255,255,255,0.55);">code</span>
                <span class="font-sans font-semibold" style="font-size:1.4rem; color:#fff;">GitHub</span>
              </a>
              <a href="#"
                 style="display:flex; align-items:center; justify-content:center; gap:8px; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.10); border-radius:12px; padding:14px 0; text-decoration:none; transition:all 0.2s;"
                 class="social-btn">
                <span class="material-symbols-outlined" style="font-size:18px; color:rgba(255,255,255,0.55);">work</span>
                <span class="font-sans font-semibold" style="font-size:1.4rem; color:#fff;">LinkedIn</span>
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
    .social-btn:hover {
      border-color: rgba(255, 0, 128, 0.35) !important;
      background: rgba(255, 0, 128, 0.06) !important;
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

    setTimeout(() => {
      const {name, email, subject, message} = this.contactForm.value;
      this.state.addMessage(name, email, subject, message);

      this.isLoading.set(false);
      this.showSuccessMsg.set(true);
      this.contactForm.reset();

      setTimeout(() => {
        this.showSuccessMsg.set(false);
      }, 5000);
    }, 1200);
  }
}
