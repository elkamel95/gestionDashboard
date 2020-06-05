//dialog-box.component.ts
import { Component, Inject, Optional, OnInit, EventEmitter, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Widget } from 'src/app/models/Widget';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ValidatorRequired } from 'src/app/shared/custom-validator/ValidatorRequired';
import { ServiceWidgetService } from 'src/app/services/widget/service-widget.service';
import { XmlService } from 'src/app/services/XmlData/xml.service';
import { async } from 'rxjs/internal/scheduler/async';
import { AuthenticationService } from 'src/app/services/Auth/authentication-service.service';


export interface Type {
  id                                : string ;
  name                              : string ;

}
export class filter {
  by: string;index: number ;val:string;
}

export class Url {
  by                                : string ;
  name                              : string;
  property                          : string ;
  valuepropertyOfTypeArray          : string ;
  value                             : string ;
  type                              : string;
  

}
export interface formatUrlWithDynamicProperty{
lasteYears : string ;
lastMonth:string; 
lastWeek:string;
lastDay:string;
today:string ;
session:string;
}


@Component({
  selector                          : 'app-dialog-box',
  templateUrl                       : './dialog-box.component.html',
  styleUrls                         : ['./dialog-box.component.css']
})
export class DialogBoxComponent implements OnInit{
nrSelect                            = 1;
selected                            = "1";
public labelDate="Choose a date";
public index :any                      = 0;
public xmlEntites                        : any ;
public enterPoint                   = "";
public and                          = ""
public attributes                 :any [] | filter[]   =[];
public attributesValues             = [] ;
public attributesName               = '' ;
public requests                  :Url[]   = [] ;
public isDynamic                    = false;
public urlRequest                   : Url =new Url();
public property                 : string | any = "";
public entity                      :any  ;
public attribute                    :any ;

@Output() changeProprty:EventEmitter<any> = new EventEmitter<any> ();
originalUrl :string=""; 
filterDynamicDate :formatUrlWithDynamicProperty = {lasteYears:'N',lastMonth:'N',lastWeek:'N', today:'N',lastDay:'N',session:'N'} ;
nameButtonNext                      = "Next"
nameButtonBack                      = "Back"
widgetControleForm                  : FormGroup;
chartOptions                        = {};
screenWidth                         : number ;
dateProperty                        :string[];
datePropertyName                    :string[];
isactive                            = false ;
update                              = false ;
filterType                          = "";
types:Type [] = [
{'id'                               : "1" , 'name':'indicateur'},
{'id'                               : "2" , 'name':'indicateur avec liste'},
{'id'                               : "3" , 'name':'liste'},
{'id'                               : "4" , 'name':'graphique'},
]

font_size =[
"large","larger","medium","small","smaller","x-large","x-small","xx-large","xx-small","-webkit-xxx-large"
]
size =[
"8","10","12","14","15","16","18","20","22","25","30"
]
font_style =[
"900","bold","bolder","inherit","initial",
"lighter","normal","unset"
]
action                              : string;
local_data                          : any;
ControleForm                        : FormGroup;
data                                : Widget = new Widget() ;
submitted                           = true;
next                                = 0 ;

ngOnInit() {  
  this.screenWidth   = this.serviceWidge.screenWidth - (10*this.serviceWidge.screenWidth/100);
  this.dateProperty   =this.serviceWidge.getDateProperty();     
  this.datePropertyName ==this.serviceWidge.getDatePropertyName();  
if(this.data.id == null)
{

    this.data.type                  = "1";

    this.data .width                = 400;
    this.data .height               = 285;
  

  this.data.backgroundSmallWidget   = "#FFB500";
  this.data.textColor               = "#000000";
  this.data.positionLeft            = "";
  this.data.positionRight           = "";
  this.data.font                    = "normal";
  this.data.colorSmallWidget        = "#FFB500";
  this.data.backgroundColor         = "#fff";
  this.data.size                    = "x-large";
this.data.visible                   = true;
this.data.url                       = "";
 
}




}
  constructor(private fb            : FormBuilder, private auth:AuthenticationService,
    public dialogRef                : MatDialogRef<DialogBoxComponent>,
    private xml:XmlService,private serviceWidge:ServiceWidgetService,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public Alldata: any) {  
    this.data                     = Alldata.element;
    this.local_data                 = {...this.Alldata};
    this.action                     = this.local_data.action;
    this.update                     = false ;
  
  this.xmlEntites= this.xml.xmlItems;
  /* declaration de variable (les Entites ,attributes) de puis la fichie xml */ 
  this.entity           =  this.xmlEntites[this.index].entities ;
  this.attributes       =  this.xmlEntites[this.index].attributes;
  this.datePropertyName = serviceWidge.datePropertyName;
  this.dateProperty =serviceWidge.dateProperty;

  this.originalUrl=this.data.url;
/* if the action is updated, call the URL decryption method   */ 
if(this.data.url !=undefined)
  this.decryptageUrl();
  }

 

