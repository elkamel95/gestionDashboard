import {SelectionModel} from '@angular/cdk/collections';
import {Component, ViewChild, OnInit, AfterViewChecked} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog, MatPaginator, PageEvent, MatDialogConfig } from '@angular/material';
import { DialogBoxComponent } from 'src/app/components/dialog-box/dialog-box.component';
import { ServiceWidgetService } from 'src/app/services/widget/service-widget.service';
import { Widget } from 'src/app/models/Widget';
import { AuthenticationService } from 'src/app/services/Auth/authentication-service.service';
import { DialogDeleteComponent } from 'src/app/components/dialog-delete/dialog-delete.component';




@Component({
  selector: 'app-widget-table',
  templateUrl: './widget-table.component.html',
  styleUrls: ['./widget-table.component.css']
})

export class WidgetTableComponent implements OnInit  ,AfterViewChecked{
   types  = [ 
  'indicateur',
  'indicateur avec liste',
  'liste',
  'graphique'
    ]
       pageIndex = 0 ;
       length=0;
       pageSizeOptions: number[] = [3,5,7,8,9, 10, 25, 100];
       pageSize=5;
      
      private ELEMENT_DATA: Widget[]  ;
 spinner =true ;
 private dataSource :MatTableDataSource<Widget> = new MatTableDataSource<Widget>();
 private selection : SelectionModel<Widget>  = new SelectionModel<Widget>(true, []);
 displayedColumns: string[] = ['select','position','icon' , 'name', 'description', 'Type' ,'date','dateUpadet'];
  nb =1 ; 
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  pageEvent: PageEvent;
order ="desc";
groupe ="updateAt";
title ="";
  constructor(public dialog: MatDialog ,private authenticationService: AuthenticationService,private ws:ServiceWidgetService) {

    ws.refreshneeded.subscribe(()=>{
  
      this.getData(1,5);
      this.paginator.firstPage();
    });
  
    this.getData(1,5);


  }
  ngAfterViewChecked(): void {
  }

  ngOnInit() {

  }

  
  openDialog(action,obj,element?) {
    obj.id=element.id;
    obj.element = element ; 
    obj.action=action;
    var dialogRef  ;


    if(action ==="Delete" )
 {    dialogRef = this.dialog.open(DialogDeleteComponent, {
  width: '400px',

      data:obj,
      
    });
  
  }else{
    dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '98%',
      maxWidth:'98%',
      minWidth:'98%',
      maxHeight:'98%',

      height:'98%',
      data:obj,
    },);
  }
    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined)
      if(result.event == 'Delete')
      {
        this.deleteRowData(result.data.id);
      }
    });
  }
  updateRowData(data) {
    this.ws.update(data);
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
   widget = widgetc ;
   widget.id =null ;
       this.ws.postWidget(widget);
    }
    setNewData($event:PageEvent){
if(this.pageSize!=$event.pageSize){
  this.getData($event.pageIndex+1 ,$event.pageSize);

  this.pageSize=$event.pageSize
}

     if ($event.pageIndex !=  this.pageIndex)
   {  
         this.getData($event.pageIndex+1,$event.pageSize);
   this.pageIndex = $event.pageIndex;
  
  }
     }

     search(event) {
      this.title = event.value.trim().toLowerCase() ;

 this.getData(1,5);
    }
   getOrder(order='desc') {

this.order = order ;
this.getData(1,5);

    }
    getGroupe(groupe='asc'){
      this.groupe = groupe;
      this.getData(1,5);

    }


getData(nb,pageSize){

  this.spinner =false ;
  this.ws.getAllWidgetDashbord(nb,pageSize,this.groupe,this.order,this.title).subscribe(
    listWidget=>{
if(listWidget.length != 0 )
   {  this.dataSource = new MatTableDataSource<Widget>(listWidget['hydra:member']);
     this. selection = new SelectionModel<Widget>(true, []);

     this.length=  listWidget['hydra:totalItems'];
}

  }, error=>{


  },()=>{

    this.spinner =true ;



  }
  
  
  );

  

}


}
 


