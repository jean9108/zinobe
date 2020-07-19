import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreditosRoutingModule } from './creditos-routing.module';
import { CreditosComponent } from './creditos.component';
import { CreditosGenerarComponent } from './creditos-generar/creditos-generar.component';
import { CreditosAprobadosComponent } from './creditos-aprobados/creditos-aprobados.component';
import { CreditosRechazadosComponent } from './creditos-rechazados/creditos-rechazados.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    CreditosComponent,
    CreditosGenerarComponent,
    CreditosAprobadosComponent,
    CreditosRechazadosComponent
  ],
  imports: [
    CommonModule,
    CreditosRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule
  ]
})
export class CreditosModule { }
