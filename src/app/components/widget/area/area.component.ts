import { Component, OnInit, Input } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css']
})
export class AreaComponent implements OnInit {
  @Input() title: "" ; 
  @Input() width =600; 
  @Input() height =300; 
  @Input()textColor="";
  @Input()backgroundColor="";
  @Input() size="";
  @Input()font="";
  @Input() chartOptions ={};
  Highcharts =Highcharts ;
  constructor() { 
    
  }

  ngOnInit() {
    this.setChartOptions(this.width,
        this.height,
        this.title ,
    this.textColor="",
    this.backgroundColor="",
    this.size="",
    this.font="");
    console.log(  "sdsqd"+this.title);}


  setChartOptions(
      width=300,
      height=200,
      tilte="",
      textColor 
    ,backgroundColor="#fff"
    ,size="6",
    font ="bold"
  ){

    this.chartOptions =  {
        chart: {
     type: 'area',
     height: height ,
     width: width,
     backgroundColor:backgroundColor
  
   },
  title: {
     text: tilte,
     style:  { "color": "#000", "fontSize":"16px"  }
  
  
  },
  legend: {
   itemStyle: {
       font: '9pt Trebuchet MS, Verdana, sans-serif',
       color:textColor
   },
   itemHoverStyle:{
       color: textColor
   }   
  },
  credits :{
   enabled:false 
  }, 
  xAxis: {
     categories: ['1750', '1800', '1850', '1900', '1950', '1999', '2050'],
     tickmarkPlacement: 'on',
     title: {
         enabled: false,
         style: { "color": textColor, "fontSize": "18px" }
        }
  },
  yAxis: {
     title: {
         text: 'Billions',
        style: { "color": textColor, "fontSize": "18px" }
     },
  
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
