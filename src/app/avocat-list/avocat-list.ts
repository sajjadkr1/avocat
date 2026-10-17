import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
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
    private avocatService: AvocatService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef

  ) { }






  // Cette méthode s'exécute automatiquement au chargement de la page

  ngOnInit(): void {
    // Lire les critères conservés dans le lien
    const ville = this.route.snapshot.queryParamMap.get('ville');
    const specialisation =
      this.route.snapshot.queryParamMap.get('specialisation');

    if (ville && specialisation) {
      // Relancer la même recherche, même après F5
      this.avocatService
        .chercherAvocats(specialisation, ville)
        .subscribe({
          next: (data: Avocat[]) => {
            this.avocats = data;
            this.avocatService.setAvocatsRecherche(data);
            this.cdr.markForCheck();
          },
          error: (err: unknown) => {
            console.error(
              'Erreur récupération des avocats :',
              err
            );
          }
        });
    } else {
      // Ancien lien sans critères : utiliser les résultats en mémoire
      this.avocats = this.avocatService.getAvocatsRecherche();
    }
  }
}
