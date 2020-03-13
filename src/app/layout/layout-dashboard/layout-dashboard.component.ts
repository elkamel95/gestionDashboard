import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout-dashboard',
  templateUrl: './layout-dashboard.component.html',
  styleUrls: ['./layout-dashboard.component.css']
})
export class LayoutDashboardComponent implements OnInit {
  isOpen = true;
  isOpenConfig = false;

  constructor() { }

  ngOnInit() {
  }
  isOpenBar(){
this.isOpen= !this.isOpen;
  }
  isOpenBarConfig(){
this.isOpenConfig= !this.isOpenConfig;
  }
}
