import { TitleService } from 'src/app/servicio/title.service';
import { Component, OnInit, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-nosotros',
  templateUrl: './nosotros.component.html',
  styleUrls: ['./nosotros.component.css']
})
export class NosotrosComponent {
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
