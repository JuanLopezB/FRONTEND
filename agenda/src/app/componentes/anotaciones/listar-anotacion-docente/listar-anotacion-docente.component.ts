

import { Component } from '@angular/core';
import { CrudService } from 'src/app/servicio/crud.service';
import { RoleGuard } from 'src/app/guards/Role.guard';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';


pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-listar-anotacion-docente',
  templateUrl: './listar-anotacion-docente.component.html',
  styleUrls: ['./listar-anotacion-docente.component.css']
})
export class ListarAnotacionDocenteComponent {

  ElCod_Acudiente: any;
  Anotaciones: any;
  pdfDefinition: any;

  constructor(
    private crudService: CrudService,
     private guard: RoleGuard
    ) {}

  ngOnInit(): void {

    const userName = this.guard.userName;
    

    this.crudService.ObtenerAnotacionEstudianteDocente("2").subscribe(respuesta => {
      console.log(respuesta);
      this.Anotaciones = respuesta;
      this.buildPdfDefinition(); // Construir la definición del PDF cuando se obtengan las anotaciones
    });
  }

  buildPdfDefinition() {
    const tableData: any[] = this.Anotaciones.map((anotacion: any) => {
      return [
        anotacion.Cod_Anotacion,
        anotacion.Cod_Estudiante,
        anotacion.Asunto,
        anotacion.Fecha_Anotacion,
        anotacion.Observaciones
      ];
    });
  
    this.pdfDefinition = {
      content: [
        {
          text: 'Jardin infantil inquietudes',
          alignment: 'right',
          style: 'subheader'
        },

        {
          text: 'Lista de observaciones de los estudiantes',
          style: 'header'
        },

        {
          text: 'Se generó automáticamente el listado de las observaciones de los estudiantes del jardin infantil inquietudes, recuerda tener en cuenta que debes tener el código del estudiante presente para identificar la observación deseada. Si no sabes cuál es el código del estudiante, recuerda que en el apartado de "Consulta de estudiantes" podrás buscar la información del alumno.',
          style: 'message'
        },
        {
          table: {
            headerRows: 1,
            body: [
              ['Cod_Anotacion', 'Cod_Estudiante', 'Asunto', 'Fecha_Anotacion', 'Observaciones'], // Encabezados de la tabla
              ...tableData // Filas de datos
            ]
          }
        }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10]
        },
        subheader: {
          fontSize: 12,
          italics: true,
          margin: [0, 10, 0, 5]
        },
        message: {
          fontSize: 10,
          margin: [0, 5, 0, 10]
        }
      }
    };
  }

  createPdf() {
    if (this.pdfDefinition) {
      const pdf = pdfMake.createPdf(this.pdfDefinition);
      pdf.open();
    }
  }

  borrarRegistro(Cod_Anotacion: any, icontrol: any) {
    console.log(Cod_Anotacion);
    console.log(icontrol);
    if (window.confirm("¿Está seguro que desea borrar el registro seleccionado?")) {
      this.crudService.BorrarGrupo(Cod_Anotacion).subscribe((respuesta) => {
        this.Anotaciones.splice(icontrol, 1);
      });
    }
  }


}
