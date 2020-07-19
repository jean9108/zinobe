import { Component, OnInit } from '@angular/core';
import { SidebarService } from './sidebar.service';
import { Menus } from './menus';

@Component({
  selector: 'app-sidebar',
  template: `
    <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
      <li class="logo sidebar-brand d-flex align-items-center justify-content-center">
        <img src="assets/images/logo.svg" />
      </li>
      <hr class="sidebar-divider">
      <div class="sidebar-heading">
        Menu
      </div>
      <li class="nav-item" *ngFor="let menu of menus">
        <a class="nav-link collapsed"
          data-toggle="collapse" [attr.data-target]="'#collapse' + menu.nombre"
          aria-expanded="true"
          href="#"
        >
          <i class="{{menu.icon}}"></i>
          <span>{{menu.nombre}}</span>
        </a>
        <div [id]="'collapse' + menu.nombre"
          class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar"
        >
          <div class="bg-white py-2 collapse-inner rounded">
            <div *ngFor="let subMenu of menu.submenu">
              <a class="collapse-item" [routerLink]= "subMenu.url" [routerLinkActive]="['active']"
                [routerLinkActiveOptions]="{exact: true}">
                <i style="min-width: 19px;" class="{{subMenu.icon}}"></i>
                <span> {{subMenu.nombre}}</span>
              </a>
            </div>
          </div>
        </div>
      </li>
      <hr class="sidebar-divider">
    </ul>
  `,
  styles: [`.logo img{ filter: brightness(10);}`],
  providers: [SidebarService]
})
export class SidebarComponent implements OnInit {
  public menus: Menus[];

  constructor(private sidebarService: SidebarService) { }

  ngOnInit(): void {
    this.getMenus();
  }

  getMenus(): void{
    this.sidebarService.listarMenu().subscribe((menus) => {
      this.menus = menus;
    });
  }
}
