import {SelectionModel} from '@angular/cdk/collections';
import {Component, ViewChild, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog, MatPaginator } from '@angular/material';
import { DialogBoxComponent } from 'src/app/components/dialog-box/dialog-box.component';
import { ServiceWidgetService } from 'src/app/services/widget/service-widget.service';
import { Widget } from 'src/app/models/Widget';
import { SpinnerComponent } from 'src/app/components/spinner/spinner.component';


const types  = [ 
  {'id':1 , 'name':'indicateur'},
  {'id':2 , 'name':'indicateur avec liste'},
  {'id':3 , 'name':'liste'},
  {'id':4 , 'name':'graphique'},
  ]
@Component({
  selector: 'app-widget-table',
  templateUrl: './widget-table.component.html',
  styleUrls: ['./widget-table.component.css']
})

export class WidgetTableComponent implements OnInit {
 private ELEMENT_DATA: Widget[]  ;
 spinner =false ;
 private dataSource :MatTableDataSource<Widget> = new MatTableDataSource<Widget>();
 private selection : SelectionModel<Widget>  = new SelectionModel<Widget>(true, []);
 displayedColumns: string[] = ['select','position','icon' , 'name', 'description', 'Type' ,'date','dateUpadet'];
  nb =1 ; 
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(public dialog: MatDialog ,private ws:ServiceWidgetService) {

    ws.refreshneeded.subscribe(()=>{
      let dialogRef = dialog.open(SpinnerComponent,{backdropClass:'bordre' });

      this.spinner =true ;
      ws.getAllWidget().subscribe(
        listWidget=>{
    
        this.ELEMENT_DATA= listWidget ;
         this.dataSource = new MatTableDataSource<Widget>(listWidget);
         this. selection = new SelectionModel<Widget>(true, []);
         this.spinner =false ;
         this.dataSource.paginator = this.paginator ;

         dialogRef.close();
      });

    });
  
    ws.getAllWidget().subscribe(
        listWidget=>{
    console.log(listWidget);
        this.ELEMENT_DATA= listWidget ;
         this.dataSource = new MatTableDataSource<Widget>(listWidget);
         this.dataSource.paginator = this.paginator ;

         this. selection = new SelectionModel<Widget>(true, []);
      });

  }
  ngOnInit() {
  }

  
  openDialog(action,obj,id?) {
    obj.action = action;
    obj.id=id;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '250px',
      data:obj,
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.event == 'Add'){
        console.log(result.data);
        this.ws.postWidget(result.data);
      }
      else if(result.event == 'Update'){
        this.updateRowData(result.data);
      }else if(result.event == 'Delete'){
        
        this.deleteRowData(result.data.id);
        console.log(result.data);
      }
      else if(result.event == 'copy'){
      

      }
      
    });
  }
  updateRowData(data) {
    console.log("c:"+data);
    this.ws.update(data,data.id);
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;

    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :

        this.dataSource.data.forEach(row => {
          this.selection.select(row);

        
        });
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Widget): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

 
  deleteRowData(rowid){
    this.ws.remove(rowid);
    this.dataSource._updateChangeSubscription();  }

    widget_copy(s,widgetc){

      var  widget = new Widget(); 
      widget.nameEn =widgetc.nameEn ;
      widget.nameFr =widgetc.nameFr ;
      widget.type =widgetc.type ;
      widget.description = widgetc.description ; 
       this.ws.postWidget(widget);
    }
 
}
 


