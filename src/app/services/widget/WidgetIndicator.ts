import { OnInit, Input, Injectable } from '@angular/core';
import { ServiceWidgetService } from 'src/app/services/widget/service-widget.service';


@Injectable({
    providedIn: 'root'
  })
export class WidgetIndicator implements OnInit {
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

  entity="";

  constructor(public serviceWidget:ServiceWidgetService) {
   }

  ngOnInit() {


    if(this.url !=undefined)
   { 
    var entity =this.url.substring(this.url.indexOf("/")+1,this.url.indexOf("?"));

      this.entity=  this.serviceWidget. translateValueToNameFromXml(entity).entities.value;

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


}
    
