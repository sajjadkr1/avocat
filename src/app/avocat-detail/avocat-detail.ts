import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import {
  ActivatedRoute
} from '@angular/router';

import {
  CommonModule
} from '@angular/common';

import {
  FormsModule
} from '@angular/forms';

import {
  AvocatService
} from '../services/avocat.service';

import {
  Avocat
} from '../models/avocat';

import {
  RendezVous
} from '../services/rendez-vous';


@Component({
  selector: 'app-avocat-detail',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule
  ],

  templateUrl: './avocat-detail.html',

  styleUrl: './avocat-detail.css'
})


export class AvocatDetail implements OnInit {

  avocatDetail: Avocat | null = null;


  afficherRendezVous = false;


  messageSucces = '';

  messageErreur = '';


  date_rendez_vous = '';

  heure_rendez_vous = '';

  motif = '';


  constructor(

    private route: ActivatedRoute,

    private avocatService: AvocatService,

    private cdr: ChangeDetectorRef,

    private rendezVousService: RendezVous

  ) {}


  ngOnInit(): void {

    // Récupérer l'id de l'avocat
    // depuis l'URL
    const id =
      this.route.snapshot.paramMap.get('id');


    if (id) {

      this.avocatService
        .getAvocatById(id)
        .subscribe({

          next: (data) => {

            this.avocatDetail = data;

            this.cdr.detectChanges();

          },

          error: (error) => {

            console.log(error);

            this.messageErreur =
              'Erreur lors du chargement des informations de l’avocat';

            this.cdr.detectChanges();

          }

        });

    }

  }


  ouvrirRendezVous() {

    // Réinitialiser les messages
    this.messageSucces = '';

    this.messageErreur = '';


    // Afficher le formulaire
    this.afficherRendezVous = true;

  }


  confirmerRendezVous() {

    // Réinitialiser les messages
    this.messageSucces = '';

    this.messageErreur = '';


    // Vérifier que l'avocat existe
    if (!this.avocatDetail) {

      this.messageErreur =
        'Impossible de récupérer les informations de l’avocat';

      return;

    }


    // Vérifier les champs obligatoires
    if (
      !this.date_rendez_vous ||
      !this.heure_rendez_vous ||
      !this.motif.trim()
    ) {

      this.messageErreur =
        'Veuillez remplir tous les champs du rendez-vous';

      return;

    }


    // Vérifier que la date
    // n'est pas dans le passé
    const dateSelectionnee =
      new Date(
        `${this.date_rendez_vous}T${this.heure_rendez_vous}`
      );


    const maintenant =
      new Date();


    if (
      dateSelectionnee <= maintenant
    ) {

      this.messageErreur =
        'Veuillez choisir une date et une heure futures';

      return;

    }


    // Préparer les données
    const rendezvous = {

      id_avocat:
        this.avocatDetail.id_avocat,

      date_rendez_vous:
        this.date_rendez_vous,

      heure_rendez_vous:
        this.heure_rendez_vous,

      motif:
        this.motif.trim()

    };


    // Envoyer le rendez-vous
    // au backend
    this.rendezVousService
      .creerRendezVous(
        rendezvous
      )
      .subscribe({

        next: () => {

          this.messageSucces =
            'Votre rendez-vous a été réservé avec succès';


          // Fermer le formulaire
          this.afficherRendezVous =
            false;


          // Réinitialiser les champs
          this.date_rendez_vous = '';

          this.heure_rendez_vous = '';

          this.motif = '';


          this.cdr.detectChanges();

        },


        error: (error) => {

          if (
            error.status === 401
          ) {

            this.messageErreur =
              'Vous devez être connecté pour réserver un rendez-vous';

          } else if (
            error.status === 400
          ) {

            this.messageErreur =
              error.error?.error ||
              'Les informations du rendez-vous sont invalides';

          } else {

            this.messageErreur =
              error.error?.error ||
              'Erreur lors de la réservation du rendez-vous';

          }


          this.cdr.detectChanges();

        }

      });

  }

}