import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Widget } from 'src/app/models/Widget';
import { Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})

export class ServiceWidgetService {
private url :string = "http://localhost:8000" ; 
refreshneeded = new Subject<void>();
   headers = new HttpHeaders();


  constructor(private http:HttpClient) { 
    this.headers.append('Authorization', `Bearer ${localStorage.getItem('token')}`);
    this.headers.append('Content-Type', `application/json`);
    this.headers.append('Accept', `application/ld+json`);

 
  }
  getAllWidget() :Observable<Widget[]>{

   return this.http.get<Widget[]>(this.url+"/api/widgets",{headers: this.headers}).pipe(map(data => data['hydra:member']));
  }

  getAllWidgetDashbord(npPage) :Observable<Widget[]>{

    return this.http.get<Widget[]>(this.url+"/api/widgets?page="+npPage,{headers: this.headers}).pipe(map(data => data['hydra:member']));
   }
  getDateTime(){
    
return new Date().toJSON("jj/mm/yy");;
  }
  postWidget(widget:Widget){
    console.log(widget) ;
widget.createAt =this.getDateTime();
widget.updateAt =this.getDateTime();

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
widget.updateAt =this.getDateTime()
    this.http.put(this.url+"/api/widgets/"+id, widget).subscribe(()=>{
      this.refreshneeded.next ();
 
    },error=>{
      console.log(error);
    }); ;
  }
}