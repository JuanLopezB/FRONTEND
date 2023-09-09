

import { Component, OnInit } from '@angular/core';
import { Route, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CrudService } from 'src/app/servicio/crud.service';
import { Acudiente } from '../../../servicio/Modelos/Acudiente';
import {Router} from '@angular/router'

@Component({
  selector: 'app-editar-acudiente',
  templateUrl: './editar-acudiente.component.html',
  styleUrls: ['./editar-acudiente.component.css']
})
export class EditarAcudienteComponent implements OnInit {
  formularioDeAcudientes: FormGroup;
  elCod_Acudiente: any;

  constructor(
    private ruteador: Router,
    public formulario:FormBuilder ,
    private activeRoute: ActivatedRoute,
    private crudservice: CrudService
  ) {

    this.elCod_Acudiente = this.activeRoute.snapshot.paramMap.get('id');
    console.log(this.elCod_Acudiente);
    /*
    Otra manera de capturar el id:
      const id = this.route.snapshot.params['id'];
      console.log(id);
    */
    this.crudservice.ObtenerAcudiente(this.elCod_Acudiente).subscribe(respuesta => {
      console.log(respuesta);
      this.formularioDeAcudientes.setValue({
        Nombre: respuesta[0]['Nombre'],
        Genero: respuesta[0]['Genero'],
        Fecha_Nac: respuesta[0]['Fecha_Nac'],
        Parentesco: respuesta[0]['Parentesco'],
        Cedula_Acudiente: respuesta[0]['Cedula_Acudiente'],
        Correo_Acudiente: respuesta[0]['Correo_Acudiente'],
        Telefono: respuesta[0]['Telefono']
      })
    });

  
    this.formularioDeAcudientes = this.formulario.group({
      Nombre: [''],
      Genero: [''],
      Fecha_Nac: [''],
      Parentesco: [''],
      Cedula_Acudiente: [''],
      Correo_Acudiente: [''],
      Telefono: ['']
    });

  }

  ngOnInit() {

  }

enviarDatos(): any{
console.log(this.elCod_Acudiente);
console.log(this.formularioDeAcudientes.value);
this.crudservice.EditarAcudiente(this.elCod_Acudiente, this.formularioDeAcudientes.value).subscribe(data => {
  this.ruteador.navigateByUrl('/agregar-acudiente');

});

}

}
