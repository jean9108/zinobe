import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
    <ul class="navbar-nav ml-auto">
      <li class="nav-item dropdown no-arrow d-sm-none"></li>
      <li class="nav-item dropdown no-arrow mx-1"></li>
      <li class="nav-item dropdown no-arrow mx-1"></li>
      <li class="nav-item dropdown no-arrow">
        <app-capital-chip></app-capital-chip>
      </li>
    </ul>
  `,
  styles: []
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
