import { Component, TemplateRef } from '@angular/core';
import { inject } from '@angular/core/testing';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { EmployeeService } from 'src/app/shared/services/employee.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent {
  constructor(private employeeService: EmployeeService, private dialog: MatDialog, private dialogService: DialogService,
    private authservice:AuthService,private offcanvasService:NgbOffcanvas) { }
  eventform!:FormGroup;
  elementData = [];
  msg:any;
  columns: any = [
    { columnDef: 'id', header: 'Id', type: 'Text', sort: true },
    { columnDef: 'Event_name', header: 'Name', type: 'Text', sort: true },
    { columnDef: 'Event_date', header: 'Date', type: 'Text', sort: true },
  ];
  displayedColumn: string[] = ['id', 'Event_name','Event_date'];
 ngOnInit(){
  this.authservice.messages.subscribe((res:any)=>{
        this.msg=res;
  })
   this.eventform=new FormGroup({
    Event_name:new FormControl(null,Validators.required),
    Event_date:new FormControl(null,Validators.required),
    description:new FormControl(null,Validators.required)
   });
   this.getEvents();
 }
 getEvents(){
  this.employeeService.getEvents().subscribe((res:any)=>{
    this.elementData = res.events;
    });
 }
 openEnd(content: TemplateRef<any>) {
  const dialogRef=this.dialog.open(content,{});
  dialogRef.afterClosed().subscribe((res:any)=>{
    if(res){
     this.employeeService.createEvents('createEvents',this.eventform.value).subscribe((res:any)=>{
     this.getEvents();
     });
    }
  });
}
}
