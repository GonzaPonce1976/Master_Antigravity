import { Component, ChangeDetectionStrategy, signal, inject, AfterViewInit, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import JsBarcode from 'jsbarcode';
import { AssetService } from './asset.service';

@Component({
  selector: 'app-asset-editor',
  standalone: true,
  imports: [CommonModule, MatIconModule, ReactiveFormsModule],
  template: `
    <div class="grid grid-cols-12 gap-12">
      <!-- Left Column: Form -->
      <section class="col-span-12 lg:col-span-7 space-y-8">
        <div class="bg-surface-container-low p-8 rounded-xl space-y-8 border border-outline-variant/5">
          <form [formGroup]="assetForm" class="space-y-6">
            <!-- Field: Asset ID -->
            <div class="space-y-2">
              <label for="assetId" class="block text-on-surface-variant text-xs font-semibold uppercase tracking-wider ml-1">
                ID Corto (Para Código de Barras)
              </label>
              <div class="relative group">
                <input 
                  id="assetId"
                  formControlName="assetId"
                  class="w-full bg-surface-container-lowest border-none rounded-xl px-4 py-4 text-on-surface font-mono font-bold focus:ring-2 focus:ring-primary/20 transition-all duration-300 placeholder:text-outline"
                  placeholder="Ej. NAIMARA-01"
                  type="text"
                />
                <div class="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500"></div>
              </div>
            </div>

            <!-- Field: Nombre -->
            <div class="space-y-2">
              <label for="assetName" class="block text-on-surface-variant text-xs font-semibold uppercase tracking-wider ml-1">
                Nombre del Video
              </label>
              <div class="relative group">
                <input 
                  id="assetName"
                  formControlName="name"
                  class="w-full bg-surface-container-lowest border-none rounded-xl px-4 py-4 text-on-surface focus:ring-2 focus:ring-primary/20 transition-all duration-300 placeholder:text-outline"
                  placeholder="Ej. Video Promocional"
                  type="text"
                />
                <div class="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500"></div>
              </div>
            </div>

            <!-- Field: URL -->
            <div class="space-y-2">
              <label for="assetUrl" class="block text-on-surface-variant text-xs font-semibold uppercase tracking-wider ml-1">
                URL del Video
              </label>
              <div class="relative group">
                <mat-icon class="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg">link</mat-icon>
                <input 
                  id="assetUrl"
                  formControlName="url"
                  class="w-full bg-surface-container-lowest border-none rounded-xl pl-12 pr-4 py-4 text-on-surface focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                  type="url"
                />
              </div>
            </div>

            <!-- Field: Categoría/Tags -->
            <div class="space-y-2">
              <span class="block text-on-surface-variant text-xs font-semibold uppercase tracking-wider ml-1">
                Categoría / Etiqueta
              </span>
              <div class="flex flex-wrap gap-2 p-3 bg-surface-container-lowest rounded-xl min-h-[56px] items-center border border-outline-variant/10">
                @for (tag of tags(); track tag) {
                  <span class="px-3 py-1 bg-surface-container-high rounded-full text-xs font-medium text-primary flex items-center gap-1">
                    {{ tag }}
                    <button type="button" (click)="removeTag(tag)" class="material-icons text-[14px]">close</button>
                  </span>
                }
                <button type="button" class="flex items-center gap-1 text-xs text-on-surface-variant hover:text-primary transition-colors px-2 py-1">
                  <mat-icon class="text-sm" style="font-size: 16px; width: 16px; height: 16px;">add</mat-icon>
                  Añadir etiqueta
                </button>
              </div>
            </div>
          </form>
        </div>

        <!-- Form Actions -->
        <div class="flex flex-wrap items-center gap-4 pt-4">
          <button (click)="saveChanges()" type="button" class="px-8 py-4 bg-gradient-to-br from-primary to-primary-container text-on-primary font-extrabold rounded-xl active:scale-[0.97] transition-all flex items-center gap-2 shadow-xl shadow-primary/20">
            <span>Guardar Cambios</span>
            <mat-icon>check_circle</mat-icon>
          </button>
          
          <button (click)="resetForm()" type="button" class="px-6 py-4 bg-surface-container-highest text-on-surface font-bold rounded-xl active:scale-[0.97] transition-all flex items-center gap-2">
            <mat-icon class="text-[18px]">add</mat-icon> Nuevo Activo
          </button>
          
          <button (click)="cancelChanges()" type="button" class="px-8 py-4 bg-transparent border border-outline-variant/15 text-on-surface-variant font-bold rounded-xl hover:bg-surface-container-highest transition-all active:scale-[0.97]">
            Volver
          </button>
        </div>
      </section>

      <!-- Right Column: Preview -->
      <section class="col-span-12 lg:col-span-5">
        <div class="sticky top-32 space-y-6">
          <!-- Preview Card -->
          <div id="preview-card" class="bg-surface-container-low p-10 rounded-xl relative overflow-hidden group border border-outline-variant/5">
            <!-- Decorative background glow -->
            <div class="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors duration-700"></div>
            
            <div class="relative z-10 flex flex-col items-center text-center">
              <span class="text-[10px] uppercase tracking-[0.2em] text-primary font-black mb-8 px-3 py-1 bg-primary/10 rounded-full">
                Vista Previa Editorial
              </span>
              
              <!-- Barcode Container -->
              <div class="bg-white p-6 rounded-2xl shadow-2xl mb-8 transform group-hover:scale-[1.02] transition-transform duration-500">
                <svg id="barcode" class="w-full"></svg>
                <div class="mt-4 flex items-center justify-center gap-1 opacity-40">
                  <span class="w-1.5 h-1.5 rounded-full bg-surface"></span>
                  <span class="w-1.5 h-1.5 rounded-full bg-surface"></span>
                  <span class="w-1.5 h-1.5 rounded-full bg-surface"></span>
                </div>
              </div>
              
              <h3 class="font-headline font-bold text-xl text-on-surface mb-2">
                {{ assetForm.get('name')?.value || 'Sin Nombre' }}
              </h3>
              <p class="text-on-surface-variant text-sm flex items-center gap-2">
                <mat-icon class="text-sm" style="font-size: 16px; width: 16px; height: 16px;">camera_alt</mat-icon>
                Escanea para ver el video completo
              </p>
            </div>
          </div>

          <!-- Export Actions -->
          <div class="bg-surface-container-high/50 p-6 rounded-xl space-y-4">
            <span class="block text-on-surface-variant text-[10px] font-bold uppercase tracking-widest text-center mb-2">
              Exportar Recurso
            </span>
            <div class="grid grid-cols-3 gap-3">
              <button class="flex flex-col items-center gap-2 py-4 bg-surface-container-lowest rounded-xl hover:bg-primary/10 group transition-all border border-outline-variant/5">
                <mat-icon class="text-on-surface-variant group-hover:text-primary">slide_library</mat-icon>
                <span class="text-xs font-bold text-on-surface-variant group-hover:text-on-surface">SVG</span>
              </button>
              <button (click)="exportToPNG()" class="flex flex-col items-center gap-2 py-4 bg-surface-container-lowest rounded-xl hover:bg-primary/10 group transition-all border border-outline-variant/5">
                <mat-icon class="text-on-surface-variant group-hover:text-primary">image</mat-icon>
                <span class="text-xs font-bold text-on-surface-variant group-hover:text-on-surface">PNG</span>
              </button>
              <button (click)="exportToPrint()" class="flex flex-col items-center gap-2 py-4 bg-surface-container-lowest rounded-xl hover:bg-primary/10 group transition-all border border-outline-variant/5">
                <mat-icon class="text-on-surface-variant group-hover:text-primary">print</mat-icon>
                <span class="text-xs font-bold text-on-surface-variant group-hover:text-on-surface">PRINT</span>
              </button>
            </div>
          </div>

          <!-- Meta info -->
          <div class="flex items-center justify-between px-2 text-[10px] font-bold text-on-surface-variant/50 uppercase tracking-widest">
            <span>Estado: Dinámico</span>
            <span>Última edición: Hace 2 min</span>
          </div>
        </div>
      </section>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AssetEditor implements AfterViewInit, OnInit {
  private fb = inject(FormBuilder);
  private assetService = inject(AssetService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  
  tags = signal(['Marketing', 'Q4_Launch']);
  
  assetForm = this.fb.group({
    assetId: ['VID-001', Validators.required],
    name: ['Video Naimara (Local)', Validators.required],
    url: ['file:///C:/Users/USUARIO/Desktop/VIDEOS_NAIMARA/WIN_20260322_10_47_52_Pro.mp4', Validators.required]
  });

  constructor() {
    this.assetForm.get('assetId')?.valueChanges.pipe(
      takeUntilDestroyed()
    ).subscribe(val => {
      this.generateBarcode(val);
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const id = params['id'];
      
      if (id) {
        // Carga el activo si se seleccionó desde "Editar" en Dashboard
        const loadedAsset = this.assetService.getAsset(id);
        if (loadedAsset) {
          this.applyAssetToForm(loadedAsset);
          return;
        }
      } 
      
      // Si no hay ID, probamos cargar VID-001 de manera predeterminada para el ejemplo, 
      // o limpiar la pantalla.
      const initialAsset = this.assetService.getAsset('VID-001') || this.assetService.assets()[0];
      if (initialAsset && !id) {
        this.applyAssetToForm(initialAsset);
      } else {
        this.resetForm();
      }
    });
  }

  applyAssetToForm(asset: any) {
    this.assetForm.patchValue({
      assetId: asset.assetId,
      name: asset.name,
      url: asset.url
    });
    this.tags.set(asset.tags || []);
  }

  resetForm() {
    this.assetForm.reset({
      assetId: '',
      name: '',
      url: ''
    });
    this.tags.set([]);
    this.generateBarcode(''); // Borrar barcode en UI
  }

  ngAfterViewInit() {
    this.generateBarcode(this.assetForm.get('assetId')?.value);
  }

  generateBarcode(value: string | null | undefined) {
    if (value) {
      setTimeout(() => {
        try {
          JsBarcode('#barcode', value, {
            format: 'CODE128',
            width: 2,
            height: 60,
            displayValue: true,
            fontSize: 14,
            background: 'transparent'
          });
        } catch(e) { console.error('Error generating barcode', e); }
      }, 0);
    }
  }

  removeTag(tag: string) {
    this.tags.update(t => t.filter(x => x !== tag));
  }

  saveChanges() {
    if (this.assetForm.valid) {
      const formVal = this.assetForm.value;
      this.assetService.saveAsset({
        assetId: formVal.assetId!,
        name: formVal.name!,
        url: formVal.url!,
        tags: this.tags()
      });
      console.log('Cambios guardados en servicio:', formVal);
      alert('¡Configuración guardada exitosamente y reflejada en el Panel de Control!');
      
      // Opcional: Redirigir al dashboard tras guardar (si lo desea).
      // this.router.navigate(['/dashboard']);
    } else {
      alert('Por favor completa todos los campos requeridos (ID Corto, Nombre y URL).');
    }
  }

  cancelChanges() {
    this.router.navigate(['/dashboard']);
  }

  exportToPrint() {
    window.print();
  }

  exportToPNG() {
    const element = document.getElementById('preview-card');
    if (element) {
      // Dynamic import to avoid SSR or bundle issues initially
      import('html2canvas').then(html2canvas => {
        html2canvas.default(element, { useCORS: true }).then(canvas => {
          const link = document.createElement('a');
          link.download = 'curator-asset.png';
          link.href = canvas.toDataURL('image/png');
          link.click();
        });
      }).catch(err => {
        console.error('Error cargando html2canvas', err);
        alert('Hubo un error al exportar la imagen.');
      });
    }
  }
}
