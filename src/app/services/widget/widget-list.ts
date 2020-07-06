import {  ViewChild, Input, Optional, Inject, Injectable, EventEmitter, Output } from '@angular/core';
import { MatPaginator, MatTableDataSource, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Widget } from 'src/app/models/Widget';
import { ServiceWidgetService } from 'src/app/services/widget/service-widget.service';
import { BehaviorSubject } from 'rxjs';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Injectable({
  providedIn: 'root'
})
export class WidgetList    {

@Input()  title =" ";
@Input() backgroundColor ="";
@Input() textColor ="";
@Input() size ="";
@Input() width ;
@Input() height;
@Input() font;
@Input() url:string;
@Output() loaded:EventEmitter<string> = new EventEmitter<string>();

progressBar = false ; 
list  = [] ;
entity: string="";
columnsToDisplay: string[] = [];
displayedColumns: string[] = [];
headerValue=[];
headerDataFormXml=[];
isRelationType:boolean=false;
checkIfMultiUrl= new BehaviorSubject<boolean>(false);
setTypeOfUrl = this.checkIfMultiUrl.asObservable();
public dataSource :MatTableDataSource<any> = new MatTableDataSource<any>();
 
@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public Alldata: Widget ,
    public dialog: MatDialog, public serviceWidget:ServiceWidgetService) {
      this.setTypeOfUrl.subscribe(value=>{

  this.isRelationType=value;
  
      });
     }
 
    setValueOfTypeUrl(type){
      this.checkIfMultiUrl.next(type);
    }

getDataFromUrl(url:string){
    var listData=[];
    this.url=this.url.replace('[$string]','[]');
      this.url=this.url.replace('$','');

    if(this.isRelationType)
    {   
      var index =url.length;      
for (  index  > 0; index-- ;) {
  if(url.charAt(index) =="/")
   break;
}
        this.entity =url.substring(0,index);
        console.log(url);

     }
 
     else
 { 
  if(this.url.charAt(0)==='!'){
    this.entity =this.url.substring(7,this.url.indexOf("?"));
    url=   this.serviceWidget. createDynamicQuery(url);
  
    this.url=   this.serviceWidget. createDynamicQuery(this.url);
  }else
    this.entity =this.url.substring(0,this.url.indexOf("?"));
  
 }
 
  



        
 


   
  this.serviceWidget.getAnything(url,this.isRelationType).subscribe(list=>{

      if(this.isRelationType)
    listData.push(list);
    else
    listData=list;
    this.dataSource=new MatTableDataSource<any>(listData); 

    console.log(this.entity);

 var    header:any=  this.serviceWidget.translateValueToNameFromXml(this.entity);
          header=this.serviceWidget.getHeaderValueFormAttribute(this.isRelationType?list:list[0], header.attributes);
          const headerNameWithNumberLigne = ['#numberLigne#'].concat(header[0].name); // [ 4, 3, 2, 1 ]
          const headerValueWithNumberLigne = ['No.'].concat(header[0].value) ;// [ 4, 3, 2, 1 ]

          this.displayedColumns =headerNameWithNumberLigne;
        this.columnsToDisplay=headerNameWithNumberLigne;
        this.headerValue=headerValueWithNumberLigne;
        this.list= list ;
        this.dataSource.paginator = this.paginator ;

  

    },()=>{}, () => {
      this.progressBar = true;
this.loaded.emit("list");
 });
 /*this.syncData(url);*/

}
isDate(value){
  var isDate =false;
  var data ; 

  if( typeof(value) =="string"  && typeof(value) != undefined)
{ 

  var c = value.charAt(0);
var isDigit = (c >= '0' && c <= '9');
  if(isDigit && value.indexOf('/') !=-1|| value.indexOf('-')!=-1)
 {   data=new Date(Date.parse(value));
    
if(data !="Invalid Date")
isDate=true;
}

}else{
  isDate=false;
}

     return isDate;

}

isUrl(str){
  var regexQuery = "/[a-zA-Z0-9\.-]{1,}"
  var regExpUrl = new RegExp(regexQuery,"i");

  if(typeof str ==="string" )
  {
    if(str.charAt(0)=="/"  )
    {
      return regExpUrl.test(str);

    }
  }
  else if(typeof str ==="object" )
  if( str[0]!= undefined && str[0].charAt(0)=="/"  )
  {


   // var multiUrl =str.split(',');

  return regExpUrl.test(str[0]);
  } 
}
remplaceIdentifiant(){
  /* methode qui permet de remplace les correcte  identifiant dans url   
    this.serviceWidget.getIndexEntityByName(this.entity).then((id:any)=>{
      if(this.isRelationType==false)

      while( url.indexOf("id[]")!=-1){
        url=url.replace("id[]",`${id}[]`);
      }
       });*/
}
/*
syncData(url){
  var listData=[];

setTimeout(() => {
  this.serviceWidget.getAnything(url,this.isRelationType).subscribe(list=>{
    if(this.isRelationType)
  listData.push(list);
  else
  listData=list;

  this.dataSource=new MatTableDataSource<any>(listData); 
  this.dataSource.paginator = this.paginator ;

},()=>{},()=>{
    this.syncData(url);
  });

}, 20000);}
*/
}


