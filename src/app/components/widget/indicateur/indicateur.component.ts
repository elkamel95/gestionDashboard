import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-indicateur',
  templateUrl: './indicateur.component.html',
  styleUrls: ['./indicateur.component.css']
})
export class IndicateurComponent implements OnInit {
@Input() indicateur =0 ;
@Input()  title =" ";
@Input() backgroundColor ="";
@Input() textColor ="";
@Input() backgroundSmallWidget="#ffa000"; 
@Input() colorSmallWidget="#000" ;
@Input() size ="";
@Input() width ;
@Input() height;
@Input() font;


  constructor() { }

  ngOnInit() {
    this.height ="70%"

  }

}
