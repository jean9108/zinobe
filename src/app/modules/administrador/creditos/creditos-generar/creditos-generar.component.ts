import { Component, OnInit } from '@angular/core';
import { CreditosGenerarService } from './creditos-generar.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TiposCredito } from 'src/app/common/interfaces/tipos-creditos';
import { map, startWith, debounceTime, tap, switchMap, finalize } from 'rxjs/operators';
import { Cliente } from '../../../../common/interfaces/cliente';

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

  constructor(private creditosGenerarService: CreditosGenerarService) { }

  ngOnInit(): void {
    this.construirFormulario();
    this.getTipoCredito();
  }

  construirFormulario(): void {
    this.creditosFormulario = new FormBuilder().group({
      id_cliente: [
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
        '',
        {
          Validators: [
            Validators.required
          ]
        }
      ],
      estado_credito: [
        '',
        {
          Validator: [
            Validators.required,
            Validators.pattern('^[A-Z]*$'),
          ]
        }
      ],
      pago_credito: [
        '',
        {
          Validator: [
            Validators.required,
            Validators.pattern('^[A-Z]*$'),
          ]
        }
      ]
    });
  }

  getBusquedas(busqueda): void {
    const valorBusqueda = busqueda.term;

    this.creditosGenerarService.buscarClientes(valorBusqueda).pipe(
      debounceTime(500),
      tap(() => {
        this.error = '';
        this.loading = true;
      }),
      finalize(() => {
        this.loading = false;
      })
    ).subscribe(data => {
      this.error = '';
      this.clientes = [...data];
    });
  }

  getTipoCredito(): void {
    this.creditosGenerarService.getTiposCreditos().subscribe((tiposCredito) => {
        this.tiposCredito = tiposCredito;
    });
  }

  get form() {
    return this.creditosFormulario.controls;
  }

  onSubmit(): void {
    console.log(this.creditosFormulario.value);
  }

}
