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
  public measur :MeasureValue = new MeasureValue();
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
     text: 'Date',
    
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
    var x =XYName[0];
    var y =XYName[1];
    var name =XYName[2];
this.measur.nameYAxe=name;
    console.log(XYName);

console.log(this.url.substring(0,this.url.indexOf("%")));
   this.serviceWidget.getAnythingWithTypeGraphic( `${this.url.substring(0,this.url.indexOf("%"))}&order[created_at]=asc`,false).subscribe(list=>{
     this.valueWidget=list;
     console.log(list);

     this.measureValue(list,x,y);
             },()=>{},()=>{this.loadedData=false});

}
measureValue(list,x,y){
 var position = 1; 

   list.forEach((element )=> {
 var normalizeNameYaxe=     this.normalizeName(x);

 var year_Month_Day =this.getYearsMonthDayFromData(element,normalizeNameYaxe);

      //getMonth ...
     if (this.measur.x.indexOf(year_Month_Day[1]) == -1 )
   {   
      this.measur.x.push(year_Month_Day[1]);
     this.measur.y.push(1);
     position++;

   }else
   this.measur.y[this.measur.x.indexOf(year_Month_Day[1]) ]++;


   });

  this.chartOptions =  {
  


xAxis: {
categories: this.measur.x,
tickmarkPlacement: 'on',
title: {
 text: 'Date',

    enabled: true,
   }
},
yAxis: {
title: {
 enabled: true,

    text:this.measur.nameYAxe,
   },

},


series: [{
name: 'draft',
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
