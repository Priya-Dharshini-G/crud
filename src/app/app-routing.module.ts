import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './main-core/components/sign-in/sign-in.component';
import { NavigationBarComponent } from './main-core/components/navigation-bar/navigation-bar.component';
import { EmployeeTableComponent } from './main-core/components/employee-table/employee-table.component';
import { RoleTableComponent } from './main-core/components/role-table/role-table.component';
import { DesignationTableComponent } from './main-core/components/designation-table/designation-table.component';
import { RegistrationComponent } from './main-core/components/registration/registration.component';
import { AuthGuard } from './guard/auth.guard';
import { DashboardComponent } from './main-core/components/dashboard/dashboard.component';
import { EventComponent } from './main-core/components/event/event.component';
import { GeneralInfoComponent } from './main-core/components/general-info/general-info.component';


const routes: Routes = [
{path:'',redirectTo:'/signIn',pathMatch:'full'},
{path:'signIn',component:SignInComponent},
{
  path:'app',component:NavigationBarComponent,canActivate:[AuthGuard],children:[
  {path:'dashboard',component:DashboardComponent},
  {path:'emptable',component:EmployeeTableComponent},
  {path:'roletable',component:RoleTableComponent},
  {path:'depttable',component:DesignationTableComponent},
  {path:'logout',component:SignInComponent},
  {path:'register',component:RegistrationComponent},
  {path:'register/:data/:id',component:RegistrationComponent},
  {path:'event',component:EventComponent},
  {path:'generalInfo',component:GeneralInfoComponent}
]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
