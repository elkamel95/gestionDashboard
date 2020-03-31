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
@Input() backgroundSmallWidget="" ; 
@Input() colorSmallWidget="" ;
@Input() size ="";
@Input() width ;
@Input() height;
@Input() font;


  constructor() { }

  ngOnInit() {
    this.width ="100%";
    this.height ="70%"
    this.colorSmallWidget="#000"
    this.backgroundSmallWidget="#ffa000"
  }

}
