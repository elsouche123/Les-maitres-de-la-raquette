import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { ListeJoueurComponent } from './liste-joueur/liste-joueur.component';

const routes: Routes = [
  { path: '', component: AccueilComponent },
  { path: 'liste-joueur', component: ListeJoueurComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
