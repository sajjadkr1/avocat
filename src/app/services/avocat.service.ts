import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Avocat } from '../models/avocat';


@Injectable({
  providedIn: 'root'
})
export class AvocatService {

  private url = 'avocats.json';

  // Stocker les résultats de la recherche
  private avocatsRecherche: Avocat[] = [];


  constructor(private http: HttpClient) {}


  // Récupérer la liste complète des avocats
  getAvocats(): Observable<Avocat[]> {

    return this.http.get<Avocat[]>(this.url);

  }


  // Rechercher les avocats selon leur spécialité
  getAvocatsBySpecialite(specialite: string): Observable<Avocat[]> {

    return this.http
      .get<Avocat[]>(this.url)
      .pipe(
        map(avocats =>
          avocats.filter(
            avocat => avocat.specialite === specialite
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