import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-acudiente',
  templateUrl: './acudiente.component.html',
  styleUrls: ['./acudiente.component.css']
})
export class AcudienteComponent {

  constructor(public router: Router){

 
    let timerInterval
    Swal.fire({
      title: 'Iniciando tablero del acudiente!',
      timer: 1000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
        timerInterval = setInterval(() => {
        }, 100)
      },
      willClose: () => {
        clearInterval(timerInterval)
      }
    }).then((result) => {
      
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log('I was closed by the timer')
      }
    })
 
  }



  navigateTo(route: string) {
    // Aquí puedes implementar la navegación a las respectivas páginas
    console.log(`Navegar a ${route}`);
  }

  borrarToken(){

    Swal.fire({
      title: 'Cerrar sesion',
      text: "¿Esta seguro de cerrar la sesio actual?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, cerrar!'
    }).then((result) => {
      if (result.isConfirmed) {

        localStorage.removeItem('token');
        this.router.navigate(['/inicio']);

        Swal.fire(
          'Gracias por visitarnos',
          'Hasta pronto...',
          'success'
        )
      }
    })
  }

}
