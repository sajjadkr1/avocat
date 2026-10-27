import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})


export class RendezVous {

  private apiUrl =
    'http://localhost:5000/api/rendez-vous';


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


  getMesRendezVous() {

    return this.http.get(
      `${this.apiUrl}/mes-rendez-vous`,
      {
        headers: this.getHeaders()
      }
    );

  }


  creerRendezVous(
    rendezvous: any
  ) {

    return this.http.post(
      this.apiUrl,

      rendezvous,

      {
        headers: this.getHeaders()
      }
    );

  }

}