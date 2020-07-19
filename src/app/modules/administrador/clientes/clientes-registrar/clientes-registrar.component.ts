import { Component, OnInit } from '@angular/core';
import { Cliente } from '../clientes-formulario/cliente';
import { ClientesService } from '../clientes.service';

@Component({
  selector: 'app-clientes-registrar',
  template: `
    <div class="card shadow mb-4">
      <div class="card-header py-3">
          <h6 class="m-0 font-weight-bold text-primary">Registrar nuevo cliente</h6>
      </div>
      <div class="card-body">
          <app-clientes-formulario (clienteFormulario)=registrarCliente($event)></app-clientes-formulario>
          <div *ngIf="successMessage" class="card bg-success text-white shadow">
            <div class="card-body">
              {{successMessage}}
            </div>
          </div>
      </div>
    </div>
  `
})
export class ClientesRegistrarComponent implements OnInit {
  public successMessage: string;
  public timer: any;

  constructor(
    private clientesService: ClientesService
  ) { }

  ngOnInit(): void {
  }

  registrarCliente(cliente: Cliente): void {
    this.clientesService.registrar(cliente).subscribe((response) => {
        this.successMessage = 'Se creó un nuevo cliente con éxito';

        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.successMessage = '';
        }, 5000);
    });
  }
}
