import { Component } from '@angular/core';
import { AvocatCard } from '../avocat-card/avocat-card';
import { Avocat } from '../models/avocat';

@Component({
  selector: 'app-avocat-list',
  standalone: true,
  imports: [AvocatCard],
  templateUrl: './avocat-list.html',
  styleUrl: './avocat-list.css'
})
export class AvocatList {

  avocats: Avocat[] = [];

}