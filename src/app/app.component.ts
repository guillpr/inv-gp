import { ServiceBackendService } from './services/service-backend.service';
import { Component, OnInit } from '@angular/core';
import * as CryptoJS from 'crypto-js';  
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'inv-gp';

 constructor(public sb: ServiceBackendService, public router:Router){}
   
  ngOnInit(){
    if(this.sb.connected==false){
     this.router.navigateByUrl('/login');
    }
  }

}
