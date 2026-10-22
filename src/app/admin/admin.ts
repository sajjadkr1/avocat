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
import { RendezVousActionsRenderer } from './rendez-vous-actions-renderer';

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

  rendezVous: any[] = [];


  afficherFormulaireAjout = false;


  // Permet au renderer des rendez-vous
  // d'accéder aux méthodes du composant Admin
  context = {
    componentParent: this
  };


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
         
          container.className = 'actions-avocat';

        const btnModifier =
          document.createElement('button');

          btnModifier.className = 'btn-modifier';

        btnModifier.textContent =
          'Modifier';


        const btnSupprimer =
          document.createElement('button');

        btnSupprimer.textContent =
          'Supprimer';

          btnSupprimer.className =  'btn-supprimer';


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


    this.adminService
      .getAllRendezVous()

      .subscribe({

        next: (response: any) => {

          this.rendezVous = response;

          

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


  columnDefsRendezVous = [

    {
      field: 'nom_utilisateur',
      headerName: 'Nom utilisateur',
      sortable: true,
      filter: true
    },

    {
      field: 'prenom_utilisateur',
      headerName: 'Prénom utilisateur',
      sortable: true,
      filter: true
    },

    {
      field: 'nom_avocat',
      headerName: 'Nom avocat',
      sortable: true,
      filter: true
    },

    {
      field: 'prenom_avocat',
      headerName: 'Prénom avocat',
      sortable: true,
      filter: true
    },

    {
      field: 'date_rendez_vous',
      headerName: 'Date',
      sortable: true,
      filter: true,

      // Affiche la date
      // au format français
      valueFormatter: (params: any) => {

        if (!params.value) {
          return '';
        }

        const date =
          new Date(params.value);

        return date.toLocaleDateString(
          'fr-FR'
        );

      }
    },

    {
      field: 'heure_rendez_vous',
      headerName: 'Heure',
      sortable: true,
      filter: true,

      // Affiche uniquement
      // les heures et les minutes
      valueFormatter: (params: any) => {

        if (!params.value) {
          return '';
        }

        return params.value.slice(
          0,
          5
        );

      }
    },

    {
      field: 'statut',
      headerName: 'Statut',
      sortable: true,
      filter: true,

      // Affiche le statut
      // avec un texte plus lisible
      valueFormatter: (params: any) => {

        if (params.value === 'en_attente') {
          return 'En attente';
        }

        if (params.value === 'confirme') {
          return 'Confirmé';
        }

        if (params.value === 'annule') {
          return 'Annulé';
        }

        return params.value;

      }
    },

    {
      field: 'motif',
      headerName: 'Motif',
      sortable: true,
      filter: true
    },

    {
      headerName: 'Actions',

      cellRenderer:
        RendezVousActionsRenderer,

      minWidth: 220,

      sortable: false,

      filter: false
    }

  ];


  // Modifie le statut
  // d'un rendez-vous
  changerStatutRendezVous(
    id: number,
    statut: string,
    onSuccess?: () => void
  ) {

    this.adminService
      .updateStatutRendezVous(
        id,
        statut
      )

      .subscribe({

        next: () => {

          const index =
            this.rendezVous.findIndex(

              rendezVous =>
                rendezVous.id_rendez_vous === id

            );


          if (index !== -1) {

            // Modifie le statut
            // dans le tableau
            this.rendezVous[index].statut =
              statut;


            // Crée un nouveau tableau
            // afin qu'Angular et AG Grid
            // détectent la modification
            this.rendezVous = [
              ...this.rendezVous
            ];

          }


          // Informe le renderer
          // que la modification a réussi
          if (onSuccess) {

            onSuccess();

          }


          this.cdr.detectChanges();

        }

      });

  }

}