import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { SharedModule } from './shared/shared.module';
import { MainCoreModule } from './main-core/main-core.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInceptorService } from './shared/services/token-inceptor.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    SharedModule,
    MainCoreModule,
    HttpClientModule,
    CanvasJSAngularChartsModule,
    NgbModule
  ],
  providers: [ {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
