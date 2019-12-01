import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { SurveyService } from '../survey.service'


@Component({
  selector: 'app-d3-charts',
  templateUrl: './d3-charts.component.html',
  styleUrls: ['./d3-charts.component.scss']
})
export class D3ChartsComponent implements OnInit {

  vWidth = 300;  // <-- 1
  vHeight = 300;
  vRadius = Math.min(this.vWidth, this.vHeight) / 2;  // < -- 2

  g: any;
  vLayout: any;
  vArc: any;
  vRoot: any;
  vNodes: any;
  vSlices: any;
  
  constructor(private surveyService: SurveyService) { }

  ngOnInit() {
    let vColor = d3.scaleOrdinal(d3['schemeCategory20b'].slice(4)); 

    //Method Chaining & the HTML
    this.g = d3.select('svg')  // <-- 1
    .attr('width', this.vWidth)  // <-- 2
    .attr('height', this.vHeight)
    .append('g')  // <-- 3
    .attr('transform', 
        'translate(' + this.vWidth / 2 + ',' + this.vHeight / 2 + ')'); 
    
    
    // Layout the Data
    this.vLayout = d3.partition()  // <-- 1
    .size([2 * Math.PI, this.vRadius]);  // <-- 2  

    //Calculate Each Arc
    this.vArc = d3.arc()
      .startAngle(function (d) { 
        return d['x0'] 
      })
      .endAngle(function (d) { return d['x1']})
      .innerRadius(function (d) { return d['y0'] })
      .outerRadius(function (d) { return d['y1'] });

    //Connect Layout & Data
    this.vRoot = d3.hierarchy(this.surveyService.getChartData())  // <--1
      .sum(function (d) { return d['size'] });  // <-- 2
    this.vNodes = this.vRoot.descendants();  // <--3
    

    //Update Pattern
    this.vSlices = this.g.selectAll('path') // <-- 1
      .data(this.vNodes)  // <-- 2
      .enter()  // <-- 3
      .append('path'); // <-- 4    

    this.vLayout(this.vRoot);  // <--4
    
    this.vSlices.filter(function(d) { return d.parent })  // <-- 1
    .attr('d', this.vArc)  // <-- 2
    .style('stroke', '#fff')  // <-- 3
    .style('fill', function (d) {  // <-- 4
      return vColor((d.children ? d : d.parent).data.id)
      });
  }

}
