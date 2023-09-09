import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TitleService {
  constructor(private router: Router, private titleService: Title) {}

  init() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const routeTitle = this.getRouteTitle(this.router.routerState, this.router.routerState.root).join(' - ');
        const pageTitle = routeTitle ? `Inquietudes - ${routeTitle}` : 'Inquietudes';
        this.titleService.setTitle(pageTitle);
      }
    });
  }

  private getRouteTitle(state: any, parent: any): string[] {
    const data: string[] = [];
    if (parent && parent.snapshot.data && parent.snapshot.data.title) {
      data.push(parent.snapshot.data.title);
    }

    if (state && parent) {
      data.push(...this.getRouteTitle(state, state.firstChild(parent)));
    }

    return data;
  }
}
