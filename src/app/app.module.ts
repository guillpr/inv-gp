import { Produit } from './entitees/produit';

import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TabInventaireComponent } from './inventaire/tab-inventaire.component';
import { AjoutInventaireComponent } from './inventaire/ajout-inventaire.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';
import localeFr from '@angular/common/locales/fr';
import { NgModule, LOCALE_ID } from '@angular/core';
import { LoginComponent } from './inventaire/login.component';
import { EnregistrementComponent } from './inventaire/enregistrement.component';
import { HttpClientModule } from '@angular/common/http';
import { DatatableComponent } from './datatable/datatable.component';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';




@NgModule({
 
  declarations: [
    AppComponent,
    TabInventaireComponent,
    AjoutInventaireComponent,
    LoginComponent,
    EnregistrementComponent,
    DatatableComponent,
   
 
  ],
  imports: [
    CommonModule,
    ToastrModule.forRoot(), // ToastrModule added
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatSlideToggleModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatNativeDateModule,
    HttpClientModule
  ],
  providers: [
    Produit,
    { provide: LOCALE_ID, useValue: 'fr-CA'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
