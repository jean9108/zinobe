import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './common/components/not-found/not-found.component';


const routes: Routes = [
  { path: 'administrador', loadChildren: () => import('./modules/administrador/administrador.module').then(m => m.AdministradorModule) },
  { path: '', redirectTo: 'administrador', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
