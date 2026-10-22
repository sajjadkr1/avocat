import {
  Component
} from '@angular/core';

import {
  ICellRendererAngularComp
} from 'ag-grid-angular';

import {
  ICellRendererParams
} from 'ag-grid-community';


@Component({
  selector: 'app-rendez-vous-actions-renderer',
  standalone: true,

  template: `

    <div class="actions">

      <button
        class="btn-confirmer"
        [disabled]="statut === 'confirme'"
        (click)="changerStatut('confirme')"
      >
        Confirmer
      </button>


      <button
        class="btn-annuler"
        [disabled]="statut === 'annule'"
        (click)="changerStatut('annule')"
      >
        Annuler
      </button>

    </div>

  `,

  styles: [`

    .actions {
      display: flex;
      gap: 8px;
      align-items: center;
      height: 100%;
    }


    button {
      padding: 6px 12px;
      border: 1px solid #cccccc;
      border-radius: 6px;
      cursor: pointer;
    }


    .btn-confirmer {
      font-weight: 500;
    }


    .btn-annuler {
      font-weight: 500;
    }


    button:disabled {
      opacity: 0.45;
      cursor: not-allowed;
    }

  `]
})


export class RendezVousActionsRenderer
  implements ICellRendererAngularComp {


  params!: ICellRendererParams;


  statut = '';


  // Initialise le renderer
  // avec les données du rendez-vous
  agInit(
    params: ICellRendererParams
  ): void {

    this.params = params;

    this.statut =
      params.data.statut;

  }


  // Met à jour le renderer
  // lorsque les données changent
  refresh(
    params: ICellRendererParams
  ): boolean {

    this.params = params;

    this.statut =
      params.data.statut;

    return true;

  }


  // Demande à Admin
  // de modifier le statut
  changerStatut(
    nouveauStatut: string
  ) {

    this.params.context
      .componentParent
      .changerStatutRendezVous(

        this.params.data.id_rendez_vous,

        nouveauStatut,

        () => {

          // Modifie l'état du bouton
          // après le succès du backend
          this.statut =
            nouveauStatut;

        }

      );

  }

}