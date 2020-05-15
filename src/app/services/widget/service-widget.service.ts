import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Widget } from 'src/app/models/Widget';
import { Observable, Subject,BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ModeDisposition } from 'src/app/models/ModeDisposition';
import { HostListener } from "@angular/core";
import { XmlService } from '../XmlData/xml.service';
 export interface SessionType {
  sessionName :string,
  sessionProperty :string
 }
@Injectable({
  providedIn: 'root'
})

export class ServiceWidgetService implements OnInit {
  

  ngOnInit() {
  }
private url :string = "http://localhost:8000" ; 
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

    dateProperty                        :string[];
    datePropertyName                    :string[];
  constructor(private http:HttpClient,private xml:XmlService) { 
    this.headers.append('Authorization', `Bearer ${localStorage.getItem('token')}`);
    this.headers.append('Content-Type', `application/json`);
    this.headers.append('Accept', `application/ld+json`);
    this.getScreenSize();
    
    this.datePropertyName    =this.getDatePropertyName();
    this.dateProperty=this.getDateProperty();
  }

 setValueForSession( setPropertyForSessiontype){

  this.setPropertyForSessiontype.next( setPropertyForSessiontype);
 }
  setCurrentDispotionRep (changeDispostion){
    this.behaviorChangeDispostion.next(changeDispostion);
   }

getDateProperty():string[]{
  return  ["after","before","strictly_after","strictly_before","#TD#","#LY#","#LM#","#LW#","#LD#"];

}
getDatePropertyName():string[]{

  return  ["after","before","strictly after","strictly before","today","last years" ,"last month","last week","last day"];
}
  setCurrentWidgetUpdate(widget:Widget){
this.behaviorWidget.next(widget);
  }
  
  setCurrentGraphique(gp:any){
    this.behaviorGraphiqueType.next(gp);
 }


  getAllWidget(property) :Observable<Widget[]>{

   return this.http.get<Widget[]>(`${this.url}/api/widgets${property}`,{headers: this.headers}).pipe(map(data => data['hydra:member']));
  }
  

  getAllWidgetDashbord(npPage,itemsPerPage,GroupeBy?, order?,title?) :Observable<Widget[]>{

    return this.http.get<Widget[]>(this.url+`/api/widgets?itemsPerPage=${itemsPerPage}&page=${npPage}&order[${GroupeBy}]=${order}&&name_fr=${title}&&users.id=${localStorage.getItem('idUser')}`
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
  postWidget(widget:Widget){
widget.createAt =this.getDateTime().toString();
widget.updateAt =this.getDateTime().toString();
    this.http.post<Widget>(this.url+"/api/widgets", widget).subscribe(()=>{
      this.refreshneeded.next ();
 
    },error=>{
      console.log(error);
    }); ;
  }
  remove(id){
this.http.delete(this.url+"/api/widgets/"+id).subscribe(rep=>{
  this.refreshneeded.next ();
});
  }
  
  update(widget:Widget){ ;
widget.updateAt =this.getDateTime();
    this.http.put(this.url+"/api/widgets/"+widget.id, widget).subscribe(()=>{
      this.refreshneeded.next ();
 
    },error=>{
      console.log(error);
    }); ;
  }
  getAnything(generiqueUrl,property=""){
    return this.http.get<Widget[]>(this.url+"/"+generiqueUrl+property,{headers: this.headers}).pipe(map(data => data['hydra:member']));

  }


  @HostListener('window:resize', ['$event'])
    getScreenSize(event?) {
          this.screenHeight = window.innerHeight;
          this.screenWidth = window.innerWidth;
    }

    updatePositionWidgetByType(type){

this.http.put(`${this.url}/api/reset/position/${type}`,type).subscribe(()=>{this.refreshneededDataReset.next('')});

    }

    updatePositionWidgetAll(){
      this.http.put(`${this.url}/api/reset/position/all`,"update").subscribe(()=>{this.refreshneededDataReset.next('') });
}}