import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  items = [{ name: 'Dashboard' }, { name: 'Help' }, { name: 'MY Bharat Organizations' }]
  constructor(
    private router: Router
  ) { }

  navigateToDashboardPage(item: any) {
    if (item.name == 'Dashboard') {
      this.router.navigate(["/dashboard"])
    } else if (item.name == 'MY Bharat Organizations') {
      this.router.navigate(["/my-bharat-org"])
    }
  }

}
