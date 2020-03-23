import { Component, OnInit, OnDestroy, Compiler } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/Auth/authentication-service.service';

@Component({
  selector: 'app-layout-dashboard',
  templateUrl: './layout-dashboard.component.html',
  styleUrls: ['./layout-dashboard.component.css']
})
export class LayoutDashboardComponent implements OnInit  {
  isOpen = false;
  isOpenConfig = false;

  constructor(       private router: Router,
    private authenticationService: AuthenticationService ,
    private _compiler: Compiler) { 
      this.isOpen=true ;

   console.log;(authenticationService.roles) ;
       }

  ngOnInit() {
    this._compiler.clearCache();
  }
  isOpenBar(){
this.isOpen= !this.isOpen;
  }
  isOpenBarConfig(){
this.isOpenConfig= !this.isOpenConfig;
  }


}
