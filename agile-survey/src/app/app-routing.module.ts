import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InitiatorLandingPageComponent } from './initiator-landing-page/initiator-landing-page.component';
import { SurveyQuestionsComponent } from './survey-questions/survey-questions.component';
import { D3ChartsComponent } from './d3-charts/d3-charts.component';
import { ChartsComponent } from './charts/charts.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { RetroChartsComponent } from './retro-charts/retro-charts.component';


const routes: Routes = [
  { path: '',  redirectTo: 'launchsurvey', pathMatch: 'full' },
  { path: 'survey/:id', component: SurveyQuestionsComponent },
  { path: 'launchsurvey', component: InitiatorLandingPageComponent },
  { path: 'charts', component: D3ChartsComponent },
  { path: 'pie-chart', component: ChartsComponent },
  { path: 'bar-chart', component: BarChartComponent },
  { path: 'retro', component: RetroChartsComponent },
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
