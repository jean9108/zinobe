import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreditosComponent } from './creditos.component';
import { CreditosGenerarComponent } from './creditos-generar/creditos-generar.component';
import { CreditosAprobadosComponent } from './creditos-aprobados/creditos-aprobados.component';
import { CreditosRechazadosComponent } from './creditos-rechazados/creditos-rechazados.component';

const routes: Routes = [
  { path: '', component: CreditosComponent, children:
    [
      { path: '', component: CreditosGenerarComponent },
      { path: 'aprobados', component: CreditosAprobadosComponent },
      { path: 'rechazados', component: CreditosRechazadosComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreditosRoutingModule { }
