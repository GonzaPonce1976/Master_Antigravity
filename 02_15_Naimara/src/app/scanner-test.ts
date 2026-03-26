import {
  Component,
  ChangeDetectionStrategy,
  signal,
  OnDestroy,
  AfterViewInit,
  ViewChild,
  ElementRef,
  NgZone,
  inject
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

interface ScanResult {
  code: string;
  timestamp: number;
  durationMs: number;
  timeString: string;
  isScanner: boolean;
}

@Component({
  selector: 'app-scanner-test',
  standalone: true,
  imports: [MatIconModule],
  template: `
    <div class="space-y-8 h-full">
      <div class="bg-surface-container-low p-8 rounded-xl space-y-8 border border-outline-variant/5 min-h-[70vh]">
        
        <!-- Header -->
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-full bg-tertiary/10 flex items-center justify-center text-tertiary">
            <mat-icon>build</mat-icon>
          </div>
          <div>
            <h2 class="text-xl font-headline font-bold text-on-surface">Prueba de Dispositivo Lector</h2>
            <p class="text-on-surface-variant text-sm">
              Escanea un código de barras para verificar la velocidad y exactitud del lector MS836.
            </p>
          </div>
        </div>

        <!-- El input invisible captura todos los eventos del escáner HID -->
        <input
          #hiddenInput
          class="opacity-0 absolute top-0 left-0 w-0 h-0 pointer-events-none"
          aria-hidden="true"
          autocomplete="off"
          (keydown)="onKey($event)"
        />

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Panel izquierdo: Estado -->
          <div class="bg-surface p-6 rounded-xl border border-outline-variant/15 flex flex-col items-center justify-center text-center">
            
            <mat-icon
              class="text-[64px] mb-4"
              [style.color]="isReceiving() ? 'var(--md-sys-color-primary)' : 'var(--md-sys-color-outline-variant)'">
              center_focus_weak
            </mat-icon>

            <h3 class="font-bold text-lg mb-1">
              {{ isReceiving() ? 'RECIBIENDO DATOS...' : 'Listo para escanear' }}
            </h3>
            <p class="text-sm text-on-surface-variant mb-6">
              {{ focusStatus() }}
            </p>

            <!-- Indicador de foco -->
            <button
              (click)="forceFocus()"
              class="mb-4 px-4 py-2 rounded-lg border text-sm font-medium transition-all"
              [class.border-primary]="hasFocus()"
              [class.text-primary]="hasFocus()"
              [class.border-outline-variant]="!hasFocus()"
              [class.text-on-surface-variant]="!hasFocus()">
              <span [style.color]="hasFocus() ? 'green' : 'orange'">●</span>
              {{ hasFocus() ? 'Input Activo (listo)' : 'Clic aquí para activar captura' }}
            </button>

            <!-- Buffer en tiempo real -->
            <div class="w-full bg-surface-container-highest p-4 rounded-lg font-mono text-left relative overflow-hidden h-20 flex items-center">
              @if (currentBuffer()) {
                <div class="absolute top-1.5 right-2 flex items-center gap-1 text-xs text-primary bg-primary/10 px-2 py-0.5 rounded">
                  <span class="w-1.5 h-1.5 rounded-full bg-primary animate-pulse inline-block"></span>
                  Recibiendo...
                </div>
              }
              <span class="text-on-surface break-all">
                {{ currentBuffer() || '_ _ _ _ _ _ _' }}
              </span>
            </div>
          </div>

          <!-- Panel derecho: Historial -->
          <div class="bg-surface p-6 rounded-xl border border-outline-variant/15">
            <h3 class="font-bold text-lg mb-4 flex items-center gap-2">
              <mat-icon class="text-primary">receipt_long</mat-icon>
              Últimas Lecturas
              @if (scanHistory().length > 0) {
                <span class="ml-auto text-xs text-on-surface-variant bg-surface-container px-2 py-1 rounded-full">
                  {{ scanHistory().length }} lecturas
                </span>
              }
            </h3>

            <div class="space-y-3 max-h-[320px] overflow-y-auto pr-1">
              @for (scan of scanHistory(); track scan.timestamp) {
                <div class="p-4 rounded-xl border flex flex-col gap-2 transition-all"
                  [class.border-green-500]="scan.isScanner"
                  [class.border-orange-400]="!scan.isScanner"
                  [class.bg-green-500]="scan.isScanner"
                  [class.bg-orange-400]="!scan.isScanner"
                  style="background-color: transparent !important;"
                  [style.border-color]="scan.isScanner ? '#22c55e' : '#ef4444'">
                  <div class="flex justify-between items-center">
                    <span class="font-mono font-bold text-primary text-lg">{{ scan.code }}</span>
                    <span class="text-xs text-on-surface-variant">{{ scan.timeString }}</span>
                  </div>
                  <div class="flex flex-wrap gap-3 text-xs">
                    <span class="text-on-surface-variant">
                      Duración: <strong class="text-on-surface">{{ scan.durationMs }}ms</strong>
                    </span>
                    <span class="text-on-surface-variant">
                      Chars: <strong class="text-on-surface">{{ scan.code.length }}</strong>
                    </span>
                    <span [style.color]="scan.isScanner ? '#22c55e' : '#ef4444'" class="font-semibold">
                      {{ scan.isScanner ? '✓ Escáner detectado' : '⚠ Parece tipeo manual' }}
                    </span>
                  </div>
                </div>
              } @empty {
                <div class="text-center py-12 text-on-surface-variant text-sm italic flex flex-col items-center gap-3">
                  <mat-icon class="text-[40px] text-outline-variant">barcode_reader</mat-icon>
                  <span>Aún no hay lecturas. Escanea un código para comenzar.</span>
                </div>
              }
            </div>

            @if (scanHistory().length > 0) {
              <button (click)="clearHistory()" class="mt-4 w-full text-xs text-on-surface-variant hover:text-error py-2 transition-colors">
                Limpiar historial
              </button>
            }
          </div>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScannerTest implements AfterViewInit, OnDestroy {
  @ViewChild('hiddenInput') inputRef!: ElementRef<HTMLInputElement>;

  private zone = inject(NgZone);

  currentBuffer = signal<string>('');
  isReceiving = signal<boolean>(false);
  hasFocus = signal<boolean>(false);
  focusStatus = signal<string>('Haz clic en el botón "Activar captura" y luego escanea.');
  scanHistory = signal<ScanResult[]>([]);

  private firstKeyTime = 0;
  private bufferTimeout: any;

  ngAfterViewInit() {
    this.forceFocus();
  }

  forceFocus() {
    this.inputRef?.nativeElement.focus();
  }

  onKey(event: KeyboardEvent) {
    event.preventDefault();
    const key = event.key;

    // Ignorar teclas modificadoras
    if (key.length > 1 && key !== 'Enter') return;

    if (key === 'Enter') {
      const buf = this.currentBuffer();
      if (buf.trim().length > 0) {
        this.processScan(buf.trim());
      }
      return;
    }

    // Primera tecla: iniciar timer
    if (this.currentBuffer().length === 0) {
      this.firstKeyTime = Date.now();
      this.isReceiving.set(true);
      this.focusStatus.set('Entrada en progreso...');
    }

    this.currentBuffer.update(b => b + key);

    // Fallback por timeout (para escáneres que no envían Enter)
    clearTimeout(this.bufferTimeout);
    this.bufferTimeout = setTimeout(() => {
      const buf = this.currentBuffer().trim();
      if (buf.length > 0) {
        this.processScan(buf, true);
      }
    }, 600);
  }

  processScan(code: string, timeoutTriggered = false) {
    clearTimeout(this.bufferTimeout);
    const duration = Date.now() - this.firstKeyTime;
    const msPerChar = code.length > 0 ? duration / code.length : 999;
    // Un lector de barras tipea <20ms por caracter; humano >80ms
    const isScanner = msPerChar < 50 && !timeoutTriggered;

    const result: ScanResult = {
      code,
      timestamp: Date.now(),
      durationMs: duration,
      timeString: new Date().toLocaleTimeString('es-AR'),
      isScanner
    };

    this.scanHistory.update(h => [result, ...h].slice(0, 15));
    this.currentBuffer.set('');
    this.isReceiving.set(false);
    this.focusStatus.set(`Último código: "${code}" (${duration}ms)`);

    // Mantener foco en el input para la próxima lectura
    setTimeout(() => this.forceFocus(), 50);
  }

  clearHistory() {
    this.scanHistory.set([]);
    this.focusStatus.set('Haz clic en "Activar captura" y escanea.');
  }

  ngOnDestroy() {
    clearTimeout(this.bufferTimeout);
  }
}
