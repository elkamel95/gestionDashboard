import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Widget } from 'src/app/models/Widget';
import { Observable, Subject,BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ModeDisposition } from 'src/app/models/ModeDisposition';
import { HostListener } from "@angular/core";
import { XmlService } from '../XmlData/xml.service';
import { GlobalConstants } from './../../common/global-constants';
 export interface SessionType {
  sessionName :string,
  sessionProperty :string
 }
 export interface modelFilter {
  name:string;
  value:string;
}
export interface MethodMeasur {
  name:string;
  value:string;
}


@Injectable({
  providedIn: 'root'
})

export class ServiceWidgetService implements OnInit {
  

  ngOnInit() {
  }
private DomainName=GlobalConstants.DomainName ; 
private apiURL=GlobalConstants.apiURL ; 
methodsMeasur:MethodMeasur [] = [{name:'Rate',value:'1'},{name:'Percentage',value:'2'}];
paramsDate = ['Years','Months','Days'];
chartType = ["area","column","line"];
screenHeight: number;
screenWidth: number;
    propertysForSessiontype :SessionType[] =[] ;
    refreshneeded = new Subject<void>();
    refreshneededDataReset= new BehaviorSubject<any>("");
    setPropertyForSessiontype= new BehaviorSubject<SessionType[]>(this.propertysForSessiontype);
    setPropertysForSessiontype = this.setPropertyForSessiontype.asObservable();
    headers = new HttpHeaders();
    widget  = new Widget() ;
    changeDispostion  = new ModeDisposition() ;
    behaviorChangeDispostion= new BehaviorSubject<any>(this.changeDispostion);
    currentDispotionRep = this.behaviorChangeDispostion.asObservable();
    behaviorWidget = new BehaviorSubject<Widget>(this.widget);
    currentWidget = this.behaviorWidget.asObservable();
    behaviorGraphiqueType = new BehaviorSubject<any>({});
    currentGraphique= this.behaviorGraphiqueType.asObservable();
    booleanFilterProperty:modelFilter[];
    numericFilterProperty:modelFilter[];

  
  constructor(private http:HttpClient,private xml:XmlService) { 
    this.headers.append('Authorization', `Bearer ${localStorage.getItem('token')}`);
    this.headers.append('Content-Type', `application/json`);
    this.headers.append('Accept', `application/ld+json`);
    this.getScreenSize();
    

    this.numericFilterProperty=[
    {value:"lower than",name:"lt"},
    {value:"greater than",name:"gt"},
    {value:"lower than or equal",name:"lte"},
    {value:"greater than or equal",name:"gte"}
  ];
  
  this.booleanFilterProperty = [ 
     {value:"Active",name:"1"},
    {value:"Deactivate",name:"0"}
  ]
  }

 setValueForSession( setPropertyForSessiontype){

  this.setPropertyForSessiontype.next( setPropertyForSessiontype);
 }
  setCurrentDispotionRep (changeDispostion){
    this.behaviorChangeDispostion.next(changeDispostion);
   }
   dateFilterProperty= [
  {name:'after',value:'after'},
   {name:'before',value:'before'},
   {name:'strictly_after',value:'strictly after'},
   {name:'strictly_before',value:'strictly before'},
   {name:'#TD#',value:'today'},
   {name:'#LY#',value:'last years'},
   {name:'#LM#',value:'last month'},
   {name:'#LW#',value:'last week'},
   {name:'#LD#',value:'last day'}

  ]


  setCurrentWidgetUpdate(widget:Widget){
this.behaviorWidget.next(widget);
  }
  
  setCurrentGraphique(gp:any){
    this.behaviorGraphiqueType.next(gp);
 }


  getAllWidget(property) :Observable<Widget[]>{

   return this.http.get<Widget[]>(`${this.DomainName}/api/widgets${property}`,{headers: this.headers}).pipe(map(data => data['hydra:member']));
  }
  

  getAllWidgetDashbord(npPage,itemsPerPage,GroupeBy?, order?,title?) :Observable<Widget[]>{

    return this.http.get<Widget[]>(this.DomainName+`/api/widgets?itemsPerPage=${itemsPerPage}&page=${npPage}&order[${GroupeBy}]=${order}&&name_fr=${title}&&users.id=${localStorage.getItem('idUser')}`
    ,{headers: this.headers});
   }
  getDateTime(){
    
return new Date().toJSON("jj/mm/yy");;
  }

  getDate(nDay?:number,nMonth?:number,nyear?:number){
    var currentDate = new Date()
var day = currentDate.getDate()+nDay
var month = currentDate.getMonth() + 1+nMonth
var year = currentDate.getFullYear()+nyear;
    return  year+'-'+month+'-'+day;
      }
      
