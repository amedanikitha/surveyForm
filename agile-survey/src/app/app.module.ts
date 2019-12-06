import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {DatePipe} from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material';
import { SurveyQuestionsComponent } from './survey-questions/survey-questions.component';
import { InitiatorLandingPageComponent } from './initiator-landing-page/initiator-landing-page.component';
import { D3ChartsComponent } from './d3-charts/d3-charts.component';
import { ChartsModule } from 'ng2-charts';
import { ChartsComponent } from './charts/charts.component';

// In-memory web-api modules
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { RetroChartsComponent } from './retro-charts/retro-charts.component';

// Import angular-fusioncharts
import { FusionChartsModule } from "angular-fusioncharts";

// Import FusionCharts library and chart modules
import * as FusionCharts from "fusioncharts";
import * as Widgets from "fusioncharts/fusioncharts.widgets";

import * as FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

// Pass the fusioncharts library and chart modules
FusionChartsModule.fcRoot(FusionCharts, Widgets, FusionTheme);

@NgModule({
  declarations: [
    AppComponent,
    SurveyQuestionsComponent,
    InitiatorLandingPageComponent,
    D3ChartsComponent,
    ChartsComponent,
    BarChartComponent,
    RetroChartsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    // HttpClientInMemoryWebApiModule.forRoot(
    //  InMemoryDataService, { dataEncapsulation: false }
    // ),
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgbModule,
    ChartsModule,
    FusionChartsModule
  ],
  providers: [{
    provide: MAT_RADIO_DEFAULT_OPTIONS,
    useValue: { color: 'primary' },
  },
  DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule { }
