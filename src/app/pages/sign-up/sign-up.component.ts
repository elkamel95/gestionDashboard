import { Component, OnInit, ViewChildren } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/Auth/user-service.service';
import { first } from 'rxjs/operators';
import { User } from 'src/app/models/User';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert/alert.service';
import { AuthenticationService } from 'src/app/services/Auth/authentication-service.service';

@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  roles: string[] = [];
  RegistreForm:FormGroup ; 
  submitted: boolean=false;
  loading: boolean =false;
  user:User = new User();
  returnUrl: string;
repEmail = 0;
private notSame  =false ; 
  constructor(private formBuilder: FormBuilder,
    private userService:UserService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    public authenticationService:AuthenticationService

    ) { }
 

  ngOnInit() {
    
    this.RegistreForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.email , Validators.required]],
      password: ['', [Validators.required,Validators.minLength(8)] ],
      confirm: ['', [Validators.required,Validators.minLength(8)] ],
      fullname : ['',Validators.required],

  });
  this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';


}
   // get return url from route parameters or default to '/'
  

  // convenience getter for easy access to form fields
  get f() { return this.RegistreForm.controls; }

  onSubmit() {
    

      // reset alerts on submit

      // stop here if form is invalid
      if (this.RegistreForm.invalid) {

          return;
      }



this.user.email =   this.f.email.value
this.user.username =   this.f.username.value
this.user.fullname =   this.f.fullname.value
this.user.plainPassword =   this.f.password.value
this.user.roles.push("ROLE_USER"); 

    this.userService.register(this.user).pipe(first())
    .subscribe(
        () => {
          this.loading = true;

            this.authenticationService.login(this.f.email.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                () => {
           this.router.navigate([this.returnUrl]);
                },
                error => {
                  this.router.navigate([this.returnUrl]);
                });
        },
        error => {
           this.alertService.error(error);
            this.loading = false;
        });   
  }
  

}



