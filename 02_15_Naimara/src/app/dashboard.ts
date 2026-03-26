import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { AssetService } from './asset.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterModule],
  template: `
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-8">
      <!-- Welcome Card -->
      <div class="col-span-1 md:col-span-2 lg:col-span-4 bg-gradient-to-br from-primary/10 to-primary-container/20 p-8 rounded-2xl border border-primary/10 relative overflow-hidden">
        <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h2 class="text-3xl font-headline font-black text-on-surface mb-2">Bienvenido a Complejo Orestes</h2>
            <p class="text-on-surface-variant max-w-xl">
              Aquí puedes gestionar y configurar los parámetros de todos tus videos y códigos asignados.
            </p>
          </div>
          <button routerLink="/assets" class="bg-primary hover:bg-primary/90 text-on-primary font-bold py-4 px-8 rounded-xl transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-2 whitespace-nowrap z-20">
            <mat-icon class="text-[20px]">add_circle</mat-icon> Crear Nuevo Activo
          </button>
        </div>
        <mat-icon class="absolute right-0 bottom-0 text-[180px] text-primary/5 translate-x-1/4 translate-y-1/4">dashboard</mat-icon>
      </div>

      <!-- Tablero Principal: Recursos Activos -->
      <div class="col-span-1 md:col-span-2 lg:col-span-4 mt-4">
        <div class="flex items-center gap-4 mb-6">
          <div class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shadow-inner">
            <mat-icon>inventory_2</mat-icon>
          </div>
          <div>
            <h3 class="text-2xl font-headline font-bold text-on-surface leading-tight">Tablero de Recursos Activos</h3>
            <p class="text-sm text-on-surface-variant">Total registrados en sistema: <span class="font-bold text-primary">{{ assetService.assets().length }} activos</span></p>
          </div>
        </div>
        
        <div class="bg-surface-container-low rounded-xl border border-outline-variant/10 overflow-x-auto shadow-lg">
          <table class="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr class="bg-surface-container-highest text-on-surface-variant text-xs uppercase tracking-wider">
                <th class="p-4 font-bold border-b border-outline-variant/10">ID (Código)</th>
                <th class="p-4 font-bold border-b border-outline-variant/10">Nombre del Video</th>
                <th class="p-4 font-bold border-b border-outline-variant/10">Ruta / URL Guardada</th>
                <th class="p-4 font-bold border-b border-outline-variant/10 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              @for (asset of assetService.assets(); track asset.assetId) {
                <tr class="border-b border-outline-variant/5 hover:bg-surface-container-highest/30 transition-colors">
                  <td class="p-4">
                    <span class="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-lg font-mono">{{ asset.assetId }}</span>
                  </td>
                  <td class="p-4 font-bold text-on-surface">{{ asset.name }}
                    <div class="flex gap-1 mt-1">
                      @for (tag of asset.tags; track tag) {
                        <span class="text-[9px] uppercase font-bold text-on-surface-variant bg-surface-container-highest px-1.5 py-0.5 rounded">{{ tag }}</span>
                      }
                    </div>
                  </td>
                  <td class="p-4 text-on-surface-variant text-xs truncate max-w-[300px]" [title]="asset.url">{{ asset.url }}</td>
                  <td class="p-4 text-right whitespace-nowrap">
                    <button [routerLink]="['/assets']" [queryParams]="{ id: asset.assetId }" class="p-2 text-outline-variant hover:text-primary hover:bg-primary/10 rounded-full transition-all mr-2" title="Editar Activo">
                      <mat-icon class="text-[20px] align-middle">edit</mat-icon>
                    </button>
                    <button (click)="deleteAsset(asset.assetId)" class="p-2 text-outline-variant hover:text-error hover:bg-error/10 rounded-full transition-all" title="Eliminar Activo">
                      <mat-icon class="text-[20px] align-middle">delete</mat-icon>
                    </button>
                  </td>
                </tr>
              } @empty {
                <tr>
                  <td colspan="4" class="p-8 text-center text-on-surface-variant flex flex-col items-center">
                    <mat-icon class="text-4xl opacity-20 mb-2">inventory_2</mat-icon>
                    No hay activos registrados. Utiliza el botón superior para crear uno.
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Dashboard {
  assetService = inject(AssetService);

  deleteAsset(id: string) {
    if (confirm('¿Estás seguro de que deseas eliminar permanentemente el activo ' + id + '?')) {
      this.assetService.deleteAsset(id);
    }
  }
}
