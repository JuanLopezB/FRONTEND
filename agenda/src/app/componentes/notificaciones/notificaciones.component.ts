import { Component } from '@angular/core';
import { ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.css']
})
export class NotificacionesComponent {
  constructor (private toastr: ToastrService){}

ngOnInit(): void{

}

ShowSucess(){
  this.toastr.success('Toast añadido correctamente')
}

}
