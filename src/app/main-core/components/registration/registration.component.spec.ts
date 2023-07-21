import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationComponent } from './registration.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EmployeeService } from 'src/app/shared/services/employee.service';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
let test:any;
class MockMatDialog {

}
class MockEmployeeService {
  getEmployees() {
    return of({
      employees: [{}]
    })
  }
  getDepartment() {
    return of({
      department: [{}]
    })
  }
  getRole() {
    return of({
      passport: [{}]
    })
  }
  updateEmployee() {
    return of({})
  }
  createEmployee() {
    return of({})
  }
}
class MockRouter {
  navigate(url: string) {
    return url;
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

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistrationComponent],
      providers: [
        {
          provide: ActivatedRoute, useValue: {
            params: of(test ? {
              id: 1, data: {
                id: 1
              }
            } : {})
          }
        },
        { provide: MatDialog, useClass: MockMatDialog },
        { provide: EmployeeService, useClass: MockEmployeeService },
        { provide: Router, useClass: MockRouter },
        { provide: DialogService, useClass: MockDialogService }
      ],
      imports: [
        HttpClientModule,
        MatFormFieldModule,
        MatSelectModule,
        FormsModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatInputModule,
        BrowserAnimationsModule
      ]
    })
      .compileComponents();
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call on ngOnInit', () => {
     test=true;
     component.ngOnInit();
     expect(component.ngOnInit).toBeDefined();
  });
  it('should call on OnSubmit', () => {
    component.employeeDetails = new FormGroup({
      firstname: new FormControl('Priya'),
      lastname: new FormControl('Dharshuu'),
      email: new FormControl('priya@gmail.com'),
      departmentId: new FormControl(1),
      roleId: new FormControl(2),
      dob: new FormControl('2023-03-02'),
      password: new FormControl('Priya')
    });
    component.update = false;
    component.OnSubmit();
    expect(component.OnSubmit).toBeDefined();
  })
  it('should call on onSubmit', () => {
    component.employeeDetails = new FormGroup({
      firstname: new FormControl('Priya'),
      lastname: new FormControl('Dharshuu'),
      email: new FormControl('priya@gmail.com'),
      departmentId: new FormControl(1),
      roleId: new FormControl(2),
      dob: new FormControl('2023-03-02'),
      password: new FormControl('Priya')
    });
    component.OnSubmit();
    expect(component.OnSubmit).toBeDefined();
  });
  it('should call on onExit', () => {
    component.employeeDetails.markAsDirty()
    component.onExit();
    component.employeeDetails = new FormGroup({
      firstname: new FormControl(null),
      lastname: new FormControl(null),
      email: new FormControl(null),
      departmentId: new FormControl(null),
      roleId: new FormControl(null),
      dob: new FormControl(null),
      password: new FormControl(null)
    });
    component.employeeDetails.patchValue({
      firstname: "Dharsuu"
    });
    component.onExit();
    expect(component.onExit).toBeDefined();
  });
});
