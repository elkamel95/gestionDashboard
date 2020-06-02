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
        return this.http.get<User[]>(`${this.apiUrl}/users`);
    }
getUsersBy(email){
  return this.http.get<User>(`${this.apiUrl}/users?email=${email}`).pipe(map(data => data['hydra:member']));

}
    register(user: User) {
        
        console.log(user);
       return this.http.post(`${this.apiUrl}/users`, user);
    }

    delete(id: number) {
        return this.http.delete(`${this.apiUrl}/users/${id}`);
    }
}