import { Component, OnInit } from '@angular/core';
import { CreditosGenerarService } from './creditos-generar.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TiposCredito } from 'src/app/common/interfaces/tipos-creditos';
import { map, startWith, debounceTime, tap, switchMap, finalize } from 'rxjs/operators';
import { Cliente } from '../../../../common/interfaces/cliente';
import { NumeralPipe } from 'ngx-numeral';
import { Options } from 'ng5-slider';

@Component({
  selector: 'app-creditos-generar',
  templateUrl: './creditos-generar.component.html',
  styleUrls: ['./creditos-generar.component.css'],
  providers: [CreditosGenerarService]
})
export class CreditosGenerarComponent implements OnInit {

  public creditosFormulario: FormGroup;
  public tiposCredito: TiposCredito;
  public error: string;
  public loading: boolean;
  public clientes: Cliente[];
  public keyword = 'identificacion';
  public nombres: string;
  public apellidos: string;
  public opciones: Options;
  public monto = 0;
  public fechaPago: string;


  constructor(private creditosGenerarService: CreditosGenerarService) { }

  ngOnInit(): void {
    this.construirFormulario();
    this.getBusquedasCliente();
    this.getTipoCredito();
  }

  construirFormulario(): void {
    this.creditosFormulario = new FormBuilder().group({
      id_cliente: [
        ''
      ],
      cliente: [
        '',
        {
          Validators: [
            Validators.required,
          ]
        }
      ],
      id_tipo_credito: [
        '',
        {
          Validators: [
            Validators.required,
            Validators.pattern('^[0-9]*$')
          ]
        }
      ],
      monto: [
        '',
        {
          Validators: [
            Validators.required,
          ]
        }
      ],
      fecha_limite_pago: [
        '2020-12-31 20:00:00',
        {
          Validators: [
            Validators.required
          ]
        }
      ]
    });
  }

  getBusquedasCliente(): void {
    this.creditosFormulario.get('cliente').valueChanges.pipe(
      debounceTime(500),
      tap(() => {
        this.loading = true;
        this.error = '';
      }),
      switchMap(value =>
        this.creditosGenerarService.buscarClientes(value)
        .pipe(
          finalize(() => {
            this.loading = false;
          })
        ),
      )
    ).subscribe(data => {
      this.error = '';
      this.clientes = data;
      this.loading = false;
    });
  }

  getTipoCredito(): void {
    this.creditosGenerarService.getTiposCreditos().subscribe((tiposCredito) => {
        this.tiposCredito = tiposCredito;
    });
  }

  clearCliente() {
    this.nombres = this.apellidos = '';
  }

  selectedCliente(cliente) {
    this.nombres = cliente.nombres;
    this.apellidos = cliente.apellidos;
    this.creditosFormulario.patchValue({
      id_cliente: cliente.id
    });
  }

  selectTipoCredito(tipo) {
    if (tipo !== undefined) {
      this.opciones = {
        floor: tipo.valor_minimo,
        ceil: tipo.valor_maximo,
        step: 500000,
        showTicks: true,
        readOnly: false,
        translate: (value: number): string => {
          return new NumeralPipe(value).format('$0,0.00');
        }
      };
    }
  }

  actualizarMonto(monto) {
    this.monto = (typeof monto === 'number') ? monto : Number(monto.replace(/[^0-9.-]+/g, ''));
    this.creditosFormulario.patchValue({ monto });
  }

  get form() {
    return this.creditosFormulario.controls;
  }

  onSubmit(): void {
    if (this.creditosFormulario.valid === true ) {
      const data = this.creditosFormulario.value;
      this.creditosGenerarService.generarCredito(data).then((response) => {
        console.log(response);
      });
    }
}

}
