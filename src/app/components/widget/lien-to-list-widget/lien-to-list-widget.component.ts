import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Widget } from 'src/app/models/Widget';
import { ServiceWidgetService } from 'src/app/services/widget/service-widget.service';
import { WidgetList } from 'src/app/services/widget/widget-list';

@Component({
  selector: 'lien-to-list-widget',
  templateUrl: './lien-to-list-widget.component.html',
  styleUrls: ['./lien-to-list-widget.component.css']
})

export  class LienToListWidgetComponent extends WidgetList implements OnInit  {
  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public Alldata: Widget ,
  public dialog: MatDialog,  serviceWidget:ServiceWidgetService) {
    super( Alldata, dialog,serviceWidget )
   }
   closeDialog(){
    this.dialog.closeAll();
  }
  
  ngOnInit() {
    if(this.Alldata !=null){
      this.title = this.Alldata.nameFr;
      
    this.backgroundColor =this.Alldata.backgroundColor;
    this.size=this.Alldata.size;
    this.textColor =this.Alldata.textColor;
    this.width = this.Alldata.width ;
    if(this.Alldata.url !=undefined)
    {
      if(this.Alldata.type!=undefined)
      this.isRelationType=false;
else      this.isRelationType=true;

      this.url = this.Alldata.url ;
    console.log(this.url);
      this.getDataFromUrl(this.url);}
    
    }
  }

}
