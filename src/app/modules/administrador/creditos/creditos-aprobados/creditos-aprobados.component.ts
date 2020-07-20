import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CreditosService } from '../creditos.service';
import { NumeralPipe } from 'ngx-numeral';
import $ from 'jquery';

declare var $: $;

@Component({
  selector: 'app-clientes-listar',
  template: `
    <div class="card shadow mb-4">
      <div class="card-header py-3 bg-gradient-success">
          <h6 class="m-0 font-weight-bold text-white">Créditos aprobados</h6>
      </div>
      <div class="card-body">
        <a class="btn btn-primary mb-4" [routerLink]="['/administrador/creditos']">
          <i class="fas fa-money-check-alt"></i> Nueva solicitud de crédito
        </a>
        <div class="table-wrapper">
          <app-spinner *ngIf="cargandoTabla === true"></app-spinner>
          <table width="100%" id="creditos-aprobados-tabla" class="table nowrap table-bordered"></table>
        </div>
      </div>
    </div>
  `,
  styles: [``],
})
export class CreditosAprobadosComponent implements OnInit, AfterViewInit {
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
    this.creditosTabla = $('#creditos-aprobados-tabla').DataTable(
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
      { data: 'monto', title: 'Monto solicitado', render: (data) => new NumeralPipe(data).format('$0,0.00') },
      { data: 'pago_credito', title: 'Estado de pago', render: (data) => {
          if (data === 'FINALIZADO') {
            return `
              <span class="btn btn-success btn-icon-split default-cursor">
                <span class="icon text-white-50">
                  <i class="fas fa-check"></i>
                </span>
                <span class="text">Finalizado</span>
              </span>
            `;
          }

          if (data === 'PENDIENTE') {
            return `
            <span class="btn btn-warning btn-icon-split default-cursor">
              <span class="icon text-white-50">
                <i class="fas fa-exclamation-triangle"></i>
              </span>
              <span class="text">Pendiente</span>
            </span>
            `;
          }

          return ``;
        }
      }
    ];

    return columns;
  }

  cargarCreditos() {
    this.creditosService.listarCreditos('APROBADO').then((response) => {
      console.log(response);
      this.creditos = response;
      this.creditosTabla.clear().draw();
      this.creditosTabla.rows.add(this.creditos);
      this.creditosTabla.columns.adjust().draw();
      this.cargandoTabla = false;
    });
  }
}
