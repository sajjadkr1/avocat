import { Routes } from '@angular/router';
import { Admin } from './admin/admin';
import { Login } from './login/login';
import { Accueil } from './accueil/accueil';
import { AvocatList } from './avocat-list/avocat-list';
import { AvocatDetail } from './avocat-detail/avocat-detail';
import { Contact } from './contact/contact';
import { About } from './about/about';
import { adminGuard } from './guards/admin.guard';
import { AdminAvocats } from './admin/admin-avocats/admin-avocats';
import { AdminAjouterAvocat } from './admin/admin-ajouter-avocat/admin-ajouter-avocat';
import { AdminRendezVous } from './admin/admin-rendez-vous/admin-rendez-vous';
export const routes: Routes = [

  {
    path: '',
    component: Accueil
  },

  {
    path: 'avocats',
    component: AvocatList
  },

  {
    path: 'avocat/:id',
    component: AvocatDetail
  },

  {
    path: 'login',
    component: Login
  },

  {
    path: 'contact',
    component: Contact
  },

  {
    path: 'about',
    component: About
  },

  {
    path: 'admin',
    component: Admin,
    canActivate: [adminGuard],

   children: [

  {
    path: '',
    redirectTo: 'avocats',
    pathMatch: 'full'
  },

  {
    path: 'avocats',
    component: AdminAvocats
  },

  {
    path: 'ajouter-avocat',
    component: AdminAjouterAvocat
  },

  {
    path: 'rendez-vous',
    component: AdminRendezVous
  }

]
  }
];