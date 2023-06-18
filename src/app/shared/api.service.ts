import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from "rxjs/operators"

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiBaseUrl = 'http://localhost:3000/'
  constructor(private _http: HttpClient ) { }

  // Post Service
  postUser(userData: any) {
    return this._http.post<any>(this.apiBaseUrl+'users', userData).pipe(map((res:any, err)=>{
      if(err) 
        console.log(err)
      else
        return res;
    }))
  }

  // Get Service
  getUser() {
    return this._http.get<any>(this.apiBaseUrl+'users').pipe(map((res:any)=>{
      return res;
    }))
  }

  // Update Service
  updateUser(userData: any, id:number) {
    return this._http.put<any>(this.apiBaseUrl+'users/'+id, userData).pipe(map((res:any)=>{
      return res;
    }))
  }

  // Delete Service
  deleteUser(id:number) {
    return this._http.delete<any>(this.apiBaseUrl+'users/'+id).pipe(map((res:any)=>{
      return res;
    }))
  }

}
