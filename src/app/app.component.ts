import { Component, OnInit } from '@angular/core';
import { XmlService } from './services/XmlData/xml.service';
import { ServiceWidgetService } from './services/widget/service-widget.service';
export interface Sessiontype {
  sessionName :any,
  sessionProperty :any
 }
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  propertyForSessiontype :Sessiontype[] =[] ;

  ngOnInit(): void {
  }
   constructor(private widgetService:ServiceWidgetService,private xml:XmlService){
    this.xml.setPropertyForSessiontype().then(
      data=>{
        this.propertyForSessiontype.push(data);
      }
    );
  
  
    widgetService.setValueForSession(this.propertyForSessiontype);

   }
}