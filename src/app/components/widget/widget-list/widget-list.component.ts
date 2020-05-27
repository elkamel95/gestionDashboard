import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Widget } from 'src/app/models/Widget';
import { ServiceWidgetService } from 'src/app/services/widget/service-widget.service';
import { WidgetList } from 'src/app/services/widget/widget-list';
import { LienToListWidgetComponent } from '../lien-to-list-widget/lien-to-list-widget.component';




@Component({
  selector: 'widget-list',
  templateUrl: './widget-list.component.html',
  styleUrls: ['./widget-list.component.css']
})

export class WidgetListComponent extends WidgetList implements OnInit  {
  private newUrl = "";
  private enterpoint:string;
  private positionToStartIdItems=0;

constructor(@Optional() @Inject(MAT_DIALOG_DATA) public Alldata: Widget ,
public dialog: MatDialog,  serviceWidget:ServiceWidgetService) {
  super( Alldata, dialog,serviceWidget )
 }
 
  ngOnInit() {
    if(this.url !=undefined)
    {  
    this.getDataFromUrl(this.url);}
  }

  public showTheRelationData(url){
    if(typeof url ==="object")
   { 
    url= this.getEnterpointFromUrl(url);

  }
  else
  {
 


  url =url.substring(url.indexOf("/")+1,url.length);}

   var data:Widget = new Widget();
   data.url =url;
   data.nameFr =this.title;
   data.nameFr =this.title;
   data.size = this.size ; 
   data.textColor = this.textColor ;
   data.backgroundColor=this.backgroundColor;
   data.url= url ;
     this.openList(data);
   }      

   getIdRelationItems(positionToStartIdItems,url):string{
    var id=0;
    url.forEach(element => {
     id =element.substring(positionToStartIdItems+1,element.length);
       this.newUrl+=`id[]=${id}&` ;
});
  return this.newUrl.substring(0,this.newUrl.length-1);
  
     }
     getEnterpointFromUrl(url):string{
       
      for (let index = url[0].length; index > 1; index--) {
        if(url[0].charAt(index)=="/")
       { this.enterpoint=url[0].substring(1,index);
        this.positionToStartIdItems=index;
  break;   

}
      }
  
      var newUrl= this.getIdRelationItems(this.positionToStartIdItems,url);

  
      
      return `${this.enterpoint}?${newUrl}`;
     }
   openList(list) {

    this.dialog.open( LienToListWidgetComponent,{data:list  });}
    
}



