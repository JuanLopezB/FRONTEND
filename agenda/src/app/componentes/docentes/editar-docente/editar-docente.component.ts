import { Component } from '@angular/core';

import { Route, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CrudService } from 'src/app/servicio/crud.service';
import { Docente } from '../../../servicio/Modelos/Docente';
import {Router} from '@angular/router'


@Component({
  selector: 'app-editar-docente',
  templateUrl: './editar-docente.component.html',
  styleUrls: ['./editar-docente.component.css']
})
export class EditarDocenteComponent {


  formularioDeDocentes: FormGroup;
  elCod_Docente: any;

  constructor(
    private ruteador: Router,
    public formulario:FormBuilder ,
    private activeRoute: ActivatedRoute,
    private crudservice: CrudService
  ) {

    this.elCod_Docente = this.activeRoute.snapshot.paramMap.get('id');
    console.log(this.elCod_Docente);

    this.crudservice.ObtenerDocente(this.elCod_Docente).subscribe(respuesta => {
      console.log(respuesta);
      this.formularioDeDocentes.setValue({
        Nombre: respuesta[0]['Nombre'],
        Genero: respuesta[0]['Genero'],
        Fecha_Nac: respuesta[0]['Fecha_Nac'],
        Correo_Docente: respuesta[0]['Correo_Docente'],
        Cedula_Docente: respuesta[0]['Cedula_Docente'],
      })
    });

  
    this.formularioDeDocentes = this.formulario.group({
      Nombre: [''],
      Genero: [''],
      Fecha_Nac: [''],
      Correo_Docente: [''],
      Cedula_Docente: [''],
    });

  }

  ngOnInit() {

  }

enviarDatos(): any{
console.log(this.elCod_Docente);
console.log(this.formularioDeDocentes.value);
this.crudservice.EditarDocente(this.elCod_Docente, this.formularioDeDocentes.value).subscribe(data => {
  this.ruteador.navigateByUrl('/agregar-docente');

});

}


}
