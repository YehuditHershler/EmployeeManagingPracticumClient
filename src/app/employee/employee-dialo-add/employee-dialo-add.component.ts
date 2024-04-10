import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle, MatDialogContent,
  MatDialogActions, MatDialogClose,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, FormBuilder, FormsModule, Validators, FormArray } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { Employee } from '../models/employee.model';
import { Role } from '../models/role.model';
import { Employee_Role } from '../models/employee_role.model';
import { EmployeeService } from '../services/employee.service';
import { RoleService } from '../services/role.service';
import { EmployeeRoleService } from '../services/employee-role.service';
import { RoleAddDialogComponent } from '../role-add-dialog/role-add-dialog.component';

@Component({
  selector: 'app-employee-dialo-add',
  templateUrl: './employee-dialo-add.component.html',
  styleUrl: './employee-dialo-add.component.css'
})

export class EmployeeDialoAddComponent implements OnInit {
  [x: string]: any;
  roles!: Role[];
  employeeForm!: FormGroup;
  roleAddForm!: FormGroup;
  firstRole!: boolean;
  genders: string[] = ["זכר", "נקבה"];
  minBirthDate: Date;
  minStartDate: Date;
  maxStartDate: Date;
  maxBirthDate: Date;
  minRoleStartDate!: Date;
  employeeId: number | undefined;
  employee!: Employee;
  EmployeeRolesToShow: string[] = [];
  saved!: boolean;
  constructor(
    private fb: FormBuilder,
    private _employeeService: EmployeeService,
    private _roleService: RoleService,
    private _employeeRoleService: EmployeeRoleService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<EmployeeDialoAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    const currentYear = new Date().getFullYear();
    this.maxStartDate = new Date(currentYear, 4, 1);
    this.maxBirthDate = new Date(currentYear - 16, 4, 1);
    this.minBirthDate = new Date(1960, 1, 1);
    this.minStartDate = new Date(2000, 11, 31);
  }

  ngOnInit(): void {
    this._roleService.getRolesFromServer().subscribe(res => {
      this.roles = res;
    })
    this.employeeForm = new FormGroup({
      "firstName": new FormControl('', [Validators.required]),
      "lastName": new FormControl('', [Validators.required]),
      "tz": new FormControl('', [Validators.required, Validators.pattern('[0-9]{9}')]),
      "startDate": new FormControl(new Date(), [Validators.required]),
      "birthDate": new FormControl(new Date(), [Validators.required]),
      "gender": new FormControl(this.genders, [Validators.required]),
    });
    this.firstRole = true
    this.saved = false;
  }

  onSubmit() {
    this.dialogRef.close(true);
  }
  onCancel() {
    this.dialogRef.close(false);
  }
  addEmployee() {
    if (this.employeeForm.valid) {
      this.employee = this.employeeForm.value;
      this.employee.status = true;
      this.employeeForm.value.gender = this.genders[0] ? this.employee.gender = 1 : this.employee.gender = 0;
      //שמירת נתוני העובד לפני הוספת התפקידים
      this._employeeService.addEmployeeToServer(this.employee).subscribe(() => {
        //find the employee id that saved in DB
        this._employeeService.getEmployeesFromServer().subscribe(emp => {
          this.employeeId = emp.find(x => x.firstName === this.employee.firstName)?.id;
          this._roleService.getRolesFromServer().subscribe(roles => {
            this.roleAddDialog();
            console.log(this.EmployeeRolesToShow);
          });
        })
      })
    }
  }
  roleAddDialog() {
    const dialogRef = this.dialog.open(RoleAddDialogComponent, {
      height: '300px',
      width: '400px',
      data: {
        employeeId: this.employeeId,
        startDate: this.employee.startDate,
        roles: this.roles,
      }
    });
    dialogRef.afterClosed().subscribe((roleName) => {
      console.log('The dialog was closed');
      this.EmployeeRolesToShow.push(roleName);
    });
  }
  addRole() {
    if (this.firstRole) {
      //כולל שמירת נתוני עובד לפני ההוספה 
      //(לצורך מידע על תאריך תחילת העבודה ותז העובד)
      this.addEmployee();
      this.firstRole = false;
      this.saved = true;
    }
    else {
      this.roleAddDialog();
    }
  }
}