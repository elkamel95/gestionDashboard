import { Component, OnInit, OnDestroy, Compiler, ViewChild, AfterViewInit, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/Auth/authentication-service.service';
import { ServiceWidgetService } from 'src/app/services/widget/service-widget.service';
import { SidbarConfigComponent } from 'src/app/shared/sidbar-config/sidbar-config.component';


@Component({
  selector: 'app-layout-dashboard',
  templateUrl: './layout-dashboard.component.html',
  styleUrls: ['./layout-dashboard.component.css']
})
export class LayoutDashboardComponent implements OnInit  {
  isOpen = false;
  isOpenConfig = false;
isRun =false;
hiddenIconConfig=false;
@ViewChild('config',{static:false}) updateAllWidgetFunc:SidbarConfigComponent ; 
@ViewChild(SidbarConfigComponent,{static:false}) updateAllWidgetFuncs:SidbarConfigComponent ; 

  constructor(  private serviceWidget:ServiceWidgetService,   private router: Router,
    private authenticationService: AuthenticationService ,
    private _compiler: Compiler) { 
      this.isOpen=true ;
      this.serviceWidget.currentDispotionRep.subscribe(drags=>{
        if(this.isRun && !drags.drag )
      {  this.isOpen = false ;
        this.isOpenConfig =false ;}
    
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
hiddenConfig(event){
  this.isOpenConfig=false ; 
  this. hiddenIconConfig=event;
console.log( this. hiddenIconConfig);
}
updateALLwidget(){
 this.updateAllWidgetFuncs.updateWidgetAll();
  
  console.log( "dfsdf:"+this.updateAllWidgetFunc
  );
}
}
