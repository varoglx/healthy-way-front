import { Component } from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  showFooter = true;
  hiddenRoutes = ['/login', '/registro','/bienvenida','/password-recovery']; 

  constructor(private router: Router) {
    this.router.events.pipe(
      filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.checkIfFooterShouldBeDisplayed(event.urlAfterRedirects);
    });
  }

  checkIfFooterShouldBeDisplayed(url: string) {
    this.showFooter = !this.hiddenRoutes.includes(url);
  }
}
