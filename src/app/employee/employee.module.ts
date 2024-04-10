import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule, MatSlideToggle } from '@angular/material/slide-toggle';
import { CommonModule, NgFor } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatRadioModule } from '@angular/material/radio';
import { FileSaverService } from 'ngx-filesaver';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeTableComponent } from './employee-table/employee-table.component';
import { EmployeeDialoAddComponent } from './employee-dialo-add/employee-dialo-add.component';
import { EmployeeDialogEditComponent } from './employee-dialog-edit/employee-dialog-edit.component';
import { RoleAddDialogComponent } from './role-add-dialog/role-add-dialog.component';
import { RoleEditDialogComponent } from './role-edit-dialog/role-edit-dialog.component';
import { EmployeeService } from './services/employee.service';
import { FilterByStatusPipe } from './filter-by-status.pipe';

@NgModule({
  // declarations: [],
  declarations: [EmployeeTableComponent, EmployeeDialoAddComponent, EmployeeDialogEditComponent, RoleAddDialogComponent, RoleEditDialogComponent],
  imports: [CommonModule, 
    FilterByStatusPipe, 
    FormsModule, NgFor, 
    ReactiveFormsModule,
    EmployeeRoutingModule,
    MatSlideToggleModule,
    MatSlideToggle,
    MatDialogModule,
    MatFormFieldModule,
    MatRadioModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatSelectModule,
    MatTableModule,
    MatNativeDateModule,],
  providers: [EmployeeService],
})
export class EmployeeModule { }
