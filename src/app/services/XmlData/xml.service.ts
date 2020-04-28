import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import xml2js from 'xml2js';  
 export interface entity {
  entitys:any ; 
  attributes:any ;
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
  


  parseXML(data) {  
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
            attributes: item.attribute,  }
            
            
            );
        }  

        resolve(arr);  
      });  
    });  
  }  }