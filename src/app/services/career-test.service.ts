import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CareerTestService {
  
  private baseUrl: string = environment.apiUrl + "/api/careerTest";

  constructor(private http: HttpClient) { }

  submitTestData(testDataObj: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/saveTestData`, testDataObj);
  }

  processFuzzy(fuzzyData: any): Observable<any> {
    return this.http.post('https://icdss-v2.onrender.com/icdss', fuzzyData);
  }

  getAllTests(): Observable<any> {
    return this.http.get(`${this.baseUrl}/getAllTests`);
  }
}
