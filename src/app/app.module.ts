import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { ComponentsModule } from './components/components.module';
import { HighchartsChartModule } from 'highcharts-angular';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    HighchartsChartModule,
    ComponentsModule,
    NgCircleProgressModule.forRoot({
      "backgroundPadding": 7,
      "radius": 60,
      "space": -2,
      "outerStrokeWidth": 2,
      "outerStrokeColor": "#808080",
      "innerStrokeColor": "#e7e8ea",
      "innerStrokeWidth": 2,
      "title": [
        "working",
        "in",
        "progress"
      ],
      "titleFontSize": "12",
      "subtitleFontSize": "20",
      "animateTitle": false,
      "animationDuration": 1000,
      "showUnits": false,
      "clockwise": false
    })
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule { }
