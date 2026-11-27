import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Auth } from '../../services/auth';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-mon-compte',
  imports: [CommonModule, FormsModule],
  templateUrl: './mon-compte.html',
  styleUrl: './mon-compte.css',
 
})
export class MonCompte implements OnInit {
  utilisateur: any = null;
modeModification: boolean = false;
suppressionEnCours: boolean = false;

utilisateurModifie: any = {
  nom: '',
  prenom: '',
  email: '',
  telephone: ''
};

constructor(
  private auth: Auth,
  private cdr: ChangeDetectorRef,
  private router: Router
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
activerModification(): void {
  this.utilisateurModifie = { ...this.utilisateur };
  this.modeModification = true;
}

annulerModification(): void {
  this.modeModification = false;
}

enregistrerModification(form: NgForm): void {

  if (form.invalid) {
    return;
  }

  if (
    !this.utilisateurModifie.nom.trim() ||
    !this.utilisateurModifie.prenom.trim() ||
    !this.utilisateurModifie.email.trim()
  ) {
    return;
  }

  this.auth.modifierProfil(this.utilisateurModifie).subscribe({

    next: (response: any) => {

      console.log('Profil modifié :', response);

      this.utilisateur = { ...this.utilisateurModifie };
      this.modeModification = false;

      this.cdr.detectChanges();

      alert('Profil modifié avec succès');
    },

    error: (err) => {

      console.log('Erreur modification profil :', err);

      alert(err.error?.error || 'Erreur lors de la modification du profil');
    }

  });
}
 
supprimerCompte(): void {

  const confirmation = confirm(
    'Êtes-vous sûr de vouloir supprimer définitivement votre compte ?'
  );

  if (!confirmation) {
    return;
  }

  this.suppressionEnCours = true;

  this.auth.supprimerProfil().subscribe({

    next: () => {

      alert('Votre compte a été supprimé avec succès');

      localStorage.removeItem('token');

      this.router.navigate(['/login']);

    },

    error: (err) => {

      console.log('Erreur suppression compte :', err);

      this.suppressionEnCours = false;

      alert(
        err.error?.error ||
        'Erreur lors de la suppression du compte'
      );

    }

  });

}
}

