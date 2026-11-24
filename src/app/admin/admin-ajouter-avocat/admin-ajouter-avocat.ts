
import {
  Component,
  ChangeDetectorRef,
  OnInit,
  HostListener
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-admin-ajouter-avocat',
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './admin-ajouter-avocat.html',
  styleUrl: './admin-ajouter-avocat.css',
})

export class AdminAjouterAvocat implements OnInit {

  // Données du nouvel avocat
  nouvelAvocat = {
    nom: '',
    prenom: '',
    email: '',
    ville: '',
    portable: '',
    id_specialisations: [] as number[],
    id_langues: [] as number[]
  };

  // Listes des spécialisations et des langues
  specialisations: any[] = [];
  langues: any[] = [];

  // Gestion de la photo
  imageSelectionnee: File | null = null;
  apercuImage: string | null = null;

  // Gestion des menus déroulants
  menuOuvert: string | null = null;


  constructor(
    private adminService: AdminService,
    private cdr: ChangeDetectorRef
  ) {}


  ngOnInit() {
    this.chargerSpecialisations();
    this.chargerLangues();
  }


  // Sélectionner une image
  selectionnerImage(event: Event) {

    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {

      if (this.apercuImage) {
        URL.revokeObjectURL(this.apercuImage);
      }

      this.imageSelectionnee = input.files[0];

      this.apercuImage = URL.createObjectURL(
        this.imageSelectionnee
      );
    }
  }


  // Supprimer l'image sélectionnée
  supprimerImage(input: HTMLInputElement) {

    if (this.apercuImage) {
      URL.revokeObjectURL(this.apercuImage);
    }

    this.imageSelectionnee = null;
    this.apercuImage = null;

    input.value = '';
  }


  // Fermer les menus en cliquant à l'extérieur
  @HostListener('document:click', ['$event'])
  fermerMenu(event: Event) {

    const dropdown = (event.target as HTMLElement)
      .closest('.dropdown-group');

    if (!dropdown) {
      this.menuOuvert = null;
    }
  }


  // Ouvrir ou fermer une liste
  toggleMenu(menu: string) {

    this.menuOuvert =
      this.menuOuvert === menu ? null : menu;
  }


  // Ajouter ou retirer une sélection
  modifierSelection(
    type: 'specialisations' | 'langues',
    id: number | string,
    event: Event
  ) {

    const checked =
      (event.target as HTMLInputElement).checked;

    const idNumber = Number(id);

    const tableau =
      type === 'specialisations'
        ? this.nouvelAvocat.id_specialisations
        : this.nouvelAvocat.id_langues;

    if (checked) {

      if (!tableau.includes(idNumber)) {
        tableau.push(idNumber);
      }

    } else {

      const index = tableau.indexOf(idNumber);

      if (index !== -1) {
        tableau.splice(index, 1);
      }
    }
  }


  // Afficher les noms des éléments sélectionnés
  getNomsSelectionnes(
    type: 'specialisations' | 'langues'
  ): string {

    if (type === 'specialisations') {

      return this.specialisations
        .filter(item =>
          this.nouvelAvocat.id_specialisations.includes(
            Number(item.id_specialisation)
          )
        )
        .map(item => item.nom)
        .join(', ');
    }

    return this.langues
      .filter(item =>
        this.nouvelAvocat.id_langues.includes(
          Number(item.id_langue)
        )
      )
      .map(item => item.nom)
      .join(', ');
  }


  // Ajouter un avocat
  ajouterAvocat(imageInput: HTMLInputElement) {

    const formData = new FormData();
    formData.append('nom', this.nouvelAvocat.nom);
formData.append('prenom', this.nouvelAvocat.prenom);
formData.append('email', this.nouvelAvocat.email);
formData.append('ville', this.nouvelAvocat.ville);
formData.append('portable', this.nouvelAvocat.portable);

formData.append(
  'id_specialisations',
  JSON.stringify(this.nouvelAvocat.id_specialisations)
);

formData.append(
  'id_langues',
  JSON.stringify(this.nouvelAvocat.id_langues)
);

if (this.imageSelectionnee) {
  formData.append('img', this.imageSelectionnee);
}

this.adminService
  .addAvocat(formData)
      .subscribe({

        next: () => {

          this.nouvelAvocat = {
            nom: '',
            prenom: '',
            email: '',
            ville: '',
            portable: '',
            id_specialisations: [],
            id_langues: []
            
          };

if (this.apercuImage) {
  URL.revokeObjectURL(this.apercuImage);
}

this.imageSelectionnee = null;
this.apercuImage = null;
imageInput.value = '';


          this.menuOuvert = null;

          this.cdr.detectChanges();
        },

        error: (err) => {
          console.error('Erreur ajout avocat:', err);
        }
      });
  }


  // Charger les spécialisations
  chargerSpecialisations() {

    this.adminService
      .getAllSpecialisations()
      .subscribe({

        next: (data: any) => {
          console.log('SPECIALISATIONS:', data);
          this.specialisations = data;
          this.cdr.detectChanges();
        },

        error: (err) => {
          console.error('ERREUR SPECIALISATIONS:', err);
        }
      });
  }


  // Charger les langues
  chargerLangues() {

    this.adminService
      .getAllLangues()
      .subscribe({

        next: (data: any) => {
          console.log('LANGUES:', data);
          this.langues = data;
          this.cdr.detectChanges();
        },

        error: (err) => {
          console.error('ERREUR LANGUES:', err);
        }
      });
  }

}
