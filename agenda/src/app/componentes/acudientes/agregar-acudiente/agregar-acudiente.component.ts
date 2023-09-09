import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2'

import { CrudService } from 'src/app/servicio/crud.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar-acudiente',
  templateUrl: './agregar-acudiente.component.html', 
  styleUrls: ['./agregar-acudiente.component.css']
})
export class AgregarAcudienteComponent {
  Acudientes: any;
formularioDeAcudientes: FormGroup;

public mostrarFormulario: boolean = false;

  constructor( 
    public formulario:FormBuilder ,
    private crudService:CrudService,
    private ruteador: Router
    ){

    this.formularioDeAcudientes = this.formulario.group({
      Nombre: [''],
      Genero: [''],
      Fecha_Nac: [''],
      Parentesco: [''],
      Cedula_Acudiente: [''],
      Correo_Acudiente: [''],
      Telefono: ['']
    });
  }

  ngOnInit(): void{
    this.crudService.obtenerAcudientes().subscribe(respuesta =>{
      console.log(respuesta);
      this.Acudientes = respuesta;
    });
  }

  enviarDatos(): any {

console.log("Me presionaste")
console.log(this.formularioDeAcudientes.value);

this.crudService.AgregarAcudiente(this.formularioDeAcudientes.value).subscribe(respuesta=>{
  
  this.toggleFormulario();
  {
    this.formularioDeAcudientes = this.formulario.group({
      Nombre: [''],
      Genero: [''],
      Fecha_Nac: [''],
      Parentesco: [''],
      Cedula_Acudiente: [''],
      Correo_Acudiente: [''],
      Telefono: ['']
    });
  }

  this.crudService.obtenerAcudientes().subscribe(respuesta =>{
    console.log(respuesta);
    this.Acudientes = respuesta;
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

        this.crudService.BorrarAcudiente(Cod_Acudiente).subscribe((respuesta) =>{
          this.Acudientes.splice(icontrol, 1);
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
          'El registro se encuentra salvo :)',
          'error'
        )
      }
    })


  }

}
