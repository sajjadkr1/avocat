import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Avocat } from '../models/avocat';
import { Router } from '@angular/router';


@Component({
  selector: 'app-avocat-card',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './avocat-card.html',
  styleUrls: ['./avocat-card.css']
})


export class AvocatCard {


  // Recevoir les informations d'un avocat depuis le composant parent
  @Input() avocat!: Avocat;



  // Afficher ou cacher les détails
  detailsVisible = false;



  constructor(
    private router: Router
  ) {}




  // Aller vers la page détail de l'avocat

 voirDetail() {

  console.log("AVOCAT CLIQUE :", this.avocat);
  console.log("ID AVOCAT :", this.avocat.id_avocat);

  this.router.navigate([
    '/avocat',
    this.avocat.id_avocat
  ]);

}





  // Afficher les détails dans le même composant

  afficherDetails() {

    this.detailsVisible = !this.detailsVisible;

  }


}