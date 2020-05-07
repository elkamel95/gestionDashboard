import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import xml2js from 'xml2js';  
 export interface entity {
  entitys:any ; 
  attributes:any ;
}
export interface Sessiontype {
  sessionName :any,
  sessionProperty :any
 }
@Injectable({
  providedIn: 'root'
})

export class XmlService {
  public xmlItems: any;  
  public entity :any;
  public attributes:any;

  constructor(private _http: HttpClient) {  }  
   loadXML() {  
  return  this._http.get('assets/configEntity.xml',  
      {  
        headers: new HttpHeaders()  
          .set('Content-Type', 'text/xml')  
          .append('Access-Control-Allow-Methods', 'GET')  
          .append('Access-Control-Allow-Origin', '*')  
          .append('Access-Control-Allow-Headers', "Access-Control-Allow-Headers, Access-Control-Allow-Origin, Access-Control-Request-Method"),  
        responseType: 'text'  
      })  
      ;
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
        var obj = result.entitys;  
       
        for (k in obj.entity) {  
          var item =obj.entity[k] ;  
          
          arr.push( 
            
            {  
            entitys: item.$,  
            attributes: item.attribute,  
          
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