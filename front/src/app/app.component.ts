import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isAccueilPage: boolean = false;
  isFixedFooter: boolean = false;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Vérifie si l'utilisateur est sur la page d'accueil
        this.isAccueilPage = (event.url === '/');
      }
    });
  }
}
