import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpRoutingService } from '../shared/services/http-routing.service';
import { of, throwError } from 'rxjs';
let res: any;
class MockHttpRoutingService {
  getJson() {
    return of({});
  }
  postMethod() {
    if (res) {
      return of({
        token: 'fghjkl345678dfghjsnxjsnxkjnxkjxnksjnxjsxacxgfVX',
        refreshToken: 'UJBUDhcnzi8tSMACfsXJhvnTLqF',
        user: { id: 1 }
      });
    }
    else {
      return throwError({ error: { error: 'test' } });
    }
  }
}
describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: HttpRoutingService, useClass: MockHttpRoutingService }],
      imports: [HttpClientModule]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should call on getJson', () => {
    service.getJson();
    expect(service.getJson).toBeDefined();
  });
  it('should call on signin', () => {
    let data = <any>{email: 'priya@gmail.com', password: 'ytrewq'};
    res = true;
    service.signIn(data).subscribe((res: any) => {
      expect(res).toBeDefined();
    });
  });
  it('should call on signIn error',()=>{
    let data = <any>{email: 'priya@gmail.com', password: 'ytrewq'};
    res=false;
    service.signIn(data).subscribe((res) => {
    }, (err) => {
      expect(err).toBeDefined();
    });
  });
  it('should call on isAuthenticate',()=>{
    sessionStorage.setItem('currentUser', JSON.stringify({ token: "asdgfkdgfdnblknbffgbns",refreshToken: 'UJBUDhcnzi8tSMACfsXJhvnTLqF', user: { id: 1} }));
    let data = sessionStorage.getItem('currentUser') || " ";
    const currentuser = JSON.parse(data);
    service.isAuthenticate();
    expect(service.isAuthenticate).toBeDefined();
  });
  it('should call on isAuthenticate',()=>{
    sessionStorage.removeItem('currentUser');
    service.isAuthenticate();
    expect(service.isAuthenticate).toBeDefined();
  });
  it('should call getrefreshToken',()=>{
    sessionStorage.setItem('currentUser', JSON.stringify({ token: "asdgfkdgfdnblknbffgbns",refreshToken: 'UJBUDhcnzi8tSMACfsXJhvnTLqF', user: { id: 1} }));
    service.getRefreshToken();
    expect(service.getRefreshToken).toBeDefined();
  })
});
