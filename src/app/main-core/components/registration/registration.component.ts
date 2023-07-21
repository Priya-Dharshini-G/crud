import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { EmployeeService } from 'src/app/shared/services/employee.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  constructor(private employeeService: EmployeeService, private auth: AuthService, private activeRoutes: ActivatedRoute,
    private router:Router,private dialogService:DialogService) { }
  employeeDetails!: FormGroup;
  department: any;
  role: any;
  msg: any;
  paramData = { id: 0, data: '' };
  update = false;
  employeeData: any;
  ngOnInit() {
    this.activeRoutes.params.subscribe((res: any) => {
      console.log(res);
      if (res && res.id && res.data) {
        this.paramData.id = +res.id;//d
        this.paramData.data = res.data;
        this.update = true;
      }
      if (this.paramData.id) {
        this.employeeService.getEmployees('getEmployees', { id: this.paramData.id }).subscribe((res: any) => {
          this.employeeData = res.employees;
          this.formInitialize();
        });
      }
      else {
        this.formInitialize();
      }
    });

    this.employeeService.getDepartment().subscribe((res: any) => { this.department = res.department });
    this.employeeService.getRole().subscribe((res: any) => { this.role = res.passport });

    this.auth.messages.subscribe((res: any) => {
      this.msg = res;
    })
  }
  formInitialize() {
    this.employeeDetails = new FormGroup({
      firstname: new FormControl(this.employeeData && this.employeeData.firstname ? this.employeeData.firstname : null, [Validators.required, Validators.pattern('^[a-zA-Z]+$')]),
      lastname: new FormControl(this.employeeData && this.employeeData.lastname ? this.employeeData.lastname : null, [Validators.required, Validators.pattern('^[a-zA-Z]+$')]),
      email: new FormControl(this.employeeData && this.employeeData.email ? this.employeeData.email : null, Validators.required),
      departmentId: new FormControl(this.employeeData && this.employeeData.departmentId ? this.employeeData.departmentId : null, Validators.required),
      roleId: new FormControl(this.employeeData && this.employeeData.roleId ? this.employeeData.roleId : null, Validators.required),
      dob:new FormControl(this.employeeData && this.employeeData.dob ? this.employeeData.dob : null, Validators.required),
      salary:new FormControl(this.employeeData && this.employeeData.salary ? this.employeeData.salary : null,Validators.required),
      Employee_Identification_Code:new FormControl(this.employeeData && this.employeeData.Employee_Identification_Code ? this.employeeData.Employee_Identification_Code : null , Validators.required),
      hire_date:new FormControl(this.employeeData && this.employeeData.hire_date ? this.employeeData.hire_date : null , Validators.required),
      password: new FormControl(null)
    });
  }
  OnSubmit() {
    if (this.employeeDetails?.valid) {
      if (!this.update) {
        this.employeeService.createEmployee('createEmployee', this.employeeDetails.value).subscribe((res: any) => {
          if (res) {
            this.employeeDetails.reset();
          }
        })
      }
     else{
      this.employeeDetails.value.id = this.paramData.id;
      this.employeeService.updateEmployee('updateEmployee',this.employeeDetails.value).subscribe((res:any)=>{
        if(res){
          this.router.navigate(['app/emptable']);
        }
      })
     }
    }
  }
  onExit(){
    if(this.employeeDetails.dirty === true){
      console.log(this.employeeDetails.dirty);
      const dialogRef = this.dialogService.openConfirmationDialog("Are you sure you want to leave this page");
      dialogRef.afterClosed().subscribe((res:any)=>{
        if(res){
          this.router.navigate(['app/emptable']);
        }
      });
    }else{
      this.router.navigate(['app/emptable']);
    }
  }
}
