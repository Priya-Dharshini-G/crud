import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignationTableComponent } from './designation-table.component';
import { EmployeeService } from 'src/app/shared/services/employee.service';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { of, throwError } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
let res: any;
let response:any;

class MockEmployeeService {
 url:any=' ';
 data=<any>{};
  getDepartment() {
    return of({
      department: {}
    });
  }
  createDepartment(){
    return of({})
  }
  updateDepartment(){
    return of({});
  }
  getDestroy(){
    return of({
      deletedept:{ }
    })
  }
}
class MockDialogService {
  openConfirmationDialog() {
    return {
      afterClosed() {
        return of({})
      }
    }
  }
}
class MockDialog{
  open(){
    return {
      afterClosed(){
        return of({})
      }
    }
  }
}
describe('DesignationTableComponent', () => {
  let component: DesignationTableComponent;
  let fixture: ComponentFixture<DesignationTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DesignationTableComponent],
      providers: [
      { provide: EmployeeService, useClass: MockEmployeeService },
      { provide: DialogService, useClass: MockDialogService },
      { provide: MatDialog ,useClass:MockDialog}],
      imports: [MatDialogModule, 
        MatIconModule, 
        HttpClientModule,
        BrowserAnimationsModule,
      MatFormFieldModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DesignationTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call on ngOnInit',()=>{
   component.formInitialize();
   expect(component.ngOnInit).toBeDefined();
  });

  it('should call formInitialize', () => {
    component.editform = new FormGroup({
      name:new FormControl(null)
    });
    expect(component.formInitialize).toBeDefined();
  });

  it('should call on addDept',()=>{
    res=true;
    response=true;
    component.addDept();
    expect(component.addDept).toBeDefined();
  });
  it('should call on editDepartment',()=>{
    let data=<any>{element:{id:2,name:'Admin'}};
    component.editdepartment(data);
    component.editform.setValue({
      name:"Admin"
    });
    res=true;
    expect(component.editdepartment).toBeDefined();
  });

  it('should call on deleteDepartment',()=>{
    let data=<any>{element:{id:2,name:'Admin'}};
     component.deletedepartment(data);
     res=true;
     expect(component.deletedepartment).toBeDefined();
  });

  it('should call on onEmit',()=>{
     let data=<any>{element:{id:2,name:'Admin'},clickFun:'edit'};
     component.onEmit(data);
     let event = data.clickFun;
     component.onEmit(data);
     expect(component.onEmit).toBeDefined();
  });

  it('should call on onEmit else',()=>{
    let data=<any>{element:{id:2,name:'Admin'},clickFun:'delete'};
    component.onEmit(data);
    let event = data.clickFun;
    component.onEmit(data);
    expect(component.onEmit).toBeDefined();
  })
});
