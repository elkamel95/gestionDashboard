import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dialog-reset',
  templateUrl: './dialog-reset.component.html',
  styleUrls: ['./dialog-reset.component.css']
})
export class DialogResetComponent implements OnInit {

 data:any;
  constructor(
    public dialogRef: MatDialogRef<DialogResetComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public Alldata: any) {
    this.data = {...this.Alldata};
console.log(this.data);
  }
  ngOnInit() {
  }
  doAction(){
    this.dialogRef.close({event:this.Alldata});
  }

  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  }
}
