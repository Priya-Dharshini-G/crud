import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployeeTableComponent } from './employee-table.component';
import { EmployeeService } from 'src/app/shared/services/employee.service';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { DynamictableComponent } from 'src/app/shared/components/dynamictable/dynamictable.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
let res: any;
class MockEmployeeService {
  getEmployee() {
    return of({
      employee: [
        {
          role: { name: 'admin' },
          department: { name: 'testing' }
        }
      ]
    })
  }
  getDestroy() {
    return of({})
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
class MockRouter {
  navigate(url: string) {
    return url;
  }
}

describe('EmployeeTableComponent', () => {
  let component: EmployeeTableComponent;
  let fixture: ComponentFixture<EmployeeTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeTableComponent, DynamictableComponent],
      providers: [{ provide: EmployeeService, useClass: MockEmployeeService },
      { provide: DialogService, useClass: MockDialogService },
      { provide: Router, useClass: MockRouter },
      { provide: ActivatedRoute, useValue: { params: of({}) } }],
      imports: [MatIconModule, HttpClientModule,
        MatFormFieldModule,
        MatPaginatorModule,
        MatTableModule,
        MatInputModule,
        BrowserAnimationsModule]
    })
      .compileComponents();
    fixture = TestBed.createComponent(EmployeeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call on getEmployee', () => {
    res = true;
    component.elementData.rolename = 'admin';
    component.elementData.departmentname = 'testing';
    component.getEmployees();
    expect(component.getEmployees).toBeDefined();
  });
  it('should call on onRegister', () => {
    component.onRegister();
    expect(component.onRegister).toBeDefined();
  });
  it('should call on editEmployee', () => {
    let data = <any>{ element: { id: 2 } };
    component.editEmployee(data);
    expect(component.editEmployee).toBeDefined();
  });
  it('should call on deleteEmployee', () => {
    let data = <any>{ element: { id: 2 } };
    component.deleteEmployee(data);
    res = true;
    expect(component.deleteEmployee).toBeDefined();
  });
  it('should call on onClick', () => {
    let data = <any>{ element: { id: 2 }, clickFun: 'edit' };
    component.onClick(data);
    expect(component.onClick).toBeDefined();
  });
  it('should call on onClick else', () => {
    let data = <any>{ element: { id: 2 }, clickFun: 'delete' };
    component.onClick(data);
    expect(component.onClick).toBeDefined();
  });


});
