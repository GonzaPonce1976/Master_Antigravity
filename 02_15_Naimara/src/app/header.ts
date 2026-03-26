import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  template: `
    <header class="mb-12 flex justify-between items-end">
      <div>
        <nav class="flex items-center gap-2 text-on-surface-variant text-xs mb-4">
          <span>Assets</span>
          <mat-icon class="text-sm" style="font-size: 16px; width: 16px; height: 16px;">chevron_right</mat-icon>
          <span class="text-primary">Editar Código QR</span>
        </nav>
        <h2 class="font-headline font-extrabold text-4xl tracking-tight text-on-surface">Configurar Activo Digital</h2>
        <p class="text-on-surface-variant mt-2 max-w-xl">
          Personaliza los parámetros de tu código QR dinámico. Los cambios se reflejarán instantáneamente en la vista previa editorial.
        </p>
      </div>
      
      <div class="flex items-center gap-4">
        <button class="p-2 text-on-surface-variant hover:text-primary transition-colors">
          <mat-icon>notifications</mat-icon>
        </button>
        <div class="w-10 h-10 rounded-full bg-surface-container-highest overflow-hidden border border-outline-variant/30">
          <img 
            class="w-full h-full object-cover" 
            src="https://picsum.photos/seed/user123/100/100" 
            alt="User profile"
            referrerpolicy="no-referrer"
          >
        </div>
      </div>
    </header>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Header {}
