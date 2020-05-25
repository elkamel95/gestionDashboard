import { Component, OnInit, Input } from '@angular/core';
import { ServiceWidgetService } from 'src/app/services/widget/service-widget.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-indicateur',
  templateUrl: './indicateur.component.html',
  styleUrls: ['./indicateur.component.css']
})
export class IndicateurComponent implements OnInit {
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
@Input() url:string;
public valueWidget :number=0;
public loadedData =true ; 
public activeUrl=""
public dontActiveUrl=""
  entity="";

  constructor(private serviceWidget:ServiceWidgetService,private router : Router) {
   }

  ngOnInit() {
    this.activeUrl=this.router.url;
    this.dontActiveUrl=this.router.url;

    if(this.url !=undefined)
   { 
    var entity =this.url.substring(this.url.indexOf("/")+1,this.url.indexOf("?"));

    this.serviceWidget. translateValueToNameFromXml(entity).then((entity:any)=>{
      this.entity=entity.entitys.value;
    });
    //  #DN#:  data now  
     if(this.url.charAt(0)==='!'){
      this.url=   this.serviceWidget. createDynamicQuery(this.url);
    }
    this.serviceWidget.getAnything( this.url,false).subscribe(list=>{
      this.valueWidget = list.length ; 
              
              },()=>{},()=>{this.loadedData=false});
            
            
              this.getDataFromUrl( this.url);

            }
}



  

  getDataFromUrl(url){
setTimeout(()=>{
  this.dontActiveUrl=this.router.url;
  if(this.activeUrl ==this.dontActiveUrl)
{  this.serviceWidget.getAnything( url,false).subscribe(list=>{
    this.valueWidget = list.length ; 
            
            },()=>{},()=>{this.loadedData=false ;           
                  this.getDataFromUrl( this.url);
            });
}
},20000);
   

}


}
    
