import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = "http://localhost:5198/api/user";
  passwordReqs: any = {
    has6characters: false,
    hasUppercase: false,
    hasLowercase: false,
    hasNumbers: false,
    hasSpecialChars: false
  }

  constructor(private http: HttpClient) { }


  signIn(userSigninObj: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/signin`, userSigninObj);
  }

  signUp(userSignupObj: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/signup`, userSignupObj);
  }

  passwordValidator(password: string): any {
    (password.length >= 6) ? this.passwordReqs['has6characters'] = true : this.passwordReqs['has6characters'] = false;
    (/[A-Z]/.test(password)) ? this.passwordReqs['hasUppercase'] = true : this.passwordReqs['hasUppercase'] = false;
    (/[a-z]/.test(password)) ? this.passwordReqs['hasLowercase'] = true : this.passwordReqs['hasLowercase'] = false;
    (/[0-9]/.test(password)) ? this.passwordReqs['hasNumbers'] = true : this.passwordReqs['hasNumbers'] = false;
    (/[\W_]/.test(password)) ? this.passwordReqs['hasSpecialChars'] = true : this.passwordReqs['hasSpecialChars'] = false;
    return this.passwordReqs;
  }


}
