import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AvocatService } from '../services/avocat.service';
import { Avocat } from '../models/avocat';
import { RendezVous } from '../services/rendez-vous';

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

  ouvrirRendezVous() {

    // Affiche le formulaire de rendez-vous
    this.afficherRendezVous = true;

  }

  confirmerRendezVous() {

    // Vérifie que les informations de l'avocat sont disponibles
    if (!this.avocatDetail) {
      return;
    }

    // Prépare les données du rendez-vous
    const rendezvous = {
      id_avocat: this.avocatDetail.id_avocat,
      date_rendez_vous: this.date_rendez_vous,
      heure_rendez_vous: this.heure_rendez_vous,
      motif: this.motif
    };

    // Envoie le rendez-vous au backend
    this.rendezVousService
      .creerRendezVous(rendezvous)
      .subscribe({

        next: (response) => {

          this.messageSucces =
            'Votre rendez-vous a été réservé avec succès';

          this.afficherRendezVous = false;
          this.cdr.detectChanges();

        },

        error: (error) => {
          console.log(error);
        }

      });

  }

  avocatDetail: Avocat | null = null;

  afficherRendezVous = false;
  messageSucces = '';

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

    // Récupère l'id de l'avocat depuis l'URL
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {

      // Récupère les informations de l'avocat
      this.avocatService
        .getAvocatById(id)
        .subscribe(data => {

          this.avocatDetail = data;

          // Met à jour l'affichage
          this.cdr.detectChanges();

        });

    }

  }

}