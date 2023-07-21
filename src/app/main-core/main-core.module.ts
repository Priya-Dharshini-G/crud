import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { EmployeeTableComponent } from './components/employee-table/employee-table.component';
import { RoleTableComponent } from './components/role-table/role-table.component';
import { DesignationTableComponent } from './components/designation-table/designation-table.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { RegistrationComponent } from './components/registration/registration.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EventComponent } from './components/event/event.component';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { GeneralInfoComponent } from './components/general-info/general-info.component';
import { GraphComponent } from './components/graph/graph.component';
import { TableComponent } from './components/table/table.component';



@NgModule({
  declarations: [
    SignInComponent,
    EmployeeTableComponent,
    RoleTableComponent,
    DesignationTableComponent,
    NavigationBarComponent,
    RegistrationComponent,
    DashboardComponent,
    EventComponent,
    GeneralInfoComponent,
    GraphComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    CanvasJSAngularChartsModule,
  ]
})
export class MainCoreModule { }
