import { Component, OnInit, AfterViewInit, SimpleChanges, ViewChild, Input, ElementRef } from '@angular/core';
import $ from 'jquery';

declare var $: $;

@Component({
  selector: 'app-modal',
  template: `
    <div #modal class="modal" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{title}}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>{{message}}</p>
          </div>
          <div class="modal-footer">
            <button (click)="runAcceptFunction()" type="button" class="btn btn-primary">Aceptar</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ModalComponent implements OnInit, AfterViewInit {
  @ViewChild('modal', {read: ElementRef}) modalElementRef: ElementRef;
  public title: string;
  public message: string;
  private modal: any;
  private acceptFunction: any;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.generateModalComponent();
  }

  generateModalComponent() {
    this.modal = $(this.modalElementRef.nativeElement);
  }

  setTitle(title) {
    this.title = title;
  }

  setMessage(message) {
    this.message = message;
  }

  show(): void {
    this.modal.modal();
  }

  hide(): void {
    this.modal.modal('hide');
  }

  accept(acceptFunction): void {
    this.acceptFunction = acceptFunction;
  }

  runAcceptFunction(): void {
    this.acceptFunction();
  }
}
