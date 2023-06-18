import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthServiceService {
  baseUrl: string = 'http://localhost:8000/api'
  constructor(private http: HttpClient, private router: Router) { }

  login(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/signin`, data);
  }

  isAuthenticated() {
    if (typeof window == "undefined") {
      return false;
    }
    if (localStorage.getItem("jwt")) {
      return JSON.parse(localStorage.getItem("jwt") || '{}');
    } else {
      return false;
    }
  }

  logout() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("jwt");
    }
    this.router.navigate(['/login']);
  }
}
