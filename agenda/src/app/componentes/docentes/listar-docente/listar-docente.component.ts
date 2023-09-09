import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
import {CrudService} from 'src/app/servicio/crud.service';

@Component({
  selector: 'app-listar-docente',
  templateUrl: './listar-docente.component.html',
  styleUrls: ['./listar-docente.component.css']
})
export class ListarDocenteComponent implements OnInit {

  Docentes: any;

  constructor(
    private crudService: CrudService
  ){}

  ngOnInit(): void{
    this.crudService.ObtenerDocentes().subscribe(respuesta =>{
      console.log(respuesta);
      this.Docentes = respuesta;
    });
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


