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
@Input()valuepropertyOfTypeArray="";
@Output() removeFilter:EventEmitter<any> = new  EventEmitter<any>();
@Output() updateFilter:EventEmitter<number> = new  EventEmitter<number>();

  constructor(private serviceWidget:ServiceWidgetService) { }
  ngOnInit() {
    for (let index = 0; index <  this.serviceWidget.dateProperty.length; index++) {
    
      if(  this.serviceWidget.dateProperty[index] == this.value)
    {
      this.propertyValueForDate =  this.serviceWidget.datePropertyName[index];
    
      break;
    }
      
    }

  }

  removeQuery(){
    this.removeFilter.emit();
  }
  updateQuery(){
this.updateFilter.emit(this.index);
  }
}
