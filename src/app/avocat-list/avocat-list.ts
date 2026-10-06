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



  // Tableau qui contient les avocats à afficher
  avocats: Avocat[] = [];





  constructor(

    // Service qui contient les données des avocats
    private avocatService: AvocatService

  ) {}






  // Cette méthode s'exécute automatiquement au chargement de la page

  ngOnInit(): void {



    // Récupérer les résultats de recherche sauvegardés dans le service

    const resultatsRecherche = this.avocatService.getAvocatsRecherche();




    console.log(
      "Résultats sauvegardés :",
      resultatsRecherche
    );





    // Si l'utilisateur a effectué une recherche

    if (resultatsRecherche.length > 0) {



      this.avocats = resultatsRecherche;



      console.log(
        "Avocats affichés après recherche :",
        this.avocats
      );



    } 



    // Sinon charger tous les avocats

    else {



      const avocats$ = this.avocatService.getAvocats() as any;

      if (avocats$ && typeof avocats$.subscribe === 'function') {

        avocats$.subscribe({

          next: (data: Avocat[]) => {


            this.avocats = data;



            console.log(
              "Tous les avocats :",
              this.avocats
            );


          },


          error: (err: unknown) => {


            console.error(
              "Erreur récupération des avocats :",
              err
            );


          }


        });

      } else {

        console.warn('Le service ne retourne pas un Observable pour getAvocats().');

      }



    }



  }



}