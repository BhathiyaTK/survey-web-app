import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CareerTestService {
  
  private baseUrl: string = "http://localhost:5198/api/careerTest";

  constructor(private http: HttpClient) { }

  submitTestData(testDataObj: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/saveTestData`, testDataObj);
  }
}
