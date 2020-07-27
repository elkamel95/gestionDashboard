import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/Auth/authentication-service.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { AlertService } from 'src/app/services/alert/alert.service';

@Component({
  selector: 'app-sigin',
  templateUrl: './sigin.component.html',
  styleUrls: ['./sigin.component.css']
})
export class SiginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  isValide = false ; 
  openNow  =true ;
  openNowLogin: boolean =false;
  openNowSigin: boolean =false;
  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private authenticationService: AuthenticationService,
      private alertService: AlertService,
      private _snackBar: MatSnackBar
  ) {
      // redirect to home if already logged in
      if (this.authenticationService.currentUserValue) {
          this.router.navigate(['/']);
      }
  }

  ngOnInit() {
      this.loginForm = this.formBuilder.group({
          username: ['',[ Validators.required , Validators.email]],
          password: ['', [Validators.required,Validators.minLength(8)] ],
        });

      // get return url from route parameters or default to '/'
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {panelClass:'error',
      duration: 2000
    });
  }
  onSubmit() {
      this.submitted = true;
      this.loading = true;

      // reset alerts on submit
      this.alertService.clear();

      // stop here if form is invalid
      if (this.loginForm.invalid) {

          return;
      }
console.log(this.f.username.value);
      this.loading = true;
      this.authenticationService.login(this.f.username.value, this.f.password.value)
          .pipe(first())
          .subscribe(
              data => {
         this.router.navigate([this.returnUrl]);
              },
              error => {
             //   this.alertService.error(error);
                  this.loading = false;
                 this. openSnackBar("inValid email or password ","Erreur") ;
              });
  }

  openLogIn(){
    this.openNowLogin = true ; 
    this.openNowSigin =false ; 
  }
  openSigin(){
    this.openNowLogin = false ; 
    this.openNowSigin =true ;   }
}

