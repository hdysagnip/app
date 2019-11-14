import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User} from './user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url:string = "http://localhost:8080";
  private headers = new HttpHeaders()
    .set('Content-Type','application/json');

  getUsers():Observable<User[]>{
    return this.http.get<User[]>(
      this.url + "/user"
    );
  }

  addUser(user:User):Observable<any>{
    return this.http.post<any>(
      this.url + "/user", user,
      {headers:this.headers}
    );
  }

  updateUser(user:User, id:string):Observable<User>{
    return this.http.put<User>(
      this.url + '/user/' + id,
      user,{
        headers: new HttpHeaders({
          "Content-Type": "application/json",
        })
    });
  }

  deleteUser(id:string){
    return this.http.delete(
      this.url + '/user/' + id);
  }


  constructor(private http:HttpClient) { }
}
