import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { EmployeeService } from 'src/app/shared/services/employee.service';

@Component({
  selector: 'app-employee-table',
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.scss']
})
export class EmployeeTableComponent {
  paginator: any;
  constructor(private employeeService: EmployeeService, private router: Router, private activeRoute: ActivatedRoute,
    private dialogService: DialogService,private authservice:AuthService) { }
  elementData: any = [];
  columns: any = [
    { columnDef: 'Employee_Identification_Code', header: 'Employee_Code', type: 'Text', sort: true },
    { columnDef: 'firstname', header: 'FirstName', type: 'Text', sort: true },
    { columnDef: 'lastname', header: 'LastName', type: 'Text', sort: true },
    { columnDef: 'email', header: 'Email', type: 'text', sort: false },
    { columnDef: 'rolename', header: 'Role', type: 'Number', sort: false },
    { columnDef: 'departmentname', header: 'Department', type: 'Number', sort: false },
    { columnDef: 'action', header: 'Action', type: 'Number', sort: false },
  ];
  actionArray: any = [
    { name: 'edit', funcName: "this.editEmployee()" },
    { name: 'delete', funcName: "this.deleteEmployee()" }
  ];
  displayedColumn: string[] = ['Employee_Identification_Code','firstname', 'lastname', 'email', 'rolename', 'departmentname', 'action']
  datasource: any;
  roles!: any;
  departments!: any;
  designation: any;
  ngOnInit() {
    this.getEmployees();
   
  }
  getEmployees() {
    this.employeeService.getEmployee().subscribe((res: any) => {
      this.elementData = res.employee;
      console.log('this.elementData', res.employees);
      for (let i = 0; i < this.elementData.length; i++) {
        this.roles = this.elementData[i].role.name;
        this.elementData[i].rolename = this.roles;
        this.departments = this.elementData[i].department.name;
        this.elementData[i].departmentname = this.departments;
      }
    });
  }
  onRegister() {
    this.router.navigate(['app/register']);
  }
  editEmployee(event: any) {
    this.router.navigate(["app/register", event.clickFun, event.element.id]);
  }
  deleteEmployee(event: any) {
    const dialogRef = this.dialogService.openConfirmationDialog("Are you sure you want to delete the data");
    dialogRef.afterClosed().subscribe((res: any) => {
      if (res) {
        this.employeeService.getDestroy('getDestroy', event.element).subscribe((res: any) => {
          if (res) {
            this.getEmployees();
          }
        })
      }
    })
  }
  onClick(event: any) {
    if (event.clickFun === 'edit') {
      this.editEmployee(event);
    }
    else if (event.clickFun === 'delete') {
      this.deleteEmployee(event);
    }
  }
}
