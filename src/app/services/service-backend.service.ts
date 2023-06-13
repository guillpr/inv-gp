
import { Product } from './../entitees/product';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Users } from '../entitees/users';
import * as CryptoJS from 'crypto-js';  


@Injectable({
  providedIn: 'root'})
export class ServiceBackendService {

  public listeUsers!:Users[];
  public  tailleUtil!:[]; 

  public connected:boolean = false;


  //Variables enc/dec
  motPassEnc!:string;
  motPassDec!:string;
  encryptText!: string;
  encPassword!: string;
  decPassword!:string;
  conversionEncryptOutput!: string;
  conversionDecryptOutput!:string;
  


  private urlProduitTous = environment.urlBackend +'Produit/GetAll';
  private urlUsers = environment.urlServer + 'users'
  
  public httpOptions = {
    headers: new HttpHeaders({  'Cache-Control': 'no-cache, must-revalidate , post-check=0, pre-check=0',
    'Content-Type': 'application/json',      
    Pragma: 'no-cache',
      Expires: '0'}),
  };
 

  constructor( private http: HttpClient,
    public router: Router) { }

    public ObtenirTousProduits(): Observable<Product>{
      return this.http.get<Product>(this.urlProduitTous);
    }
    public ObtenirUtilisateurs():Observable<Users[]>{
     console.log('ob util');
      return this.http.get<Users[]>(this.urlUsers);
    

    }
   
    
    public AjouterUtilisateur(utilisateur:Users):Observable<Users>{
      return this.http.post<Users>(this.urlUsers,JSON.stringify(utilisateur), this.httpOptions);
    }

    //Méthode d'encryption et décryption du mot de passe
     //method is used to encrypt and decrypt the text  
   convertText(conversion:string,motPasse:string) {  
    console.log('convertion', conversion , motPasse);
   if (conversion=="encrypt") {  
     
     this.encPassword='';
     this.conversionEncryptOutput = CryptoJS.AES.encrypt(motPasse.trim(), this.encPassword.trim()).toString(); 
     this.motPassEnc = this.conversionEncryptOutput;
    console.log('motPassEnc',this.motPassEnc)
     return this.motPassEnc;
     
     console.log( this.conversionEncryptOutput);
   }  
   else {  
    this.decPassword ='';
     this.conversionDecryptOutput = CryptoJS.AES.decrypt(motPasse.trim(), this.decPassword.trim()).toString(CryptoJS.enc.Utf8);  
     this.motPassDec = this.conversionDecryptOutput;
     console.log('motPassDec' , this.motPassDec,this.conversionDecryptOutput);
    return this.motPassDec;
 }  
}



}


