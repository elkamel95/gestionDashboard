import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { Widget } from 'src/app/models/Widget';
import { ServiceWidgetService } from 'src/app/services/widget/service-widget.service';
import { ModeDisposition } from 'src/app/models/ModeDisposition';

@Component({

  selector: 'sidbar-config',
  templateUrl: './sidbar-config.component.html',
  styleUrls: ['./sidbar-config.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class SidbarConfigComponent implements OnInit {
  data:Widget = new Widget() ; 
  darg = false ;
  ModeLayout = new ModeDisposition();
typePermut ="";
  @ViewChild('graphiqueComp', { static: false }) public mydiv: ElementRef;

    font_size =[
    "large","larger","medium","small","smaller","x-large","x-small","xx-large","xx-small","-webkit-xxx-large"
    ]
    size =[
      "8","10","12","14","15","16","18","20","22","25","30"
      ]
    font_style =[
      "900","bold","bolder","inherit","initial",
      "lighter","normal","unset"
          ]
  chartOptions: { };
  constructor(private serviceWidget:ServiceWidgetService) {
    this.ModeLayout.postions=false;
    this.ModeLayout.indicePermutation = 1 ;
   serviceWidget.currentWidget.subscribe(widget=>{

      this.data = widget ;
   });


    

  }

   

   updateWidget(){
     this.serviceWidget.update(this.data,this.data.id);
   }

ChangeToDragAndDrop(){
  
  this.serviceWidget.currentDispotionRep.subscribe(drags=>{
    this.ModeLayout.drag = drags.drag ;
  

   });


   this.ModeLayout.drag=!this.ModeLayout.drag
   this.serviceWidget.setCurrentDispotionRep( this.ModeLayout);

 
}
ChangePermutation(){
  
  this.serviceWidget.currentDispotionRep.subscribe(layout=>{
    this.ModeLayout.permutation = layout.permutation ;
    this.ModeLayout.indicePermutation = layout.indicePermutation ;
    if(layout.indicePermutation == 0 )
    this.typePermut ="indicator" ;
    else if (layout.indicePermutation == 1 )

    this.typePermut ="  list " ;
    else if(layout.indicePermutation ==2 )
    this.typePermut ="graphic" ;
else 
this.typePermut ="" ;

   });


   this.ModeLayout.permutation=!this.ModeLayout.permutation
   this.serviceWidget.setCurrentDispotionRep( this.ModeLayout);

 
}
changeModeLayout(value , type){
  if(type === '1' )
  this.ModeLayout.indicateur =value;
  else   if(type === '2' )
  this.ModeLayout.list =value;
else  if(type === '3' )
  this.ModeLayout.graphique =value;
else 

{this.ModeLayout.indicateur =value;
this.ModeLayout.list =value;
this.ModeLayout.graphique =value;}


  this.serviceWidget.setCurrentDispotionRep(this.ModeLayout);

}
changeNbWidgetLayout(value , type){
  if(type === '1' )
{ 
  
  this.ModeLayout.nbLigneIn =value.value;}

  else   if(type === '2' )

  this.ModeLayout.nbLigneList =value.value;

  else if(type === '3' )
  this.ModeLayout.nbLigneGh =value.value;

else {


  this.ModeLayout.nbLigneIn =value.value;


  this.ModeLayout.nbLigneList =value.value;

  this.ModeLayout.nbLigneGh =value.value;


}


  this.serviceWidget.setCurrentDispotionRep(this.ModeLayout);

}
 

changePostions(value){
  this.ModeLayout.postions=value;


  this.serviceWidget.setCurrentDispotionRep(this.ModeLayout);
}
  ngOnInit() {
  }

}
