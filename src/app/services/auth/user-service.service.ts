import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/User';
import { map } from 'rxjs/operators';
import { GlobalConstants } from './../../common/global-constants';

@Injectable({ providedIn: 'root' })
export class UserService {
  apiUrl =GlobalConstants.DomainName;
    constructor(private http: HttpClient) { 
    }

    getAll() {
        return this.http.get<User[]>(`${this.apiUrl}/api/users`);
    }
getUsersBy(email){
  return this.http.get<User>(`${this.apiUrl}/api/users?email=${email}`).pipe(map(data => data['hydra:member']));

}

getUsersId(id){
  return this.http.get<User>(`${this.apiUrl}/api/users?id=${id}`).pipe(map(data => data['hydra:member']));

}
  
    register(user: User) {
        
       return this.http.post(`${this.apiUrl}/api/users`, user);
    }

    delete(id: number) {
        return this.http.delete(`${this.apiUrl}/api/users/${id}`);
    }
    updateUser(user,id){
      console.log(user);
      return new Promise((resolver)=>{
    
        this.http.put(`${this.apiUrl}/api/users/${id}`,JSON.stringify(user)  ).subscribe(()=>{
       //   this.refreshneeded.next ();
     
        },error=>{
          console.log(error);
        },()=>{resolver(false)});
    
      });
      
    }
}