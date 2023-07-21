import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInComponent } from './sign-in.component';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from 'src/app/services/auth.service';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { Router } from '@angular/router';
let res:any;
class MockAuthService{
  messages = new BehaviorSubject<any>(null);
  signIn() {
    if (res) {
      return of(
        {
          token: 'fghjkl345678dfghjsnxjsnxkjnxkjxnksjnxjsxacxgfVX',
          refreshToken: 'UJBUDhcnzi8tSMACfsXJhvnTLqF',
          user: { id: 1 }
        }
      );
    }
    else {
      return throwError({ error: { error: 'test' } });
    }
  }
}
class MockRouter{
  navigate(url:string){
    return url;
  }
}
describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignInComponent ],
      providers:[{provide:AuthService,useClass:MockAuthService},
      {provide:Router,useClass:MockRouter}],
      imports:
      [HttpClientModule,
      MatFormFieldModule,
      FormsModule,
      ReactiveFormsModule,
      MatInputModule,
      BrowserAnimationsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call on onLog',()=>{
    component.LoginForm = new FormGroup({
      email:new FormControl('priya@gmail.com'),
      password:new FormControl('priya')
    });
    res=true;
    component.onLog();
    expect(component.onLog).toBeDefined();
  });
  it('should call on onlog error',()=>{
    component.LoginForm = new FormGroup({
      email:new FormControl('priya@gmail.com'),
      password:new FormControl('priya')
    });
    res=false;
    component.onLog();
    expect(component.onLog).toBeDefined();
  });
});
