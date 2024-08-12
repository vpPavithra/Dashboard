import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  items = [{ name: 'Dashboard' }, { name: 'Help' }]
  constructor(
    private router: Router
  ) { }

  navigateToDashboardPage() {
    this.router.navigate(["/dashboard"])
  }

}
