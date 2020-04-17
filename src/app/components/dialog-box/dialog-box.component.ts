//dialog-box.component.ts
import { Component, Inject, Optional, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Widget } from 'src/app/models/Widget';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ValidatorRequired } from 'src/app/shared/custom-validator/ValidatorRequired';
import { ServiceWidgetService } from 'src/app/services/widget/service-widget.service';


export interface Type {
  id:string ;
  name :string ; 

}


@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})
export class DialogBoxComponent implements OnInit{
  nrSelect=1;
  selected ="1";
  widgetControleForm: FormGroup;
  chartOptions ={};
  screenWidth :number ;
    types:Type [] = [ 
    {'id':"1" , 'name':'indicateur'},
    {'id':"2" , 'name':'indicateur avec liste'},
    {'id':"3" , 'name':'liste'},
    {'id':"4" , 'name':'graphique'},
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
  action:string;
  local_data:any;
  ControleForm: FormGroup;
  data:Widget = new Widget() ; 
  submitted = true;
  constructor(private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogBoxComponent>,private serviceWidge:ServiceWidgetService,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public Alldata: any) {
      this.data=  Alldata.element;
    this.local_data = {...this.Alldata};
    this.action = this.local_data.action;


  }
  selectedColor($event){
    //}   this.data.textColor = $event};
  }
ngOnInit(): void {  
if(this.data.id == null)
{

    this.data.type ="1";

    this.data .width=100;
    this.data .height=100;
  

  this.data.backgroundSmallWidget ="#fff";
  this.data.textColor="#fff";
  this.data.positionLeft="";
  this.data.positionRight ="";
  this.data.font ="normal";
  this.data.colorSmallWidget ="#fff";
  this.data.backgroundColor ="#FFA400";
  this.data.size ="x-large";
this.data.visible =true;
this.data.url ="";
 
}




}
   
  setType(event: { value: string; }){
    this.data.type = event.value ;
    if(this.data.id == null)
{
  if(this.data.type ==='4'){
    this.screenWidth=this.serviceWidge.screenWidth - (10*this.serviceWidge.screenWidth/100);
    this.data .width=1000;
    this.data .height=300;
    this.data.size ="20";
    this.data.textColor="#000";

    this.data.backgroundColor="#fff";


}}
  }

  setChartOptions(width=300,height="200",text="",colorText ="#000"
  ,backgroundColor="#fff",size="6",font ="bold"
  )

  
  {

    
    this.chartOptions =  {
        chart: {
     type: 'area',
     height: height ,
     width: width,
     backgroundColor:backgroundColor

   },
 title: {
     text: text,
     style:  { "color": colorText, "fontSize": size+"px"  }

  
 },
 legend: {
   itemStyle: {
       font: '9pt Trebuchet MS, Verdana, sans-serif',
       color: colorText
   },
   itemHoverStyle:{
       color: colorText
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
         style: { "color": colorText, "fontSize": "18px" }
        }
 },
 yAxis: {
     title: {
         text: 'Billions',
        style: { "color": colorText, "fontSize": "18px" }
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
  doAction(){


if(this.data.nameFr&&this.data.nameEn && this.data.description)
    this.dialogRef.close({event:this.action,data:this.data});
  }

  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  }

}
