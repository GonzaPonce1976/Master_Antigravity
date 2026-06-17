import {Routes} from '@angular/router';
import {Home} from './components/home/home';
import {Projects} from './components/projects/projects';
import {Skills} from './components/skills/skills';
import {Contact} from './components/contact/contact';
import {Admin} from './components/admin/admin';

export const routes: Routes = [
  {path: '', component: Home},
  {path: 'proyectos', component: Projects},
  {path: 'habilidades', component: Skills},
  {path: 'contacto', component: Contact},
  {path: 'admin', component: Admin},
  {path: '**', redirectTo: ''}
];
