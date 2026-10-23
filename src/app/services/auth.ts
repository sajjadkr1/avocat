import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})


export class Auth {

  constructor(
    private http: HttpClient
  ) {}


  // =========================
  // CONNEXION
  // =========================

  login(
    email: string,
    password: string
  ) {

    // Prépare les données
    // de l'utilisateur
    const utilisateur = {

      email: email,

      mot_de_passe: password

    };


    // Envoie les informations
    // au backend
    return this.http.post<any>(

      'http://localhost:5000/api/utilisateurs/login',

      utilisateur

    );

  }


  // =========================
  // INSCRIPTION
  // =========================

  register(
    nom: string,
    prenom: string,
    email: string,
    password: string
  ) {

    // Prépare les données
    // du nouvel utilisateur
    const utilisateur = {

      nom: nom,

      prenom: prenom,

      email: email,

      mot_de_passe: password

    };


    // Envoie les informations
    // au backend
    return this.http.post<any>(

      'http://localhost:5000/api/utilisateurs/register',

      utilisateur

    );

  }

}