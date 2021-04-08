import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  constructor() { }

  noHerrera(formControl: FormControl):{[s:string]:boolean} {
    if(formControl.value?.toLowerCase() ==='herrera')
        return {
          noHerrera:true
        }
    return null;
  }

  samePassword(password1Name:string, password2Name:string){

    return(formGroup:FormGroup)=>{

      const pass1Control = formGroup.controls[password1Name];
      const pass2Control = formGroup.controls[password2Name];

      if(pass1Control.value === pass2Control.value)
         pass2Control.setErrors(null);
      else pass2Control.setErrors({noSamePassword:true});
    }
  }
}
