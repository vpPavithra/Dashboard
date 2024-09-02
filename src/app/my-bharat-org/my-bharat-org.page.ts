import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-my-bharat-org',
  templateUrl: './my-bharat-org.page.html',
  styleUrls: ['./my-bharat-org.page.scss'],
})
export class MyBharatOrgPage implements OnInit {
  title: string = ""
  selectedValue = ""
  constructor(
    private router: Router,
    private appComponent: AppComponent
  ) { }

  ngOnInit() {
    this.title = "My Bharat Organization (MBO)"
  }

  joinOrg(event: any) {
    this.appComponent.toggleSplitPane(false)
    this.router.navigate(['/join-org']);
  }

  createOrg(event: any) {
    this.appComponent.toggleSplitPane(false)
    this.router.navigate(['/create-org']);
  }
}
