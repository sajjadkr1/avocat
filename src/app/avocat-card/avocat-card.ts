import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Avocat } from '../models/avocat';


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


  @Input() avocat!: Avocat;


  detailsVisible = false;



  afficherDetails(){

    this.detailsVisible = !this.detailsVisible;

  }


}