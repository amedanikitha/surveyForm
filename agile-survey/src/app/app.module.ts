import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material';
import { SurveyQuestionsComponent } from './survey-questions/survey-questions.component';
import { InitiatorLandingPageComponent } from './initiator-landing-page/initiator-landing-page.component';
import { D3ChartsComponent } from './d3-charts/d3-charts.component';

@NgModule({
  declarations: [
    AppComponent,
    SurveyQuestionsComponent,
    InitiatorLandingPageComponent,
    D3ChartsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgbModule
  ],
  providers: [{
    provide: MAT_RADIO_DEFAULT_OPTIONS,
    useValue: { color: 'primary' },
  }],
  bootstrap: [AppComponent],
})
export class AppModule { }
