import {Routes} from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', loadComponent: () => import('./dashboard').then(m => m.Dashboard) },
  { path: 'assets', loadComponent: () => import('./asset-editor').then(m => m.AssetEditor) },
  { path: 'scan', loadComponent: () => import('./scanner').then(m => m.Scanner) },
  { path: 'scan-test', loadComponent: () => import('./scanner-test').then(m => m.ScannerTest) }
];
