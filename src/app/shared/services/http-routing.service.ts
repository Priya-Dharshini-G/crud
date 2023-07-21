import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class HttpRoutingService {
  constructor(private httpCall:HttpClient) { }
  apiurl=environment.apiurl;
  getMethod(url:string){
    return this.httpCall.get(this.apiurl+ 'v1/' + url);
  }
  postMethod(url:string,data:any){
    return this.httpCall.post(this.apiurl+ 'v1/' + url, data);
  }
  getJson(){
    return this.httpCall.get('./assets/' + 'message.json');
  }
}
