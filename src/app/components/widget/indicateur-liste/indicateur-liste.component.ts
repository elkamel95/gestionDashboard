import { Component, OnInit, Input } from '@angular/core';
import { WidgetListComponent } from '../widget-list/widget-list.component';
import { MatDialog } from '@angular/material';
import { Widget } from 'src/app/models/Widget';
import { ServiceWidgetService } from 'src/app/services/widget/service-widget.service';

@Component({
  selector: 'IndicateurListe',
  templateUrl: './indicateur-liste.component.html',
  styleUrls: ['./indicateur-liste.component.css']
})
export class IndicateurListeComponent 
implements OnInit {
@Input() indicateur =0 ;
@Input()  title =" ";
@Input() backgroundColor ="";
@Input() textColor ="";
@Input() backgroundSmallWidget="" ; 
@Input() colorSmallWidget="" ;
@Input() size ="";
@Input() width ;
@Input() height;
@Input() font;
@Input() url ; 

data:Widget = new Widget();
  screenWidth: number;
  screenHeight :number;
  constructor(public dialog: MatDialog,private serviceWidget:ServiceWidgetService) { 
    this.screenWidth= serviceWidget.screenWidth - (10* serviceWidget.screenWidth/100);
this.screenHeight = serviceWidget.screenHeight - (10* serviceWidget.screenWidth/100);
  }

  ngOnInit() {
    this.width ="100%";
    this.height ="70%"

  }
  openList() {
 
 {   

  this.data.nameFr =this.title;
  this.data.backgroundColor =this.backgroundSmallWidget;
this.data.size = this.size ; 
this.data.textColor = this.textColor ;
this.data.url= this.url ;
this.data.width=  this.screenWidth ;

    const dialogRef = this.dialog.open(WidgetListComponent,{
 width:this.serviceWidget.screenWidth +"px",
 maxWidth: this.serviceWidget.screenWidth +"px",
    maxHeight: this.serviceWidget.screenHeight +"px",
    height:'80%' ,
data:this.data,

    });
    console.log("qsd");
 }


}}


  