import { Component, OnInit } from '@angular/core';
import { Cliente } from '../clientes-formulario/cliente';

@Component({
  selector: 'app-clientes-editar',
  template: `
    <div class="card shadow mb-4">
      <div class="card-header py-3">
          <h6 class="m-0 font-weight-bold text-primary">Actualiza un cliente existente</h6>
      </div>
      <div class="card-body">
          <app-clientes-formulario [cliente]="cliente" (clienteFormulario)="actualizarCliente($event)"></app-clientes-formulario>
      </div>
    </div>
  `
})
export class ClientesEditarComponent implements OnInit {

  public cliente: Cliente;

  constructor() { }

  ngOnInit(): void {
  }

  actualizarCliente(cliente: Cliente): void {

  }

}
