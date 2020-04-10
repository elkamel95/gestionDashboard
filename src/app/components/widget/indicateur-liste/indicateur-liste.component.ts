import { Component, OnInit, Input } from '@angular/core';
import { WidgetListComponent } from '../widget-list/widget-list.component';
import { MatDialog } from '@angular/material';
import { Widget } from 'src/app/models/Widget';

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

  constructor(public dialog: MatDialog) { }

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
    const dialogRef = this.dialog.open(WidgetListComponent,{
      width:'  200vm' ,
 maxWidth:' 200vm',
 
data:this.data,


    });
    console.log("qsd");
 }


}}


  