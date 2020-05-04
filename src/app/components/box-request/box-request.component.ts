import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'box-request',
  templateUrl: './box-request.component.html',
  styleUrls: ['./box-request.component.css']
})
export class BoxRequestComponent implements OnInit {

@Input()by="";
@Input()property ="";
@Input()value="";
@Output() removeFilter:EventEmitter<any> = new  EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }

  removeQuery(){
    this.removeFilter.emit();
  }
}
