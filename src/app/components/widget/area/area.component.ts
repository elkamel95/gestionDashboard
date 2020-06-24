import { Component, OnInit, Input, ViewChildren } from '@angular/core';
import * as Highcharts from 'highcharts';
import { ServiceWidgetService } from 'src/app/services/widget/service-widget.service';
import { Widget } from 'src/app/models/Widget';
import { parse } from 'date-fns';
import { UpperCasePipe } from '@angular/common';

export class MeasureValue{
x:Array<any>=[];
y:Array<any>=[];
nameYAxe:string;
nameXAxe:string;
by:string;
nameLine:string;
}
@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css']
})
export class AreaComponent   implements OnInit {
  @Input() title: "" ; 
  @Input() width =600; 
  @Input() height:any =300; 
  @Input()textColor="";
  @Input()backgroundColor="";
  @Input() size="";
  @Input()font="";
  @Input()    chartOptions: { };
   xAxe :Array<any>=[];


  @Input() url:string;
  public valueWidget 
  public loadedData =false ; 
  @Input()  measur :MeasureValue = new MeasureValue();
    entity="";
   @Input() Highcharts =Highcharts ;
  constructor(protected serviceWidget:ServiceWidgetService) { 

}


  ngOnInit() {
     
   if(this.url !=undefined)
   { 


      this.url=this.url.replace('[$string]','[]');
      this.url=this.url.replace('$','');

    //  #DN#:  data now  
     if(this.url.charAt(0)==='!'){
      var entity =this.url.substring(7,this.url.indexOf("?"));
    
      this.url=   this.serviceWidget. createDynamicQuery(this.url);
    }else
    var entity =this.url.substring(0,this.url.indexOf("?"));

    this.entity=  this.serviceWidget. translateValueToNameFromXml(entity).entities.value;

            
            console.log(this.url)
              this.getDataFromUrl( this.url);

            }



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
    setChartOptions(w,h, tilte, textColor:string ,background ,size="6", font ="bold" )
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
    categories: this.measur.x,
    tickmarkPlacement: 'on',
    title: {
     text: this.measur.x,
    
        enabled: true,
       }
    },
    yAxis: {
    title: {
     enabled: true,
    
        text: this.measur.nameYAxe,
       },
    
    },
    
    
    series: [{
    name: 'draft',
    data:   this.measur.y},
    
    ]};
  
  

  }  
  getDataFromUrl(url){
    this.loadedData=true;

    var getFonctionMesurFunctionOfTitleYaxe =this.url.substring(this.url.indexOf("%")+1,url.length-1);
    var XYName=getFonctionMesurFunctionOfTitleYaxe.split(',');

    this.measur.nameXAxe =XYName[0];
    this.measur.nameYAxe =XYName[1];
    this.measur.nameLine =XYName[2];
    this.measur.by =XYName[3];


   this.serviceWidget.getAnythingWithTypeGraphic( `${this.url.substring(0,this.url.indexOf("%"))}&order[created_at]=asc`,false).subscribe(list=>{
     this.valueWidget=list;
     this.measureValue(list, this.measur);
             },()=>{},()=>{this.loadedData=false});

}
measureValue(list,measur:MeasureValue){
 var position = 0; 
var nbZero;
var preDate=0;
var year_Month_Day =[];
/*  */
var normalizeNameYaxe=     this.normalizeName(measur.nameXAxe);
preDate=this.getYearsMonthDayFromData(list[0]
  ,normalizeNameYaxe);

  for (let index = 1; index < preDate[1]; index++) {
    var margeAxeX=index;
   measur.x.push(margeAxeX);
   measur.y.push(0);
   position++;
  }
/* 


*/

   list.forEach((element )=> {

 preDate=year_Month_Day[1];

  year_Month_Day =this.getYearsMonthDayFromData(element,normalizeNameYaxe);
console.log("preDate"+preDate)
      //getMonth ...
     if (measur.x.indexOf(year_Month_Day[1]) == -1 )
   {   
/* 


*/
nbZero=(year_Month_Day[1]-preDate);
console.log("nbZero"+nbZero);
     if( nbZero>1)
     {
       for (let index = 1; index < nbZero; index++) {
         var margeAxeX=Number.parseInt(preDate+"") +index;
        measur.x.push(margeAxeX);
        measur.y.push(0);
        position++;
       }
     }

      measur.x.push(year_Month_Day[1]);
     measur.y.push(1);
     position++;
/* 


*/
   }else
   measur.y[this.measur.x.indexOf(year_Month_Day[1]) ]++;
   });

  this.chartOptions =  {
  


xAxis: {
categories: this.measur.x,
tickmarkPlacement: 'on',
title: {
 text: `the curve function is expressed by the ${measur.by != '' ? measur.by: 'x' } of the ${ measur.nameXAxe != '' ? measur.nameXAxe: 'x'}`
 ,

    enabled: true,
   }
},
yAxis: {
title: {
 enabled: true,

    text:measur.nameYAxe,
   },

},


series: [{
name: this.measur.nameLine,
data:   this.measur.y},

]};


}
normalizeName(name):string{
  var paramArrayAdapte= name.split('_');
  var normalizeName=paramArrayAdapte[0];
  for (let index = 1; index < paramArrayAdapte.length; index++) {
    normalizeName += paramArrayAdapte[index].charAt(0).toUpperCase()+paramArrayAdapte[index].substring(1,paramArrayAdapte[index].length+1);
    
  }
    console.log(normalizeName);

return normalizeName
}
getYearsMonthDayFromData(element,normalizeName){
  var separator="-" ; 
  console.log("sdq"+normalizeName);

  console.log("sdq"+element[normalizeName]);
  if( element[normalizeName].indexOf('/') != -1)
  {
separator='/';
  
  }

var year_Month_Day=    element[normalizeName].split(separator)
return year_Month_Day;
}
}
