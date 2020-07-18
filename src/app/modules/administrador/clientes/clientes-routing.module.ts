import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientesComponent } from './clientes.component';
import { ClientesListarComponent } from './clientes-listar/clientes-listar.component';
import { ClientesRegistrarComponent } from './clientes-registrar/clientes-registrar.component';
import { ClientesEditarComponent } from './clientes-editar/clientes-editar.component';


const routes: Routes = [
  { path: '', component: ClientesComponent, children:
    [
      { path: '', component: ClientesListarComponent },
      { path: 'registrar', component: ClientesRegistrarComponent },
      { path: 'actualizar/:id', component: ClientesEditarComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule { }
