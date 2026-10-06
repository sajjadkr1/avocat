export interface Avocat {
telephone: any;
specialite: any;

    id_avocat: number;

    nom: string;

    prenom: string;

    email: string;

    ville: string;

    portable: string;

    adresse: string;

    img: string;

    description: string;

    traducteur_disponible: boolean;

    specialisation?: string;

    langues?: string[];

}