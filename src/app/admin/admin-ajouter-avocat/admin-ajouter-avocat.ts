import {
  Component,
  ChangeDetectorRef
} from '@angular/core';

import { FormsModule } from '@angular/forms';
import { AdminService } from '../../services/admin.service';


@Component({
  selector: 'app-admin-ajouter-avocat',

  imports: [
    FormsModule
  ],

  templateUrl: './admin-ajouter-avocat.html',
  styleUrl: './admin-ajouter-avocat.css',
})


export class AdminAjouterAvocat {

  nouvelAvocat = {

    nom: '',

    prenom: '',

    email: '',

    ville: '',

    portable: ''

  };


  constructor(

    private adminService: AdminService,

    private cdr: ChangeDetectorRef

  ) {}


  ajouterAvocat() {

    this.adminService
      .addAvocat(
        this.nouvelAvocat
      )

      .subscribe({

        next: () => {

          this.nouvelAvocat = {

            nom: '',

            prenom: '',

            email: '',

            ville: '',

            portable: ''

          };


          this.cdr.detectChanges();

        }

      });

  }

}