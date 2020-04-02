import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Widget } from 'src/app/models/Widget';

@Component({
  selector: 'app-dialog-delete',
  templateUrl: './dialog-delete.component.html',
  styleUrls: ['./dialog-delete.component.css']
})
export class DialogDeleteComponent implements OnInit {
  action:string;
  local_data:any;
  data:Widget ; 
  constructor(
    public dialogRef: MatDialogRef<DialogDeleteComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public Alldata: any) {
    this.local_data = {...this.Alldata};
    this.action = this.local_data.action;
    this.data= Alldata.element;
  }
  ngOnInit() {
  }
  doAction(){
    this.dialogRef.close({event:this.action,data:this.Alldata});
  }

  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  }
}
