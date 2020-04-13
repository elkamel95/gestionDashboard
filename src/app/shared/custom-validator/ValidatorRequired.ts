import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';
import { Input, Directive } from '@angular/core';


@Directive({
selector : '[requiredField]', 
providers: [{
provide: NG_VALIDATORS ,
useExisting: ValidatorRequired ,
multi:true 


}]

})
export class ValidatorRequired implements Validator{

    validate(control: AbstractControl):{[key:string]:any} | null  {


if( control.value !=="")
{

return {'required' :true }; 

}
return null  ;

    }

 



    
}