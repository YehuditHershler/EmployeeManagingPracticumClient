// employee-routing.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeTableComponent } from './employee-table/employee-table.component';
import { RouterModule, Routes } from '@angular/router';
import { Router } from 'express';

import { FilterByStatusPipe } from './filter-by-status.pipe';
import { EmployeeDialoAddComponent } from './employee-dialo-add/employee-dialo-add.component';
import { EmployeeDialogEditComponent } from './employee-dialog-edit/employee-dialog-edit.component';

const USER_ROUTES:Routes=[
  {path:"employee-table", component:EmployeeTableComponent},
  ]


@NgModule({    
  imports: [RouterModule.forChild(USER_ROUTES)],
  exports:[RouterModule]
})
export class EmployeeRoutingModule { }
