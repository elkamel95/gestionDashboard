import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';
import { Input, Directive } from '@angular/core';


@Directive({
selector : '[EqualsField]', 
providers: [{
provide: NG_VALIDATORS ,
useExisting: ValidatorEquals ,
multi:true 


}]

})
export class ValidatorEquals implements Validator{

@Input() EqualsField :string; 
    validate(control: AbstractControl):{[key:string]:any} | null  {

const controlToCompare = control.parent.get(this.EqualsField);

if(controlToCompare && controlToCompare.value != control.value)
{
    console.log(    control.errors.notEquals);

return {'notEquals' :true }; 

}
return null  ;

    }

 



    
}