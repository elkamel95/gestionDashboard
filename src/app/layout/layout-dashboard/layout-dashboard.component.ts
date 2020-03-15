import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/helpers/authentication-service.service';

@Component({
  selector: 'app-layout-dashboard',
  templateUrl: './layout-dashboard.component.html',
  styleUrls: ['./layout-dashboard.component.css']
})
export class LayoutDashboardComponent implements OnInit ,OnDestroy {
  isOpen = false;
  isOpenConfig = false;

  constructor(       private router: Router,
    private authenticationService: AuthenticationService) { 
      this.isOpen=true ;


    }

  ngOnInit() {



  }
  isOpenBar(){
this.isOpen= !this.isOpen;
  }
  isOpenBarConfig(){
this.isOpenConfig= !this.isOpenConfig;
  }

ngOnDestroy() {
  localStorage.clear();
  
}
}
