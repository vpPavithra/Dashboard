import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  showSplitPane = true;
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: 'list'
    },
    {
      title: 'My Bharat Organization',
      url: '/my-bharat-org',
      icon: 'list'
    }
  ];
  constructor(
    private router: Router
  ) {
    console.log(window.location.href)
    let arr = window.location.href.split('/')
    let path = arr[arr.length - 1]
    if (path == 'join-org' || path == 'create-org') {
      this.showSplitPane = false
    }
  }

  toggleSplitPane(show: boolean) {
    this.showSplitPane = show;
  }

  navigate(ls: any) {
    this.router.navigate([ls.url])
  }
}
