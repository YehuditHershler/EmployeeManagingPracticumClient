import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import path from 'path';

export const routes: Routes = [
    { path: '', redirectTo: "employee/employee-table", pathMatch: "full" },
    { path: "employee", loadChildren: () => import("./employee/employee.module").then(m => m.EmployeeModule) },
    { path: "**", redirectTo: "employee/employee-table", pathMatch: "full" }
];
