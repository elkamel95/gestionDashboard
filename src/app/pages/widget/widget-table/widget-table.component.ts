import {SelectionModel} from '@angular/cdk/collections';
import {Component} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  icon : string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1,icon :'icon',name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2,icon :'icon', name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3,icon :'icon', name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4,icon :'icon', name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5,icon :'icon', name: 'Boron', weight: 10.811, symbol: 'B'},

];
@Component({
  selector: 'app-widget-table',
  templateUrl: './widget-table.component.html',
  styleUrls: ['./widget-table.component.css']
})

export class WidgetTableComponent {
 
  displayedColumns: string[] = ['select','icon' ,'position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);

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
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
}
 


