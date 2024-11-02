import { Status } from './status';
export class DemandeStage {
  constructor (
    public idDemande: number,
    public typeStage: string,
    public reference:string,
    public niveauEtude:string,
    public etablissement: string,
    public dateDebut: Date,
    public dateFin: Date,
    public statut : Status
  ) {}
}
