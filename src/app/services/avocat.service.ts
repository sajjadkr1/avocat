import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { Avocat } from '../models/avocat';



@Injectable({
  providedIn: 'root'
})
export class AvocatService {



  private apiUrl = "http://localhost:3000/avocats";


  private avocatsRecherche: Avocat[] = [];



  constructor(private http: HttpClient) { }





  // Récupérer la liste complète des avocats

  getAvocats(): Observable<Avocat[]> {


    return this.http.get<Avocat[]>(this.apiUrl);


  }






  // Rechercher les avocats selon la spécialité et la ville

  chercherAvocats(
    specialite: string,
    ville: string
  ): Observable<Avocat[]> {



    return this.http

      .get<Avocat[]>(this.apiUrl)

      .pipe(

        map(avocats =>


          avocats.filter(

            avocat =>

              avocat.specialite === specialite &&

              avocat.ville.toLowerCase() === ville.toLowerCase()


          )


        )


      );


  }






  // Sauvegarder les résultats de la recherche

  setAvocatsRecherche(avocats: Avocat[]) {


    this.avocatsRecherche = avocats;


  }







  // Récupérer les résultats de la recherche

  getAvocatsRecherche(): Avocat[] {


    return this.avocatsRecherche;


  }



}