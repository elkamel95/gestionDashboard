import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { AuthenticationService } from 'src/app/services/helpers/authentication-service.service';

@Component({
  selector: 'app-sidbar',
  templateUrl: './sidbar.component.html',
  styleUrls: ['./sidbar.component.css']
})
export class SidbarComponent implements OnInit {
  role ='"ROLE_ADMIN"'
  constructor(private authenticationService:AuthenticationService) { 
   console.log( this.role);
  }
 

  ngOnInit() {
  }

}