  /* create a query by properties, criteria , values and types   */ 

  cryptageUrl(){
    var newUrl                      = ""
    var url                         = "";
    this.requests.forEach(element=>{
      if(element.by !=undefined)
   { 

    if(element.type.toString() ==='date' || element.type.toString()  =='numeric')
   { this.checkTypeDate(element.value);
    newUrl                          = `${element.by}[${element.property}]=${element.value}${this.and}${url}`;
}
    else if (element.type.toString() ==='boolean')
    newUrl                          = `exists[${element.by}]=${element.value}${this.and}${url}`;
    else
    newUrl                          = `${element.by}[]=${element.value}${this.and}${url}`;
    url                             = newUrl ;

      this.and                      = "&"

  }
    
    });
    return url ;
  }

 
  /* returns an array of type url. all properties, criteria, filter types and values ​​of a string (query)*/ 

   async decryptageUrl(){
    

    this.update                     = true ;
    this.and                        = "&"
    this.enterPoint                 = this.data.url.substring(  0,  this.data.url.indexOf("?")+1);
   var index                        = this.enterPoint.indexOf('/');
   var  entity                     = this.enterPoint.substring(  index+1,  this.data.url.indexOf("?"));
   
   this.getEntityByName( entity  );

   this.data.url                 = this.data.url.substring(    this.data.url.indexOf("?")+1, this.data.url.length);
      var array                     = this.data.url.split('&');
  
        array.forEach( async element => {
          var array                 = element.split('=');
          var request               : Url =new Url();
        if(array[0].indexOf("[")!=-1)  
{       
 request.by                 = array[0].substring(0,array[0].indexOf("["));

if(request.by === 'exists')
{ 
  
 request.property                   = request.by;
 request.by                         = array[0].substring(array[0].indexOf("[")+1,array[0].indexOf("]"));
 request.type                       = "boolean"
}
else if(array[0].substring(array[0].indexOf("[")+1,array[0].indexOf("]"))!='')

 {  
request.property                    = array[0].substring(array[0].indexOf("[")+1,array[0].indexOf("]"));

request.type                        = "date"

}else {
  request.type               = "array";

}
}        else
      { 
         request.by                 = array[0];
         request.type               = "array";

      }
  
       

  

        request.value               = array[1];
     

        request.name =  this.translateValueToNameFromXml(    request.by);
      
     
        this.requests.push(request);
        });
        
  }
  translateValueToNameFromXml(attributeName ):string{
 
    var value                       = "";
    this.xml.xmlItems[this.index].attributes.forEach(attribute => {


      if( attribute.$.name.toString() === attributeName.toString())  
     {

       return value                 = attribute.$.value;
   
    }

  });
  return value       ;    
  }
 

   



