import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({

    providedIn: 'root'
}
)
export class Auth {
    constructor(private http: HttpClient) {}
login(email: string, password: string) {
  
 // Prépare les données de l'utilisateur
  const utilisateur = {
    email: email,
    mot_de_passe: password
  };

// Envoie les informations au backend
  return this.http.post<any>(
    'http://localhost:5000/api/utilisateurs/login',
    utilisateur
  );
}

}