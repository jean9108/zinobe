import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientesRoutingModule } from './clientes-routing.module';
import { ClientesComponent } from './clientes.component';
import { ClientesRegistrarComponent } from './clientes-registrar/clientes-registrar.component';
import { ClientesListarComponent } from './clientes-listar/clientes-listar.component';
import { ClientesEditarComponent } from './clientes-editar/clientes-editar.component';
import { ClientesFormularioComponent } from './clientes-formulario/clientes-formulario.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ClientesService } from './clientes.service';

@NgModule({
  declarations: [
    ClientesComponent,
    ClientesRegistrarComponent,
    ClientesListarComponent,
    ClientesEditarComponent,
    ClientesFormularioComponent
  ],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    ClientesService
  ]
})
export class ClientesModule { }
