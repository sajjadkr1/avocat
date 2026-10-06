import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Auth } from '../services/auth';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})

export class Login {

  email = '';
  password = '';
  emailError = false;
  passwordError = false;
  loginError = '';

  constructor(
    private router: Router,
    private auth: Auth
  ) {}

  seConnecter() {

    // Vérifie le format de l'email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    this.emailError =
      this.email === '' || !emailPattern.test(this.email);


    // Vérifie le format du mot de passe
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    this.passwordError =
      this.password === '' || !passwordPattern.test(this.password);


    // Envoie les données seulement si elles sont valides
    if (!this.emailError && !this.passwordError) {

      this.auth.login(this.email, this.password)
        .subscribe({

          next: (response) => {

            // Enregistre le token après connexion
            localStorage.setItem('token', response.token);

            // Retourne à la page d'accueil
            this.router.navigate(['/']);

          },

          error: (error) => {
           // console.log(error);
            this.loginError = 'Email ou mot de passe incorrect';
          }

        });

    }

  }

}