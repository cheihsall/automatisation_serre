import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashbordComponent } from './dashbord/dashbord.component';
import { SystemeComponent } from './systeme/systeme.component';
import { FormulaireComponent } from './formulaire/formulaire.component';
import { MapComponent } from './map/map.component';
import { HistoriqueComponent } from './historique/historique.component';

const routes: Routes = [
  { path: 'dashbord', component: DashbordComponent },
  { path:'systeme',component: SystemeComponent},
  { path: 'login', component: FormulaireComponent},
  { path: 'map' , component: MapComponent},
  { path: 'historique', component:HistoriqueComponent},
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
