
import { Component} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TitleService } from './servicio/title.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public router: Router) {
  }


  ngOnInit() {
    this.router.navigate(['/inicio']);
  }


}
  