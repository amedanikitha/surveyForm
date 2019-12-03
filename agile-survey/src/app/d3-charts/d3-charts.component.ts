import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { SurveyService } from '../survey.service'


@Component({
  selector: 'app-d3-charts',
  templateUrl: './d3-charts.component.html',
  styleUrls: ['./d3-charts.component.scss']
})
export class D3ChartsComponent implements OnInit {

  vWidth = 500;  // <-- 1
  vHeight = 500;
  vRadius = Math.min(this.vWidth, this.vHeight) / 2;  // < -- 2

  g: any;
  vLayout: any;
  vArc: any;
  vRoot: any;
  vNodes: any;
  vSlices: any;
  
  constructor(private surveyService: SurveyService) { }

  ngOnInit() {

    const vData = this.surveyService.getChartData();

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

      this.drawSunburst();
  }
  drawSunburst() {
    const data = this.surveyService.getChartData();
    const vColor = d3.scaleOrdinal(d3['schemeCategory20b'].slice(4)); 
    //Connect Layout & Data
    this.vRoot = d3.hierarchy(data)  // <--1
      .sum(function (d) { return d['size'] });  // <-- 2
    this.vNodes = this.vRoot.descendants();  // <--3
    

    //Update Pattern
    this.vSlices = this.g.selectAll('g') // <-- 1
      .data(this.vNodes)  // <-- 2
      .enter()  // <-- 3
      .append('g'); // <-- 4    

    this.vLayout(this.vRoot);  // <--4
    
    // Draw on screen
    this.vSlices.append('path')
    .attr('display', function (d) { return d.depth ? null : 'none'; })
    .attr('d', this.vArc)
    .style('stroke', '#fff')
    .style('fill', function (d) { return vColor((d.children ? d : d.parent).data.id); });

    const _self = this;
    
    // Add text
    this.vSlices.append('text')
    .filter(function(d) { return d.parent; })
    .attr('transform', function(d) {
        return 'translate(' + _self.vArc.centroid(d) + ')rotate(' + _self.computeTextRotation(d) + ')'; })
    .attr('dx', '-20')
    .attr('dy', '.5em')
    .text(function(d) { return d.data.id });
  }

  computeTextRotation(d) {
    const angle = (d.x0 + d.x1) / Math.PI * 90;

    // Avoid upside-down labels; labels as rims
    return (angle < 120 || angle > 270) ? angle : angle + 180;
    //return (angle < 180) ? angle - 90 : angle + 90;  // labels as spokes
  }

}
