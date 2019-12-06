import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { SurveyService } from '../survey.service';
import { Router } from '@angular/router'


@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {

  barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [{id: 'y-axis-1', type: 'linear', position: 'left', ticks: {min: 180}}]
    }
  };
  barChartLabels: Label[];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];
  barData

  barChartData: any;

  constructor(private surveyService: SurveyService, public router: Router) { }

  ngOnInit() {
    this.getbarChartData()
  }

  getbarChartData() {
    this.surveyService.getbarChartData().subscribe(data => {
      this.barData = data;
      //this.barChartData[0].data = Object.values(data);
      this.barChartData = [{data: Object.values(data), label: 'Agile Progress for the year 2019'}]
      this.barChartLabels = Object.keys(data);
    });
  }
  chartClicked($event) {
      this.router.navigate(['pie-chart'])
  }
}
