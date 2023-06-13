import { LoginComponent } from './inventaire/login.component';
import { AjoutInventaireComponent } from './inventaire/ajout-inventaire.component';
import { TabInventaireComponent } from './inventaire/tab-inventaire.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnregistrementComponent } from './inventaire/enregistrement.component';
import { DatatableComponent } from './datatable/datatable.component';

const routes: Routes = [
  {path:'inventaire' , component: TabInventaireComponent},
  {path:'ajoutinventaire' , component: AjoutInventaireComponent},
  {path:'login' , component: LoginComponent},
  {path:'enregistrement' , component: EnregistrementComponent},
  {path:'user',component:DatatableComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
