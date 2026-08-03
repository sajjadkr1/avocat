import { Routes } from '@angular/router';
import { Contact } from './contact/contact';

import { Accueil } from './accueil/accueil';
import { AvocatList } from './avocat-list/avocat-list';

export const routes: Routes = [

  {
    path: 'contact',
    component: Contact
  },

  {
    path: 'accueil',
    component: Accueil
  },

  {
    path: 'avocats',
    component: AvocatList

  },

];