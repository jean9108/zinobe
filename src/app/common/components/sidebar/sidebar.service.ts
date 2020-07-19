import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Menus } from './menus';

@Injectable()
export class SidebarService {
  constructor(
    private http: HttpClient
  ) {}

  listarMenu(): Observable<Menus[]> {
    return this.http.get<Menus[]>('/menus');
  }
}