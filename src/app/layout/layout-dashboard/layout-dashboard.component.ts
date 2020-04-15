import { Component, OnInit, OnDestroy, Compiler, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/Auth/authentication-service.service';
import { ServiceWidgetService } from 'src/app/services/widget/service-widget.service';


@Component({
  selector: 'app-layout-dashboard',
  templateUrl: './layout-dashboard.component.html',
  styleUrls: ['./layout-dashboard.component.css']
})
export class LayoutDashboardComponent implements OnInit  {
  isOpen = false;
  isOpenConfig = false;
isRun =false;

  constructor(  private serviceWidget:ServiceWidgetService,   private router: Router,
    private authenticationService: AuthenticationService ,
    private _compiler: Compiler) { 
      this.isOpen=true ;
      this.serviceWidget.currentDispotionRep.subscribe(drags=>{
        if(this.isRun)
      {  this.isOpen = drags.drag ;
        this.isOpenConfig =drags.drag ;}
    
       });
    
    
    }
 

  ngOnInit() {
    this._compiler.clearCache();
  }
  isOpenBar(){
this.isOpen= !this.isOpen;
this.isRun=true;
  }
  isOpenBarConfig(){
    this.isRun=true;

this.isOpenConfig= !this.isOpenConfig;
  }


}
