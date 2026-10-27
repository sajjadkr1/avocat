import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})


export class AdminService {

  private apiUrl =
    'http://localhost:5000/api/admin';


  constructor(
    private http: HttpClient
  ) {}


  private getHeaders() {

    const token =
      localStorage.getItem('token');


    return new HttpHeaders({
      Authorization:
        `Bearer ${token}`
    });

  }


  getAllAvocats() {

    return this.http.get(
      `${this.apiUrl}/avocats`,
      {
        headers: this.getHeaders()
      }
    );

  }


  deleteAvocat(id: number) {

    return this.http.delete(
      `${this.apiUrl}/avocats/${id}`,
      {
        headers: this.getHeaders()
      }
    );

  }


  updateAvocat(
    id: number,
    avocat: any
  ) {

    return this.http.put(
      `${this.apiUrl}/avocats/${id}`,
      avocat,
      {
        headers: this.getHeaders()
      }
    );

  }


  addAvocat(avocat: any) {

    return this.http.post(
      `${this.apiUrl}/avocats`,
      avocat,
      {
        headers: this.getHeaders()
      }
    );

  }


  getAllRendezVous() {

    return this.http.get(
      `${this.apiUrl}/rendez-vous`,
      {
        headers: this.getHeaders()
      }
    );

  }


  updateStatutRendezVous(
    id: number,
    statut: string
  ) {

    return this.http.put(
      `${this.apiUrl}/rendez-vous/${id}/statut`,

      {
        statut: statut
      },

      {
        headers: this.getHeaders()
      }

    );

  }

}