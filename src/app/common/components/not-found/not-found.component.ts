import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  template: `
  <div id="content-wrapper" class="d-flex flex-column">
    <div>
        <div class="text-center">
          <div class="error mx-auto" data-text="404">404</div>
          <p class="lead text-gray-800 mb-5">Page Not Found</p>
          <p class="text-gray-500 mb-0">It looks like you found a glitch in the matrix...</p>
        </div>
    </div>
  </div>
  `,
  styles: [`
    :host { width: 100%; min-height: 100vh }
    :host #content-wrapper { min-height: 100vh; justify-content: center }
  `]
})
export class NotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
