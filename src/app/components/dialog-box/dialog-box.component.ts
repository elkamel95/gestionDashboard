//dialog-box.component.ts
import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Widget } from 'src/app/models/Widget';


export interface Type {
  id:string ;
  name :string ; 

}


@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})
export class DialogBoxComponent {
  chartOptions ={};
    types:Type [] = [ 
    {'id':"1" , 'name':'indicateur'},
    {'id':"2" , 'name':'indicateur avec liste'},
    {'id':"3" , 'name':'liste'},
    {'id':"4" , 'name':'graphique'},
    ]
  action:string;
  local_data:any;
  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Widget) {
      console.log(data);

    this.local_data = {...data};
    this.action = this.local_data.action;

  }
  setType(event){
    console.log(event);
    this.data.type = event.id ;
    
  }
  setChartOptions(width=800,text,height?){
    
    this.chartOptions =  {
        chart: {
     type: 'area',
     height: height ,
     width: width
   },
 title: {
     text: text,
     style: {
       color: '#000',
       font: 'bold 16px "Trebuchet MS", Verdana, sans-serif'
   },
  
 },
 legend: {
   itemStyle: {
       font: '9pt Trebuchet MS, Verdana, sans-serif',
       color: 'black'
   },
   itemHoverStyle:{
       color: 'gray'
   }   
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
  doAction(){
    this.dialogRef.close({event:this.action,data:this.data});
  }

  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  }

}
