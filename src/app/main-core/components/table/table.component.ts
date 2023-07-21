import { Component } from '@angular/core';
import { EmployeeService } from 'src/app/shared/services/employee.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  constructor(private employeeservice: EmployeeService) { }
  elementData: any = [];
  columns: any = [];
  displayedColumn: string[] = [];
  showTable = { DivOneValue: true , DivTwoValue: false , DivThreeValue: false} ;
  ngOnInit(){
    this.getEmployeeDetails();
  }
  getEmployeeDetails() {
    this.elementData = [];
    this.columns = [
      { columnDef: 'Employee_Identification_Code', header: 'Employee_Identification_Code', type: 'Text', sort: true },
      { columnDef: 'Employment_Type', header: 'Employment_Type', type: 'Text', sort: true },
      { columnDef: 'Employment_Status', header: 'Employment_Status', type: 'Text', sort: true },
      { columnDef: 'Date_of_Joining', header: 'Date_of_Joining', type: 'Text', sort: true }
    ];
    this.displayedColumn = ['Employee_Identification_Code', 'Employment_Type', 'Employment_Status', 'Date_of_Joining']
    this.employeeservice.getEmployeeDetails().subscribe((res: any) => {
      this.elementData = res.getEmployeeDetails;
    });
  }
  getJobDetails() {
    this.elementData = [];
    this.columns = [
      { columnDef: 'Job_description', header: 'Job_description', type: 'Text', sort: true },
      { columnDef: 'Skills_and_expertise', header: 'Skills_and_expertise', type: 'Text', sort: true },
      { columnDef: 'Current_Projects', header: 'Current_Projects', type: 'Text', sort: true },
      { columnDef: 'Location', header: 'Location', type: 'Text', sort: true }
    ];
    this.displayedColumn = ['Job_description', 'Skills_and_expertise', 'Current_Projects', 'Location']
    this.employeeservice.getJobDetails().subscribe((res: any) => {
      this.elementData = res.getJobDetails;
      console.log(this.elementData);
    });
  }
  getContactDetails() {
    this.elementData = [];
    this.columns = [
      { columnDef: 'Contact_number', header: 'Contact_number', type: 'Text', sort: true },
      { columnDef: 'Address', header: 'Address', type: 'Text', sort: true },
      { columnDef: 'EmergencyContactNo', header: 'EmergencyContactNo', type: 'Text', sort: true },
    ];
    this.displayedColumn = ['Contact_number', 'Address', 'EmergencyContactNo']
    this.employeeservice.getContactDetails().subscribe((res: any) => {
      this.elementData = res.getContacts;
      console.log(this.elementData);
    });
  }
}
