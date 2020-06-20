import { Component, OnInit } from '@angular/core';
import { ServiceWidgetService } from 'src/app/services/widget/service-widget.service';
import { Widget } from 'src/app/models/Widget';

@Component({
  selector: 'app-consult-widgets',
  templateUrl: './consult-widgets.component.html',
  styleUrls: ['./consult-widgets.component.css']
})
export class ConsultWidgetsComponent  {
  types  = [ 
    'indicateur',
    'indicateur avec liste',
    'liste',
    'graphique'
      ]
      status=0;
      widget:Widget = new Widget();
  order ="desc";
  groupe ="updateAt";
  title ="";
 listWidget;
  spinner: boolean;
  isActive: boolean=false;

  isPressed=false;
  visibility='visibility_off';
  actionTitle="Active"
  length =100;
  pageSize = 5;
  pageSizeOptions: number[] = [2, 10, 25, 100];
  pageIndex=0;
  constructor(private ws:ServiceWidgetService) { 
    this.pageSize = 5;
    this.pageIndex=0;

  ws.refreshneeded.subscribe(()=>{
      this.getData();
    });
  
    this.getData();

  }
  getData(event?){
if (event)
{
  this.pageIndex=event.pageIndex;
  this.pageSize=event.pageSize;

}
    this.spinner =false ;
    this.ws.getAllWidgetDashbord(this.pageIndex+1,this.pageSize,this.groupe,this.order,this.title).subscribe(
      listWidget=>{
  if(listWidget.length != 0 )
     {  
      this.listWidget =listWidget['hydra:member'];
 console.log(this.listWidget);
      this.length=  listWidget['hydra:totalItems'];
    }}, error=>{},()=>{ this.spinner =true ;
      this.isActive=true}
    
    
    );
  
    
  
  }
  visibilityWidgetAction(widget:Widget){
    this.spinner =false ;

    widget.visible ?  this.status=0 :this.status=1;
this.ws.visibilityWidget(this.status,widget.id);
  }
  visibilityWidgetForm(widget:Widget){
    this.widget=widget;
  }
  search(event) {
    this.title = event.value.trim().toLowerCase() ;

this.getData();
  }
  getOrder(order='desc') {

    this.order = order ;
    this.getData();
    
        }
        getGroupe(groupe='asc'){
          this.groupe = groupe;
          this.getData();
    
        }
}



