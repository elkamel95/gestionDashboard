import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}


const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
 
];
@Component({
  selector: 'widget-list',
  templateUrl: './widget-list.component.html',
  styleUrls: ['./widget-list.component.css']
})

export class WidgetListComponent implements OnInit {
  @Input() indicateur =0 ;
@Input()  title =" ";
@Input() backgroundColor ="";
@Input() textColor ="";
@Input() size ="";
@Input() width ;
@Input() height;
@Input() font;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  private dataSource :MatTableDataSource<any> = new MatTableDataSource<any>();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor() { 
  

  }

  ngOnInit() {
    this.dataSource=new MatTableDataSource<PeriodicElement>(ELEMENT_DATA); 

    this.dataSource.paginator = this.paginator ;
  }

}
