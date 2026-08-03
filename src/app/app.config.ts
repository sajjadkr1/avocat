import { ApplicationConfig } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';


export const appConfig: ApplicationConfig = {

  providers: [

    provideRouter(
      routes,

      // Permet de remettre la page en haut
      // après un changement de route
      withInMemoryScrolling({

        scrollPositionRestoration: 'top',

        anchorScrolling: 'enabled'

      })

    )

  ]

};