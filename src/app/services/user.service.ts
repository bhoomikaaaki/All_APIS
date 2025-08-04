import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  url = "http://localhost:3000/users";

  //GET API : http://localhost:3000/users
  getUsers(): Observable<User[]> {

    return this.http.get<User[]>(this.url);
  }

  //POST API:http://localhost:3000/users
  // Body:
  // {
  //   "name": "Peter",
  //   "email": "peter@gmail.com",
  //   "age": "27",
  //   "id": "9"
  // }
  saveUser(user: User): Observable<User> {

    return this.http.post<User>(this.url, user);
  }

  //Delete API: http://localhost:3000/users/9
  deleteUser(id: string): Observable<User> {
    return this.http.delete<User>(this.url + "/" + id);
  }

  //GET API with id : http://localhost:3000/users/4
  getSelectedUser(id: string): Observable<User> {
    return this.http.get<User>(this.url + "/" + id);
  }

  //PUT API:http://localhost:3000/users/4
  //   Body:
  //   {
  //   "name": "Tony",
  //   "email": "tony1@gmail.com",
  //   "age": "27",
  //   "id": "4"
  // }
  updateUser(user: User): Observable<User> {
    return this.http.put<User>(this.url + "/" + user.id, user);
  }
}
