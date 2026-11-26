import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})


export class Auth {

  private apiUrl =
    'http://localhost:5000/api/utilisateurs';


  constructor(
    private http: HttpClient
  ) {}

  private getHeaders() {


    const token = localStorage.getItem('token');

    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  getProfil() {

    return this.http.get(`${this.apiUrl}/me`, {
      headers: this.getHeaders()
    });
  }

  modifierProfil(utilisateur: any) {

    return this.http.put(`${this.apiUrl}/me`,
    utilisateur,
  {
    headers: this.getHeaders()
  });
  }

  login(
    email: string,
    password: string
  ) {

    const utilisateur = {
      email: email,
      mot_de_passe: password
    };


    return this.http.post<any>(
      `${this.apiUrl}/login`,
      utilisateur
    );

  }


  register(
    nom: string,
    prenom: string,
    email: string,
    password: string
  ) {

    const utilisateur = {
      nom: nom,
      prenom: prenom,
      email: email,
      mot_de_passe: password
    };


    return this.http.post<any>(
      `${this.apiUrl}/register`,
      utilisateur
    );

  }

}