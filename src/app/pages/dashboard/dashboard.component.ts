import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { ServiceWidgetService } from 'src/app/services/widget/service-widget.service';
import { Widget } from 'src/app/models/Widget';
import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { Dispositions } from 'src/app/models/Dispositions';
import { ModeDisposition } from 'src/app/models/ModeDisposition';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit  {
  
   position:Dispositions = new Dispositions();
  modeLayout : ModeDisposition = new ModeDisposition() ; 
WidgetIndicator : Widget [] []=[] ;
WidgetGraphique : Widget  [][]=[] ;
WidgetList : Widget  [][]=[] ;
WidgetIndicatorList : Widget  [][]=[] ;
WidgetToUpdate:Widget;
width=80;
spinner =false;
permute = 1;
nbWidgetParLign=2;
permutationiSActive =false ; 
ListIndix = []
 letters = [0 , 1 ,2] ;
  chartOptions: {  };
  dragPermission :Boolean; 
  positionLayout :Boolean; 
  @ViewChild('graphiqueComp', { static: false }) public mydiv: ElementRef;

;  constructor(private serviceWidget:ServiceWidgetService) {

  this.modeLayout.nbLigneIn = "3";
  this.modeLayout.nbLigneList= "3";
  this.modeLayout.nbLigneGh ="2";
  this.nbWidgetParLign = 4 ;
  this.modeLayout.postions =true ;
    this. getWidgetWithType("?type[]=1&type[]=2","1", this.modeLayout.nbLigneIn);
    this. getWidgetWithType("?type=3","3",  this.modeLayout.nbLigneList);
    this. getWidgetWithType("?type=4","4",  this.modeLayout.graphique );

    
    this.serviceWidget.currentDispotionRep.subscribe(drags=>{

      if(this.modeLayout.nbLigneIn != drags.nbLigneIn)
      this. getWidgetWithType("?type[]=1&type[]=2","1",drags.nbLigneIn );
      if(this.modeLayout.nbLigneList != drags.nbLigneList)
      this. getWidgetWithType("?type=3","3",drags.nbLigneList );
      
      if(this.modeLayout.nbLigneGh != drags.nbLigneGh)
      this. getWidgetWithType("?type=4","4", drags.nbLigneGh );
      
      this.positionLayout=drags.postions ;
      this.dragPermission=drags.drag;    
        this.modeLayout.indicateur =drags.indicateur;
        this.modeLayout.graphique =drags.graphique;
        this.modeLayout.list =drags.list;
        this.modeLayout.drag =drags.drag;
        this.modeLayout.nbLigneIn = drags.nbLigneIn;
        this.modeLayout.nbLigneList= drags.nbLigneList;
        this.modeLayout.nbLigneGh = drags.nbLigneGh ;
this.modeLayout.postions = drags.postions ;

   


         });

  }
  


 

  ngOnInit() {
    this.dragPermission =new Boolean(true);


   }
 

  permutation(index){
    if(this.permutationiSActive)
    {var aux =0;
    this.ListIndix.push(index);

    if(this.ListIndix.length==2)
    
{
  aux=this.letters[this.ListIndix[0]]
 
  this.letters[this.ListIndix[0]]=  this.letters[this.ListIndix[1]];

  this.letters[this.ListIndix[1]]=aux
  const element = this.letters;
this.ListIndix = [];

}

}

  }
  
  setWidgetToUpdate(widget?:Widget,$event?: CdkDragEnd) {
if($event)
    {  var style = window.getComputedStyle($event.source.element.nativeElement);
      var matrix = new WebKitCSSMatrix(style.webkitTransform);
      widget.positionLeft= matrix.m41+'px';
      widget.positionRight=matrix.m42+'px';}
 
this.WidgetToUpdate = widget ; 
   
this.serviceWidget.setCurrentWidgetUpdate(this.WidgetToUpdate);



    }

 getWidgetWithType(property,indexType,nbWidgetParLign) {
  this.spinner =false;

    this.serviceWidget.getAllWidget(property).subscribe(widget=>{
    let   index = 0;
    let i =0 ;
    let widgets = new Widget  ();
   let  playStore : Widget[] =[] ;

    let listWidget : Widget[] [] =[] ;

      widget.forEach(function(item){  

        if(index <nbWidgetParLign-1)
       { 
         playStore.push(item)  ;
         index++ ;

      }
      else 
       { 
        playStore.push(item)  ;


        listWidget.push(playStore);

        playStore =[] ;

        index = 0 ; 
      }

      }
      
      ); 
        listWidget.push(playStore);
if(indexType == 1 )
{this.WidgetIndicator=  listWidget;
  this.setWidgetToUpdate(listWidget[0][0]);

}
else if(indexType == 3)

{this.WidgetList=  listWidget;}
else if(indexType == 4)
{this.WidgetGraphique=  listWidget;


}


this.spinner=true;

    });
  }


}
