import { Component, OnInit, OnDestroy } from '@angular/core';
import { ServiceWidgetService } from 'src/app/services/widget/service-widget.service';
import { Widget } from 'src/app/models/Widget';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit  {
WidgetIndicator : Widget [] []=[] ;
WidgetGraphique : Widget  [][]=[] ;
WidgetList : Widget  [][]=[] ;
width=80;
spinner =false;
permute = 1;
permutationiSActive =false ; 
ListIndix = []
 letters = [0 , 1 ,2] ;

;  constructor(private serviceWidget:ServiceWidgetService) {
    this. getWidgetWithType("?type=1","1");
    this. getWidgetWithType("?type=3","3");
    this. getWidgetWithType("?type=4","4");

  }
  

  ngOnInit() {
  }
  permutation(index){
    if(this.permutationiSActive)
    {var aux =0;
    this.ListIndix.push(index);
    console.log(this.ListIndix.length);

    if(this.ListIndix.length==2)
    
{
  aux=this.letters[this.ListIndix[0]]
  console.log(this.letters[this.ListIndix[0]]);
  console.log(this.letters[this.ListIndix[1]]);

  this.letters[this.ListIndix[0]]=  this.letters[this.ListIndix[1]];

  this.letters[this.ListIndix[1]]=aux
  const element = this.letters;
console.log(element);
this.ListIndix = [];

}

}

  }


 getWidgetWithType(property,indexType) {

    this.serviceWidget.getAllWidget(property).subscribe(widget=>{
    let   index = 0;
    let i =0 ;
    let widgets = new Widget  ();
   let  playStore : Widget[] =[] ;

    let listWidget : Widget[] [] =[] ;

      widget.forEach(function(item){  

        if(index <2)
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
this.WidgetIndicator=  listWidget;
else if(indexType == 3)
this.WidgetList=  listWidget;
else if(indexType == 4)
this.WidgetGraphique=  listWidget;
this.spinner=true

    });
  }


}
