import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-spinner',
  template: `
    <div class="spinner-border text-primary" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  `,
  styles: [`
    :host { position: absolute; width: 100%; height: 100%; display: flex; justify-content: center;
      align-items: center; background-color: rgba(255, 255, 255, 0.6); z-index: 2;
    }
  `]
})
export class SpinnerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
