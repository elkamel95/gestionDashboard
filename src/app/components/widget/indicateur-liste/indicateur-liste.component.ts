import { Component, OnInit, Input } from '@angular/core';
import { WidgetListComponent } from '../widget-list/widget-list.component';
import { MatDialog } from '@angular/material';
import { Widget } from 'src/app/models/Widget';
import { ServiceWidgetService } from 'src/app/services/widget/service-widget.service';
import { LienToListWidgetComponent } from '../lien-to-list-widget/lien-to-list-widget.component';
import { WidgetIndicator } from 'src/app/services/widget/WidgetIndicator';

@Component({
  selector: 'IndicateurListe',
  templateUrl: './indicateur-liste.component.html',
  styleUrls: ['./indicateur-liste.component.scss']
})
export class IndicateurListeComponent extends WidgetIndicator
 {


data:Widget = new Widget();
  screenWidth: number;
  screenHeight :number;

  public valueWidget :number=0;
  public loadedData =true ; 

  entity="";
    constructor(public serviceWidget:ServiceWidgetService,
      public dialog: MatDialog) {
    
      super(serviceWidget);
     }
  
  
  openList() {
 
 {   

  this.data.nameFr =this.title;
  this.data.backgroundColor =this.backgroundSmallWidget;
this.data.size = this.size ; 
this.data.textColor = this.textColor ;
this.data.url= this.url ;
this.data.width=  this.screenWidth ;
this.data.type='2';
    const dialogRef = this.dialog.open(LienToListWidgetComponent,{
      width: '98%',
      maxWidth:'98%',
      minWidth:'98%',
      maxHeight:'98%',

      height:'98%',
data:this.data,
    });
 }


}}


  