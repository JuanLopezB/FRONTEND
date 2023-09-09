import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/servicio/crud.service';
import { RoleGuard } from 'src/app/guards/Role.guard';



@Component({
  selector: 'app-listar-grupo-docente',
  templateUrl: './listar-grupo-docente.component.html',
  styleUrls: ['./listar-grupo-docente.component.css']
})
export class ListarGrupoDocenteComponent {


  Grupos: any;
  ElCod_Acudiente: any;


  constructor(private crudService: CrudService,
    private guard: RoleGuard
    ) {}

  ngOnInit(): void {

    const userName = this.guard.userName;

    this.crudService.ObtenerGrupoDocente(userName).subscribe(respuesta => {
      console.log(respuesta);
      this.Grupos = respuesta;
    });
  }

  borrarRegistro(Cod_Grupo: any, icontrol: any) {
    console.log(Cod_Grupo);
    console.log(icontrol);
    if (window.confirm("¿Está seguro que desea borrar el registro seleccionado?")) {
      this.crudService.BorrarGrupo(Cod_Grupo).subscribe((respuesta) => {
        this.Grupos.splice(icontrol, 1);
      });
    }
  }

}
