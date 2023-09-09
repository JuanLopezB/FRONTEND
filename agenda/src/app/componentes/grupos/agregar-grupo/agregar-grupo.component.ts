import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
//import { ToastrService} from 'ngx-toastr';
import { CrudService } from 'src/app/servicio/crud.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-agregar-grupo',
  templateUrl: './agregar-grupo.component.html',
  styleUrls: ['./agregar-grupo.component.css']
})
export class AgregarGrupoComponent {

  formularioDeGrupos: FormGroup;
  Grupos: any;


  public mostrarFormulario: boolean = false;

  constructor(
    public formulario: FormBuilder,
    private crudService: CrudService,
    private ruteador: Router,
    //private toastr: ToastrService
  ) {
    this.formularioDeGrupos = this.formulario.group({
      Cod_Docente: [''],
      Grado: [''],
      Periodo: ['']
    });
  }

  ngOnInit(): void {
    this.crudService.ObtenerGrupos().subscribe(respuesta => {
      console.log(respuesta);
      this.Grupos = respuesta;
    });
  }
  

  enviarDatos(): any {
    console.log("Me presionaste");
    console.log(this.formularioDeGrupos.value);
    
      this.crudService.AgregarGrupo(this.formularioDeGrupos.value).subscribe(respuesta => {

      this.toggleFormulario();

      {
        this.formularioDeGrupos = this.formulario.group({
          Cod_Docente: [''],
          Grado: [''],
          Periodo: ['']
        });
      }

      this.crudService.ObtenerGrupos().subscribe(respuesta => {
        console.log(respuesta);
        this.Grupos = respuesta;
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

  public toggleFormulario(): void {
    this.mostrarFormulario = !this.mostrarFormulario;
  }

  borrarRegistro(Cod_Grupo: any, icontrol: any) {
    console.log(Cod_Grupo);
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

        this.crudService.BorrarGrupo(Cod_Grupo).subscribe((respuesta) => {
          this.Grupos.splice(icontrol, 1);
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
