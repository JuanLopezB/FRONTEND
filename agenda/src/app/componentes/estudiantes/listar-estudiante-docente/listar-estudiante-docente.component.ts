import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/servicio/crud.service';
import { RoleGuard } from 'src/app/guards/Role.guard';

@Component({
  selector: 'app-listar-estudiante-docente',
  templateUrl: './listar-estudiante-docente.component.html',
  styleUrls: ['./listar-estudiante-docente.component.css']
})
export class ListarEstudianteDocenteComponent implements OnInit{
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

}
