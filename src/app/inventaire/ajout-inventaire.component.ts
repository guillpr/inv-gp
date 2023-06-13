import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-ajout-inventaire',
  templateUrl: './ajout-inventaire.component.html',
  styleUrls: ['./ajout-inventaire.component.css']
})
export class AjoutInventaireComponent implements OnInit {
  affichage:boolean =false;
  public formulaire!: FormGroup;
  submitted = false;


  constructor( private fb: FormBuilder) { }



  ngOnInit(): void {
    this.formulaire = this.fb.group({
      dateDeConservation:['',Validators.required],
      typeDeProduit:['',Validators.required],
      quantite:['',Validators.required],
      typeUnite!:['',Validators.required],
      typeConservation:['',Validators.required],
      ajoutProduit:['']
      
    }
    )


  
  }
  
  public OuvrirProduits(){
  
    console.log('avant update', this.formulaire)
     console.log('click ajout produit', this.affichage)
     if(this.affichage==true){
       this.AffichageSectionProduit(false);
      
     }
     else{
       this.AffichageSectionProduit(true);
     }
     console.log('aff apres aff:' , this.affichage);
     if(this.affichage==true){
     
     this.formulaire.get('ajoutProduit')!.setValidators([Validators.required]);
     this.formulaire.get('ajoutProduit')!.updateValueAndValidity();
    
     
      console.log('avant update', this.formulaire)
     }
     else{
      this.formulaire.get('ajoutProduit')!.clearValidators();
      this.formulaire.get('ajoutProduit')!.updateValueAndValidity();
      
     
      console.log('apres update', this.formulaire)
     }
    
     
      
      
  }
  public AjoutProduit(){
  this.AffichageSectionProduit(false);
   
}
public AjoutInventaire(){
  console.log('ajout inventaire' , this.affichage)
 
  console.log(this.formulaire);
  this.submitted=true;

 
}
public AffichageSectionProduit(affichage:boolean){
  
  let sectionProduit = document.querySelector<HTMLInputElement>('#sectionProduit');
  let btnPlusMoins =  document.getElementById('btnPro');
  let btnAjInv = <HTMLButtonElement>document.getElementById('buttonAjoutInv');
  let btnAjPro = <HTMLButtonElement>document.getElementById('btnAjPro');
 
  
  
  console.log(btnPlusMoins);
  console.log(sectionProduit);
  if(sectionProduit!=null)
 if(affichage==true){
  sectionProduit.style.display = 'block';
  if(btnPlusMoins!=null){
    btnPlusMoins.className ='btnMOins'
    btnPlusMoins.innerText ='-';
    //btnAjInv!.setAttribute('disabled','disabled');
    btnAjPro!.disabled=true;
    btnAjPro!.className='disButt';
    this.affichage =true;
  }
 }
 else{
  sectionProduit.style.display = 'none';
  if(btnPlusMoins!=null){
    btnPlusMoins.className ='btnPlus'
    btnPlusMoins.innerText ='+';
    btnAjPro!.disabled=false;
    btnAjPro!.className='btn';
    this.affichage =false;
  }
 }
}

}
