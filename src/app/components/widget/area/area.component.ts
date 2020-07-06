import { Component, OnInit, Input, ViewChildren, Output,EventEmitter } from '@angular/core';
import * as Highcharts from 'highcharts';
import { ServiceWidgetService } from 'src/app/services/widget/service-widget.service';
import { Widget } from 'src/app/models/Widget';
import { parse } from 'date-fns';
import { UpperCasePipe } from '@angular/common';
import { style } from '@angular/animations';

export class MeasureValue{
x:Array<any>=[];
y:Array<any>=[];
nameYAxe:string;
nameXAxe:string;
valueNameXaxe:string;
nameLine:string;
methodeOfMaseur:string;
paramMethodeMaseur:string;
by:string;
typeChart:string;
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
   leadingLeftZeros =false ; 
   leadingRightZeros =true ; 
right
rzeroValue =false ; 
indexOfTypeOfDate=0;
  @Input() url:string;
  public valueWidget 
  public loadedData =false ; 
  @Output() loaded:EventEmitter<string> = new EventEmitter<string>();
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
    setChartOptions(w,h, tilte, textColor:string ,background ,size, font  )
    {
       console.log(this.measur.typeChart);
           return this.chartOptions =  {
        chart: {
          polar: true,
         
     type: this.measur.typeChart,
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
    categories: this.measur.x == [] ? [1,2,3,4,5,6,7]: this.measur.x,
    tickmarkPlacement: 'on',
    title: {

      text: `The Curve Function Is Expressed By The ${this.measur.by != undefined && this.measur.by != '' ? this.measur.by: 'Name line' } Of The ${ this.measur.nameXAxe != undefined &&  this.measur.nameXAxe != ''  ? this.measur.valueNameXaxe: 'As a function of'}`
,       style: {
            color: this.textColor,
            fontFamily: 'Trebuchet MS, Verdana, sans-serif'

} ,
        enabled: true,
       },
       labels: {
        style: {
            color: this.textColor,
        }
    }
    },

    yAxis: {

    title: {
     enabled: true,
    
        text: `${this.measur.nameYAxe } (${this.measur.paramMethodeMaseur})`,
        color: this.textColor,
        style: {
          color: this.textColor,
          fontFamily: 'Trebuchet MS, Verdana, sans-serif'

       }    

       },  labels: {
        format: this.measur.methodeOfMaseur == '2'? "{value}%":"{value}",
          style:{color : this.textColor}  ,
      }
      
    },
    
    
    series: [{
      tooltip: {
        valueSuffix: this.measur.methodeOfMaseur == '2'? "{value}%":""
    },
    name: this.measur.nameLine,
    data:   this.measur.y == [] ? [1,2,3,4,5,6,7]: this.measur.y},
    
    ]};
  
  

  }  
  getDataFromUrl(url){
    this.loadedData=true;

    this.measur.x =[];
    this.measur.y =[];
    var getFonctionMesurFunctionOfTitleYaxe =this.url.substring(this.url.indexOf("%")+1,url.length-1);
    var parmamsTypeGraphicFromUrl=getFonctionMesurFunctionOfTitleYaxe.split(',');

    this.measur.nameXAxe =parmamsTypeGraphicFromUrl[0];
    this.measur.valueNameXaxe =parmamsTypeGraphicFromUrl[1];

    this.measur.nameYAxe =parmamsTypeGraphicFromUrl[2];
    this.measur.nameLine =parmamsTypeGraphicFromUrl[3];
    this.measur.by =parmamsTypeGraphicFromUrl[4];
    this.measur.methodeOfMaseur =parmamsTypeGraphicFromUrl[5];
    this.measur.paramMethodeMaseur =parmamsTypeGraphicFromUrl[6];
    this.measur.typeChart=parmamsTypeGraphicFromUrl[7]

switch (this.measur.by) {
  case "Years":this.indexOfTypeOfDate=0; 
    
    break;
    case "Months": this.indexOfTypeOfDate=1; 
    
    break;
    case "Days": this.indexOfTypeOfDate=2; 
    
    break;
  default:
    break;
}

   this.serviceWidget.getAnythingWithTypeGraphic( `${this.url.substring(0,this.url.indexOf("%"))}&order[created_at]=asc`,false).subscribe(list=>{
     this.valueWidget=list;
     this.measureValueByDate(list, this.measur);
             },()=>{},()=>{this.loadedData=false
              this.loaded.emit("graphique");
            });

}
measureValueByDate(list,measur:MeasureValue){
 var position = 0; 
var nbZero;
var preDate=0;
var year_Month_Day =[];
var total =0;
/* zero left */
var normalizeNameYaxe=     this.normalizeName(measur.nameXAxe);
preDate=this.getYearsMonthDayFromData(list[0]
  ,normalizeNameYaxe);


  if(this.indexOfTypeOfDate !=0)
  for (let index = 1; index < preDate[measur.by]; index++) {
    var margeAxeX=index;
   measur.x.push(margeAxeX);
   measur.y.push(0);
   position++;
  }else{
    measur.x.push(0);
    measur.y.push(0);
  }
/* 


*/


   list.forEach((element )=> {
     if(measur.paramMethodeMaseur =="all")
     total= list.length;
    else
    total= total+element[measur.paramMethodeMaseur];

 preDate=year_Month_Day[this.indexOfTypeOfDate ];

  year_Month_Day =this.getYearsMonthDayFromData(element,normalizeNameYaxe);
      //getMonth ...
     if (measur.x.indexOf(year_Month_Day[this.indexOfTypeOfDate]) == -1 )
   {   
/* 

zeroRigth
*/

  nbZero=(year_Month_Day[this.indexOfTypeOfDate]-preDate);
     if( nbZero>1)
     {
       for (let index = 1; index < nbZero-1; index++) {
         var margeAxeX=Number.parseInt(preDate+"") +index+1;
        measur.x.push(margeAxeX);
        measur.y.push(0);
        position++;
       }
     }

     /* 


*/

     measur.x.push(year_Month_Day[this.indexOfTypeOfDate]);
     if(measur.paramMethodeMaseur =="all")
   {  measur.y.push(1);
    }

     else
 {    
   measur.y.push(element[measur.paramMethodeMaseur]);
    }
     position++;

   }
   else
{  
      if(measur.paramMethodeMaseur =="all")
      {  
     measur.y[this.measur.x.indexOf(year_Month_Day[this.indexOfTypeOfDate]) ]++;
      }

      else
      {      
  measur.y[this.measur.x.indexOf(year_Month_Day[this.indexOfTypeOfDate]) ]+=element[measur.paramMethodeMaseur];
  console.log(total);
      }

}   });

var percentageValue:Number=0;
   if(measur.methodeOfMaseur =='2')
   measur.y.forEach((y,index)=>{
    percentageValue=(y/total)*100;
    measur.y[index]= Number.parseFloat(percentageValue.toFixed(3)) ;

   })

  this.chartOptions =  {
  


xAxis: {
categories: this.measur.x,
tickmarkPlacement: 'on',
title: {

 text: `The Curve Function Is Expressed By The ${measur.by !== undefined && measur.by !=='' ? measur.by: 'Name line' } Of The ${ measur.nameXAxe != undefined && measur.nameXAxe != '' ? measur.valueNameXaxe: 'As a function of'}`
 ,  style: {
  color: this.textColor,
  fontFamily: 'Trebuchet MS, Verdana, sans-serif'

} ,

    enabled: true,
   },
   labels: {
    style: {
        color: this.textColor,
    }
},
style :{
  title:this.textColor
}

},
yAxis: {

  title: {
    enabled: true,
   
       text: `${measur.nameYAxe } (${measur.paramMethodeMaseur})`,
       style: {
        color: this.textColor,

     }    
      }
      ,
      labels: {
       format: measur.methodeOfMaseur == '2'? "{value}%":"{value}",
       percentageDecimals: 1,
       style: {
        color: this.textColor,
    }
   }},
   


series: [{
name: measur.nameLine,
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

  if( element[normalizeName].indexOf('/') != -1)
  {
separator='/';
  
  }

var year_Month_Day=    element[normalizeName].split(separator)
return year_Month_Day;
}
}
