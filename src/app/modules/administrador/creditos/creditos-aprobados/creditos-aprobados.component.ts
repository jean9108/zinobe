import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../../../../common/components/modal/modal.component';
import { CreditosService } from '../creditos.service';
import { CommunicatorService } from 'src/app/common/services/communicator.service';
import { NumeralPipe } from 'ngx-numeral';
import { CapitalChipComponent } from 'src/app/common/components/capital-chip/capital-chip.component';
import $ from 'jquery';

declare var $: $;

@Component({
  selector: 'app-clientes-listar',
  template: `
    <app-modal #modal></app-modal>
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
  private capitalChipComponent: CapitalChipComponent;
  @ViewChild('modal') modal: ModalComponent;

  constructor(
    private creditosService: CreditosService,
    private communicator: CommunicatorService
  ) { }

  ngOnInit(): void {
    this.capitalChipComponent = this.communicator.getCapitalChipComponent();
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
          const botonPazYSalvo = $(row).children().last().find('.paz-y-salvo');

          botonPazYSalvo.on('click', () => {
            this.cambiarEstadoPago(data, row);
          });
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
          if (data === 'PAGADO') {
            return `
              <span class="btn btn-success btn-icon-split default-cursor">
                <span class="icon text-white-50">
                  <i class="fas fa-check"></i>
                </span>
                <span class="text">Pagado</span>
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
      },
      {
        data: 'acciones', title: 'Acciones', render: (data, type, row) => {
          if (row.pago_credito === 'PENDIENTE') {
            return `<button title="Paz y salvo" class="paz-y-salvo btn btn-primary"><i class="fas fa-handshake"></i></button>`;
          } else {
            return `<button disabled title="No hay acciones que realizar" class="btn btn-primary">N/A</button>`;
          }
        }
      }
    ];

    return columns;
  }

  cargarCreditos() {
    this.creditosService.listarCreditos('APROBADO').then((response) => {
      this.creditos = response;
      this.creditosTabla.clear().draw(false);
      this.creditosTabla.rows.add(this.creditos);
      this.creditosTabla.columns.adjust().draw(false);
      this.cargandoTabla = false;
    });
  }

  cambiarEstadoPago(data, row) {
    this.modal.show();
    this.modal.setTitle('Aviso de confirmación');
    this.modal.setMessage('¿Está seguro que desea cambiar el estado del crédito a pagado?');

    this.modal.accept(() => {
      this.cargandoTabla = true;
      this.creditosService.cambiarEstadoCreditoAPagado(data).then((response) => {
        this.capitalChipComponent.actualizarCapital(response.capitalFinal);
        this.cargarCreditos();
        this.modal.hide();
      });
    });
  }
}
