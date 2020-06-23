import { OnInit, Input, Injectable } from '@angular/core';
import { ServiceWidgetService } from 'src/app/services/widget/service-widget.service';


@Injectable({
    providedIn: 'root'
  })
export class WidgetGraphic implements OnInit {
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

  constructor(protected serviceWidget:ServiceWidgetService) {
   }

   ngOnInit() {
    console.log(this.url);


    if(this.url !=undefined)
   { 


      this.url=this.url.replace('[$string]','[]');
      this.url=this.url.replace('$','');

    //  #DN#:  data now  
     if(this.url.charAt(0)==='!'){
      var entity =this.url.substring(7,this.url.indexOf("?"));
    
      this.url=   this.serviceWidget. createDynamicQuery(this.url);
    }else
    var entity =this.url.substring(0,this.url.indexOf("?"));

    this.entity=  this.serviceWidget. translateValueToNameFromXml(entity).entities.value;

            
            console.log(this.url)
              this.getDataFromUrl( this.url);

            }
}



  

  getDataFromUrl(url){

    this.serviceWidget.getAnything( this.url,false).subscribe(list=>{
      this.valueWidget = list.length ; 
              
              },()=>{},()=>{this.loadedData=false});

}

}
    
