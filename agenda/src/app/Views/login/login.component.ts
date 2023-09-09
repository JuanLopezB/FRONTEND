import { Component } from '@angular/core';
import { TitleService } from 'src/app/servicio/title.service';
import { AuthService } from 'src/app/servicio/auth.service';
import { Router } from '@angular/router';
import { ToastrService} from 'ngx-toastr';

import Swal from 'sweetalert2'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  
  opcionSeleccionada: string = '';

  user = {
    userName: '',
    pass: '',
  }

  constructor(private titleService: TitleService,
  private authService: AuthService,
  private router: Router,
  private toastr: ToastrService) {}

  ngOnInit() {
    this.titleService.init();
  }



login(){


  console.log(this.user);
  this.authService.singin(this.user).subscribe( (res:any) => {


    localStorage.setItem('token', res.token);

    if (this.opcionSeleccionada === 'admin') {
      this.opcionSeleccionada = "admin";
      this.router.navigate(['/tablero-administrador']);
    }else if (this.opcionSeleccionada === 'docente') {
      this.opcionSeleccionada = "docente"
      this.router.navigate(['/tablero-docente']);
    }else if (this.opcionSeleccionada === 'acudiente') {
      this.opcionSeleccionada = "acudiente"
      this.router.navigate(['/tablero-acudiente']);
    }

  }
  
  
  
  );

  Swal.fire({
    icon: 'error',
    title: 'Al parecer no son las credenciales correctas',
    text: 'Verifica las credenciales digitadas o el rol seleccionado!',
  })

}


}
