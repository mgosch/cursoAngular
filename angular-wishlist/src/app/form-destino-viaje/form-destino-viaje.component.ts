import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DestinoViaje } from '../models/destino-viajes.model';
import { FormGroup, FormBuilder, Validators, FormControl, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-form-destino-viaje',
  templateUrl: './form-destino-viaje.component.html',
  styleUrls: ['./form-destino-viaje.component.css']
})
export class FormDestinoViajeComponent implements OnInit {
  
  @Output() onItemAdded: EventEmitter<DestinoViaje>;
  fg: FormGroup;
  minLong = 3;

  constructor(fb: FormBuilder) {
    this.onItemAdded = new EventEmitter();
    this.fg = fb.group({
      nombre: ['', Validators.compose([
        Validators.required, this.nombreValidator, this.nombreValidatorParametrizable(this.minLong)
      ])],
      url: ['', Validators.required]
    });

    this.fg.valueChanges.subscribe(
      (form: any) => {console.log(form);}
    );
   }

  ngOnInit(): void {
  }

  guardar(nombre: string, url: string): boolean {
    const d = new DestinoViaje(nombre, url);
    this.onItemAdded.emit(d);
    return false;
  }

  nombreValidator(control: FormControl): { [s: string] : boolean} {
    let longitud = control.value.toString().trim().length;
    if (longitud>0 && longitud<5){
      return {invalidNombre: true};
    }
    return null;
  }

  nombreValidatorParametrizable(minLong: number): ValidatorFn {
    return (control: FormControl): { [s: string] : boolean} | null => {
      let longitud = control.value.toString().trim().length;
      if (longitud>0 && longitud<minLong){
        return {minLongNombre: true};
      }
      return null;
    }
  }
}
