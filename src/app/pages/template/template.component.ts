import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ContryService } from 'src/app/services/contry.service';


@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styles: [
  ]
})
export class TemplateComponent implements OnInit {
  public  user = {
    name : "",
    surname : "",
    email: "",
    contry: "",
    gender:""
  }
  public contries:any[] = [];

  constructor(private _contryService: ContryService) { }

  ngOnInit(): void {
    this._contryService.getAll().subscribe(contries=>{
      this.contries = contries;
      this.contries.unshift({
        name:'Seleccione un pais...',
        code:''
      });
      console.log(contries);
    })
  }

  submit(form:NgForm):void{

    if(form.invalid){
      Object.values(form.controls).forEach(control=>{
        control.markAsTouched();// each control from form maked as tounched
      })
      return;
    }
    console.log(form);
  }

}
