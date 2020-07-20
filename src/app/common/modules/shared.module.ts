import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SpinnerComponent } from '../components/spinner/spinner.component';
import { ModalComponent } from '../components/modal/modal.component';
import { NgxCleaveDirectiveModule } from 'ngx-cleave-directive';

@NgModule({
  declarations: [
    SpinnerComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgxCleaveDirectiveModule
  ],
  exports: [
    SpinnerComponent,
    ModalComponent,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgxCleaveDirectiveModule
  ]
})
export class SharedModule { }
