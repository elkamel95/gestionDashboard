import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'box-request',
  templateUrl: './box-request.component.html',
  styleUrls: ['./box-request.component.css']
})
export class BoxRequestComponent implements OnInit {
@Input()by="";
@Input()property ="";
@Input()value="";

  constructor() { }

  ngOnInit() {
  }

}
