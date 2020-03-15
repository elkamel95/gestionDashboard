import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/User';
import { map } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class UserService {
  apiUrl ="http://127.0.0.1:8000/api";
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`${this.apiUrl}/users`);
    }
getUsersBy(email){
  return this.http.get(`${this.apiUrl}/users?email=`+email).pipe(map(data => data['hydra:member']));;

}
    register(user: User) {
        return this.http.post(`${this.apiUrl}/users`, user);
    }

    delete(id: number) {
        return this.http.delete(`${this.apiUrl}/users/${id}`);
    }
}