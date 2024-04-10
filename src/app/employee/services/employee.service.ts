import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../models/employee.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  private readonly API_URL = 'http://localhost:5113/Employee';

  addEmployeeToServer(emp: Employee): Observable<any> {
    const jsonData = JSON.stringify(emp);
    console.log(jsonData)
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
    });
    return this.http.post(this.API_URL, jsonData, { headers });
  }
  getEmployeesFromServer(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.API_URL);
  }
  registerEmployee(emp: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.API_URL, emp);
  }
  getEmployeeById(id: number): Observable<Employee> {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
    });
    // return this.http.get<Employee>(`${this.API_URL}/${id}`, { headers });
    return this.http.get<Employee>(`${this.API_URL}/${id}`, { headers });
  }
  updateEmployee(id: number, emp: Employee) {
    return this.http.put<any>(`${this.API_URL}/${id}`, emp)
  }
}