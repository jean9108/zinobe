import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdministradorComponent } from './administrador.component';


const routes: Routes = [
  { path: '', component: AdministradorComponent, children: [
      { path: 'clientes', loadChildren: () => import('./clientes/clientes.module').then(m => m.ClientesModule) },
      { path: 'creditos', loadChildren: () => import('./creditos/creditos.module').then(m => m.CreditosModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministradorRoutingModule { }
