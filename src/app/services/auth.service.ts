import { Injectable } from '@angular/core';
import { HttpRoutingService } from '../shared/services/http-routing.service';
import { BehaviorSubject, catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  messages = new BehaviorSubject<any>(null);
  profileData = new BehaviorSubject<any>(null);
  user =new BehaviorSubject<any>(null);
  constructor(private httpService:HttpRoutingService) { }
  getJson(){
    this.httpService.getJson().subscribe((res:any)=>{
      this.messages.next(res);
    })
  }
   signIn(data:any){
    return this.httpService.postMethod('login',data).pipe(map((res:any)=>{
      if(res && res["token"] && res["user"]){
        sessionStorage.setItem('currentUser',JSON.stringify({token:res["token"],refreshToken:res["refreshToken"],user:res["user"]}));
        let profilePath=res.user.profile.UserImage;
        this.profileData.next(profilePath);
        this.user.next(res.user);
      }
      return res;
    }),catchError(err => {
      return err;
    }))
  }
  isAuthenticate(){
    let token;
    let data=sessionStorage.getItem('currentUser');
    // console.log(data);
    if(data){
      const currentUser = JSON.parse(data);
      if(currentUser){
      token=currentUser.token;
      return token?token:null;
      }
      else{
        return false;
      }
    }
  }
  
  getRefreshToken(): any {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUserToken') || "");
    const refreshToken = currentUser ? currentUser.refreshToken : null;
    return this.httpService.postMethod('refreshToken', { refreshToken });
  }

}
