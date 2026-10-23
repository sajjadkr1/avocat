import {
  Component,
  ChangeDetectorRef,
  NgZone
} from '@angular/core';

import { FormsModule } from '@angular/forms';

import {
  Router,
  RouterModule
} from '@angular/router';

import { Auth } from '../services/auth';


@Component({
  selector: 'app-login',

  imports: [
    FormsModule,
    RouterModule
  ],

  templateUrl: './login.html',

  styleUrl: './login.css',
})


export class Login {


  // =========================
  // MODE CONNEXION / INSCRIPTION
  // =========================

  mode = 'login';


  // =========================
  // CONNEXION
  // =========================

  email = '';

  password = '';


  emailError = false;

  passwordError = false;


  loginError = '';


  // Affiche ou masque
  // le mot de passe de connexion
  showPassword = false;


  // =========================
  // INSCRIPTION
  // =========================

  registerNom = '';

  registerPrenom = '';

  registerEmail = '';

  registerPassword = '';

  confirmPassword = '';


  registerError = '';

  registerSuccess = '';


  // Affiche ou masque
  // le mot de passe d'inscription
  showRegisterPassword = false;


  // Affiche ou masque
  // la confirmation du mot de passe
  showConfirmPassword = false;


  constructor(

    private router: Router,

    private auth: Auth,

    private cdr: ChangeDetectorRef,

    private ngZone: NgZone

  ) {}


  // =========================
  // CONNEXION
  // =========================

  seConnecter() {


    // Vérifie le format de l'email
    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    this.emailError =
      this.email === '' ||
      !emailPattern.test(
        this.email
      );


    // Vérifie le format du mot de passe
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;


    this.passwordError =
      this.password === '' ||
      !passwordPattern.test(
        this.password
      );


    // Envoie les données seulement
    // si elles sont valides
    if (
      !this.emailError &&
      !this.passwordError
    ) {

      this.auth
        .login(
          this.email,
          this.password
        )
        .subscribe({


          next: (response) => {


            this.ngZone.run(() => {


              // Enregistre le token
              // après connexion
              localStorage.setItem(
                'token',
                response.token
              );


              // Redirige selon
              // le rôle de l'utilisateur
              if (
                response.utilisateur.role ===
                'admin'
              ) {

                this.router.navigate([
                  '/admin'
                ]);

              } else {

                this.router.navigate([
                  '/'
                ]);

              }


              this.cdr.detectChanges();

            });

          },


          error: () => {


            this.ngZone.run(() => {

              this.loginError =
                'Email ou mot de passe incorrect';


              this.cdr.detectChanges();

            });

          }

        });

    }

  }


  // =========================
  // INSCRIPTION
  // =========================

  sInscrire() {


    this.registerError = '';

    this.registerSuccess = '';


    // Vérifie que tous
    // les champs sont remplis
    if (
      !this.registerNom ||
      !this.registerPrenom ||
      !this.registerEmail ||
      !this.registerPassword ||
      !this.confirmPassword
    ) {

      this.registerError =
        'Veuillez remplir tous les champs';

      return;

    }


    // Vérifie le format de l'email
    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (
      !emailPattern.test(
        this.registerEmail
      )
    ) {

      this.registerError =
        'Adresse email invalide';

      return;

    }


    // Vérifie le format
    // du mot de passe
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;


    if (
      !passwordPattern.test(
        this.registerPassword
      )
    ) {

      this.registerError =
        'Le mot de passe doit contenir au moins 8 caractères, une majuscule et un chiffre';

      return;

    }


    // Vérifie que les deux
    // mots de passe sont identiques
    if (
      this.registerPassword !==
      this.confirmPassword
    ) {

      this.registerError =
        'Les mots de passe ne correspondent pas';

      return;

    }


    // Envoie les données
    // vers le service Auth
    this.auth
      .register(
        this.registerNom,
        this.registerPrenom,
        this.registerEmail,
        this.registerPassword
      )
      .subscribe({


        next: () => {


          this.ngZone.run(() => {


            this.registerSuccess =
              'Compte créé avec succès';


            // Retourne automatiquement
            // au formulaire de connexion
            this.mode = 'login';


            // Pré-remplit l'email
            // pour faciliter la connexion
            this.email =
              this.registerEmail;


            // Réinitialise
            // les champs d'inscription
            this.registerNom = '';

            this.registerPrenom = '';

            this.registerEmail = '';

            this.registerPassword = '';

            this.confirmPassword = '';


            // Force Angular à mettre
            // l'interface à jour immédiatement
            this.cdr.detectChanges();

          });

        },


        error: (error) => {


          this.ngZone.run(() => {


            if (
              error.status === 409
            ) {

              this.registerError =
                'Cette adresse email est déjà utilisée';

            } else {

              this.registerError =
                'Erreur lors de la création du compte';

            }


            this.cdr.detectChanges();

          });

        }

      });

  }

}