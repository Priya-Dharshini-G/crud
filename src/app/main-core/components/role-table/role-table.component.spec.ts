import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleTableComponent } from './role-table.component';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeService } from 'src/app/shared/services/employee.service';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { of } from 'rxjs';
class MockEmployeeService{
  getRole(){
    return of({ 
      passport:{}
    })
  }
  createRole(){
    return of({})
  }
  updateRole(){
    return of({})
  }
  getDestroy(){
    return of({
      deleterole:{}
    })
  }
}
class MockDialogService{
  openConfirmationDialog(){
    return {
      afterClosed(){
        return of({})
      }
    }
  }
}
class MockMatDialog{
open(){
  return{
    afterClosed(){
      return of({})
    }
  }
}
}
describe('RoleTableComponent', () => {
  let component: RoleTableComponent;
  let fixture: ComponentFixture<RoleTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoleTableComponent ],
      providers:[{provide:EmployeeService,useClass:MockEmployeeService},
      {provide:DialogService,useClass:MockDialogService},
      {provide:MatDialog,useClass:MockMatDialog}],
      imports:[HttpClientModule,
      MatIconModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoleTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call on formInitialize',()=>{
    component.formInitialize();
    expect(component.formInitialize).toBeDefined();
  });

  it('should call on addRole',()=>{
    component.addRole();
    expect(component.addRole).toBeDefined();
  });

  it('should call on editRole',()=>{
    let data = <any>{element:{id:1,name:'admin'}};
    component.editRole(data);
    expect(component.editRole).toBeDefined();
  });

  it('should call on deleteRole',()=>{
    let data = <any>{element:{id:1,name:'admin'}};
    component.deleteRole(data);
    expect(component.deleteRole).toBeDefined();
  });

  it('should call on onEmit',()=>{
    let data = <any>{element:{id:1,name:'admin'},clickFun:'edit'};
    component.onEmit(data);
    expect(component.onEmit).toBeDefined();
  });
   
  
  it('should call on onEmit else',()=>{
    let data = <any>{element:{id:1,name:'admin'},clickFun:'delete'};
    component.onEmit(data);
    expect(component.onEmit).toBeDefined();
  });
});
