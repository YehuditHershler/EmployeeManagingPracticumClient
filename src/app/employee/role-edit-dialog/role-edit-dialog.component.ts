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
  selector: 'app-role-edit-dialog',
  templateUrl: './role-edit-dialog.component.html',
  styleUrl: './role-edit-dialog.component.css'
})
export class RoleEditDialogComponent implements OnInit {
  [x: string]: any;
  roles!: Role[];
  employeeRole!: Employee_Role;
  roleEditForm!: FormGroup;
  minRoleStartDate!: Date;

  constructor(
    private fb: FormBuilder,
    private _employeeService: EmployeeService,
    private _roleService: RoleService,
    private _employeeRoleService: EmployeeRoleService,
    public dialogRef: MatDialogRef<RoleEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    const currentYear = new Date().getFullYear();
  }

  ngOnInit(): void {
    this.minRoleStartDate = this.data.startDate;
    this.roles = this.data.roles;
    this.employeeRole = this.data.employeeRole;
    console.log(this.roles);
    this.roleEditForm = new FormGroup({
      "roleId": new FormControl(this.roles, [Validators.required]),
      "isManagerial": new FormControl(Boolean, [Validators.required]),
      "roleStartDate": new FormControl(this.employeeRole.roleStartDate, [Validators.required])
    })
    const RoleEmp = {
      roleId: this.employeeRole.roleId,
      isManagerial: this.employeeRole.isManagerial,
      roleStartDate: this.employeeRole.roleStartDate,
    }
    this.roleEditForm.patchValue(RoleEmp);
    () => {
      console.log("ops! patchValue(RoleEmployee) didn't work")
    }
  }

  onSubmit() {
    if (this.roleEditForm.valid) {
      var role: Employee_Role = this.roleEditForm.value;
      this.employeeRole.roleId = role.roleId;
      this.employeeRole.isManagerial = role.isManagerial;
      this.employeeRole.roleStartDate = role.roleStartDate;

      console.log(role)
      this._employeeRoleService.updateEmployeeRole(this.employeeRole.id, this.employeeRole).subscribe(() => {
        console.log(role)
        this.dialogRef.close(true);
      })
    }
  }

  onCancel() {
    this.dialogRef.close(false);
  }

}



