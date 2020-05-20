import {  ViewChild, Input, Optional, Inject, Injectable } from '@angular/core';
import { MatPaginator, MatTableDataSource, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Widget } from 'src/app/models/Widget';
import { ServiceWidgetService } from 'src/app/services/widget/service-widget.service';
import { LienToListWidgetComponent } from '../../components/widget/lien-to-list-widget/lien-to-list-widget.component';
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
progressBar = false ; 
list  = [] ;
entity: string="";
columnsToDisplay: string[] = [];
displayedColumns: string[] = [];
headerValue=[];
isRelationType=false;
public dataSource :MatTableDataSource<any> = new MatTableDataSource<any>();
 
@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public Alldata: Widget ,
    public dialog: MatDialog, public serviceWidget:ServiceWidgetService) { }
 


getDataFromUrl(url){
    var listData=[];
    if(this.isRelationType)
    { 
        this.entity =url.substring(url.indexOf("/")+1,url.length);
        console.log(this.entity);
 
        this.entity = this.entity.substring(0,url.indexOf("/")+2);
        console.log(this.entity);
 
     }
 
     else
 {  this.entity =url.substring(url.indexOf("/")+1,url.indexOf("?"));
 
 } 
 
 
   if(url.charAt(0)==='!'){
     url=   this.serviceWidget. createDynamicQuery(url);
   }
  this.serviceWidget.getAnything(url,this.isRelationType).subscribe(list=>{
      if(this.isRelationType)
    listData.push(list);
    else
    listData=list;
    this.dataSource=new MatTableDataSource<any>(listData); 
console.log(list);
    this.serviceWidget.translateValueToNameFromXml(this.entity).then((header:any)=>{
   

          header=this.serviceWidget.checkValueForAttribute(this.isRelationType?list:list[0], header.attributes);
          const headerNameWithNumberLigne = ['#numberLigne#'].concat(header[0].name); // [ 4, 3, 2, 1 ]
          const headerValueWithNumberLigne = ['No.'].concat(header[0].value) ;// [ 4, 3, 2, 1 ]

          this.displayedColumns =headerNameWithNumberLigne;
        this.columnsToDisplay=headerNameWithNumberLigne;
        this.headerValue=headerValueWithNumberLigne;
        this.list= list ;
        this.dataSource.paginator = this.paginator ;
    });
   
    },()=>{}, () => {
      this.progressBar = true;

 });
}
isDate(value){
  var isDate =false;
  var data ; 
  if( typeof(value) =="string")
{  var c = value.charAt(0);
var isDigit = (c >= '0' && c <= '9');
  if(isDigit && value.indexOf('/') !=-1|| value.indexOf('-')!=-1)
 {   data=new Date(Date.parse(value));
    
if(data !="Invalid Date")
isDate=true;
}}
   
     return isDate;

}

isDateUrl(str){
  var regexQuery = "^/([-a-z0-9]{1,100})/([-a-z0-9]{1,100})/([-a-z0-9]{1,100})$";
  var url = new RegExp(regexQuery,"i");
  return url.test(str);
  
}


}


