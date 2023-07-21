import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { EmployeeService } from 'src/app/shared/services/employee.service';

@Component({
  selector: 'app-designation-table',
  templateUrl: './designation-table.component.html',
  styleUrls: ['./designation-table.component.scss']
})
export class DesignationTableComponent {
  editform!: FormGroup;
  constructor(private employeeService: EmployeeService, private dialog: MatDialog, private dialogService: DialogService) { }
  @ViewChild('depttemplate') depttemp!: TemplateRef<any>;
  @ViewChild('edittemplate') edittemp!: TemplateRef<any>;
  elementData = [];
  columns: any = [
    { columnDef: 'id', header: 'Id', type: 'Text', sort: true },
    { columnDef: 'name', header: 'Name', type: 'Text', sort: true },
    { columnDef: 'action', header: 'Action', type: 'Number', sort: false },
  ];
  actionArray: any = [{name:'edit'}, {name:'delete'}];
  displayedColumn: string[] = ['id', 'name', 'action']
  datasource: any;
  deptData: any;
  ngOnInit() {
    this.formInitialize();
  }
  formInitialize() {
    this.employeeService.getDepartment().subscribe((res: any) => {
      this.elementData = res.department;
      console.log(this.elementData);
    });
    this.editform = new FormGroup({
      name: new FormControl(null, Validators.required)
    });
  }
  addDept() {
    const editRef = this.dialog.open(this.depttemp, {
      autoFocus: false
    });
    editRef.afterClosed().subscribe((res: any) => {
      if (res) {
        this.employeeService.createDepartment('createDepartment', this.editform.value).subscribe((res: any) => {
          this.elementData = res.department;
          console.log(this.elementData);
          this.formInitialize();
        });
      }
    })
  }
  editdepartment(event:any){
    let id=event.element.id;
    this.editform.setValue({name:event.element.name});
    const editref = this.dialog.open(this.edittemp, {
      autoFocus: false
    });
    editref.afterClosed().subscribe((res: any) => {
      if(res){
        this.employeeService.updateDepartment('updateDepartment',{id:id,data:this.editform.value}).subscribe((res:any)=>{
          console.log("update",res);
          this.elementData = res.department;
          this.formInitialize();
        })
      }
    })
  }
  deletedepartment(event:any){
    const dialogRef = this.dialogService.openConfirmationDialog("Are sure you want to delete the data");
    dialogRef.afterClosed().subscribe((res: any) => {
      this.employeeService.getDestroy('deleteDept',{id:event.element.id}).subscribe((res:any)=>{
           if(res && res.deletedept){
            this.formInitialize();
           }
      });
    }); 
  }
  onEmit(event: any) {
    if (event.clickFun === 'edit') {
      this.editdepartment(event);
    }
    else if (event.clickFun === 'delete') {
       this.deletedepartment(event);
    }
  }
}
