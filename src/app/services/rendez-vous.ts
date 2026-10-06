import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class RendezVous {

  constructor(private http: HttpClient) {}
        getMesRendezVous() {

  const token = localStorage.getItem('token');

  return this.http.get(
    'http://localhost:5000/api/rendez-vous/mes-rendez-vous',
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

        }
      

  creerRendezVous(rendezvous: any) {

    // Récupère le token enregistré après connexion
    const token = localStorage.getItem('token');

    // Envoie le rendez-vous au backend avec le token
    return this.http.post(
      'http://localhost:5000/api/rendez-vous',
      rendezvous,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }

      }

    );
            

  }

}