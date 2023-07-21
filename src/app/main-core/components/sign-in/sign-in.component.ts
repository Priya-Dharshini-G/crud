import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  err: any;
  errorMessage: any;
  constructor(private authService:AuthService,private router:Router){}
  LoginForm!:FormGroup;
  msg:any;
  profileData = new BehaviorSubject<any>(null);
  ngOnInit(){
    this.authService.messages.subscribe((res:any)=>{
      this.msg = res;
    })
    this.LoginForm=new FormGroup({
      email:new FormControl(null,Validators.required),
      password:new FormControl(null,Validators.required)
    })
  }
  onLog(){
     if(this.LoginForm.valid){
        this.authService.signIn(this.LoginForm.value).subscribe((res:any)=>{
          if(res){ 
            this.router.navigate(['app']);
          }
        }, err => {
          if (err.error && err.error.error) {
            this.errorMessage = err.error.error;
            this.err = true;
            alert(this.errorMessage);
          }})
      }
  }
}
