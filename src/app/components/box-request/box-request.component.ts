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
@Input()type;
@Input()dynamic=false;

@Input()dynamicPropertyValueDate="";
@Input()index;
@Input()valueArray : string |any[];
@Output() removeFilter:EventEmitter<any> = new  EventEmitter<any>();
@Output() updateFilter:EventEmitter<number> = new  EventEmitter<number>();
public typeOf='string'; 
  constructor(private serviceWidget:ServiceWidgetService,) {
   }
  ngOnInit() {
    console.log(this.type);
    switch (this.type) {
      case 'boolean':
        this.value= this.getValueForProperty( this.serviceWidget.booleanFilterProperty,this.value);

        break;
        case 'numeric':
          this.property= this.getValueForProperty( this.serviceWidget.numericFilterProperty,this.property);
  
          break;
          case 'date':
            this.dynamicPropertyValueDate=   this.getValueForProperty( this.serviceWidget.dateFilterProperty,this.value);
    
            break;
        
      
      default:
        break;
    }
   
 

  

 

}
getValueForProperty(array,equals){
if(array)
  for (let index = 0; index <  array.length; index++) {

    if( array[index].name == equals)
  {

  return array[index].value;
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
