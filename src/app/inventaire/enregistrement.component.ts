import { Produit } from './../entitees/produit';
import { ServiceBackendService } from './../services/service-backend.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, ValidatorFn,AbstractControl } from '@angular/forms';
import { Users } from '../entitees/users';






const adresseElectroniqueConfirmee: ValidatorFn = (fg: AbstractControl) => {
  if (fg.get('mail')!.value.toLowerCase() !== fg.get('confMail')!.value.toLowerCase()) {
    return { erreurCourrielConfirmation: true };
  }
  return null;
};
const motDePasseConfirmee: ValidatorFn = (fg: AbstractControl) => {

  if (fg.get('password')!.value.toLowerCase() !== fg.get('confPass')!.value.toLowerCase()) {
    return { erreurPassConfirmation: true };
  }
  return null;
};


@Component({
  selector: 'app-enregistrement',
  templateUrl: './enregistrement.component.html',
  styleUrls: ['./enregistrement.component.css']
})
export class EnregistrementComponent implements OnInit {
  affichage:boolean =false;
  public formulaire!: FormGroup;
  submitted = false;
  public objetUtilisateur!: Users;
  public listeUtil!:Users[];
  public dernierId!:number;
  public utilisateur!:Users;

  motPassePur!:string;
  verifUtil:Boolean = false;

  





  

  constructor(private fb: FormBuilder,public serviceBackend:ServiceBackendService,public produit:Produit) {
   
   }
  
  public f(item: string): FormControl {
  
   // return this.formulaire.get(`${item}`) as FormControl;
   return this.formulaire.get(item) as FormControl;
  }

  ngOnInit(): void {
 
   this.produit.typeConservation =0;
   console.log( this.produit)
   

    this.formulaire = this.fb.group({
     
      nom:['',Validators.required],
      prenom:['',Validators.required],
      mail: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')]],
      confMail:['',Validators.required],
      password:['',[Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{6,15}')]],
      confPass:['',[Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{6,15}')]],
    
    },{validator:[adresseElectroniqueConfirmee,motDePasseConfirmee]}
    )  
  }
  ajouterUtilisateur(){
   this.utilisateur = new Users();
   this.obtenirUtilisateur();
    
  
   
    
 
  }
  async obtenirUtilisateur(){
    this.serviceBackend.ObtenirUtilisateurs()
    .toPromise().then(users=>{
      users
      console.log(users)
      if(users.length==0){
        this.verifUtil =true;
      }
      this.listeUtil=users;
      
       this.VerificationUtilisateurs();
       if(this.verifUtil ==false){
         console.log('Mail pris')
       }
       else{
        this.obtentionUtilisateurs();
       }
     
     
     
     
    })
  }
  async  VerificationUtilisateurs(){
    this.listeUtil.forEach(element => {
      console.log('element.mail',element.mail)
      if(element.mail == this.formulaire.controls.mail.value){
        console.log('email déja utilisé',element)
        this.verifUtil = false;
        return this.verifUtil
      }
      else{
        console.log('email non utilié',element)
        this.verifUtil = true;
        return this.verifUtil
       
      }
      
    });
  }
  async obtentionUtilisateurs(){
    if(this.listeUtil.length==0){
      this.dernierId=0;
    }
    else{
      console.log(this.listeUtil[this.listeUtil.length-1].id);
      this.dernierId=this.listeUtil[this.listeUtil.length-1].id;
      console.log(this.dernierId)
      console.log(this.utilisateur)
    }
  
    this.utilisateur.id =this.dernierId+1;
    console.log(this.dernierId)
    this.utilisateur.mail=this.formulaire.controls.mail.value;
    this.utilisateur.nom=this.formulaire.controls.nom.value;
    this.utilisateur.prenom=this.formulaire.controls.prenom.value;
    this.motPassePur = this.formulaire.controls.password.value;

   
    
    console.log('this.plainText' , this.motPassePur)
    let passHash = this.serviceBackend.convertText('encrypt', this.motPassePur);
    this.utilisateur.password = passHash;
    this.utilisateur.produits = [];
    
    console.log('passHah' ,passHash)
  
    console.log(this.utilisateur)
   
    //console.log(this.listeUtil[this.listeUtil.length-1].id);

    this.serviceBackend.AjouterUtilisateur(this.utilisateur)
    .subscribe(x=>{
      console.log('x:', x);
    })
    
    
   
  }
  
}
