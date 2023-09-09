

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router'
import { AuthService } from '../servicio/auth.service';
import decode from 'jwt-decode';
import { ListarEstudianteComponent } from '../componentes/estudiantes/listar-estudiante/listar-estudiante.component';

interface DecodedToken {
  userName: string;
  roleId: string;
}


@Injectable({
  providedIn: 'root'
})

export class RoleGuard implements CanActivate {

  userName: string; // Nueva propiedad

  constructor(
    private router : Router,
    private authService: AuthService
  ) { }

  

  canActivate(route: ActivatedRouteSnapshot ): boolean {
    const expectedRole = route.data['expectedRole'];
    const token = localStorage.getItem('token');

    if (token) {
      const decodedToken: DecodedToken = decode(token) as DecodedToken;
      const { userName, roleId } = decodedToken;
      console.log(userName, roleId);

      this.setUserName(userName);
      
      if( !this.authService.isAuth() || roleId !== expectedRole) {
        console.log('usuario no autorizado para la vista');
        return false;
        this.router.navigate(['/login']);
      }
      
      // Aquí puedes realizar la lógica de validación del rol esperado
      // Comparar 'roleId' con 'expectedRole' y tomar decisiones en consecuencia

      return true; // O devuelve 'false' si no se cumple el rol esperado
    }

    // Si no hay token, redireccionar a la página de inicio de sesión
    console.log('No token found');

    return false;
  }

  setUserName(userName: string) {
    this.userName = userName;
  }

}
