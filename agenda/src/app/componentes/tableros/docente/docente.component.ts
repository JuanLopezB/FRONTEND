import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import Swal from 'sweetalert2'
import { TitleService } from 'src/app/servicio/title.service';


@Component({
  selector: 'app-docente',
  templateUrl: './docente.component.html',
  styleUrls: ['./docente.component.css']
})
export class DocenteComponent {

  constructor(private titleService: TitleService, private router: Router){

    let timerInterval
    Swal.fire({
      title: 'Iniciando tablero del docente!',
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

  ngOnInit() {
    this.titleService.init();
  }

  borrarToken(){

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.router.navigate(['/inicio']);
        localStorage.removeItem('token');
        
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })   
      
  }
  
}