  setType(event: { value: string; }){
    this.data.type                  = event.value ;
    if(this.data.id == null)
{
  if(this.data.type ==='4'){
    this.data .width                = 1000;
    this.data .height               = 300;
    this.data.size                  = "20";
    this.data.textColor             = "#000";

    this.data.backgroundColor       = "#fff";


}else if(this.data.type ==='3'){
  this.data.textColor             = "#fff";

  this.data.backgroundColor       = "#0B0F2F";
  this.data .width                = 500;

}

}
  }

  setChartOptions(width             = 300,height="200",text="",colorText ="#000"
  ,backgroundColor                  = "#fff",size="6",font ="bold"
  )

  
  {

    
    this.chartOptions =  {
        chart: {
     type                           : 'area',
     height                         : height ,
     width                          : width,
     backgroundColor                : backgroundColor

   },
 title: {
     text                           : text,
     style                          : { "color": colorText, "fontSize": size+"px"  }

  
 },
 legend: {
   itemStyle: {
       font                         : '9pt Trebuchet MS, Verdana, sans-serif',
       color                        : colorText
   },
   itemHoverStyle:{
       color                        : colorText
   }   
},
 credits :{
   enabled                          : false
 }, 
 xAxis: {
     categories                     : ['1750', '1800', '1850', '1900', '1950', '1999', '2050'],
     tickmarkPlacement              : 'on',
     title: {
         enabled                    : false,
         style                      : { "color": colorText, "fontSize": "18px" }
        }
 },
 yAxis: {
     title: {
         text                       : 'Billions',
        style                       : { "color": colorText, "fontSize": "18px" }
     },
 
 },


 series: [{
     name                           : 'Asia',
     data                           : [502, 635, 809, 947, 1402, 3634, 5268]
 }, {
     name                           : 'Africa',
     data                           : [106, 107, 111, 133, 221, 767, 1766]
 }, {
     name                           : 'Europe',
     data                           : [163, 203, 276, 408, 547, 729, 628]
 }, {
     name                           : 'America',
     data                           : [18, 31, 54, 156, 339, 818, 1201]
 }, {
     name                           : 'Oceania',
     data                           : [2, 2, 2, 6, 13, 30, 46]
 }]};


 }
 async doAction(){
    if(this.next <=2 && this.data.nameFr&&this.data.nameEn && this.data.description )
    this.next++;

    if(this.data.nameFr&&this.data.nameEn && this.data.description && this.next == 2 ) 
  {  this.dialogRef.close({event    : this.action,data:this.data});
  await  this.cryptageUrl();
  this.enterPoint                     = `${ this.xmlEntites[this.index].entities.enterpoint.toString() }?`;

  this.data.users                 = `api/users/${localStorage.getItem('idUser')}`;
    var filterDynamicDate =this.filterDynamicDate.lasteYears+ this.filterDynamicDate.lastMonth+this.filterDynamicDate.lastWeek+this.filterDynamicDate.lastDay+this.filterDynamicDate.today+this.filterDynamicDate.session
    this.enterPoint                 = this.isDynamic? '!'+filterDynamicDate+this.enterPoint:this.enterPoint;
      this.data.url                 = this.enterPoint+ (this.cryptageUrl().charAt(this.cryptageUrl().length-1)=='&'? this.cryptageUrl().substring(0,this.cryptageUrl().length-1):this.cryptageUrl()) ;

    

  }



  }
  back(){
    if(this.next !=0 && this.next >=0)
    this.next -- ;
  }

  closeDialog(){
    this.data.url =this.originalUrl;
    this.dialogRef.close({event     : 'Cancel'});
  }

