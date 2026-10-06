import { Routes } from '@angular/router';

import { Login } from './login/login';
import { Accueil } from './accueil/accueil';
import { AvocatList } from './avocat-list/avocat-list';
import { AvocatDetail } from './avocat-detail/avocat-detail';
import { Contact } from './contact/contact';
import { About } from './about/about';


export const routes: Routes = [

    // Page d'accueil
    {
        path: '',
        component: Accueil
    },


    // Liste des avocats
    {
        path: 'avocats',
        component: AvocatList
    },


    // Détail d'un avocat
    {
        path: 'avocat/:id',
        component: AvocatDetail
    },


    // Page de connexion
    {
        path: 'login',
        component: Login
    },


    // Page de contact
    {
        path: 'contact',
        component: Contact
    },


    // Page À propos
    {
        path: 'about',
        component: About
    }

];