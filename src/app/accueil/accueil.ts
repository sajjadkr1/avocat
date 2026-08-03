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

  styleUrl: './accueil.css'

})


export class Accueil {



  // Problème juridique choisi par l'utilisateur
  problemeSelectionne = '';



  // Ville choisie par l'utilisateur
  villeSelectionnee = '';



  // Afficher ou cacher la zone de recherche
  afficherRecherche = false;





  constructor(



    // Service qui récupère les données des avocats
    private avocatService: AvocatService,



    // Service Angular pour changer de page
    private router: Router



  ) {}








  // Affichage de la zone recherche

  ouvrirRecherche() {


    this.afficherRecherche = true;



    setTimeout(() => {


      this.scrollToSearch();


    }, 100);



  }









  // Déplacer l'utilisateur vers la zone de recherche

  scrollToSearch() {



    const element = document.getElementById('search');



    element?.scrollIntoView({


      behavior: 'smooth',


      block: 'start'


    });



  }









  // Rechercher les avocats selon le problème et la ville

  chercherAvocat() {



    this.avocatService



      .chercherAvocats(

        this.problemeSelectionne,

        this.villeSelectionnee

      )



      .subscribe((data: Avocat[]) => {




        // Vérifier les résultats

        console.log(data);





        // Sauvegarder les résultats

        this.avocatService.setAvocatsRecherche(data);





        // Aller vers la page des avocats

        this.router.navigate(['/avocats']);




      });



  }




}