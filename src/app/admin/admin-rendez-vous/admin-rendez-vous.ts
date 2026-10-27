import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { AgGridAngular } from 'ag-grid-angular';
import { AdminService } from '../../services/admin.service';
import { RendezVousActionsRenderer } from '../rendez-vous-actions-renderer';


@Component({
  selector: 'app-admin-rendez-vous',

  imports: [
    AgGridAngular
  ],

  templateUrl: './admin-rendez-vous.html',
  styleUrl: './admin-rendez-vous.css',
})


export class AdminRendezVous implements OnInit {

  rendezVous: any[] = [];


  context = {
    componentParent: this
  };


  defaultColDef = {
    flex: 1,
    minWidth: 130,
    sortable: true,
    filter: true,
    resizable: true
  };


  constructor(

    private adminService: AdminService,

    private cdr: ChangeDetectorRef

  ) {}


  ngOnInit() {

    this.adminService
      .getAllRendezVous()
      .subscribe({

        next: (response: any) => {

          this.rendezVous = response;

          this.cdr.detectChanges();

        }

      });

  }


  columnDefsRendezVous = [

    {
      field: 'nom_utilisateur',
      headerName: 'Nom utilisateur'
    },

    {
      field: 'prenom_utilisateur',
      headerName: 'Prénom utilisateur'
    },

    {
      field: 'nom_avocat',
      headerName: 'Nom avocat'
    },

    {
      field: 'prenom_avocat',
      headerName: 'Prénom avocat'
    },

    {
      field: 'date_rendez_vous',
      headerName: 'Date',

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
      minWidth: 180
    },

    {
      headerName: 'Actions',

      cellRenderer:
        RendezVousActionsRenderer,

      minWidth: 220,
      maxWidth: 240,
      flex: 0,

      sortable: false,
      filter: false
    }

  ];


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

            this.rendezVous[index].statut =
              statut;


            this.rendezVous = [
              ...this.rendezVous
            ];

          }


          if (onSuccess) {
            onSuccess();
          }


          this.cdr.detectChanges();

        }

      });

  }

}