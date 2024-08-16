import { AfterViewInit, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
})
export class CardListComponent implements OnInit, AfterViewInit {
  @Input() list: any
  @Input() title: any
  @Input() type: any
  constructor() { }

  ngOnInit() { }

  ngAfterViewInit() {
    if (this.type == 'youth') {
      setTimeout(() => {
        let ele: any = document.getElementsByClassName('youthCard');
        if (ele.length > 0) {
          for (let i = 0; i <= ele.length - 1; i++) {
            console.log("************ view enter ", this.list[i], ele[i])
            const style = document.createElement('style');
            style.type = 'text/css';
            // background: radial-gradient(${this.list[i].color} 40%, #0000);

            const cssRule = `
                .card${i}::before {
                    background: ${this.list[i].color[0]};
                    border: 10px solid  ${this.list[i].color[1]};
                }`;
            style.appendChild(document.createTextNode(cssRule));

            ele[i].appendChild(style);
          }
        }
      }, 500);
    }

  }
}
