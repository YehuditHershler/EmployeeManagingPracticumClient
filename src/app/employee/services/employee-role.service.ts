import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee_Role } from '../models/employee_role.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeRoleService {

  constructor(private http: HttpClient) { }

  private readonly API_URL = 'http://localhost:5113/Employee_Role';
  addEmployeeRoleToServer(empR: Employee_Role): Observable<any> {
    const jsonData = JSON.stringify(empR);
    console.log(jsonData)
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
    });
    return this.http.post<any>(this.API_URL, jsonData, { headers });
  }
  getEmployeesRoleFromServer(): Observable<Employee_Role[]> {
    return this.http.get<Employee_Role[]>(this.API_URL);
  }
  getEmployeeRolesFromServer(id: number): Observable<Employee_Role[]> {
    return this.http.get<Employee_Role[]>(`${this.API_URL}/${id}`);
  }
  getEmployeeRolesById(id: number): Observable<Employee_Role[]> {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
    });
    return this.http.get<Employee_Role[]>(`${this.API_URL}/${id}`, { headers });
  }
  updateEmployeeRole(id: number, empR: Employee_Role) {
    return this.http.put<any>(`${this.API_URL}/${id}`, empR)
  }
  deleteEmployeeRole(id: number) {
    return this.http.delete<any>(`${this.API_URL}/${id}`)
  }
}
