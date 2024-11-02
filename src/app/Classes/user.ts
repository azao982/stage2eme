import { Profils } from "./profile";

export class User {
  constructor (
    public idUser:number,
    public cin : string,
    public nom : string,
    public prenom : string,
    public email : string,
    public mobile : string,
    public password : string,
    public profile:Profils,

    )
    {}
}
