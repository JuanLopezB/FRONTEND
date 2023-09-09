import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/servicio/crud.service';
import { RoleGuard } from 'src/app/guards/Role.guard';

@Component({
  selector: 'app-listar-estudiante',
  templateUrl: './listar-estudiante.component.html',
  styleUrls: ['./listar-estudiante.component.css']
})
export class ListarEstudianteComponent implements OnInit {
  Estudiantes: any;
  ElCod_Acudiente: any;

  constructor(
    private crudService: CrudService,
    private guard: RoleGuard
  ) {}


  
  ngOnInit(): void {
    
    const userName = this.guard.userName;

    this.crudService.ObtenerEstudianteacudiente(userName).subscribe(respuesta => {
      console.log(respuesta);
      this.Estudiantes = respuesta;
    });
  }

  borrarRegistro(Cod_Estudiante: any, icontrol: any) {
    console.log(Cod_Estudiante);
    console.log(icontrol);
    if (window.confirm("¿Está seguro de que desea borrar el registro seleccionado?")) {
      this.crudService.BorrarEstudiante(Cod_Estudiante).subscribe((respuesta) => {
        this.Estudiantes.splice(icontrol, 1);
      });
    }
  }

  goBack(){
    window.history.back();
  }

}
