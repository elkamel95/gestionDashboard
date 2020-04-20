import { Component, OnInit, Input, OnDestroy, EventEmitter, Output } from '@angular/core';
import { AuthenticationService } from 'src/app/services/Auth/authentication-service.service';

@Component({
  selector: 'app-sidbar',
  templateUrl: './sidbar.component.html',
  styleUrls: ['./sidbar.component.css']
})
export class SidbarComponent implements OnInit {
  role ='"ROLE_ADMIN"'
  
  @Output() hiddenConfigB :EventEmitter<any> =new EventEmitter<any>() ;
  constructor(private authenticationService:AuthenticationService) { 
  }
  hiddenConfig(event){
    this.hiddenConfigB.emit(event); 
  }

  ngOnInit() {
  }

}
