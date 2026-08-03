import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AvocatService } from '../services/avocat.service';
import { Avocat } from '../models/avocat';


@Component({
  selector: 'app-accueil',
  standalone: true,

  imports: [
    FormsModule
  ],

  templateUrl: './accueil.html',
  styleUrl: './accueil.css',
})


export class Accueil {


  // Problème juridique choisi par l'utilisateur
  problemeSelectionne = '';



  constructor(
    // Service qui récupère et partage les données des avocats
    private avocatService: AvocatService,

    // Service Angular utilisé pour changer de page
    private router: Router
  ) {}



  // Rechercher les avocats selon le problème choisi
  chercherAvocat() {


    this.avocatService
      .getAvocatsBySpecialite(this.problemeSelectionne)

      .subscribe((data: Avocat[]) => {


        // Vérifier les résultats dans la console
        console.log(data);



        // Sauvegarder les résultats de recherche
        this.avocatService.setAvocatsRecherche(data);



        // Aller vers la page de la liste des avocats
        this.router.navigate(['/avocats']);


      });


  }


}