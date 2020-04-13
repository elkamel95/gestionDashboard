import { Validator, AbstractControl, NG_VALIDATORS, AsyncValidator, ValidationErrors, NG_ASYNC_VALIDATORS } from '@angular/forms';
import { Input, Directive } from '@angular/core';
import { UserService } from 'src/app/services/Auth/user-service.service';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';


@Directive({
selector : '[EmailChecker]', 
providers: [{
provide: NG_ASYNC_VALIDATORS ,
useExisting: ValidatorEmailCheckerdirective ,
multi:true 


}]

})
export class ValidatorEmailCheckerdirective implements AsyncValidator{
rep = null ; 
constructor(     private userService:UserService,

){

}
    validate(control: AbstractControl): Promise<ValidationErrors> | Observable<import("@angular/forms").ValidationErrors> {
   
    return  this.userService.getUsersBy(control.value).pipe(
        
        map(users => 
       
            (users['hydra:member'] && users['hydra:member'].length  >0) ? {'uniqueEmail':true} : null
        
        
        )
        
        
        );
        
    

    
    
    

    }
  




 



    
}