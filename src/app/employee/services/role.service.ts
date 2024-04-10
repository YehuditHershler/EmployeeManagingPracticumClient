import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Role } from '../models/role.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) { }

  private readonly API_URL = 'http://localhost:5113/Role';
  getRolesFromServer(): Observable<Role[]> {
    return this.http.get<Role[]>(this.API_URL);
  }
  getRoleById(id: number): Observable<Role> {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
    });
    return this.http.get<Role>(`${this.API_URL}/${id}`, { headers });
  }
  // מומלץ להרחבת המערכת
  // addRoleToServer(role: Rple): Observable<any> {
  //   const jsonData = JSON.stringify(role);
  //   console.log(jsonData)
  //   const headers = new HttpHeaders({
  //     "Content-Type": "application/json",
  //   });
  //   return this.http.post(this.API_URL, jsonData, { headers });
  // }
  // registerRole(role: Role): Observable<Role> {
  //   return this.http.post<Role>(this.API_URL, role);
  // }
  // updateRole(id: number, role: Role){
  //   return this.http.put<any>(`${this.API_URL}/${id}`, role)
  // }
}
