import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cliente } from '../clientes-formulario/cliente';
import { ClientesService } from '../clientes.service';

@Component({
  selector: 'app-clientes-editar',
  template: `
    <div class="card shadow mb-4">
      <div class="card-header py-3">
          <h6 class="m-0 font-weight-bold text-primary">Actualiza un cliente existente</h6>
      </div>
      <div class="card-body-wrapper">
        <app-spinner *ngIf="componenteCargado === undefined"></app-spinner>
        <div class="card-body">
            <app-clientes-formulario [cliente]="cliente" (clienteFormulario)="actualizarCliente($event)"></app-clientes-formulario>
        </div>
        <div *ngIf="successMessage" class="card bg-success text-white shadow">
            <div class="card-body">
              {{successMessage}}
            </div>
          </div>
      </div>
    </div>
  `
})
export class ClientesEditarComponent implements OnInit {

  public componenteCargado: boolean;
  public cliente: Cliente;
  public timer: any;
  public successMessage: string;

  constructor(
    private route: ActivatedRoute,
    private clientesService: ClientesService
  ) { }

  ngOnInit(): void {
    this.cargarCliente();
  }

  cargarCliente(): void {
    const id: number = Number(this.route.snapshot.paramMap.get('id'));
    this.clientesService.ver(id).subscribe((cliente) => {
        this.cliente = cliente;
        this.componenteCargado = true;
    });
  }

  actualizarCliente(cliente: Cliente): void {
    console.log(cliente.id);
    this.clientesService.editar(cliente, cliente.id).subscribe((cliente) =>{
      this.successMessage = 'Se creó un nuevo cliente con éxito';

      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.successMessage = '';
      }, 5000);
    });
  }

}
