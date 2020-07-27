import { Component, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewChecked, AfterViewInit } from '@angular/core';
import { ServiceWidgetService } from 'src/app/services/widget/service-widget.service';
import { Widget } from 'src/app/models/Widget';
import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { Dispositions } from 'src/app/models/Dispositions';
import { ModeDisposition } from 'src/app/models/ModeDisposition';
import { CookieService } from 'ngx-cookie-service';
import { NgxSpinnerService } from "ngx-spinner";
import { AuthenticationService } from 'src/app/services/Auth/authentication-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit    {
  
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
ListIndix = []
 letters = [0 , 1 ,2] ;
  chartOptions: {  };
ind=0;
vide  =false;
nameRequirdSession="";
nameAttributeRequired="";
typeNumber=3;
  dragPermission :Boolean; 
  positionLayout :Boolean; 
  numberWidgetIndicator=0;
  numberWidgetList=0;
  numberWidgetGraphique=0;
  @ViewChild('graphiqueComp', { static: false }) public mydiv: ElementRef;
  cookieValue: any;

;  constructor(private serviceWidget:ServiceWidgetService,      private router: Router,
  private authenticationService: AuthenticationService,private cookieService: CookieService,private spinnerService:NgxSpinnerService) {
 
  this.serviceWidget.refreshneeded.subscribe(()=>{
    if( this.modeLayout.nbLigneIn )
    this. getWidgetWithType(`?visible=1&type[]=1&type[]=2`,"1", this.modeLayout.nbLigneIn);
    if(this.modeLayout.nbLigneList )
    this. getWidgetWithType(`?visible=1&type=3`,"3",this.modeLayout.nbLigneList);
    
    if(this.modeLayout.nbLigneGh )
    this. getWidgetWithType(`?visible=1&type=4`,"4", this.modeLayout.nbLigneList );

  });
  
  this.modeLayout.nbLigneIn= this.cookieService.get( 'nbLigneIn')? this.cookieService.get( 'nbLigneIn') : '3' ;
  this.modeLayout.nbLigneList= this.cookieService.get( 'nbLigneList')? this.cookieService.get( 'nbLigneList') : '2' ;
  this.modeLayout.nbLigneGh= this.cookieService.get( 'nbLigneGh') ? this.cookieService.get( 'nbLigneGh') : '2' ;


  this.modeLayout.graphique= this.cookieService.get( 'modeLayoutGraphique')? this.cookieService.get( 'modeLayoutGraphique') : 'column' ;
  this.modeLayout.indicateur= this.cookieService.get( 'modeLayoutIndicateur')? this.cookieService.get( 'modeLayoutIndicateur') : 'row' ;
  this.modeLayout.list= this.cookieService.get( 'modeLayoutList')? this.cookieService.get( 'modeLayoutList') : 'row' ;


  this.modeLayout.postions=     false ;

  this.vide  =false;
  this.hiddenLoadSpinner('');


  }



 

  ngOnInit() {
    this.vide=false;

    this.serviceWidget.refreshneededDataReset.subscribe(()=>{

      if( this.modeLayout.nbLigneIn )
      this. getWidgetWithType(`?visible=1&type[]=1&type[]=2`,"1", this.modeLayout.nbLigneIn);
      if(this.modeLayout.nbLigneList )
      this. getWidgetWithType(`?visible=1&type=3`,"3",this.modeLayout.nbLigneList);
      
      if(this.modeLayout.nbLigneGh )
      this. getWidgetWithType(`?visible=1&type=4`,"4", this.modeLayout.nbLigneList );
      

    
    });
    this.serviceWidget.currentDispotionRep.subscribe(layout=>{

      if(layout.nbLigneIn && this.modeLayout.nbLigneIn != layout.nbLigneIn)
      this. getWidgetWithType(`?visible=1&type[]=1&type[]=2`,"1",layout.nbLigneIn );
      if(layout.nbLigneList&&this.modeLayout.nbLigneList != layout.nbLigneList)
      this. getWidgetWithType(`?visible=1&type=3`,"3",layout.nbLigneList );
      
      if(layout.nbLigneGh &&this.modeLayout.nbLigneGh != layout.nbLigneGh)
      this. getWidgetWithType(`?visible=1&type=4`,"4", layout.nbLigneGh );
      
      this.positionLayout=layout.postions ;
      this.dragPermission=layout.drag;    
      if(layout.indicateur)
        this.modeLayout.indicateur =layout.indicateur;
        if(layout.graphique)
        this.modeLayout.graphique =layout.graphique;
        if(layout.list)
        this.modeLayout.list =layout.list;
        this.modeLayout.drag =layout.drag;
        if(layout.nbLigneIn)
        this.modeLayout.nbLigneIn = layout.nbLigneIn;
        if(layout.nbLigneList)
        this.modeLayout.nbLigneList= layout.nbLigneList;
        if(layout.nbLigneGh)
        this.modeLayout.nbLigneGh = layout.nbLigneGh ;
this.modeLayout.postions = layout.postions ;
if(layout.permutation)
this.modeLayout.permutation = layout.permutation;
   

         });

         this.hiddenLoadSpinner('');

   }
 

  permutation(index){
    if(this.modeLayout.permutation)
    {var aux =0;
    this.ListIndix.push(index);

    if(this.ListIndix.length==2)
    
{
  aux=this.letters[this.ListIndix[0]]
 
  this.letters[this.ListIndix[0]]=  this.letters[this.ListIndix[1]];

  this.letters[this.ListIndix[1]]=aux
  const element = this.letters;
this.ListIndix = [];
this.modeLayout.indicePermutation = 5 ;
}

}
  if(this.modeLayout.permutation)
{this.modeLayout.indicePermutation =index;

this.serviceWidget.setCurrentDispotionRep( this.modeLayout);}

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
  this.spinnerService.show();

    this.serviceWidget.getAllWidget(property).subscribe(widget=>{
    let   index = 0;
    let i =0 ;
   let  playStore : Widget[] =[] ;

    let listWidget : Widget[] [] =[] ;
    if(widget.length !=0)
      
    {   
      widget.forEach(function(item){  
//to be a function 
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
      if(playStore.length != 0)
        listWidget.push(playStore);
if(indexType == 1 )
{
  this.WidgetIndicator=  listWidget;
  this.setWidgetToUpdate(listWidget[0][0]);
}
else if(indexType == 3)
{
  this.WidgetList=  listWidget;
}
else if(indexType == 4)
{
  this.WidgetGraphique=  listWidget;
 

}

    }},()=>{},
    ()=>{
      this.spinnerService.show();
      
    if(this.WidgetGraphique.length == 0 && this.WidgetIndicator.length == 0 && this .WidgetIndicatorList.length ==0 && this.WidgetList.length ==0){
      this.hiddenLoadSpinner("");
      this.vide=true;
      this.spinnerService.hide();

      }else 
      this.vide=false;

    });
 
  }
  hiddenLoadSpinner($event){
    this.spinnerService.hide();
console.log("sppiner non");
  }

}
