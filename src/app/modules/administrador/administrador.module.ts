import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministradorRoutingModule } from './administrador-routing.module';
import { AdministradorComponent } from './administrador.component';
import { HeaderComponent } from '../../common/components/header/header.component';
import { SidebarComponent } from '../../common/components/sidebar/sidebar.component';

@NgModule({
  declarations: [
    AdministradorComponent,
    HeaderComponent,
    SidebarComponent,
  ],
  imports: [
    CommonModule,
    AdministradorRoutingModule,
  ]
})
export class AdministradorModule { }
