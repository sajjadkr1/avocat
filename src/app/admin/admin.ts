import {
  Component,
  OnInit,
  ChangeDetectorRef,
  NgZone,
  ViewChild,
  ElementRef
} from '@angular/core';

import { AdminService } from '../services/admin.service';
import { FormsModule } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';

import {
  AllCommunityModule,
  ModuleRegistry
} from 'ag-grid-community';


ModuleRegistry.registerModules([
  AllCommunityModule
]);


@Component({
  selector: 'app-admin',
  templateUrl: './admin.html',
  styleUrl: './admin.css',
  imports: [
    FormsModule,
    AgGridAngular
  ],
})


export class Admin implements OnInit {

  avocats: any[] = [];

  afficherFormulaireAjout = false;


  columnDefs = [

    {
      field: 'nom',
      headerName: 'Nom',
      sortable: true,
      filter: true
    },

    {
      field: 'prenom',
      headerName: 'Prénom',
      sortable: true,
      filter: true
    },

    {
      field: 'email',
      headerName: 'Email',
      sortable: true,
      filter: true
    },

    {
      field: 'ville',
      headerName: 'Ville',
      sortable: true,
      filter: true
    },

    {
      field: 'portable',
      headerName: 'Portable',
      sortable: true,
      filter: true
    },

    {
      headerName: 'Actions',

      cellRenderer: (params: any) => {

        const container =
          document.createElement('div');


        const btnModifier =
          document.createElement('button');

        btnModifier.textContent =
          'Modifier';


        const btnSupprimer =
          document.createElement('button');

        btnSupprimer.textContent =
          'Supprimer';


        btnModifier.addEventListener(
          'click',
          () => {

            this.ngZone.run(() => {

              this.modifierAvocat(
                params.data
              );

            });

          }
        );


        btnSupprimer.addEventListener(
          'click',
          () => {

            this.ngZone.run(() => {

              this.supprimerAvocat(
                params.data.id_avocat
              );

            });

          }
        );


        container.appendChild(
          btnModifier
        );

        container.appendChild(
          btnSupprimer
        );


        return container;

      }

    }

  ];


  nouvelAvocat = {

    nom: '',

    prenom: '',

    email: '',

    ville: '',

    portable: ''

  };


  avocatSelectionne: any = null;

  afficherFormulaireModification = false;


  @ViewChild('formModification')
  formModification!: ElementRef;


  constructor(

    private adminService: AdminService,

    private cdr: ChangeDetectorRef,

    private ngZone: NgZone

  ) {}


  ngOnInit() {

    this.adminService
      .getAllAvocats()

      .subscribe({

        next: (response: any) => {

          this.avocats = response;

          this.cdr.detectChanges();

        }

      });

  }


  supprimerAvocat(id: number) {

    this.adminService
      .deleteAvocat(id)

      .subscribe({

        next: () => {

          this.avocats =
            this.avocats.filter(

              avocat =>
                avocat.id_avocat !== id

            );


          this.cdr.detectChanges();

        }

      });

  }


  modifierAvocat(avocat: any) {

    this.avocatSelectionne = {
      ...avocat
    };


    this.afficherFormulaireModification =
      true;


    this.cdr.detectChanges();


    setTimeout(() => {

      this.formModification
        .nativeElement
        .scrollIntoView({

          behavior: 'smooth',

          block: 'start'

        });

    });

  }


  enregistrerModification() {

    this.adminService
      .updateAvocat(

        this.avocatSelectionne.id_avocat,

        this.avocatSelectionne

      )

      .subscribe({

        next: () => {

          const index =
            this.avocats.findIndex(

              avocat =>
                avocat.id_avocat ===
                this.avocatSelectionne.id_avocat

            );


          if (index !== -1) {

            this.avocats[index] = {
              ...this.avocatSelectionne
            };


            this.avocats = [
              ...this.avocats
            ];

          }


          this.afficherFormulaireModification =
            false;


          this.cdr.detectChanges();

        }

      });

  }


  ouvrirFormulaireAjout() {

    this.afficherFormulaireAjout =
      true;

  }


  ajouterAvocat() {

    this.adminService
      .addAvocat(
        this.nouvelAvocat
      )

      .subscribe({

        next: (response: any) => {

          this.avocats.push({

            id_avocat:
              response.id_avocat,

            ...this.nouvelAvocat

          });


          this.avocats = [
            ...this.avocats
          ];


          this.afficherFormulaireAjout =
            false;


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