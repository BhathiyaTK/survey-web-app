import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private baseUrl: string = "http://localhost:5198/api/user";

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/getAllUsers`);
  }

  getUserById(userId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/getUserById/${userId}`);
  }
}
