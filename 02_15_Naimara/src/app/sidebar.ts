import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterModule],
  template: `
    <aside class="h-screen w-72 flex flex-col fixed left-0 top-0 border-r border-outline-variant/15 bg-surface z-50">
      <div class="flex flex-col h-full py-8">
        <div class="px-6 mb-10">
          <h1 class="font-headline font-black text-primary tracking-tighter text-2xl">Complejo Orestes</h1>
          <p class="text-on-surface-variant text-xs font-medium mt-1">Premium Barcode Management</p>
        </div>
        
        <nav class="flex-grow space-y-1">
          @for (item of navItems; track item.label) {
            <a 
              [routerLink]="item.route"
              routerLinkActive="active"
              #rla="routerLinkActive"
              class="flex items-center gap-4 px-6 py-4 transition-all duration-300 group"
              [class.bg-surface-container-low]="rla.isActive"
              [class.text-primary]="rla.isActive"
              [class.border-l-4]="rla.isActive"
              [class.border-primary]="rla.isActive"
              [class.text-on-surface-variant]="!rla.isActive"
              [class.hover:bg-surface-container-low/50]="!rla.isActive"
            >
              <mat-icon [class.text-primary]="rla.isActive">{{ item.icon }}</mat-icon>
              <span class="font-medium text-sm">{{ item.label }}</span>
            </a>
          }
        </nav>

        <div class="px-6 mb-8">
          <button class="w-full bg-gradient-to-br from-primary to-primary-container text-on-primary font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 active:scale-[0.97] transition-all shadow-lg shadow-primary/10">
            <mat-icon>add_circle</mat-icon>
            <span class="text-sm">Create New Asset</span>
          </button>
        </div>

        <div class="border-t border-outline-variant/15 pt-4 space-y-1">
          <a href="#" class="flex items-center gap-4 px-6 py-4 text-on-surface-variant hover:bg-surface-container-low/50 transition-all">
            <mat-icon class="text-sm">help</mat-icon>
            <span class="text-sm">Help Center</span>
          </a>
          <a href="#" class="flex items-center gap-4 px-6 py-4 text-on-surface-variant hover:bg-surface-container-low/50 transition-all">
            <mat-icon class="text-sm text-tertiary">logout</mat-icon>
            <span class="text-sm">Logout</span>
          </a>
        </div>
      </div>
    </aside>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Sidebar {
  navItems = [
    { label: 'Dashboard', icon: 'dashboard', route: '/dashboard' },
    { label: 'Assets', icon: 'barcode_reader', route: '/assets' },
    { label: 'Escanear', icon: 'qr_code_scanner', route: '/scan' },
    { label: 'Test Lector', icon: 'build', route: '/scan-test' },
    { label: 'Analytics', icon: 'monitoring', route: '/analytics' },
    { label: 'Design Lab', icon: 'palette', route: '/design' },
    { label: 'Settings', icon: 'settings', route: '/settings' },
  ];
}
