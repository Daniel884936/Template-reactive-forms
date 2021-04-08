import { ValidatorsService } from './../../services/validators.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styles: [
  ]
})
export class ReactiveComponent implements OnInit {
  form: FormGroup;
  constructor(private readonly _formBuilder:FormBuilder,
              private readonly _validatorService: ValidatorsService) {
    this.createForm();
    this.loadData();
   }

  ngOnInit(): void {
  }

  createForm():void{
    this.form = this._formBuilder.group({
      name : ['', Validators.required],
      surname : ['',[Validators.required,this._validatorService.noHerrera]],
      email: ['',[Validators.required,
              Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password1 : ['', Validators.required],
      password2 : ['', Validators.required],
      address: this._formBuilder.group({
        district: ['', Validators.required],
        city: ['', Validators.required]
      }),
      hobbies: this._formBuilder.array([])
    },
      {
        validators: this._validatorService.samePassword('password1','password2')
      }
    );
  }

  get hobbies(){
    return this.form.get('hobbies') as FormArray;
  }

  addHobbieControl(){
    this.hobbies.push(this._formBuilder.control(''))
  }

  deleteHobbieControl(index:number){
    this.hobbies.removeAt(index);
  }


  get invalidName():boolean{
    const nameControl = this.form.get('name');
    return nameControl.invalid && nameControl.touched;
  }

  get invalidEmail():boolean{
    const emailControl = this.form.get('email');
    return emailControl.invalid && emailControl.touched;
  }

  get invalidPassword1():boolean{
    const password1Control = this.form.get('password1');
    return password1Control.invalid && password1Control.touched;
  }

  get invalidPassword2():boolean{
    const password1Control = this.form.get('password1');
    const password2Control = this.form.get('password2');
    return password1Control.value != password2Control.value;
  }

  get invalidSurname():boolean{
    const surnaControl = this.form.get('surname');
    return surnaControl.invalid && surnaControl.touched;
  }

  get invalidDistrict():boolean{
    const districtControl = this.form.get('address.district');
    return districtControl.invalid && districtControl.touched;
  }

  get invalidCity():boolean{
    const cityControl = this.form.get('address.city');
    return cityControl.invalid && cityControl.touched;
  }


  private loadData():void{
    /* this.form.setValue(
      {
        name: "Daniel",
        surname: "Tejada Montero",
        email: "tejadadaniel33@gmail.com",
        address: {
          district: "Oeste",
          city: "Santo Domingo"
        }
      }
    ); */

    //another way
    this.form.reset({
      name : 'Daniel'
    });

  }

  save():void{
    if(this.form.invalid) {
      Object.values(this.form.controls).forEach(control=>{
        control.markAsTouched();

        //masking touched chidren form group
        if(control instanceof FormGroup){
          Object.values(control.controls).forEach(control=>{
            control.markAsTouched();
          })
        }
      });
      return;
    }
    this.form.reset();
    console.log(this.form);
  }

}
