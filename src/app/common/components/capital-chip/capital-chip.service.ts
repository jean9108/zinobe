import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Banco } from '../../interfaces/banco';
import { Observable } from 'rxjs';

@Injectable()
export class CapitalChipService {
  constructor(
    private http: HttpClient
  ) {}

  obtenerBanco(): Promise<Banco> {
    return this.http.get<Banco>('/bancos/1').toPromise();
  }
}
