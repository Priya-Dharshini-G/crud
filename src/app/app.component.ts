import { Component } from '@angular/core';
import { HttpRoutingService } from './shared/services/http-routing.service';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './services/auth.service';
import { HeaderService } from './shared/services/header.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private authService:AuthService,private headerService:HeaderService){}
  title = 'crud';
  apiurl=environment.apiurl;
   ngOnInit(){
    this.authService.getJson();
    this.headerService.setheaders(this.apiurl+"/login","content-type","application/json");
   }
  }

