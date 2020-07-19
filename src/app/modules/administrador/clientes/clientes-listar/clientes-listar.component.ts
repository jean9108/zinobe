import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from '../clientes-formulario/cliente';
import { ClientesService } from '../clientes.service';
import environment from 'src/app/common/environment';
import $ from 'jquery';

declare var $: $;

@Component({
  selector: 'app-clientes-listar',
  template: `
    <div class="card shadow mb-4">
      <div class="card-header py-3">
          <h6 class="m-0 font-weight-bold text-primary">Clientes registrados</h6>
      </div>
      <div class="card-body">
        <a class="btn btn-primary mb-4" [routerLink]="['/administrador/clientes/registrar']">
          <i class="fas fa-user-plus"></i> Registrar cliente
        </a>
        <div class="table-wrapper">
          <app-spinner *ngIf="cargandoTabla === true"></app-spinner>
          <table width="100%" id="clientes-tabla" class="table nowrap table-bordered"></table>
        </div>
      </div>
    </div>
  `,
  styles: [``]
})
export class ClientesListarComponent implements OnInit, AfterViewInit {
  public clientes: Cliente[];
  public clientesTabla: any;
  public cargandoTabla: boolean;

  constructor(
    private clientesService: ClientesService,
    private router: Router
  ) { }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.cargarTablaClientes();
    this.cargarClientes();
  }

  cargarClientes() {
    this.clientesService.listar().subscribe((response) => {
      this.clientes = response;
      this.clientesTabla.draw();

      this.clientesTabla.clear().draw();
      this.clientesTabla.rows.add(this.clientes);
      this.clientesTabla.columns.adjust().draw();
    });
  }

  cargarTablaClientes(): void {
    this.clientesTabla = $('#clientes-tabla').DataTable(
      {
        processing: true,
        scrollX: true,
        language: {
          search: 'Buscar:',
          lengthMenu: 'Mostrando _MENU_ registros',
          info: 'Mostrando _START_ hasta _END_ registros de _TOTAL_',
          loadingRecords: 'Cargando datos',
        },
        columns: [
          { data: 'id', title: 'Id' },
          { data: 'nombres', title: 'Nombres' },
          { data: 'apellidos', title: 'Apellidos' },
          { data: 'email', title: 'Email', },
          { data: 'identificacion', title: 'No. Identificación' },
          {
            data: 'acciones', title: 'Acciones', defaultContent: `
              <button title="Editar" class="editar btn btn-primary"><i class="fas fa-pencil-alt"></i></button>
              <button title="Eliminar" class="eliminar btn btn-primary"><i class="fas fa-trash"></i></button>
            `
          },
        ],
        data: this.clientes,
        rowCallback: (row, data) => {
          const botonEditar = $(row).children().last().find('.editar');
          const botonEliminar = $(row).children().last().find('.eliminar');

          botonEditar.on('click', () => {
            this.editarCliente(data.id);
          });

          botonEliminar.on('click', () => {
            this.eliminarCliente(data.id);
          });
        }
      }
    );
  }

  editarCliente(id): void {
    this.router.navigate(['administrador/clientes/actualizar/' + id]);
  }

  eliminarCliente(id): void {
    this.cargandoTabla = true;
    this.clientesService.eliminar(id).subscribe((response) => {
      this.cargarClientes();
      this.cargandoTabla = false;
    });
  }
}
