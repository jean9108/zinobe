import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Cliente } from '../../../../common/interfaces/cliente';
import { ClientesFormularioService } from './clientes-formulario.service';
import { TiposIdentificacion } from '../../../../common/interfaces/tipos-identificacion';

@Component({
  selector: 'app-clientes-formulario',
  templateUrl: './clientes-formulario.component.html',
  providers: [ClientesFormularioService]
})
export class ClientesFormularioComponent implements OnInit, OnChanges {

  @Input() cliente: Cliente;
  @Output() clienteFormulario = new EventEmitter<Cliente>();
  public clientesFormulario: FormGroup;
  public tiposIdentificacion: TiposIdentificacion;

  constructor(
    private clientesFormularioService: ClientesFormularioService
  ) { }

  ngOnInit(): void {
    this.construirFormulario();
    this.getTipoIdentificacion();
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const prop in changes) {
      if (prop === 'cliente') {
        this.cliente = changes[prop].currentValue;
        this.cargarDatosFormulario();
      }
    }
  }

  cargarDatosFormulario(): void {
    if (this.cliente !== undefined) {
      this.clientesFormulario.setValue(this.cliente);
    }
  }

  construirFormulario(): void {
    this.clientesFormulario = new FormBuilder().group(
      {
        id: [
          ''
        ],
        nombres: [
          '',
          {
            validators: [
              Validators.required,
              Validators.minLength(3),
              Validators.maxLength(40),
              Validators.pattern('^[A-Z a-zÀ-ÿ]*$')
            ]
          }
        ],
        apellidos: [
          '',
          {
            validators: [
              Validators.required,
              Validators.minLength(3),
              Validators.maxLength(40),
              Validators.pattern('^[A-Z a-zÀ-ÿ]*$')
            ]
          }
        ],
        id_tipo_identificacion: [
          '',
          {
            validators: [
              Validators.required,
              Validators.pattern('^[0-9]*$')
            ]
          }
        ],
        email: [
          '',
          {
            validators: [
              Validators.required,
              Validators.email
            ]
          }
        ],
        identificacion: [
          '',
          {
            validators: [
              Validators.required,
              Validators.minLength(6),
              Validators.maxLength(10),
              Validators.pattern('^[A-Za-z0-9]*$')
            ]
          }
        ],
      }
    );
  }

  get form() {
    return this.clientesFormulario.controls;
  }

  getTipoIdentificacion(): void {
    this.clientesFormularioService.getTiposIdentificacion().subscribe((tiposIdentificacion) => {
      this.tiposIdentificacion = tiposIdentificacion;
    });
  }

  onSubmit(): void {
    if (this.clientesFormulario.valid === true ) {
      this.clienteFormulario.emit(this.clientesFormulario.value);
      this.clientesFormulario.reset();
    }
  }
}
