import { Component, OnInit, ViewChild, Input, Optional, Inject } from '@angular/core';
import { MatPaginator, MatTableDataSource, MAT_DIALOG_DATA } from '@angular/material';
import { Widget } from 'src/app/models/Widget';
import { ServiceWidgetService } from 'src/app/services/widget/service-widget.service';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}


const ELEMENT_DATA: any[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
];
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
@Input() url;
progressBar = false ; 
list  = [] ; 
  displayedColumns: string[] = [];
  private dataSource :MatTableDataSource<any> = new MatTableDataSource<any>();
 
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public Alldata: Widget , private serviceWidget:ServiceWidgetService


  ) {
if(Alldata !=null){
  this.title = Alldata.nameFr;
  
this.backgroundColor =Alldata.backgroundColor;
this.size=Alldata.size;
this.textColor =Alldata.textColor;
if(Alldata.url !=undefined)



{
  
  this.url = Alldata.url ;

  this.getDataFromUrl(this.url);}

}


  }
 
  ngOnInit() {
    if(this.url !=undefined)
{  
this.getDataFromUrl(this.url);}

  }

getDataFromUrl(url){

  this.serviceWidget.getAnything(url).subscribe(list=>{
    var header = [];
      for(var i in list[0]) {
        if(i.toString().charAt(0) !=='@')
        header.push(i)
      
      }
     
      
      this.displayedColumns =header;
    
      this.dataSource=new MatTableDataSource<any>(list); 
  
    
      this.list= list ;
      this.dataSource.paginator = this.paginator ;


    },()=>{}, () => {
      this.progressBar = true;

 });
}

}
