import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CrudService } from 'src/app/servicio/crud.service';
import { Router } from '@angular/router';
import { RoleGuard } from 'src/app/guards/Role.guard';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { ToastrService} from 'ngx-toastr';
import Swal from 'sweetalert2'


import { Location } from '@angular/common';
import * as nodemailer from 'nodemailer';

pdfMake.vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-agregar-anotacion',
  templateUrl: './agregar-anotacion.component.html',
  styleUrls: ['./agregar-anotacion.component.css']
})
export class AgregarAnotacionComponent {

  formularioDeAnotaciones: FormGroup;
  Anotaciones: any;
  pdfDefinition: any;
  public mostrarFormulario: boolean = false;

  // Correo y contraseña para enviar el correo
  correoGmail = 'inquietudesjardininfantil@gmail.com';
  contrasenaGmail = 'wsjerjpxjoyprnzx';

  constructor(
    public formulario: FormBuilder,
    private crudService: CrudService,
    private ruteador: Router,
    private guard: RoleGuard,
    private location: Location,
    private toastr: ToastrService
    ) {

    this.formularioDeAnotaciones = this.formulario.group({
      Cod_Estudiante: [''],
      Asunto: [''],
      Fecha_Anotacion: [''],
      Observaciones: ['']

    });
  }
 
  ngOnInit(): void {
    const userName = this.guard.userName;

    this.crudService.ObtenerAnotaciones().subscribe(respuesta => {
      console.log(respuesta);
      this.Anotaciones = respuesta;
      this.buildPdfDefinition(); // Construir la definición del PDF cuando se obtengan las anotaciones
    });
  }




  enviarDatos(): any {
    console.log("Me presionaste");
    console.log(this.formularioDeAnotaciones.value);
    this.toastr.success('Anotacion añadida correctamente')
      this.crudService.AgregarAnotacion(this.formularioDeAnotaciones.value).subscribe(respuesta => {
      this.ruteador.navigateByUrl('/agregar-anotacion');
    });
  }


  public toggleFormulario(): void {
    this.mostrarFormulario = !this.mostrarFormulario;
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

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: '¿Esta seguro/a que desea borrar el registro seleccionado?',
      text: "No se podrá revertir este proceso",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, borrar registro!',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        this.crudService.BorrarAnotacion(Cod_Anotacion).subscribe((respuesta) => {
          this.Anotaciones.splice(icontrol, 1); 
        });
        
        swalWithBootstrapButtons.fire(
          'Eliminado!',
          'El registro seleccionado ha sido borrado correctamente.',
          'success'
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })

  }

}