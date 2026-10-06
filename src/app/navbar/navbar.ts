import {
    Component,
    ChangeDetectorRef,
    HostListener,
    ViewChild,
    ElementRef
} from '@angular/core';

import {
    Router,
    RouterLink,
    NavigationEnd
} from '@angular/router';

import { filter } from 'rxjs/operators';

import { RendezVous } from '../services/rendez-vous';


@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [
        RouterLink
    ],
    templateUrl: './navbar.html',
    styleUrl: './navbar.css',
})


export class Navbar {

    // Indique si l'utilisateur se trouve sur la page de connexion
    isLoginPage = false;


    // Indique si l'utilisateur est connecté
    isLoggedIn = false;


    // Stocke les rendez-vous récupérés depuis le backend
    mesRendezVous: any[] = [];


    // Contrôle l'affichage de la fenêtre des rendez-vous
    afficherMesRendezVous = false;


    // Référence vers le bouton "Mes rendez-vous"
    @ViewChild('mesRendezVousButton')
    mesRendezVousButton!: ElementRef;


    // Référence vers la fenêtre des rendez-vous
    @ViewChild('rendezVousPopup')
    rendezVousPopup!: ElementRef;


    constructor(
        private router: Router,
        private cdr: ChangeDetectorRef,
        private rendezVousService: RendezVous
    ) {

        // Vérifie si nous sommes sur la page de connexion
        // lors du premier chargement
        this.isLoginPage =
            window.location.pathname === '/login';


        // Vérifie si l'utilisateur est connecté
        this.checkLogin();


        // Écoute les changements de page dans Angular
        this.router.events
            .pipe(
                filter(event => event instanceof NavigationEnd)
            )
            .subscribe((event: any) => {

                // Vérifie si la nouvelle page est la page de connexion
                this.isLoginPage =
                    event.urlAfterRedirects === '/login';


                // Vérifie à nouveau l'état de connexion
                this.checkLogin();


                // Met à jour l'affichage de la navbar
                this.cdr.detectChanges();

            });

    }


    // Ouvre ou ferme la fenêtre "Mes rendez-vous"
    ouvrirMesRendezVous() {

        // Si la fenêtre est déjà ouverte,
        // on la ferme
        if (this.afficherMesRendezVous) {

            this.afficherMesRendezVous = false;

            return;
        }


        // Récupère les rendez-vous depuis le backend
        this.rendezVousService
            .getMesRendezVous()
            .subscribe({

                next: (response: any) => {

                    // Stocke les rendez-vous reçus
                    this.mesRendezVous = response;


                    // Affiche la fenêtre
                    this.afficherMesRendezVous = true;


                    // Met à jour l'affichage
                    this.cdr.detectChanges();

                },


                error: (error) => {

                    console.log(
                        'Erreur lors de la récupération des rendez-vous :',
                        error
                    );

                }

            });

    }


    // Détecte les clics sur la page
    @HostListener('document:click', ['$event'])
    fermerPopup(event: MouseEvent) {

        // Si la fenêtre est fermée,
        // il n'y a rien à faire
        if (!this.afficherMesRendezVous) {
            return;
        }


        const target = event.target as Node;


        // Vérifie si le clic est effectué
        // à l'intérieur de la fenêtre
        const clicDansPopup =
            this.rendezVousPopup?.nativeElement.contains(target);


        // Vérifie si le clic est effectué
        // sur le bouton "Mes rendez-vous"
        const clicSurBouton =
            this.mesRendezVousButton?.nativeElement.contains(target);


        // Ferme la fenêtre si le clic
        // est effectué à l'extérieur
        if (!clicDansPopup && !clicSurBouton) {

            this.afficherMesRendezVous = false;

            this.cdr.detectChanges();

        }

    }


    // Vérifie si l'utilisateur est connecté
    private checkLogin() {

        // Un utilisateur est considéré comme connecté
        // si un token existe dans le localStorage
        this.isLoggedIn =
            !!localStorage.getItem('token');

    }


    // Déconnecte l'utilisateur
    seDeconnecter() {

        // Supprime le token
        localStorage.removeItem('token');


        // Met à jour l'état de connexion
        this.checkLogin();


        // Ferme la fenêtre des rendez-vous
        this.afficherMesRendezVous = false;


        // Retourne à la page d'accueil
        this.router.navigate(['/']);

    }

}