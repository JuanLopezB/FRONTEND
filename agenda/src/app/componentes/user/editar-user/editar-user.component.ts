import { Component } from '@angular/core';
import {Router} from '@angular/router'
import { Route, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CrudService } from 'src/app/servicio/crud.service';

@Component({
  selector: 'app-editar-user',
  templateUrl: './editar-user.component.html',
  styleUrls: ['./editar-user.component.css'],
  
})
export class EditarUserComponent {

  formularioDeUsuarios: FormGroup;
  elCod_User: any;

  constructor(
    private ruteador: Router,
    public formulario:FormBuilder ,
    private activeRoute: ActivatedRoute,
    private crudservice: CrudService
  ) {

    this.elCod_User = this.activeRoute.snapshot.paramMap.get('id');
    console.log(this.elCod_User);

    this.crudservice.ObtenerUser(this.elCod_User).subscribe(respuesta => {
      console.log(respuesta);
      this.formularioDeUsuarios.setValue({

        userName: respuesta[0]['userName'],
        pass: respuesta[0]['pass'],
        roleId: respuesta[0]['roleId'],

      })
    });

  
    this.formularioDeUsuarios = this.formulario.group({
      userName: [''],
      pass: [''],
      roleId: [''],
    });

  }

  ngOnInit() {

  }

enviarDatos(): any{
console.log(this.elCod_User);
console.log(this.formularioDeUsuarios.value);
this.crudservice.EditarGrupo(this.elCod_User, this.formularioDeUsuarios.value).subscribe(data => {
  this.ruteador.navigateByUrl('/agregar-user');

});

}

}
