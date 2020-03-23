import { Component, OnInit, OnDestroy } from '@angular/core';
import { ServiceWidgetService } from 'src/app/services/widget/service-widget.service';
import { Widget } from 'src/app/models/Widget';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit  {
listWidget : Widget [] []=[] ;
listWidgetGraphique : Widget  []=[] ;

  constructor(private serviceWidget:ServiceWidgetService) {
this. getWidgetIndicateur();
    
 this. getWidgetGraphique();
  }
  

  ngOnInit() {

  }
  getWidgetGraphique(){
    this.serviceWidget.getAllWidget().subscribe(widget=>{
      this. listWidgetGraphique = widget ;
    });
  }
 getWidgetIndicateur() {

    this.serviceWidget.getAllWidget().subscribe(widget=>{
    let   index = 0;
    let i =0 ;
    let widgets = new Widget  ();
   let  playStore : Widget[] =[] ;

    let listWidget : Widget[] [] =[] ;

      widget.forEach(function(item){  

        if(index <3)
       { 
         playStore.push(item)  ;
         index++ ;
         console.log(index);

      }
      else 
       { 
        playStore.push(item)  ;

        console.log(playStore);

        listWidget.push(playStore);

        playStore =[] ;

        index = 0 ; 
      }

      }
      
      ); 
        listWidget.push(playStore);

      this.listWidget= listWidget;
    })
 
 
  }


}
