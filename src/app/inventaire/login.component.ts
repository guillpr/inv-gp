import { ServiceBackendService } from './../services/service-backend.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Users } from '../entitees/users';
import { elementEventFullName } from '@angular/compiler/src/view_compiler/view_compiler';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  affichage:boolean =false;
  public formulaire!: FormGroup;
  submitted = false;
   listeMail!: string[];
    elPass = '';
    estUtilisateur:boolean=false;



  constructor(private fb: FormBuilder,
    public serviceBackend:ServiceBackendService,
    private toastr: ToastrService) { }

  public f(item: string): FormControl {
    return this.formulaire.get(`${item}`) as FormControl;
  }

  ngOnInit(): void {

    // this.serviceBackend.ObtenirTousProduits()
    // .subscribe(x=>{
    //   x.nom
    //   console.log('resultats:' , x)
    // });

    this.formulaire = this.fb.group({
     
    
      mail: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')]],
      password:['',Validators.required]
   
      
    }
    )
  }
  conUtilisateur(){
   this.listeMail=[];
   this.estUtilisateur=false;
    this.serviceBackend.ObtenirUtilisateurs()
    .subscribe(user=>{
      user;
      console.log('user:' , user)
  
      let i = 0;
      user.forEach(element => {
        this.listeMail.push(element.mail)
        i++
        console.log('element.mail==this.formulaire.controls.mail.value', element.mail ,this.formulaire.controls.mail.value)
        if(element.mail==this.formulaire.controls.mail.value){
          this.elPass = element.password
          this.estUtilisateur=true;
          this.lireDansListe();
          
        } 
        console.log('i user.length this.estUtilisateur' , i ,user.length,this.estUtilisateur)
       if(i==user.length&& this.estUtilisateur==false){
         console.log('element.mail.len' ,user.length)
         console.log('utilisateur inexistant')
       }
      
      });
    })
  
  }
  async lireDansListe(){
    if(this.listeMail.includes(this.formulaire.controls.mail.value)){
      if(this.formulaire.controls.password.value== this.serviceBackend.convertText('decrypt' ,this.elPass )){
        console.log('utilisateur dans la liste')
        this.serviceBackend.connected = true;
        this.toastr.success('Connecté avec succès');
      }
      else{
        console.log('mot de passe incorrect')
      }
    }

   
  }


}
