import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private baseUrl: string = environment.apiUrl + "/api/user";

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/getAllUsers`);
  }

  getUserById(userId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/getUserById/${userId}`);
  }
}
