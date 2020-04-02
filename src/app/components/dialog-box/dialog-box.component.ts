//dialog-box.component.ts
import { Component, Inject, Optional, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Widget } from 'src/app/models/Widget';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';


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
  constructor(private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public Alldata: any) {
      console.log(this.data);
      this.data=  Alldata.element;
    this.local_data = {...this.Alldata};
    this.action = this.local_data.action;

  }
  selectedColor($event){
    console.log($event) ;
    //}   this.data.textColor = $event};
  }
ngOnInit(): void {  
console.log(this.data);
   this.widgetControleForm = new FormGroup({
    typeWidget:new FormControl('1')
});

this.ControleForm = new FormGroup({
  font:new FormControl('1'),
  size:new FormControl('2')

});
this.data.type = '1';
}
   
  setType(event: { value: string; }){
    console.log(event);
    this.data.type = event.value ;
    
  }
  setChartOptions(width=300,height="200",text="",colorText ="#000"
  ,backgroundColor="#fff",size="6",font ="bold"
  )

  
  {

    console.log(size+"px");
    
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
    this.dialogRef.close({event:this.action,data:this.data});
  }

  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  }

}
