import { Component, OnInit, ViewChild, Input, Optional, Inject } from '@angular/core';
import { MatPaginator, MatTableDataSource, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Widget } from 'src/app/models/Widget';
import { ServiceWidgetService } from 'src/app/services/widget/service-widget.service';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}



@Component({
  selector: 'widget-list',
  templateUrl: './widget-list.component.html',
  styleUrls: ['./widget-list.component.css']
})

export class WidgetListComponent implements OnInit {

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
private dataSource :MatTableDataSource<any> = new MatTableDataSource<any>();
 
@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public Alldata: Widget ,
    public dialog: MatDialog, private serviceWidget:ServiceWidgetService) { }
 
  ngOnInit() {
    if(this.Alldata !=null){
      this.title = this.Alldata.nameFr;
      
    this.backgroundColor =this.Alldata.backgroundColor;
    this.size=this.Alldata.size;
    this.textColor =this.Alldata.textColor;
    this.width = this.Alldata.width ;
    if(this.Alldata.url !=undefined)
    {
      
      this.url = this.Alldata.url ;
      this.isRelationType=true;
    console.log(this.url);
      this.getDataFromUrl(this.url);}
    
    }
    
    if(this.url !=undefined)
{  
    if(this.isRelationType)
   { 
       this.entity =this.url.substring(this.url.indexOf("/")+1,this.url.length);
       console.log(this.entity);

       this.entity = this.entity.substring(0,this.url.indexOf("/")+2);
       console.log(this.entity);

    }

    else
{  this.entity =this.url.substring(this.url.indexOf("/")+1,this.url.indexOf("?"));

} 

console.log(this.entity);

  if(this.url.charAt(0)==='!'){
    this.url=   this.serviceWidget. createDynamicQuery(this.url);
  }
this.getDataFromUrl(this.url);}

  }

getDataFromUrl(url){
    var listData=[];
  this.serviceWidget.getAnything(url,this.isRelationType).subscribe(list=>{
      if(this.isRelationType)
    listData.push(list);
    else
    listData=list;
    this.dataSource=new MatTableDataSource<any>(listData); 
console.log(list);
    this.serviceWidget.translateValueToNameFromXml(this.entity).then((header:any)=>{
   

          header=this.serviceWidget.checkValueForAttribute(this.isRelationType?list:list[0], header.attributes);
        this.displayedColumns =header[0].name;
        this.columnsToDisplay=header[0].name;
        this.headerValue=header[0].value;
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
showTheRelationData(url:string){
 var entity =url.substring(url.indexOf("/")+1,url.indexOf("?"));
url =url.substring(url.indexOf("/")+1,url.length);
var data:Widget = new Widget();
data.url =url;
data.nameFr =this.title;
data.nameFr =this.title;
data.size = this.size ; 
data.textColor = this.textColor ;
data.backgroundColor=this.backgroundColor;
data.url= url ;

  this.openList(data);
}
isDateUrl(str){
  var regexQuery = "^/([-a-z0-9]{1,100})/([-a-z0-9]{1,100})/([-a-z0-9]{1,100})$";
  var url = new RegExp(regexQuery,"i");
  return url.test(str);
  
}
openList(data) {


    const dialogRef = this.dialog.open(WidgetListComponent,{
 
data:data

   
  });}
}



