import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
   constructor() { }
   header:{[url:string]:{[key:string]:string}}={};
  public setheaders(url:string,key:string,value:string){
    if(this.header && this.header.hasOwnProperty(url)){
      this.header[url][key]=value;
      console.log(this.header);
    }else{
      this.header[url] = { [key]: value };
      console.log('setHeader Else: ', this.header);
    }
    }
    public getHeaders(url: string) {
      if (this.header && this.header.hasOwnProperty(url)) {
        console.log('getHeaders If:', this.header[url]);
        return this.header[url];
      } else {
        console.log('getHeaders else:', this.header[url]);
        return this.header['default'];
      }
    }
   }


