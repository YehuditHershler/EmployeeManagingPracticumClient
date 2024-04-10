import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle, MatDialogContent,
  MatDialogActions, MatDialogClose,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, FormBuilder, FormsModule, Validators, FormArray } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CommonModule, DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import { EmployeeService } from '../services/employee.service';
import { Employee } from '../models/employee.model';
import { Employee_Role } from '../models/employee_role.model';
import { Role } from '../models/role.model';
import { RoleAddDialogComponent } from '../role-add-dialog/role-add-dialog.component';
import { EmployeeRoleService } from '../services/employee-role.service';
import { RoleEditDialogComponent } from '../role-edit-dialog/role-edit-dialog.component';

@Component({
  selector: 'app-employee-dialog-edit',
  templateUrl: './employee-dialog-edit.component.html',
  styleUrl: './employee-dialog-edit.component.css'
})
export class EmployeeDialogEditComponent implements OnInit {
  [x: string]: any;

  editForm!: FormGroup;
  roles!: Role[];
  employee!: Employee;
  employeeRoles!: Employee_Role[];
  //ולידציות - עובד מגיל 16 וכו'
  minBirthDate: Date;
  minStartDate: Date;
  maxStartDate: Date;
  maxBirthDate: Date;
  genders: string[] = ["זכר", "נקבה"];
  isDisabled: boolean = true; // הגדרת isDisabled כברירת מחדל

  constructor(
    private dialogRef: MatDialogRef<EmployeeDialogEditComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private employeeService: EmployeeService,
    private employeeRoleService: EmployeeRoleService
  ) {
    const currentYear = new Date().getFullYear();
    this.maxStartDate = new Date(currentYear, 4, 1);
    this.maxBirthDate = new Date(currentYear - 16, 4, 1);
    this.minBirthDate = new Date(1944, 1, 1);
    this.minStartDate = new Date(2000, 11, 31);
  }

  async ngOnInit() {
    this.employee = this.data.employee;
    this.roles = this.data.roles;
    this.employeeRoles = this.data.employeeRoles;
    console.log(this.employee)
    this.editForm = new FormGroup({
      tz: new FormControl(''),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      birthDate: new FormControl('', Validators.required),
      startDate: new FormControl('', Validators.required),
      gender: new FormControl(this.genders, Validators.required),
    });
    console.log(this.employee);
    const emp = {
      tz: this.employee.tz,
      firstName: this.employee.firstName,
      lastName: this.employee.lastName,
      birthDate: this.employee.birthDate,
      startDate: this.employee.startDate,
      gender: this.employee.gender === 1 ? this.genders[0] : this.genders[1]
    }
    this.editForm.patchValue(emp);
    () => {
      console.log("ops! getEmployeeById(id) didn't work")
    }
  }
  onSubmit(): void {
    var employeeToUpdate = this.editForm.value;
    employeeToUpdate.tz = this.employee.tz;
    employeeToUpdate.status = true;
    this.editForm.value.gender === this.genders[1] ? employeeToUpdate.gender = 0 : employeeToUpdate.gender = 1;
    this.employeeService.updateEmployee(this.employee.id, employeeToUpdate).subscribe(() => {
      this.dialogRef.close(true);
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  editRole(id: number) {
    const dialogRef = this.dialog.open(RoleEditDialogComponent, {
      height: '300px',
      width: '400px',
      data: {
        startDate: this.employee.startDate,
        roles: this.roles,
        employeeRole: this.employeeRoles.find(r => r.id === id)
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed ' + result);
      this.employeeRoleService.getEmployeeRolesFromServer(this.employee.id).subscribe(erRes => {
        console.log(erRes);
        this.employeeRoles = erRes;
      })
    });
  }
  addRole() {
    const dialogRef = this.dialog.open(RoleAddDialogComponent, {
      height: '300px',
      width: '400px',
      data: {
        employeeId: this.employee.id,
        startDate: this.employee.startDate,
        roles: this.roles,
      }
    });
    dialogRef.afterClosed().subscribe((roleName) => {
      this.employeeRoleService.getEmployeeRolesFromServer(this.employee.id).subscribe(erRes => {
        this.employeeRoles = erRes;
        console.log(roleName + ' was addad');
        // this.employeeRoles.push(roleName);
      })
    });
  }
  DeleteRole(roleId: number): void {
    console.log('delete ' + roleId)
    this.employeeRoleService.deleteEmployeeRole(roleId).subscribe(() => {
      this.employeeRoleService.getEmployeeRolesFromServer(this.employee.id).subscribe(erRes => {
        this.employeeRoles = erRes;
        console.log(roleId + ' was deleted')
      })
    });
  }
}