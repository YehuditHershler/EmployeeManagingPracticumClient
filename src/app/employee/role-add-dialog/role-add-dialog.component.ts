import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle, MatDialogContent,
  MatDialogActions, MatDialogClose,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, FormBuilder, FormsModule, Validators, FormArray } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Employee } from '../models/employee.model';
import { Role } from '../models/role.model';
import { Employee_Role } from '../models/employee_role.model';
import { EmployeeService } from '../services/employee.service';
import { RoleService } from '../services/role.service';
import { EmployeeRoleService } from '../services/employee-role.service';
import { error } from 'console';

@Component({
  selector: 'app-role-add-dialog',
  templateUrl: './role-add-dialog.component.html',
  styleUrl: './role-add-dialog.component.css'
})

export class RoleAddDialogComponent implements OnInit {
  [x: string]: any;
  roles!: Role[];
  employeeRole!: Employee_Role;
  empRole!: Employee_Role;
  roleAddForm!: FormGroup;
  minRoleStartDate!: Date;
  twiceError!: string;

  constructor(
    private fb: FormBuilder,
    private _employeeService: EmployeeService,
    private _roleService: RoleService,
    private _employeeRoleService: EmployeeRoleService,
    public dialogRef: MatDialogRef<RoleAddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    const currentYear = new Date().getFullYear();
  }

  ngOnInit(): void {
    this.minRoleStartDate = this.data.startDate;
    this.roles = this.data.roles;
    this.empRole = this.data.empRole;
    console.log(this.roles);
    this.roleAddForm = new FormGroup({
      "roleId": new FormControl(this.roles, [Validators.required]),
      "isManagerial": new FormControl(Boolean, [Validators.required]),
      "roleStartDate": new FormControl(new Date(), [Validators.required])
    })
    if (this.empRole) {
      const RoleEmp = {
        roleId: this.empRole.roleId,
        isManagerial: this.empRole.isManagerial,
        roleStartDate: this.empRole.roleStartDate,
      }
      this.roleAddForm.patchValue(RoleEmp);
      () => {
        console.log("ops! getEmployeeById(id) didn't work")
      }
    }
  }

  onSubmit() {
    if (this.roleAddForm.valid) {
      var role: Employee_Role = this.roleAddForm.value;
      role.employeeId = this.data.employeeId;
      console.log(this.roles)
      console.log(role)
      //מציאת שם התפקיד
      var thisRoleName = this.roles.find(r => r.id === role.roleId)?.nameRole;
      console.log(thisRoleName)
      //בדיקה אם התפקיד נבחר פעמיים
      this._employeeRoleService.getEmployeeRolesById(this.data.employeeId).subscribe(res => {
        const empRoles = res;
        console.log(empRoles)
        if (empRoles.some((r) => r.roleId === role.roleId)) {
          console.log('shoudn\'t choose the role twice!')
          this.twiceError = "shoudn't choose the role twice!";
        }
        else {
          this._employeeRoleService.addEmployeeRoleToServer(role).subscribe(() => {
            this.twiceError = "";
            this.dialogRef.close(thisRoleName);

          })
        }
      });
    }
  }

  onCancel() {
    this.dialogRef.close('-');
  }

}



