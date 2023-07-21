import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EmployeeService } from 'src/app/shared/services/employee.service';
import { HttpRoutingService } from 'src/app/shared/services/http-routing.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  constructor(private employeeService: EmployeeService) { }

  //xaxis and yaxis values -matcard1
  Salarylabels!: any[];
  Salarydatas!: any[];
  SalarylabelDef!: any;
  canvaId1 = "canvas1"

  //xaxis and yaxis values-matcard2
  Deptlabels!: any[];
  Deptdatas!: any[];
  DeptlabelDef!: any;
  canvaId2 = "canvas2"

  //xaxis and yaxis values-matcard3
  Rolelabels!: any[];
  Roledatas!: any[];
  RolelabelDef!: any;
  canvaId3 = "canvas3"

  //xaxis and yaxis values-matcard3
  Emplabels!: any[];
  Empdatas!: any[];
  EmplabelDef!: any;
  canvaId4 = "canvas4"

  chartChoice = [{ value: "pie", Label: "Pie" }, { value: "bar", Label: "Bar" }, { value: "line", Label: "Line" }, { value: "doughnut", Label: "doughnut" }];
  countChoice = [{ value: 'role', Label: 'Role' }, { value: 'department', Label: 'Department' }]
  employeesCount: any;
  rolesCount: any;
  DepartmentsCount: any;
  name!: string;
  selectArray = [{ value: 1, label: "Roles", funcname: "getRoles" }, { value: 2, label: "Departments", funcname: "getdept" }, { value: 3, label: "Salary", funcname: "getSalary" }];
  userOptionForm!: FormGroup;
  userSpecificForm!: FormGroup;
  salarySpecificForm!: FormGroup;
  startAmount: any;
  endAmount: any;
  specificArray: any = [];
  userOptionValue = 0;
  userData: any = [];
  elementData: any = [];
  columns: any = [];
  displayedColumn: string[] = []
  events: any = [];
  employeeArr: any = [];
  chart_type = 'pie';
  data = 'role'
  ngOnInit() {
    this.userOptionForm = new FormGroup({
      userOption: new FormControl(null)
    });
    this.userSpecificForm = new FormGroup({
      userSpecificOption: new FormControl(null)
    });
    this.salarySpecificForm = new FormGroup({
      startAmount: new FormControl(null),
      EndAmount: new FormControl(null)
    });
    this.employeeService.getEmployeesCount().subscribe((res: any) => {
      this.employeesCount = res.employeeCount[0].employeesCount;
    });
    this.employeeService.getRolesCount().subscribe((res: any) => {
      this.rolesCount = res.roleCount[0].RolesCount;
    });
    this.employeeService.getDeptCount().subscribe((res: any) => {
      this.DepartmentsCount = res.departmentCount[0].deptsCount;
    });
    this.employeeService.getUpcomingEvents().subscribe((res: any) => {
      this.events = res.events;
      console.log(this.events);
    });
    this.getEmployeesSalary();
    this.getEmployeesDept();
    this.getEmployeesRoles();
    this.getEmpYrCount();
  }

  getRoles() {
    this.elementData = [];
    this.columns = [
      { columnDef: 'employeeName', header: 'Name', type: 'Text', sort: true },
      { columnDef: 'name', header: 'Role', type: 'Text', sort: true }
    ];
    this.displayedColumn = ['employeeName', 'name']
    this.employeeService.getAllEmployeesRole().subscribe((res: any) => {
      this.userData = res.getAllEmployeesRole;
      this.specificArray = res.getAllEmployeesRole;
      console.log(this.specificArray);
      console.log(this.userData);
      for (let i = 0; i < this.userData.length; i++) {
        if (this.userData[i].employees.length > 0) {
          for (let j = 0; j < this.userData[i].employees.length; j++) {
            this.name = this.userData[i].employees[j].firstname + ' ' + this.userData[i].employees[j].lastname;
            this.userData[i].employeeName = this.name;
            this.elementData.push(this.userData[i]);
          }
        }
      }
    });
  }
  getdept() {
    this.elementData = [];
    this.columns = [
      { columnDef: 'employeeName', header: 'Name', type: 'Text', sort: true },
      { columnDef: 'name', header: 'Department', type: 'Text', sort: true }
    ];
    this.displayedColumn = ['employeeName', 'name'];
    this.employeeService.getAllEmployeesDept().subscribe((res: any) => {
      this.userData = res.getAllEmployeesDept;
      this.specificArray = res.getAllEmployeesDept;
      console.log(this.userData);
      for (let i = 0; i < this.userData.length; i++) {
        if (this.userData[i].employees.length > 0) {
          for (let j = 0; j < this.userData[i].employees.length; j++) {
            this.name = this.userData[i].employees[j].firstname + ' ' + this.userData[i].employees[j].lastname;
            this.userData[i].employeeName = this.name;
            this.elementData.push(this.userData[i]);
          }
        }
      }
    });
  }
  getSalary() {
    this.elementData = [];
    this.columns = [
      { columnDef: 'employeeName', header: 'Name', type: 'Text', sort: true },
      { columnDef: 'salary', header: 'Salary', type: 'Text', sort: true }
    ];
    this.specificArray = [{ value: 10000 }, { value: 20000 }, { value: 30000 }, { value: 40000 }, { value: 50000 }, { value: 60000 }, { value: 70000 }, { value: 80000 }, { value: 'Null' }];
    this.displayedColumn = ['employeeName', 'salary'];
    this.employeeService.getAllEmployeesSalary().subscribe((res: any) => {
      this.elementData = res.getAllEmployeesSalary;
      for (let i = 0; i < this.elementData.length; i++) {
        this.name = this.elementData[i].firstname + ' ' + this.elementData[i].lastname;
        this.elementData[i].employeeName = this.name;
      }
    });
  }

  getSpecificRole(value: any) {
    this.columns = [
      { columnDef: 'employeeName', header: 'Name', type: 'Text', sort: true },
      { columnDef: 'rolename', header: 'Role', type: 'Text', sort: true }
    ];
    this.displayedColumn = ['employeeName', 'rolename'];
    this.employeeService.getSpecificRoles('getSpecificRoles', { name: value }).subscribe((res: any) => {
      this.elementData = res.getSpecificRole;
      for (let i = 0; i < this.elementData.length; i++) {
        const rolename = this.elementData[i].role.name
        this.name = this.elementData[i].firstname + ' ' + this.elementData[i].lastname;
        this.elementData[i].employeeName = this.name;
        this.elementData[i].rolename = rolename;
      }
    });
  }

  getSpecificDept(value: any) {
    this.columns = [
      { columnDef: 'employeeName', header: 'Name', type: 'Text', sort: true },
      { columnDef: 'deptname', header: 'Department', type: 'Text', sort: true }
    ];
    this.displayedColumn = ['employeeName', 'deptname']
    this.employeeService.getSpecificDept('getSpecificDept', { name: value }).subscribe((res: any) => {
      this.elementData = res.getSpecificDept;
      for (let i = 0; i < this.elementData.length; i++) {
        const departmentName = this.elementData[i].department.name
        this.name = this.elementData[i].firstname + ' ' + this.elementData[i].lastname;
        this.elementData[i].employeeName = this.name;
        this.elementData[i].deptname = departmentName;
      }
    });
  }

  getSpecificSalary(data: any) {
    this.elementData = [];
    this.columns = [
      { columnDef: 'employeeName', header: 'Name', type: 'Text', sort: true },
      { columnDef: 'salary', header: 'Salary', type: 'Text', sort: true }
    ];
    this.displayedColumn = ['employeeName', 'salary'];
    this.employeeService.getSpecificSalary('getSpecificSalary', data).subscribe((res: any) => {
      this.elementData = res.getSpecificSalary;
      for (let i = 0; i < this.elementData.length; i++) {
        this.name = this.elementData[i].firstname + ' ' + this.elementData[i].lastname;
        this.elementData[i].employeeName = this.name;
      }
    });
  }

  getEmployeesSalary() {
    console.log('getEmployeesSalary');
    this.SalarylabelDef = { label: "Role", text: 'Salary for Each Role' };
    this.employeeService.getEmployeesSalary().subscribe((res: any) => {
      const result = res.getEmployeesSalary;
      this.Salarydatas = result.map((salaries: any) => salaries.salary);
      this.Salarylabels = result.map((rolename: any) => rolename.role.name);
    });
  }

  getEmployeesDept() {
    this.DeptlabelDef = { label: "Employees Count", text: 'Employees Count in each Department' };
    this.employeeService.getEmployeesDept().subscribe((res: any) => {
      const result = res.getEmployeesDept;
      this.Deptdatas = result.map((value: any) => value.EmployeesCount);
      this.Deptlabels = result.map((value: any) => value.department.name);
    });
  }


  getEmployeesRoles() {
    this.RolelabelDef = { label: "Employees Count", text: 'Employees Count in each Roles' };
    this.employeeService.getEmployeesRoles().subscribe((res: any) => {
      const result = res.getEmployeesRoles;
      this.Roledatas = result.map((value: any) => value.EmployeesCount);
      this.Rolelabels = result.map((value: any) => value.role.name);
    });
  }


  getEmpYrCount(){
    this.EmplabelDef = { label: "Employees Count", text: 'Employees Count in each year' };
    this.employeeService.getEmpYrCount().subscribe((res: any) => { 
      const result = res.getEmpYrCount;
      this.Empdatas = result.map((value: any) => value.count);
      this.Emplabels = result.map((value: any) => value.Year);
    });
  }

  userSelectOption(event: any) {
    this.userOptionValue = event.value;
    if (this.userOptionValue === 1) return this.getRoles();
    else if (this.userOptionValue === 2) return this.getdept();
    else if (this.userOptionValue === 3) return this.getSalary();
  }

  userSpecificOption(event: any) {
    console.log(event.value);
    if (this.userOptionValue === 1) return this.getSpecificRole(event.value)
    else if (this.userOptionValue === 2) return this.getSpecificDept(event.value)
  }

  startSalaryAmount(event: any) {
    this.startAmount = event.value;
    console.log(this.startAmount);
  }

  endSalaryAmount(event: any) {
    this.endAmount = event.value;
    console.log(this.endAmount);
  }

  onGetRangeValues() {
    console.log(this.salarySpecificForm.value);
    this.getSpecificSalary(this.salarySpecificForm.value)
  }

  // onSelectChart(event: any) {
  //   this.chart_type = event.value;
  //   this.getEmployeesSalary(this.chart_type);
  // }

  // onSelectCount(event: any) {
  //   this.data = event.value;
  //   this.getEmployeesDept(this.data);
  // }
}
