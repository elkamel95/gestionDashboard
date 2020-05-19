import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ServiceWidgetService } from 'src/app/services/widget/service-widget.service';

@Component({
  selector: 'box-request',
  templateUrl: './box-request.component.html',
  styleUrls: ['./box-request.component.css']
})
export class BoxRequestComponent implements OnInit {

@Input()by="";
@Input()property ="";
@Input()value="";
@Input()name="";
@Input()propertyValueForDate="";
@Input()index;


@Output() removeFilter:EventEmitter<any> = new  EventEmitter<any>();
  constructor(private serviceWidget:ServiceWidgetService) { }
  ngOnInit() {
    for (let index = 0; index <  this.serviceWidget.dateProperty.length; index++) {
    
      if(  this.serviceWidget.dateProperty[index] == this.value)
    {this.propertyValueForDate =  this.serviceWidget.datePropertyName[index];
    
      break;
    }
      
    }

  }

  removeQuery(){
    this.removeFilter.emit();
  }
}
