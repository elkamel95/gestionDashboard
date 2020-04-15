import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';
import { Input, Directive } from '@angular/core';


@Directive({
selector : '[requiredField]', 
providers: [{
provide: NG_VALIDATORS ,
useClass: ValidatorRequired ,
multi:true 


}]

})
export class ValidatorRequired implements Validator{
    validate(control: AbstractControl):{[key:string]:any} | null  {
console.log(control);
if( control.value != null &&control.value.length === 0 )
{
return {'required' :true }; 
}

return null  ;

    }

 



    
}