import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Widget } from 'src/app/models/Widget';
import { Observable, Subject,BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ModeDisposition } from 'src/app/models/ModeDisposition';
@Injectable({
  providedIn: 'root'
})

export class ServiceWidgetService {
private url :string = "http://localhost:8000" ; 
refreshneeded = new Subject<void>();
   headers = new HttpHeaders();
   widget  = new Widget() ;
   changeDispostion  = new ModeDisposition() ;

   behaviorChangeDispostion= new BehaviorSubject<any>(this.changeDispostion);
   currentDispotionRep = this.behaviorChangeDispostion.asObservable();

behaviorWidget = new BehaviorSubject<Widget>(this.widget);
currentWidget = this.behaviorWidget.asObservable();
behaviorGraphiqueType = new BehaviorSubject<any>({});
currentGraphique= this.behaviorGraphiqueType.asObservable();
  constructor(private http:HttpClient) { 
    this.headers.append('Authorization', `Bearer ${localStorage.getItem('token')}`);
    this.headers.append('Content-Type', `application/json`);
    this.headers.append('Accept', `application/ld+json`);

 
  }
  setCurrentDispotionRep (changeDispostion){
    this.behaviorChangeDispostion.next(changeDispostion);
      }

  setCurrentWidgetUpdate(widget:Widget){
this.behaviorWidget.next(widget);
  }
  setCurrentGraphique(gp:any){
    this.behaviorGraphiqueType.next(gp);
      }
  getAllWidget(property) :Observable<Widget[]>{

   return this.http.get<Widget[]>(this.url+"/api/widgets"+property,{headers: this.headers}).pipe(map(data => data['hydra:member']));

   
  }
  

  getAllWidgetDashbord(npPage,itemsPerPage) :Observable<Widget[]>{

    return this.http.get<Widget[]>(this.url+`/api/widgets?itemsPerPage=${itemsPerPage}&page=${npPage}`,{headers: this.headers});
   }
  getDateTime(){
    
return new Date().toJSON("jj/mm/yy");;
  }
  postWidget(widget:Widget){
    console.log(widget) ;
widget.createAt =this.getDateTime().toString();
widget.updateAt =this.getDateTime().toString();
widget.width=widget.width.toString();
widget.height=  widget.height.toString();
    this.http.post<Widget>(this.url+"/api/widgets", widget).subscribe(()=>{
      this.refreshneeded.next ();
 
    },error=>{
      console.log(error);
    }); ;
  }
  remove(id){
    console.log(id);
this.http.delete(this.url+"/api/widgets/"+id).subscribe(rep=>{
  this.refreshneeded.next ();
});
  }
  
  update(widget:Widget,id){ ;
widget.updateAt =this.getDateTime();

widget.url ="";
widget.visible=true;
widget.width=  widget.width.toString();
widget.height=widget.height.toString();
    this.http.put(this.url+"/api/widgets/"+id, widget).subscribe(()=>{
      this.refreshneeded.next ();
 
    },error=>{
      console.log(error);
    }); ;
  }
}