  getProperty(){

   this.filterType       =  this.xmlEntites[this.index].attributes[this.attribute.index].$.type  ;

  if(  this.xmlEntites[this.index].attributes[this.attribute.index].property  != undefined)
       {  this.attributesValues     =  this.xmlEntites[this.index].attributes[this.attribute.index].property ;
      }
         else
{         this.attributesValues     = [];
}
 
           

  }
  getAttributes(){

              this.attributesValues           = [];

              this.entity.name           =  this.xmlEntites[this.index].entities.name.toString() ;

              this.attributes       =  this.xmlEntites[this.index].attributes ;
              
  var updateFilter:filter =new filter() ; 


  updateFilter.by=this.attributes   [0].$.name; 
  updateFilter.index=0; 
  updateFilter.val=""; 
  this.attribute =       updateFilter ;
  this.filterType       =  this.attributes[0].$.type  ;

  
  }

async generateUrl(input?){

this.update?this.nameButtonNext     = "Update":this.nameButtonNext ="Create";
  this.nameButtonBack               = "Close";
  this.urlRequest.by                = this.attribute.by;

  if(this.filterType.toString() =="array" )
{  
  this.urlRequest.value                    = this.property.name  ;
  this.urlRequest.valuepropertyOfTypeArray =this.property.value

}
  else if ( this.filterType.toString() =="boolean") 
  {
    this.urlRequest.value =this.property

  }
 else 
  this.urlRequest.property          = this.property   ;

  if(this.filterType.toString() =="session")
{  input.value                      = this.attributes[ this.attribute.index].$.session_value;
  this.isDynamic                    = true;
  this.filterDynamicDate.session='S';

}
if(this.filterType.toString() =="date" )
  {
    console.log("date" );
    this.labelDate="Choose a date";
  var   dynamicDate         =   this.checkTypeDate(this.property);


  if(input.value !=undefined && dynamicDate == undefined)
  this.urlRequest.value             = input.value ;
  
  else {
    input.value=dynamicDate;
    this.urlRequest.value=dynamicDate;
  }

}else{

if(input.value !=undefined )
  this.urlRequest.value             = input.value ; 
 }
  this.urlRequest.name  = this.translateValueToNameFromXml(this.urlRequest.by);
  this.urlRequest.type              = this.filterType ;

this.requests.push(this.urlRequest );
this.urlRequest                     = new Url();

}

checkTypeDate(property){
  var   dynamicDate                     
console.log(property);


    if(property.charAt(0) =='#')
  {
  this.urlRequest.property        = "after"
  this. labelDate=" dynamic date has been selected";
    dynamicDate                     = this.property;

if (property =='#TD#')
this.filterDynamicDate.today='T'
else if( property=='#LY#')
this.filterDynamicDate.lasteYears='Y'
else if(property=='#LM#')
this.filterDynamicDate.lastMonth='M'
else if(property=='#LW#')
this.filterDynamicDate.lastWeek='W'
else if(property=='#LD#')
this.filterDynamicDate.lastDay='D'
 this.isDynamic                  = true;
  }
  return dynamicDate ;
}


removeByIndex(index){
  if (index > -1) {
  this.requests.splice(index,1);


  }
 
}
UpdateQueryByIndex(index:number){


    var updateFilter:filter =new filter() ; 
    updateFilter.by=this.requests[index].by; 
    updateFilter.index=index; 
    updateFilter.val=this.requests[index].value; 
    console.log(updateFilter);
    this.attribute= updateFilter;
    console.log(this.attribute);

    this.filterType= this.requests[index].type;
    this.property= this.requests[index].property;

      this.changeProprty.emit();
    }
    compareFn(c1: any, c2:any): boolean {   
      if(c1 && c2 ? c1.by === c2.by : c1 === c2)
      return c1 && c2 ? c1.by === c2.by : c1 === c2; 
    }


getEntityByName(entity){
  var index      

      
for (  index = 0; index < this.xml.xmlItems.length; index++) {

if  (this.xml.xmlItems[index].entities.name.toString() === entity.toString())
{  

  break ;
}  
}

this.index=index;
this.attributes       =  this.xmlEntites[this.index].attributes ;
this.entity.name=this.xml.xmlItems[index].entities.name.toString() ;
return this.xml.xmlItems[index].entities.name.toString() ; 
}







}
  

