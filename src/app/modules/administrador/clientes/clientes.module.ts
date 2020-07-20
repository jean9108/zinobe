import { NgModule } from '@angular/core';
import { ClientesRoutingModule } from './clientes-routing.module';
import { ClientesComponent } from './clientes.component';
import { ClientesRegistrarComponent } from './clientes-registrar/clientes-registrar.component';
import { ClientesListarComponent } from './clientes-listar/clientes-listar.component';
import { ClientesEditarComponent } from './clientes-editar/clientes-editar.component';
import { ClientesFormularioComponent } from './clientes-formulario/clientes-formulario.component';
import { ClientesService } from './clientes.service';
import { SharedModule } from 'src/app/common/modules/shared.module';

@NgModule({
  declarations: [
    ClientesComponent,
    ClientesRegistrarComponent,
    ClientesListarComponent,
    ClientesEditarComponent,
    ClientesFormularioComponent
  ],
  imports: [
    SharedModule,
    ClientesRoutingModule,
  ],
  providers: [
    ClientesService
  ]
})
export class ClientesModule { }
