import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
//import { ToastrService} from 'ngx-toastr';
import Swal from 'sweetalert2'

import { CrudService } from 'src/app/servicio/crud.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar-docente',
  templateUrl: './agregar-docente.component.html',
  styleUrls: ['./agregar-docente.component.css']
})
export class AgregarDocenteComponent {
 
formularioDeDocentes: FormGroup;

Docentes: any;

public mostrarFormulario: boolean = false;

  constructor(
    public formulario: FormBuilder,
    private crudService: CrudService,
    private ruteador: Router,
    //private toastr: ToastrService
  ) {
    this.formularioDeDocentes = this.formulario.group({
      Nombre: [''],
      Genero: [''],
      Fecha_Nac: [''],
      Correo_Docente: [''],
      Cedula_Docente: ['']
    });
  }

  ngOnInit(): void{
    this.crudService.ObtenerDocentes().subscribe(respuesta =>{
      console.log(respuesta);
      this.Docentes = respuesta;
    });
  }

  enviarDatos(): any {
    console.log("Me presionaste");
    console.log(this.formularioDeDocentes.value);

      this.crudService.AgregarDocente(this.formularioDeDocentes.value).subscribe(respuesta => {
    

      this.toggleFormulario();

      {
        this.formularioDeDocentes = this.formulario.group({
          Nombre: [''],
          Genero: [''],
          Fecha_Nac: [''],
          Correo_Docente: [''],
          Cedula_Docente: ['']
        });
      }

      this.crudService.ObtenerDocentes().subscribe(respuesta =>{
        console.log(respuesta);
        this.Docentes = respuesta;
      });   
      
    },
      
    (error)=> {

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Al parecer no se proporcionaron los datos correctos!',
      })

    });
  }

  public toggleFormulario(): void {
    this.mostrarFormulario = !this.mostrarFormulario;
  }

  borrarRegistro(Cod_Acudiente: any, icontrol:any){
    console.log(Cod_Acudiente);
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

        this.crudService.BorrarDocente(Cod_Acudiente).subscribe((respuesta) =>{
          this.Docentes.splice(icontrol, 1);
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
