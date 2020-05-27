import { Component, OnInit, Input } from '@angular/core';
import { WidgetListComponent } from '../widget-list/widget-list.component';
import { MatDialog } from '@angular/material';
import { Widget } from 'src/app/models/Widget';
import { ServiceWidgetService } from 'src/app/services/widget/service-widget.service';
import { Router } from '@angular/router';
import { LienToListWidgetComponent } from '../lien-to-list-widget/lien-to-list-widget.component';

@Component({
  selector: 'IndicateurListe',
  templateUrl: './indicateur-liste.component.html',
  styleUrls: ['./indicateur-liste.component.scss']
})
export class IndicateurListeComponent 
implements OnInit {
@Input() indicateur =0 ;
@Input()  title =" ";
@Input() backgroundColor ="";
@Input() textColor ="";
@Input() backgroundSmallWidget="#000"; 
@Input() colorSmallWidget="#ffa000" ;
@Input() size ="";
@Input() width ;
@Input() height="300px";
@Input() font;
@Input() url ; 

data:Widget = new Widget();
  screenWidth: number;
  screenHeight :number;


 

  public valueWidget :number=0;
  public loadedData =true ; 
  public activeUrl=""
  public dontActiveUrl=""
  entity="";
    constructor(private serviceWidget:ServiceWidgetService,public dialog: MatDialog,private router : Router) {
      this.screenWidth= serviceWidget.screenWidth - (10* serviceWidget.screenWidth/100);
      this.screenHeight = serviceWidget.screenHeight - (10* serviceWidget.screenWidth/100);
      
     }
  
    ngOnInit() {
      this.activeUrl=this.router.url;
      this.dontActiveUrl=this.router.url;
      if(this.url !=undefined)
     { 
      var entity =this.url.substring(this.url.indexOf("/")+1,this.url.indexOf("?"));

      this.serviceWidget. translateValueToNameFromXml(entity).then((entity:any)=>{
        this.entity=entity.entities.value;
      });
      //  #DN#:  data now  
       if(this.url.charAt(0)==='!'){
        this.url=   this.serviceWidget. createDynamicQuery(this.url);
      }
    
              
              
                this.getDataFromUrl( this.url);
  
              }
  }
  
  
  
    
  
    getDataFromUrl(url){
      this.serviceWidget.getAnything( this.url,false).subscribe(list=>{
        this.valueWidget = list.length ; 
                
                },()=>{},()=>{this.loadedData=false});
  
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


  