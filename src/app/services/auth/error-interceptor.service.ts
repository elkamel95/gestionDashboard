import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthenticationService } from './authentication-service.service';
import { SnackbarService } from '../alert/snackbar.service';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService,private snackbarService:SnackbarService
        ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        var action    ="Add"
        return next.handle(request).pipe(
            tap((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse && (event.status >= 200 &&(  request.method !=="GET")&& event.status <= 226 ) ){
                   if(request.method ==="POST")
                   action = "add" ;
                   else if(request.method ==="PUT")
                   action = "update" ;
                    else
                    action = "Delete" ;

          
                    this.snackbarService.open("Request successfully processed",action+"",
                    "success");
                    event.headers
                }
              }),
            catchError(err => {
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                this.authenticationService.logout();
            //  location.reload(true);
            }
            
            const error = err.error.message || err.statusText;
            this.snackbarService.open(error,err.status,"error");


            return throwError(error);
        }));



    }
}