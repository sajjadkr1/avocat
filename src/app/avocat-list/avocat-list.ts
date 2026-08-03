import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AvocatCard } from '../avocat-card/avocat-card';
import { Avocat } from '../models/avocat';
import { AvocatService } from '../services/avocat.service';



@Component({

  selector: 'app-avocat-list',

  standalone: true,

  imports: [
    CommonModule,
    AvocatCard
  ],

  templateUrl: './avocat-list.html',

  styleUrls: ['./avocat-list.css']

})



export class AvocatList implements OnInit {



  // Tableau qui contient la liste des avocats à afficher
  avocats: Avocat[] = [];



  // Variable qui contient l'avocat sélectionné
  selectedAvocat!: Avocat;




  constructor(


    // Injection du service qui contient les données des avocats
    private avocatService: AvocatService


  ) {}






  // Méthode exécutée automatiquement au chargement du composant

  ngOnInit(): void {



    // Récupérer les résultats de recherche depuis le service

    const resultats = this.avocatService.getAvocatsRecherche();





    if(resultats.length > 0) {



      this.avocats = resultats;



      console.log(
        "RESULTATS RECHERCHE:",
        this.avocats
      );



    } else {



      // Récupérer tous les avocats depuis json-server


      this.avocatService.getAvocats()

      .subscribe((data: Avocat[]) => {



        this.avocats = data;



        console.log(
          "DATA:",
          this.avocats
        );



      });



    }






    console.log(

      "Nombre des avocats:",

      this.avocats.length

    );



  }








  // Méthode appelée quand l'utilisateur clique sur un avocat

  showDetails(avocat: Avocat): void {



    // Stocker l'avocat choisi pour afficher ses détails

    this.selectedAvocat = avocat;



  }



}