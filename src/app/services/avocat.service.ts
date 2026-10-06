import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Avocat } from '../models/avocat';


@Injectable({
    providedIn: 'root'
})

export class AvocatService {

    // Adresse de notre API backend
    private apiUrl = 'http://localhost:5000/api/avocats';


    // Stocke les avocats trouvés après une recherche
    private avocatsRecherche: Avocat[] = [];


    // HttpClient permet d'envoyer des requêtes HTTP à notre API
    constructor(private http: HttpClient) {}


    // Récupère un avocat grâce à son identifiant
    getAvocatById(id: string): Observable<Avocat> {

        // Exemple : /api/avocats/5
        return this.http.get<Avocat>(
            `${this.apiUrl}/${id}`
        );

    }


    // Recherche les avocats selon
    // la spécialisation et la ville
    chercherAvocats(
        specialisation: string,
        ville: string
    ): Observable<Avocat[]> {

        // Prépare les paramètres envoyés au backend
        const params = new HttpParams()
            .set('specialisation', specialisation)
            .set('ville', ville);


        // Envoie la requête vers l'API
        return this.http.get<Avocat[]>(
            this.apiUrl,
            { params }
        );

    }


    // Sauvegarde les résultats de la recherche
    // pour pouvoir les afficher dans la liste
    setAvocatsRecherche(avocats: Avocat[]) {

        this.avocatsRecherche = avocats;

    }


    // Retourne les résultats de la dernière recherche
    getAvocatsRecherche(): Avocat[] {

        return this.avocatsRecherche;

    }

}