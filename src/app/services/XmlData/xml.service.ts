import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import xml2js from 'xml2js';  
import { GlobalConstants } from './../../common/global-constants';

 export interface entity {
  entities:any ; 
  attributes:any ;
}
export interface Sessiontype {
  sessionName :any,
  sessionProperty :any
 }
 const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/xml', //<- To SEND XML
    'Accept':  'application/xml',       //<- To ask for XML
    'Response-Type': 'text'   ,
    'Authorization': `Bearer ${localStorage.getItem('token')}`          //<- b/c Angular understands text
  })
};
@Injectable({
  providedIn: 'root'
})

export class XmlService  {
  public xmlItems: any;  
  public xmlText: Text;  

  public attributes:any;
  headers = new HttpHeaders();
public text:Text;
  constructor(private http: HttpClient) {
    this.headers.append('Authorization', `Bearer ${localStorage.getItem('token')}`);
    this.headers.append('Content-Type', `xml`);
    this.headers.append('Accept', `xml`);
    this.load();

    }  
 
  
 
   loadXML() {  

  return  this.http.get(`${GlobalConstants.DomainName}/api/xml/read`, {headers: this.headers,responseType: 'text'})  ;
      ;
  }
  load() {  

   this.http.get(`${GlobalConstants.DomainName}/api/xml/read`, {headers: this.headers,responseType: 'text'}).subscribe(XmlText=>{
    this.parseXML(XmlText).then(Xmlfile=>{
      this.xmlItems=Xmlfile;
    });
   })  ;
        
    }


  parseXML(data):Promise<any>{  
    return new Promise(resolve => {  
      var k: string | number,  
        arr = [],  
        elemnet:entity,
        parser = new xml2js.Parser(  
          {  
            trim: true,  
            explicitArray: true  
          });  
      parser.parseString(data, function (err, result) {  
        var obj = result.entities;  
       
        for (k in obj.entity) {  
          var item =obj.entity[k] ;  
          
          arr.push( 
            
            {  
            entities: item.$,  
            attributes: item.attribute,
            id:  item.$.identifier
          
          }
            
            
            );
        }  

        resolve(arr);  
      });  
    });  
  } 
setPropertyForSessiontype():Promise<any>{
  var   propertyForSessiontype :Sessiontype[] =[] ;

return new Promise (resolve=>{

  this.loadXML().subscribe(data=>{
    this.parseXML(data).then(xmlFile=>{
var index =0;
      for ( index =0; index < xmlFile.length; index++) {
        const entityArray = xmlFile[index];

      var  attributes = entityArray.attributes;
      for ( let index =0; index < attributes.length; index++) {
        if(attributes[index].$.session_value !=undefined)
propertyForSessiontype.push({sessionName:attributes[index].$.session_name,sessionProperty:attributes[index].$.session_value})      }



       }} );
  });
  resolve(propertyForSessiontype);


});}


}