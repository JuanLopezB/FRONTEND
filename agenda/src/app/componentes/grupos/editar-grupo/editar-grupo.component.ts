import { Component } from '@angular/core';

import { Route, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CrudService } from 'src/app/servicio/crud.service';
import { Docente } from '../../../servicio/Modelos/Docente';
import {Router} from '@angular/router'

@Component({
  selector: 'app-editar-grupo',
  templateUrl: './editar-grupo.component.html',
  styleUrls: ['./editar-grupo.component.css']
})
export class EditarGrupoComponent {


  formularioDeGrupos: FormGroup;
  elCod_Grupo: any;

  constructor(
    private ruteador: Router,
    public formulario:FormBuilder ,
    private activeRoute: ActivatedRoute,
    private crudservice: CrudService
  ) {

    this.elCod_Grupo = this.activeRoute.snapshot.paramMap.get('id');
    console.log(this.elCod_Grupo);

    this.crudservice.ObtenerGrupo(this.elCod_Grupo).subscribe(respuesta => {
      console.log(respuesta);
      this.formularioDeGrupos.setValue({

        Cod_Docente: respuesta[0]['Cod_Docente'],
        Grado: respuesta[0]['Grado'],
        Periodo: respuesta[0]['Periodo'],

      })
    });

  
    this.formularioDeGrupos = this.formulario.group({
      Cod_Docente: [''],
      Grado: [''],
      Periodo: [''],
    });

  }

  ngOnInit() {

  }

enviarDatos(): any{
console.log(this.elCod_Grupo);
console.log(this.formularioDeGrupos.value);
this.crudservice.EditarGrupo(this.elCod_Grupo, this.formularioDeGrupos.value).subscribe(data => {
  this.ruteador.navigateByUrl('/agregar-grupo');

});

}

}
