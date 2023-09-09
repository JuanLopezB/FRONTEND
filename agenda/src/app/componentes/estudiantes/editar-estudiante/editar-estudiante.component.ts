import { Component, OnInit } from '@angular/core';
import { Route, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CrudService } from 'src/app/servicio/crud.service';
import {Router} from '@angular/router'

@Component({
  selector: 'app-editar-estudiante',
  templateUrl: './editar-estudiante.component.html',
  styleUrls: ['./editar-estudiante.component.css']
})
export class EditarEstudianteComponent implements OnInit {
  formularioDeEstudiantes: FormGroup;
  elCod_Estudiante: any;

  constructor(
    private ruteador: Router,
    public formulario: FormBuilder,
    private activeRoute: ActivatedRoute,
    private crudservice: CrudService
  ) {

    this.elCod_Estudiante = this.activeRoute.snapshot.paramMap.get('id');
    console.log(this.elCod_Estudiante);
    
    this.crudservice.ObtenerEstudiante(this.elCod_Estudiante).subscribe(respuesta => {
      console.log(respuesta);
      this.formularioDeEstudiantes.setValue({

        Cod_Grupo: respuesta[0]['Cod_Grupo'],
        Cod_Acudiente: respuesta[0]['Cod_Acudiente'],
        Nombre: respuesta[0]['Nombre'],
        Genero: respuesta[0]['Genero'],
        Fecha_Ingreso: respuesta[0]['Fecha_Ingreso'],
        Fecha_Nac: respuesta[0]['Fecha_Nac'],
        EPS: respuesta[0]['EPS'],
        Estado: respuesta[0]['Estado'],
        Direccion_Residencia: respuesta[0]['Direccion_Residencia'],
        Nombre_Madre: respuesta[0]['Nombre_Madre'],
        Nombre_Padre: respuesta[0]['Nombre_Padre']
      });
    });

    this.formularioDeEstudiantes = this.formulario.group({
      Cod_Grupo: [''],
      Cod_Acudiente: [''],
      Nombre: [''],
      Genero: [''],
      Fecha_Ingreso: [''],
      Fecha_Nac: [''],
      EPS: [''],
      Estado: [''],
      Direccion_Residencia: [''],
      Nombre_Madre: [''],
      Nombre_Padre: ['']
    });

  }

  ngOnInit() {

  }

  enviarDatos(): any {
    console.log(this.elCod_Estudiante);
    console.log(this.formularioDeEstudiantes.value);
    this.crudservice.EditarEstudiante(this.elCod_Estudiante, this.formularioDeEstudiantes.value).subscribe(data => {
      this.ruteador.navigateByUrl('/agregar-estudiante');
    });
  }
}
