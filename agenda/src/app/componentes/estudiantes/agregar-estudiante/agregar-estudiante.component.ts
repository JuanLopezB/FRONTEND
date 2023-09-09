import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CrudService } from 'src/app/servicio/crud.service';
import { Router } from '@angular/router';
import { TitleService } from 'src/app/servicio/title.service';

import Swal from 'sweetalert2'



@Component({
  selector: 'app-agregar-estudiante',
  templateUrl: './agregar-estudiante.component.html', 
  styleUrls: ['./agregar-estudiante.component.css']
})
export class AgregarEstudianteComponent {
  Estudiantes: any;

  title = 'agenda';

  formularioDeEstudiantes: FormGroup;

  public mostrarFormulario: boolean = false;

  constructor( 
    public formulario: FormBuilder,
    private crudService: CrudService,
    private ruteador: Router,
    private titleService: TitleService
    
  ) {

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

  ngOnInit(): void {
    this.titleService.init();
    this.crudService.ObtenerEstudiantes().subscribe(respuesta => {
      console.log(respuesta);
      this.Estudiantes = respuesta;
    });
  }

    enviarDatos(): any {
      console.log("Me presionaste");
      console.log(this.formularioDeEstudiantes.value);
     

      this.crudService.AgregarEstudiante(this.formularioDeEstudiantes.value).subscribe(respuesta => {

        this.toggleFormulario();

        this.crudService.ObtenerEstudiantes().subscribe(respuesta => {
          console.log(respuesta);
          this.Estudiantes = respuesta;
        });

      }, 
      
      (error)=> {

        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Al parecer no se proporcionaron los datos correctos!',
        })

      }
      
      ); 
    }

    navigateTo(route: string) {
      // Aquí puedes implementar la navegación a las respectivas páginas
      console.log(`Navegar a ${route}`);
    }
  

    public toggleFormulario(): void {
      this.mostrarFormulario = !this.mostrarFormulario;
    }

    borrarRegistro(Cod_Estudiante: any, icontrol: any) {
      console.log(Cod_Estudiante);
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

          this.crudService.BorrarEstudiante(Cod_Estudiante).subscribe((respuesta) => {
            this.Estudiantes.splice(icontrol, 1);
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
            'Cancelado',
            'El registro está a salvo :)',
            'error'
          )
        }
      })}


  }

  