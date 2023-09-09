import { TitleService } from 'src/app/servicio/title.service';
import { Component, OnInit, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
  title = 'agenda';
  showMenu = false;

  constructor(private titleService: TitleService, public router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showMenu = false; 
      }
    });
  }

  ngOnInit() {
    this.titleService.init();
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(event: any) {
    this.showMenu = window.innerWidth <= 768;
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

}
