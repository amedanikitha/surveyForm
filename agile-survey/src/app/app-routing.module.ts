import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InitiatorLandingPageComponent } from './initiator-landing-page/initiator-landing-page.component';
import { SurveyQuestionsComponent } from './survey-questions/survey-questions.component';
import { D3ChartsComponent } from './d3-charts/d3-charts.component';
import { ChartsComponent } from './charts/charts.component';


const routes: Routes = [
  { path: '',  redirectTo: 'survey', pathMatch: 'full' },
  { path: 'survey', component: SurveyQuestionsComponent },
  { path: 'launchsurvey', component: InitiatorLandingPageComponent },
  { path: 'charts', component: D3ChartsComponent },
  { path: 'pie-chart', component: ChartsComponent },
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
