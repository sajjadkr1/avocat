import {
  CanActivateFn,
  Router
} from '@angular/router';

import { inject } from '@angular/core';


export const adminGuard: CanActivateFn = () => {

  const router = inject(Router);


  const token =
    localStorage.getItem('token');


  // Pas de token
  if (!token) {

    return router.createUrlTree([
      '/login'
    ]);

  }


  try {

    // Récupérer le payload du JWT
    const payload = JSON.parse(
      atob(
        token.split('.')[1]
      )
    );


    // Vérifier si le token est expiré
    const maintenant =
      Math.floor(
        Date.now() / 1000
      );


    if (
      payload.exp &&
      payload.exp < maintenant
    ) {

      localStorage.removeItem(
        'token'
      );


      return router.createUrlTree([
        '/login'
      ]);

    }


    // Vérifier le rôle admin
    if (
      payload.role === 'admin'
    ) {

      return true;

    }


    return router.createUrlTree([
      '/login'
    ]);


  } catch (error) {

    // Token invalide ou mal formé
    localStorage.removeItem(
      'token'
    );


    return router.createUrlTree([
      '/login'
    ]);

  }

};