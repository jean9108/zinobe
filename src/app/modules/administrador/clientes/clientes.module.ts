import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientesRoutingModule } from './clientes-routing.module';
import { ClientesComponent } from './clientes.component';
import { ClientesRegistrarComponent } from './clientes-registrar/clientes-registrar.component';
import { ClientesListarComponent } from './clientes-listar/clientes-listar.component';
import { ClientesEditarComponent } from './clientes-editar/clientes-editar.component';


@NgModule({
  declarations: [ClientesComponent, ClientesRegistrarComponent, ClientesListarComponent, ClientesEditarComponent],
  imports: [
    CommonModule,
    ClientesRoutingModule
  ]
})
export class ClientesModule { }
