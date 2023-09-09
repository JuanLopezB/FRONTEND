import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
  import { CrudService } from 'src/app/servicio/crud.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-agregar-user',
  templateUrl: './agregar-user.component.html',
  styleUrls: ['./agregar-user.component.css']
})
export class AgregarUserComponent {

  formularioDeUsuarios: FormGroup;
  User: any;

  public mostrarFormulario: boolean = false;

  constructor(
    public formulario: FormBuilder,
    private crudService: CrudService,
    private ruteador: Router
  ) {
    this.formularioDeUsuarios = this.formulario.group({
      userName: [''],
      pass: [''],
      roleId: ['']
    });
  }

  ngOnInit(): void {
    this.crudService.ObtenerUsers().subscribe(respuesta => {
      console.log(respuesta);
      this.User = respuesta;
    });
  }
  

  enviarDatos(): any {
    console.log("Me presionaste");
    console.log(this.formularioDeUsuarios.value);
      this.crudService.AgregarUser(this.formularioDeUsuarios.value).subscribe(respuesta => {

        this.toggleFormulario();

        {
          this.formularioDeUsuarios = this.formulario.group({
            userName: [''],
            pass: [''],
            roleId: ['']
          });
        }
      
        this.crudService.ObtenerUsers().subscribe(respuesta => {
          console.log(respuesta);
          this.User = respuesta;
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

  borrarRegistro(userName: any, icontrol: any) {
    console.log(userName);
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

        this.crudService.BorrarUser(userName).subscribe((respuesta) => {
          this.User.splice(icontrol, 1);
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
