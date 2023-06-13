import { Injectable } from '@angular/core';
import { ETypeConservation } from './enums/type-conservation';

@Injectable()
export class Produit{

    

    public dateDeConservation!: Date;
    public typeDeProduit!:string;
    public quantite!:number;
    public typeUnite!:string;
    public typeConservation!:ETypeConservation;
    public dateDePer:Date =new Date();
    public ajoutProduit!:string;
    

}