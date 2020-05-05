import { Component, OnInit, Input, ViewChildren } from '@angular/core';
import * as Highcharts from 'highcharts';
import { ServiceWidgetService } from 'src/app/services/widget/service-widget.service';
import { Widget } from 'src/app/models/Widget';

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
  @Input()    chartOptions: { };
  
    

   
  
   @Input() Highcharts =Highcharts ;
  constructor(private serviceWidget:ServiceWidgetService) { 

}


  ngOnInit() {
   this.chartOptions = this.setChartOptions(this.width,
      this.height,
      this.title ,
  this.textColor,
  this.backgroundColor,
  this.size,
  this.font);

  }  ngOnInit2() {

   this.chartOptions = this.setChartOptions(this.width,
      this.height,
      this.title ,
  this.textColor,
  this.backgroundColor,
  this.size,
  this.font);

  }
updateChartOption(list:Widget){

   this.chartOptions=this.setChartOptions(list.width,list.height, list.nameFr, list.textColor ,list.backgroundColor ,list.size,list
   . font )

 

}
    setChartOptions(w,h, tilte, textColor ,background ,size="6", font ="bold" )
    {
       
    return this.chartOptions =  {
        chart: {
     type: 'area',
     height: h ,
     width: w,
     backgroundColor:background
  
   },
  title: {
     text: tilte,
     style:  { "color": textColor, "fontSize":size+"px"  }
  
  
  },
  legend: {
   itemStyle: {
       font: '9pt '+font+'Trebuchet MS, Verdana, sans-serif',
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
     categories: ['2010', '2011', '2012 ', '2013', '2014', '2015', '2016'],
     tickmarkPlacement: 'on',
     title: {
         enabled: false,
         style: { "color": textColor, "fontSize": "18px" }
        }
  },
  yAxis: {
     title: {
         text: 'Billions',
        style: { color: textColor, fontSize: '18px' }
     },
  
  },
  
  
  series: [{
     name: 'administrator',
     data: [502, 635, 809, 947, 1402, 3634, 10268]
  },
  {
   name: 'members',
   data: [502, 1235, 1280, 947, 1402]
}]};

  }  
  
}
