//employee.model.ts
// import { Employee_Role } from "./employee_role.model";
export interface Employee {
  id: number;
  tz: string;
  firstName: string;
  lastName: string;
  startDate: Date;
  birthDate: Date;
  gender: number;
  // roles: Employee_Role[];
  status: boolean;
}