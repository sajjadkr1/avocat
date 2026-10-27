import {
  Component,
  OnInit,
  ChangeDetectorRef,
  NgZone,
  ViewChild,
  ElementRef
} from '@angular/core';

import { AdminService } from '../../services/admin.service';
import { FormsModule } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';


@Component({
  selector: 'app-admin-avocats',

  imports: [
    FormsModule,
    AgGridAngular
  ],

  templateUrl: './admin-avocats.html',
  styleUrl: './admin-avocats.css',
})


export class AdminAvocats implements OnInit {

  avocats: any[] = [];


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


  defaultColDef = {
    flex: 1,
    minWidth: 120,
    sortable: true,
    filter: true,
    resizable: true
  };


  columnDefs = [

    {
      field: 'nom',
      headerName: 'Nom'
    },

    {
      field: 'prenom',
      headerName: 'Prénom'
    },

    {
      field: 'email',
      headerName: 'Email',
      minWidth: 220
    },

    {
      field: 'ville',
      headerName: 'Ville'
    },

    {
      field: 'portable',
      headerName: 'Portable',
      minWidth: 150
    },

    {
      headerName: 'Actions',

      minWidth: 200,
      maxWidth: 220,
      flex: 0,

      sortable: false,
      filter: false,

      cellRenderer: (params: any) => {

        const container =
          document.createElement('div');


        container.className =
          'actions-avocat';


        const btnModifier =
          document.createElement('button');


        btnModifier.className =
          'btn-modifier';


        btnModifier.textContent =
          'Modifier';


        const btnSupprimer =
          document.createElement('button');


        btnSupprimer.className =
          'btn-supprimer';


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

}