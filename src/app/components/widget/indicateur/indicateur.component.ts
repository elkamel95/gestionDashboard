import { Component, OnInit, Input } from '@angular/core';
import { ServiceWidgetService } from 'src/app/services/widget/service-widget.service';

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
@Input() backgroundSmallWidget="#ffa000"; 
@Input() colorSmallWidget="#000" ;
@Input() size ="";
@Input() width ;
@Input() height;
@Input() font;
@Input() url:string;
public valueWidget :number=0;
public loadedData =true ; 
  constructor(private serviceWidget:ServiceWidgetService) { }
  getDate(){
    var currentDate = new Date()
var day = currentDate.getDate()
var month = currentDate.getMonth() + 1
var year = currentDate.getFullYear();
    return  year+'-'+month+'-'+day;
      }
    
  ngOnInit() {
    this.height ="70%"
    if(this.url !=undefined)
   { 
    //  DN:  data now  
     if(this.url.charAt(0)==='D'&&this.url.charAt(1)==='N'){

      this.url=  this.url.replace('!',this.getDate());
      this.url = this.url.substring(2, this.url.length);
      console.log(this.getDate());
    }
 

    this.getDataFromUrl( this.url);
}
  }

  getDataFromUrl(url){

    this.serviceWidget.getAnything(url).subscribe(list=>{
this.valueWidget = list.length ; 
        
        },()=>{},()=>{this.loadedData=false});}

}
