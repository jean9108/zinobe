import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-administrador',
  template: `
    <div id="wrapper">
      <app-sidebar></app-sidebar>
      <div id="content-wrapper" class="d-flex flex-column">
        <div id="content">
          <app-header></app-header>
          <div class="container-fluid">
            <router-outlet></router-outlet>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { width: 100%; }
  `]
})
export class AdministradorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
