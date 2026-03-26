import { Component, ChangeDetectionStrategy, signal, HostListener, OnDestroy, AfterViewInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { AssetService } from './asset.service';

@Component({
  selector: 'app-scanner',
  standalone: true,
  imports: [CommonModule, MatIconModule, FormsModule],
  template: `
    <div class="space-y-8 h-full">
      <div class="bg-surface-container-low p-8 rounded-xl space-y-8 border border-outline-variant/5 min-h-[70vh]">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <mat-icon>barcode_scanner</mat-icon>
          </div>
          <div>
            <h2 class="text-xl font-headline font-bold text-on-surface">Escáner Activo</h2>
            <p class="text-on-surface-variant text-sm">Dispara el lector MS836 sobre un código de barras impreso o en pantalla.</p>
          </div>
        </div>

        @if (!videoUrl()) {
          <div class="flex flex-col items-center justify-center py-32 bg-surface-container-lowest rounded-xl border border-dashed border-outline-variant/20">
            <mat-icon class="text-[80px] text-outline-variant/30 mb-6 animate-pulse">document_scanner</mat-icon>
            <p class="text-on-surface-variant text-lg font-medium">Esperando lectura del escáner MS836...</p>
            <p class="text-outline text-xs mt-2">Mantén esta ventana activa. Puedes teclear "VID-001" con tu teclado para probar manualmente.</p>
            
            @if (keyBuffer().length > 0) {
              <div class="mt-8 px-6 py-3 bg-primary/10 rounded-xl border border-primary/20">
                <p class="text-primary font-mono font-bold text-sm tracking-widest flex items-center gap-2">
                  <mat-icon class="text-[18px]">keyboard</mat-icon>
                  RECIBIENDO: {{ keyBuffer() }}<span class="animate-pulse">_</span>
                </p>
              </div>
            }
          </div>
        } @else {
          <div class="bg-black/95 rounded-2xl overflow-hidden shadow-2xl relative animate-in fade-in duration-500">
            <div class="absolute top-4 left-4 z-10 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 flex items-center gap-2">
              <mat-icon class="text-green-400 text-sm">check_circle</mat-icon>
              <span class="text-white text-xs font-bold uppercase tracking-wider">Mostrando: {{ lastScannedId() }}</span>
            </div>
            
            <video 
              controls 
              autoplay 
              class="w-full h-auto max-h-[60vh] object-contain"
              [src]="videoUrl()"
              (ended)="resetScanner()">
            </video>
            
            <div class="absolute top-4 right-4 z-10">
              <button (click)="resetScanner()" class="bg-black/60 backdrop-blur-md text-white hover:bg-white/20 p-2 rounded-full transition-all border border-white/10 active:scale-95">
                <mat-icon>close</mat-icon>
              </button>
            </div>
          </div>
        }
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Scanner implements OnDestroy {
  private assetService = inject(AssetService);

  videoUrl = signal<string | null>(null);
  lastScannedId = signal<string | null>(null);
  keyBuffer = signal<string>('');
  
  private bufferTimeout: any;

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    const target = event.target as HTMLElement;
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
      return; 
    }

    if (event.key === 'Enter') {
      const currentBuf = this.keyBuffer();
      if (currentBuf.length > 0) {
        this.processScan(currentBuf);
        this.keyBuffer.set('');
      }
    } else if (event.key.length === 1 && !event.ctrlKey && !event.altKey && !event.metaKey) { 
      const newBuf = this.keyBuffer() + event.key;
      this.keyBuffer.set(newBuf);

      // 1. Detección inmediata en tiempo real si coincide con un Activo Guardado
      const upperBuf = newBuf.toUpperCase().trim();
      const exactMatch = this.assetService.getAsset(upperBuf);
      
      if (exactMatch) {
        this.processScan(upperBuf);
        this.keyBuffer.set('');
        clearTimeout(this.bufferTimeout);
        return;
      }

      // 2. Fallback de inactividad (para códigos que el escáner dispara rápido pero no enviaron Enter 
      // y que no están registrados en el catálogo aún)
      clearTimeout(this.bufferTimeout);
      this.bufferTimeout = setTimeout(() => {
        const finalBuf = this.keyBuffer();
        if (finalBuf.length >= 3) {
          this.processScan(finalBuf);
        }
        this.keyBuffer.set('');
      }, 800); // 800ms de inactividad entre teclas
    }
  }

  processScan(code: string) {
    code = code.trim().toUpperCase();
    if (code) {
      this.lastScannedId.set(code);
      const asset = this.assetService.getAsset(code);
      
      if (asset) {
        this.videoUrl.set(this.getSafeUrl(asset.url));
      } else {
        alert('Código de barras no encontrado en el sistema: ' + code);
        this.videoUrl.set(null);
      }
    }
  }

  getSafeUrl(rawUrl: string): string {
    // Si es una URL web completa (http/https), retornarla tal cual
    if (rawUrl.startsWith('http://') || rawUrl.startsWith('https://')) {
      return rawUrl;
    }

    // Extraer agresivamente el nombre del archivo final de la ruta de Windows/Mac
    const parts = rawUrl.split(/[/\\]/);
    let filename = parts[parts.length - 1];
    
    // Auto-completar extensión .mp4 si el usuario olvidó escribirla
    if (!filename.toLowerCase().endsWith('.mp4') && !filename.toLowerCase().endsWith('.webm')) {
      filename += '.mp4'; 
    }
    
    // Formatear para que el navegador lo busque en la carpeta segura /public
    return '/' + filename;
  }

  resetScanner() {
    this.videoUrl.set(null);
    this.lastScannedId.set(null);
    this.keyBuffer.set('');
  }

  ngOnDestroy() {
    clearTimeout(this.bufferTimeout);
  }
}
