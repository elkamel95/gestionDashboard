import { Component, OnInit } from '@angular/core';
import { XmlService } from './services/XmlData/xml.service';

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
public property ="";
 public entity ="" ;
 public attribute :any ={};
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

              if( datas[this.index].attributes[this.attribute.index].property  != undefined)
         this.attributesValues=     datas[this.index].attributes[this.attribute.index].property ;
         else
         this.attributesValues=[];

         console.log( datas[this.index].attributes[this.attribute.index].property);
            });  
         
        }); 
  }
  getAttributes(){
    this.attributesValues=[];
    this.xml.loadXML() .subscribe((data) => {  
      this.xml.parseXML(data)  
  
            .then((datas) => {  
              this.entity = datas[this.index].entitys.name.toString() ; 

              this.attributes=datas[this.index].attributes ; 
         

            });  
         
        }); 
  
  }
  ngOnInit(): void {
   

  }
generateUrl(date){
  console.log(`api/${this.entity}?${this.attribute.att}[${this.property}]=${date.value}`);
}

}