 createDynamicQuery(url:string):string{
  var sessionType:SessionType[];
  var i=0;

if(url.charAt(1)=='Y')
  url=  url.replace('#LY#',this.getDate(0,0,-1));
 if(url.charAt(2)=='M')
url=  url.replace('#LM#',this.getDate(0,-1,0));
if(url.charAt(3)=='W')
url=  url.replace('#LW#',this.getDate(-7,0,0));
 if(url.charAt(4)=='D')
url=  url.replace('#LD#',this.getDate(-1,0,0));
 if(url.charAt(5)=='T')
url=  url.replace('#TD#',this.getDate(0,0,0));
 
if(url.charAt(6)=='S')
{this.setPropertysForSessiontype.subscribe(
  data=>{
    sessionType= data;
    sessionType.forEach(session => {
      url=  url.replace(session[i].sessionProperty,localStorage.getItem(session[i].sessionName));
    i++;
    });
  }
);}


  url = url.substring(7, url.length);

  return url ;
}

translateValueToNameFromXml(entity){
  var index      

var dataXml =this.xml.xmlItems;
  
for (  index = 0; index < dataXml.length; index++) {

if  (dataXml[index].entities.enterpoint.toString() === entity.toString())
{  

  break ;
}  
}
return dataXml[index] ;          
}
getHeaderValueFormAttribute(DataBaseAttributes,xmlAttributes){
  var value      = [];
  var NameForAttribute   = [];
  var valueOfAttribute  = [];
  for(var i in DataBaseAttributes) {
    if(i.toString().charAt(0) !=='@')
      for(var att of xmlAttributes) {


    if( att.$.name.toString() === i.toString() && att.$.header != undefined)  
   {
     NameForAttribute.push(att.$.name);

     valueOfAttribute.push(att.$.header =='' ?att.$.value:att.$.header);
    break;
  }


  }}
  value.push({name:NameForAttribute,value:valueOfAttribute});
  return value;
}
getNameXaxeAndYfromParm(x,y){
  var index      

var dataXml =this.xml.xmlItems;
  
for (  index = 0; index < dataXml.length; index++) {

if  (dataXml[index].entities.enterpoint.toString() === x.toString())
{  

  break ;
}  
}
return dataXml[index] ;          
}

  postWidget(widget:Widget){
widget.createAt =this.getDateTime().toString();
widget.updateAt =this.getDateTime().toString();
return new Promise((resolver)=>{

  this.http.post<Widget>(this.DomainName+"/api/widgets", widget).subscribe(()=>{
    this.refreshneeded.next ();

  },error=>{
    console.log(error);
  },()=>{resolver(false) }); ;
});
 
  }
  remove(id){

this.http.delete(this.DomainName+"/api/widgets/"+id).subscribe(rep=>{
  this.refreshneeded.next ();
},()=>{},()=>{});


  }
  
  update(widget:Widget){ ;
widget.updateAt =this.getDateTime();
return new Promise((resolver)=>{

    this.http.put(this.DomainName+"/api/widgets/"+widget.id, widget).subscribe(()=>{
      this.refreshneeded.next ();
 
    },error=>{
      console.log(error);
    },()=>{resolver(false)});

  });
  }
  getAnything(generiqueUrl,isRelationType){
    if(isRelationType)
    return this.http.get<Widget[]>(this.apiURL+"/"+generiqueUrl,{headers: this.headers});
else
    return this.http.get<Widget[]>(this.apiURL+"/"+generiqueUrl,{headers: this.headers}).pipe(map(data => data['hydra:member']));

  }
  getAnythingWithTypeGraphic(generiqueUrl,isRelationType){
    if(isRelationType)
    return this.http.get<any>(this.apiURL+"/"+generiqueUrl,{headers: this.headers});
else
    return this.http.get<any>(this.apiURL+"/"+generiqueUrl,{headers: this.headers}).pipe(map(data => data['hydra:member']));

  }

  @HostListener('window:resize', ['$event'])
    getScreenSize(event?) {
          this.screenHeight = window.innerHeight;
          this.screenWidth = window.innerWidth;
    }
visibilityWidget(status,id) {
  
  this.http.put(`${this.DomainName}/api/update/${status}/${id}`,"").subscribe(()=>{      this.refreshneeded.next ();
  });

}
    updatePositionWidgetByType(type){

this.http.put(`${this.DomainName}/api/reset/position/${type}`,type).subscribe(()=>{this.refreshneededDataReset.next('')});

    }

    updatePositionWidgetAll(){
      this.http.put(`${this.DomainName}/api/reset/position/all`,"update").subscribe(()=>{this.refreshneededDataReset.next('') });
}


getAttributByName(attributName,attributesList){
  var index      
  for (  index = 0; index <   attributesList.length; index++) {


    if( attributesList[index].$.name.toString() === attributName.toString())  
   {

     return  index;
 
  }

}


return    index    ;  



}

}