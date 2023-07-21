import { Injectable } from '@angular/core';
import { HttpRoutingService } from './http-routing.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private httpService:HttpRoutingService) { }
  getEmployee(){
    return this.httpService.getMethod('getEmployee');
  }
  getDepartment(){
    return this.httpService.getMethod('getDepartment');
  }
  getRole(){
    return this.httpService.getMethod('getRole');
  }
  createEmployee(url:string,data:any){
    return this.httpService.postMethod(url,data);
  }
  createRole(url:string,data:any){
    return this.httpService.postMethod(url,data);
  }
  createDepartment(url:string,data:any){
    return this.httpService.postMethod(url,data);
  }
 getEmployees(url:string,data:any){
    return this.httpService.postMethod(url,data);
 }
 updateEmployee(url:string,data:any){
  return this.httpService.postMethod(url,data);
 }
 updateRole(url:string,data:any){
  return this.httpService.postMethod(url,data);
 }
 updateDepartment(url:string,data:any){
  return this.httpService.postMethod(url,data);
 }
 getdepartments(url:string,data:any){
  return this.httpService.postMethod(url,data);
 }
 getRoles(url:string,data:any){
  return this.httpService.postMethod(url,data);
 }
 getDestroy(url:string,data:any){
  return this.httpService.postMethod(url,data);
 }
 getEmployeesCount(){
  return this.httpService.getMethod('getEmployeesCount');
 }
 getRolesCount(){
  return this.httpService.getMethod('getRolesCount');
 }
 getDeptCount(){
  return this,this.httpService.getMethod('getDeptCount');
 }
 getAllEmployeesRole(){
  return this.httpService.getMethod('getAllEmployeesRole');
 }
 getAllEmployeesDept(){
  return this.httpService.getMethod('getAllEmployeesDept');
 }
 getAllEmployeesSalary(){
  return this.httpService.getMethod('getAllEmployeesSalary');
 }
 getSpecificRoles(url:string,data:any){
     return this.httpService.postMethod(url,data);
 }
 getSpecificDept(url:string,data:any){
  return this.httpService.postMethod(url,data);
}
getSpecificSalary(url:string,data:any){
  return this.httpService.postMethod(url,data);
}
getEvents(){
  return this.httpService.getMethod('getEvents');
}
createEvents(url:string,data:any){
  return this.httpService.postMethod(url,data);
}
getUpcomingEvents(){
  return this.httpService.getMethod('getUpcomingEvents');
}
changePassword(url:string,data:any){
  return this.httpService.postMethod(url,data);
}
getRolesByGroup(){
  return this.httpService.getMethod('getRolesByGroup');
}
getEmployeesSalary(){
  return this.httpService.getMethod('getEmployeesSalary');
}
getEmployeesDept(){
  return this.httpService.getMethod('getEmployeesDept');
}
getEmployeesRoles(){
  return this.httpService.getMethod('getEmployeesRoles');
}
getEmployeeDetails(){
  return this.httpService.getMethod('getEmployeeDetails');
}
getJobDetails(){
  return this.httpService.getMethod('getJobDetails');
}
getContactDetails(){
  return this.httpService.getMethod('getContacts');
}
getEmpYrCount(){
  return this.httpService.getMethod('getEmpYrCount');
}
}
