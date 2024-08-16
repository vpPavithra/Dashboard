import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-contents-details',
  templateUrl: './card-contents-details.component.html',
  styleUrls: ['./card-contents-details.component.scss'],
})
export class CardContentsDetailsComponent implements OnInit {
  @Input() list: any
  @Input() title: any
  @Input() type: any
  @Input() label: any
  @Input() count: any

  eventsDetails = [{ label: "Attendees", count: 146565 }, { label: "Participants", count: 146565 }, { label: "Volunteers", count: 146565 }]

  constructor() { }

  ngOnInit() { }

}
