import { Component } from '@angular/core';
import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
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
    legend: {position: 'right'},
    title: {
      text: 'Agile Maturity Survey taken by each POD',
      display: true,
      position: 'bottom',
      fontSize: 15
    }
  };
  // public pieChartOptions2: ChartOptions = {
  //   responsive: true,
  //   legend: {position: 'right'}
  // };


  chartData = [];
  //pieChartLabels1: Label[];
  //pieChartLabels2: Label[];
  //pieChartData1: any;
  //pieChartData2: any;
  //pieChartType2: ChartType = 'pie';
  chartType: ChartType = 'pie';
  pieChartLegend = true;

  
  constructor(private surveyService: SurveyService) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit() {
    this.getChartJSData();
  }

  getChartJSData() {
    this.surveyService.getChartJSData().subscribe(data => {
      for( let i =0; i < data.length; i++) {
        this.chartData.push(
          {
            pieChartLabels: Object.keys(data[i]),
            pieChartData: Object.values(data[i]),
            pieChartType: "pie",

          })
      }
      /*this.chartData1 = data.pod;
      this.chartData2 = data.pod2;
      this.pieChartData1 = Object.values(data.pod);
      this.pieChartLabels1 = Object.keys(data.pod);
      this.pieChartData2 = Object.values(data.pod2);
      this.pieChartLabels2 = Object.keys(data.pod2);
      //this.pieChartLabels2 = []*/
    });
  }
}
