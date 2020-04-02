import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'IndicateurListe',
  templateUrl: './indicateur-liste.component.html',
  styleUrls: ['./indicateur-liste.component.css']
})
export class IndicateurListeComponent 
implements OnInit {
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
 
  }

}


  