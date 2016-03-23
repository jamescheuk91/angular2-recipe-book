import { Component } from 'angular2/core';
import { ROUTER_DIRECTIVES, RouteConfig } from 'angular2/router';
import { ReceipBooksComponent } from './recipe-book/recipe-books.component';

@Component({ 
  selector: 'app-container',
  template: `<router-outlet></router-outlet>`,
  directives: [ROUTER_DIRECTIVES],
})

@RouteConfig([
  { path: '/', as: 'REcipeBooks', component: ReceipBooksComponent, useAsDefault: true },
])

export class AppComponent {
  
  constructor() {

  }
  
}
