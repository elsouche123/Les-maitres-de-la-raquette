import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { ListeJoueurComponent } from './liste-joueur/liste-joueur.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { PlanDuSiteComponent } from './plan-du-site/plan-du-site.component';

const routes: Routes = [
  { path: '', component: AccueilComponent },
  { path: 'liste-joueur', component: ListeJoueurComponent },
  { path: 'inscription', component: InscriptionComponent },
  { path: 'plan-du-site', component: PlanDuSiteComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
