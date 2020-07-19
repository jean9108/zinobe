import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clientes',
  template: `
    <h1 class="h3 mb-2 text-gray-800">Clientes</h1>
    <p class="mb-4">Módulo de administración de clientes.</p>
    <router-outlet></router-outlet>
  `
})
export class ClientesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
