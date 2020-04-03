import { Component, OnInit } from '@angular/core';
import { Widget } from 'src/app/models/Widget';
import { ServiceWidgetService } from 'src/app/services/widget/service-widget.service';

@Component({
  selector: 'sidbar-config',
  templateUrl: './sidbar-config.component.html',
  styleUrls: ['./sidbar-config.component.css']
})
export class SidbarConfigComponent implements OnInit {
  data:Widget = new Widget() ; 

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
  constructor(private serviceWidget:ServiceWidgetService) {

   serviceWidget.currentWidget.subscribe(widget=>{

      this.data = widget ;
   });}
   updateWidget(){
     this.serviceWidget.update(this.data,this.data.id);
   }
  ngOnInit() {
  }

}
