import { Component, OnInit, ViewChildren } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/Auth/user-service.service';
import { first } from 'rxjs/operators';
import { User } from 'src/app/models/User';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert/alert.service';
import { AuthenticationService } from 'src/app/services/Auth/authentication-service.service';

@Component({
  selector: 'login-up',
  templateUrl: './login2.component.html',
  styleUrls: ['./login2.component.css']
})
export class Login2Component implements OnInit {
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
    public authenticationService:UserService

    ) { }
 

  ngOnInit() {


  this.RegistreForm = this.formBuilder.group({
    username: ["", Validators.required],
    email: ["", [Validators.email , Validators.required]],
    password: ["", [Validators.required,Validators.minLength(8)] ],
    fullname : ["",Validators.required],

})
console.log(localStorage.getItem("idUser"));
this.authenticationService.getUsersId(localStorage.getItem("idUser")).subscribe((user:Array<User>)=>{

  console.log(user[0]);
  this.RegistreForm = this.formBuilder.group({
    username: [user[0].username, Validators.required],
    email: [user[0].email, [Validators.email , Validators.required]],
    password: [user[0].plainPassword, [Validators.required,Validators.minLength(8)] ],
    fullname : [user[0].fullname,Validators.required],

})
})
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
this.authenticationService.updateUser(this.user,localStorage.getItem("idUser"));
  }
  

}



