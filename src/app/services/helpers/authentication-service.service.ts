import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/models/User';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  apiUrl= "http://127.0.0.1:8000/api";
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
  username: string="";
  public roles: string ="";
    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get  currentUserValue(): User {
        return this.currentUserSubject.value;
    }

login(username, password) {
   
      let body = new URLSearchParams();
body.set('username', username);
body.set('password', password);

let options = {
  headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
};
        return this.http.post<any>(`${this.apiUrl}/login_check`, body.toString(),options)
            .pipe(map(user => {
        

             localStorage.setItem('currentUser', JSON.stringify(user));

             this.currentUserSubject.next(user);

                let jwt = this.currentUserValue.token;
     
                let jwtData = jwt.split('.')[1]
                let decodedJwtJsonData = window.atob(jwtData)
                let decodedJwtData = JSON.parse(decodedJwtJsonData)
              this.username=  decodedJwtData.username.toString();
                 this.roles = decodedJwtData.roles.toString().split(',')[0];
                 localStorage.setItem('roles', JSON.stringify(this.roles));
                 localStorage.setItem('username', JSON.stringify(this.username));


               // location.reload(true);
                return user;
            }));
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('currentUser');
        localStorage.clear();
        this.currentUserSubject.next(null);
        this.username="";
        this.roles ="";            //  location.reload(true);

    }
    getRoles(){
      return localStorage.getItem("roles").toString();
    }
    getUsername(){
      return localStorage.getItem("username");
    }
}