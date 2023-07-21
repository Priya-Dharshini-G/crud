import { Component, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ChangePasswordService } from 'src/app/services/change-password.service';
import { EmployeeService } from 'src/app/shared/services/employee.service';
@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent {
  showFiller = false;
  profileImg!:any;
  userData:any;
  changepwdblock=false;
  message:any;
  changepasswordForm!:FormGroup;
  constructor(private modalService: NgbModal,private offcanvasService:NgbOffcanvas,private authservice:AuthService,
    private changePasswrdservice:ChangePasswordService,private Employeeservice:EmployeeService){}
  @ViewChild('profile') profile!:TemplateRef<any>;
  @ViewChild('passwordtemp') passwordtemp!:TemplateRef<any>;
  ngOnInit(){
    this.authservice.messages.subscribe((res:any)=>{
       this.message = res;
    });
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser')|| ' ');
    console.log(currentUser);
    this.profileImg = currentUser.user.profile.UserImage;
    this.userData=currentUser.user;
    this.changepasswordForm = new FormGroup({
    newPassword:new FormControl(null,Validators.required),
    password:new FormControl(null,Validators.required)
   },this.changePasswrdservice.validation.bind(this));
  }
  forgetpasswrd(){
    this.modalService.open(this.passwordtemp);
  }
  openEnd(content: TemplateRef<any>) {
		this.offcanvasService.open(content, { position: 'end'});
	}
  onShow(){
   this.changepwdblock=!this.changepwdblock;
  }
  onChangePasswrd(){
    this.Employeeservice.changePassword('changePasswrd',{id:this.userData.id,value:this.changepasswordForm.value}).subscribe((res:any)=>{
    console.log(res.changePasswrd);
    });
    this.changepasswordForm.reset();
    this.changepasswordForm.clearValidators();
    }
}
