import { Component, OnInit } from '@angular/core';
import { XmlService } from './services/XmlData/xml.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'frontdasboard';
  public index = 0; 
  public items :any ;
  public attributes =[] ;
  public attributesValues =[] ;
public val ="";
 public listAttributes =[] ; 
 public entity ="" ;
 public a :any ={};
  constructor(
   private xml:XmlService){

 
   this.xml.loadXML() .subscribe((data) => {  
    this.xml.parseXML(data)  

          .then((datas) => {  
            this.items = datas; 
            this.entity = datas[0].entitys.name ; 
            this.attributes=datas[0].attributes
       console.log(this.attributes);
          });  
       
      }); 

  }
  getValuesAttributes(){
    this.xml.loadXML() .subscribe((data) => {  
      this.xml.parseXML(data)  
  
            .then((datas) => {  

              if( datas[this.index].attributes[this.a.index].value != undefined)
         this.attributesValues=     datas[this.index].attributes[this.a.index].value;

         console.log( this.attributesValues);
            });  
         
        }); 
  }
  getAttributes(){
    this.xml.loadXML() .subscribe((data) => {  
      this.xml.parseXML(data)  
  
            .then((datas) => {  
              this.entity = datas[this.index].entitys.name.toString() ; 

              this.attributes=datas[this.index].attributes ; 
              if( datas[this.index].attributes[0].value != undefined)
         this.attributesValues=     datas[this.index].attributes[this.a.index];

         console.log( this.attributesValues);
            });  
         
        }); 
  
  }
  ngOnInit(): void {
   

  }
generateUrl(){

  console.log(`?api/${this.entity}?${this.a.att}=${this.val}`);
}

}
