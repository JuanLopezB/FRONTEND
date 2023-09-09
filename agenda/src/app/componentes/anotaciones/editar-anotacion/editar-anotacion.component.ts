import { Component } from '@angular/core';

import { Route, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CrudService } from 'src/app/servicio/crud.service';
import { Anotacion } from '../../../servicio/Modelos/Anotacion';
import {Router} from '@angular/router'

@Component({
  selector: 'app-editar-anotacion',
  templateUrl: './editar-anotacion.component.html',
  styleUrls: ['./editar-anotacion.component.css']
})
export class EditarAnotacionComponent {

  formularioDeAnotaciones: FormGroup;
  elCod_Anotacion: any;

  constructor(
    private ruteador: Router,
    public formulario:FormBuilder ,
    private activeRoute: ActivatedRoute,
    private crudservice: CrudService
  ) {

    this.elCod_Anotacion = this.activeRoute.snapshot.paramMap.get('id');
    console.log(this.elCod_Anotacion);

    this.crudservice.ObtenerAnotacion(this.elCod_Anotacion).subscribe(respuesta => {
      console.log(respuesta);
      this.formularioDeAnotaciones.setValue({

        Cod_Estudiante: respuesta[0]['Cod_Estudiante'],
        Asunto: respuesta[0]['Asunto'],
        Fecha_Anotacion: respuesta[0]['Fecha_Anotacion'],
        Observaciones: respuesta[0]['Observaciones'],


      })
    });

  
    this.formularioDeAnotaciones = this.formulario.group({
      Cod_Estudiante: [''],
      Asunto: [''],
      Fecha_Anotacion: [''],
      Observaciones: [''],

    });

  }

  ngOnInit() {

  }

enviarDatos(): any{
console.log(this.elCod_Anotacion);
console.log(this.formularioDeAnotaciones.value);
this.crudservice.EditarAnotacion(this.elCod_Anotacion, this.formularioDeAnotaciones.value).subscribe(data => {
  this.ruteador.navigateByUrl('/agregar-anotacion');

});

}

}
