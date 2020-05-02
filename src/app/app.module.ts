import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { LayoutDashboardModule } from './layout/layout-dashboard/layout-dashboard.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './services/Auth/jwt-interceptor.service';
import { ErrorInterceptor } from './services/Auth/error-interceptor.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { XmlService } from './services/XmlData/xml.service';
import { PickDateAdapter, PICK_FORMATS } from './services/date-adapter/date-format-adapter.service';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    
    
    
    
    
 
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatButtonModule,
    LayoutDashboardModule,
    HttpClientModule
    ,ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
   CookieService,
   XmlService,
PickDateAdapter,
{provide: DateAdapter, useClass: PickDateAdapter},
{provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS}
    // provider used to create fake backend
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
