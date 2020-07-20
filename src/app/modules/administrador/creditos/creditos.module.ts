import { NgModule } from '@angular/core';
import { CreditosRoutingModule } from './creditos-routing.module';
import { CreditosComponent } from './creditos.component';
import { CreditosGenerarComponent } from './creditos-generar/creditos-generar.component';
import { CreditosAprobadosComponent } from './creditos-aprobados/creditos-aprobados.component';
import { CreditosRechazadosComponent } from './creditos-rechazados/creditos-rechazados.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { CreditosService } from './creditos.service';
import { NgOptionHighlightModule } from '@ng-select/ng-option-highlight';
import { Ng5SliderModule } from 'ng5-slider';
import { SharedModule } from 'src/app/common/modules/shared.module';
import {DpDatePickerModule} from 'ng2-date-picker';

@NgModule({
  declarations: [
    CreditosComponent,
    CreditosGenerarComponent,
    CreditosAprobadosComponent,
    CreditosRechazadosComponent
  ],
  imports: [
    SharedModule,
    CreditosRoutingModule,
    NgSelectModule,
    AutocompleteLibModule,
    NgOptionHighlightModule,
    Ng5SliderModule,
    DpDatePickerModule
  ],
  providers: [
    CreditosService
  ]
})
export class CreditosModule { }
