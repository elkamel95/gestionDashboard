//dialog-box.component.ts
import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Widget } from 'src/app/models/Widget';


export interface Type {
  id:string ;
  name :string ; 

}


@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})
export class DialogBoxComponent {
    types:Type [] = [ 
    {'id':"1" , 'name':'indicateur'},
    {'id':"2" , 'name':'indicateur avec liste'},
    {'id':"3" , 'name':'liste'},
    {'id':"4" , 'name':'graphique'},
    ]
  action:string;
  local_data:any;
  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Widget) {
      console.log(data);

    this.local_data = {...data};
    this.action = this.local_data.action;

  }
  setType(event){
    console.log(event);
    this.data.type = event.id ;
    
  }

  doAction(){
    this.dialogRef.close({event:this.action,data:this.data});
  }

  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  }

}
