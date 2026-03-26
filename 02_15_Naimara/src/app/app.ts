import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Sidebar} from './sidebar';
import {Header} from './header';
import {RouterModule} from '@angular/router';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  standalone: true,
  imports: [Sidebar, Header, RouterModule],
  template: `
    <div class="min-h-screen bg-surface text-on-surface">
      <app-sidebar></app-sidebar>
      
      <main class="ml-72 min-h-screen bg-surface p-12">
        <app-header></app-header>
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
})
export class App {}
