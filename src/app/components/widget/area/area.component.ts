import { Component, OnInit, Input } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css']
})
export class AreaComponent implements OnInit {
  @Input() title ; 
  chartOptions ={};
  Highcharts =Highcharts ;
  constructor() { 
    
  }

  ngOnInit() {
    this.chartOptions =  { chart: {
      type: 'area',
      height: 400 ,
      width:400 ,
    },
  title: {
      text: this.title
  },

  credits :{
    enabled:false 
  }, 
  xAxis: {
      categories: ['1750', '1800', '1850', '1900', '1950', '1999', '2050'],
      tickmarkPlacement: 'on',
      title: {
          enabled: false
      }
  },
  yAxis: {
      title: {
          text: 'Billions'
      },
      labels: {
          formatter: function () {
              return this.value / 1000;
          }
      }
  },
  tooltip: {
      split: true,
      valueSuffix: ' millions'
  },
  plotOptions: {
      area: {
          stacking: 'normal',
          lineColor: '#666666',
          lineWidth: 1,
          marker: {
              lineWidth: 1,
              lineColor: '#666666'
          }
      }
  },
  series: [{
      name: 'Asia',
      data: [502, 635, 809, 947, 1402, 3634, 5268]
  }, {
      name: 'Africa',
      data: [106, 107, 111, 133, 221, 767, 1766]
  }, {
      name: 'Europe',
      data: [163, 203, 276, 408, 547, 729, 628]
  }, {
      name: 'America',
      data: [18, 31, 54, 156, 339, 818, 1201]
  }, {
      name: 'Oceania',
      data: [2, 2, 2, 6, 13, 30, 46]
  }]};
  }

}
