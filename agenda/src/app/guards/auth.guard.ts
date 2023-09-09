import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router'
import { AuthService } from '../servicio/auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(
    private router : Router,
    private authService: AuthService
  ) { }

  canActivate(): boolean {

    if (!this.authService.isAuth()) {
      console.log('token no es valido o ya expiro')
      this.router.navigate(["/login/"]);
      return false;
    }
    return true;

  }

}
