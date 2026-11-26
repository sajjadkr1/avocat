import { Component, OnInit } from '@angular/core';
import { Auth } from '../../services/auth';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-mon-compte',
  imports: [CommonModule],
  templateUrl: './mon-compte.html',
  styleUrl: './mon-compte.css',
 
})
export class MonCompte implements OnInit {
  utilisateur: any = null;

constructor(
  private auth: Auth,
  private cdr: ChangeDetectorRef
){}

ngOnInit(): void {
  
  this.auth.getProfil().subscribe({
   next: (response: any) => {
  console.log('Réponse API :', response);

  this.utilisateur = response.utilisateur;
  this.cdr.detectChanges();

  console.log('Utilisateur chargé :', this.utilisateur);
},
   error: (err) => {
  console.log('Erreur chargement profil :', err);
}
  });
}
}
