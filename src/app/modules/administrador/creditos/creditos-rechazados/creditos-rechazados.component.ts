import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { CreditosService } from '../creditos.service';
import { NumeralPipe } from 'ngx-numeral';
import $ from 'jquery';

declare var $: $;

@Component({
  selector: 'app-clientes-listar',
  template: `
    <div class="card shadow mb-4">
      <div class="card-header py-3 bg-gradient-danger">
          <h6 class="m-0 font-weight-bold text-white">Créditos rechazados</h6>
      </div>
      <div class="card-body">
        <div class="table-wrapper">
          <app-spinner *ngIf="cargandoTabla === true"></app-spinner>
          <table width="100%" id="creditos-rechazados-tabla" class="table nowrap table-bordered"></table>
        </div>
      </div>
    </div>
  `,
  styles: [``],
})
export class CreditosRechazadosComponent implements OnInit, AfterViewInit {
  public creditos: any;
  public creditosTabla: any;
  public columnasTabla: any;
  public cargandoTabla: boolean;

  constructor(
    private creditosService: CreditosService
  ) { }

  ngOnInit(): void {
    this.cargandoTabla = true;
  }

  ngAfterViewInit(): void {
    this.cargarTablaCreditos();
    this.cargarCreditos();
  }

  cargarTablaCreditos(): void {
    this.creditosTabla = $('#creditos-rechazados-tabla').DataTable(
      {
        processing: true,
        scrollX: true,
        language: {
          search: 'Buscar:',
          lengthMenu: 'Mostrando _MENU_ registros',
          info: 'Mostrando _START_ hasta _END_ registros de _TOTAL_',
          loadingRecords: 'Cargando datos',
        },
        columns: this.procesarColumnas(),
        data: [],
        rowCallback: (row, data) => {
          const botonEditar = $(row).children().last().find('.editar');
          const botonEliminar = $(row).children().last().find('.eliminar');
        }
      }
    );
  }

  procesarColumnas(): any {
    const columns = [
      { data: 'id', title: 'Id' },
      { data: 'cliente', title: 'Titular', render: (data) => data.nombres + ' ' + data.apellidos },
      { data: 'cliente', title: 'No. documento', render: (data) => data.identificacion },
      { data: 'tipo_credito', title: 'Tipo de crédito', render: (data) => data.tipo },
      { data: 'monto', title: 'Monto solicitado', render: (data) => new NumeralPipe(data).format('$0,0.00') }
    ];

    return columns;
  }

  cargarCreditos() {
    this.creditosService.listarCreditos('RECHAZADO').then((response) => {
      this.creditos = response;
      this.creditosTabla.clear().draw();
      this.creditosTabla.rows.add(this.creditos);
      this.creditosTabla.columns.adjust().draw();
      this.cargandoTabla = false;
    });
  }
}
