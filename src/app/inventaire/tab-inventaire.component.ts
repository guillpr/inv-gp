import { Component, OnInit } from '@angular/core';
import produitData from '../produits.json';


interface Prod{
  id:number;
  nom:string;
  description:string;
  dateAjout:string;
  quantite:number;
  unite:string;
  etat:string;
  dateDePer:string;

}



@Component({
  selector: 'app-tab-inventaire',
  templateUrl: './tab-inventaire.component.html',
  styleUrls: ['./tab-inventaire.component.css']
})
export class TabInventaireComponent implements OnInit {

  constructor() { }
  produits: Prod[]=produitData;

  ngOnInit(): void {
  }
  

}
