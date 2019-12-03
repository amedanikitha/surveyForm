import { Component } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import { SurveyService } from '../survey.service';


@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})

export class ChartsComponent {

  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {position: 'right'}
  };
  pieChartLabels: Label[];
  pieChartData: any;
  pieChartType: ChartType = 'pie';
  pieChartLegend = true;
  pieChartPlugins = [];
  chartData: any;


  constructor(private surveyService: SurveyService) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit() {
    this.getChartJSData();
  }

  getChartJSData() {
    this.surveyService.getChartJSData().subscribe(data => {
      this.chartData = data;
      this.pieChartData = Object.values(data);
      this.pieChartLabels = Object.keys(data);
    })
  }
}
