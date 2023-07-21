import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { EmployeeService } from 'src/app/shared/services/employee.service';

@Component({
  selector: 'app-role-table',
  templateUrl: './role-table.component.html',
  styleUrls: ['./role-table.component.scss']
})
export class RoleTableComponent {
  constructor(private employeeService:EmployeeService,private dialog:MatDialog,private dialogService:DialogService){}
  @ViewChild('roletemplate') roletemp!:TemplateRef<any>;
  @ViewChild('edittemplate') edittemp!:TemplateRef<any>;
  elementData = [];
  editform!:FormGroup;
  columns: any = [
    { columnDef: 'id', header: 'Id', type: 'Text', sort: true },
    { columnDef: 'name', header: 'Name', type: 'Text', sort: true },
    { columnDef: 'action', header: 'Action', type: 'Number', sort: false },
  ];
  actionArray: any = [{name:'edit'}, {name:'delete'}];
  displayedColumn: string[] = ['id', 'name','action']
  datasource: any;
  displayBox:any;
  roleData:any;
  ngOnInit() {
    this.formInitialize();
  }
  formInitialize(){
    this.employeeService.getRole().subscribe((res: any) => {
      this.elementData = res.passport;
      console.log(this.elementData);
    });
    this.editform=new FormGroup({
      name:new FormControl(null)
    });
  }
  addRole(){
    const editRef = this.dialog.open(this.roletemp,{
      autoFocus:false
    });
    editRef.afterClosed().subscribe((res:any)=>{
      if(res){
      this.employeeService.createRole('createRole',this.editform.value).subscribe((res:any)=>{
        this.elementData=res.passport;
        console.log(this.elementData);
        this.formInitialize();
      });
    }})
   }

   editRole(event:any){
    let id=event.element.id;
    this.editform.setValue({name:event.element.name});
     const editref =this.dialog.open(this.edittemp,{
      autoFocus:false
     });
     editref.afterClosed().subscribe((res:any)=>{
      if(res){
        console.log(res);
        this.employeeService.updateRole('updateRole',{id:id,data:this.editform.value}).subscribe((res:any)=>{
        
          this.elementData = res.role;
          this.formInitialize();
       });
         }
     });
   }
   deleteRole(event:any){
    const dialogRef = this.dialogService.openConfirmationDialog("Are sure you want to delete the data");
    dialogRef.afterClosed().subscribe((res:any)=>{
      this.employeeService.getDestroy('deleteRole',{id:event.element.id}).subscribe((res:any)=>{
        if(res && res.deleterole){
         this.formInitialize();
        }
      });
    })
   }
   onEmit(event:any){
     if(event.clickFun === 'edit'){
      this.editRole(event);
     }
     else if(event.clickFun === 'delete'){
     this.deleteRole(event);
     }
   }
}
