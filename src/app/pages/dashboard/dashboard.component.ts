import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthenticationService } from 'src/app/services/helpers/authentication-service.service';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit  {

  constructor(   
    ) {
     

    }
  

  ngOnInit() {
    
  }

}
