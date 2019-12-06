import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-retro-charts',
  templateUrl: './retro-charts.component.html',
  styleUrls: ['./retro-charts.component.scss']
})
export class RetroChartsComponent implements OnInit {

  public barChartOptions = {
    responsive: true,
    scales: {
      xAxes: [{id: 'x-axis-1', type: 'linear',  position: 'left', ticks: {min: 2}}],
      yAxes: [{
      barPercentage: 0.4
    }]
    }
  };

  public barChartColors = [
    { backgroundColor: '#00945f' },
  ]

  public barChartType = 'horizontalBar';
  public barChartLegend = true;

  public barChartData = [
    { data: [6.9, 5, 10, 5, 4], label: ["Participant Breakdown"] },
  ];
  public barChartLabels: string[] = ['Team Score', 'Anonymous 1', 'Anonymous 2', 'Anonymous 3', 'Anonymous 4'];

  dataSource: Object;

  constructor() {
    this.dataSource = {
      chart: {
        caption: "Citizen's Customer Satisfaction Score for 2019",
        lowerLimit: "0",
        upperLimit: "10",
        showValue: "1",
        numberSuffix: "",
        theme: "fusion",
        showToolTip: "0"
      },
      // Gauge Data
      colorRange: {
        color: [
          {
            minValue: "0",
            maxValue: "5",
            code: "#F2726F"
          },
          {
            minValue: "5",
            maxValue: "7",
            code: "#FFC533"
          },
          {
            minValue: "7",
            maxValue: "10",
            code: "#62B58F"
          }
        ]
      },
      dials: {
        dial: [
          {
            value: "6.9"
          }
        ]
      }
    }; // end of this.dataSource
  } // end of constructor

  ngOnInit() {
  }

}
