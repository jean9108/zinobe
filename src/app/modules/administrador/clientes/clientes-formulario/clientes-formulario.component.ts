import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Cliente } from './cliente';
import { ClientesFormularioService } from './clientes-formulario.service';
import { TiposIdentificacion } from '../../../../common/interfaces/tipos-identificacion';

@Component({
  selector: 'app-clientes-formulario',
  templateUrl: './clientes-formulario.component.html',
  providers: [ClientesFormularioService]
})
export class ClientesFormularioComponent implements OnInit {

  @Input() cliente: Cliente = {
    nombres: '',
    apellidos: '',
    id_tipo_identificacion: '',
    email: '',
    identificacion: ''
  };
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

  construirFormulario(): void {
    this.clientesFormulario = new FormBuilder().group(
      {
        nombres: [
          this.cliente.nombres,
          {
            validators: [
              Validators.required,
              Validators.minLength(3),
              Validators.maxLength(40),
              Validators.pattern('^[A-Z a-z]*$')
            ]
          }
        ] ,
        apellidos: [
          this.cliente.apellidos,
          {
            validators: [
              Validators.required,
              Validators.minLength(3),
              Validators.maxLength(40),
              Validators.pattern('^[A-Z a-z]*$')
            ]
          }
        ],
        id_tipo_identificacion: [
          this.cliente.id_tipo_identificacion,
          {
            validators: [
              Validators.required,
              Validators.pattern('^[0-9]*$')
            ]
          }
        ],
        email: [
          this.cliente.email,
          {
            validators: [
              Validators.required,
              Validators.email
            ]
          }
        ],
        identificacion: [
          this.cliente.identificacion,
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
