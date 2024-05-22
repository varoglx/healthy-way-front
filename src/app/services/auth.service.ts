import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'https://us-central1-healthy-way-f7636.cloudfunctions.net/api';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, { username, password });
  }

  register(email: string, username: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, { email, username, password });
  }
}
