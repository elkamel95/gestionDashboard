import { Component, OnInit, Input, OnDestroy, EventEmitter, Output } from '@angular/core';
import { AuthenticationService } from 'src/app/services/Auth/authentication-service.service';
import {MatDialog} from '@angular/material/dialog';
import { ConsultWidgetsComponent } from 'src/app/components/consultWidget/consult-widgets/consult-widgets.component';

@Component({
  selector: 'app-sidbar',
  templateUrl: './sidbar.component.html',
  styleUrls: ['./sidbar.component.css']
})
export class SidbarComponent implements OnInit {
  role ='"ROLE_ADMIN"'
  
  @Output() hiddenConfigB :EventEmitter<any> =new EventEmitter<any>() ;
  constructor(private authenticationService:AuthenticationService,public dialog: MatDialog) { 
  }
  hiddenConfig(event){
    this.hiddenConfigB.emit(event); 
  }

  openDialog() {
    const dialogRef = this.dialog.open(ConsultWidgetsComponent,{
      width: '98%',
      maxWidth:'98%',
      minWidth:'98%',
      maxHeight:'98%',

      height:'98%',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  ngOnInit() {
  }

}
