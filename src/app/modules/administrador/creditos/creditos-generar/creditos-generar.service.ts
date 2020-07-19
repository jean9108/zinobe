import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TiposCredito } from 'src/app/common/interfaces/tipos-creditos';
import { Cliente } from 'src/app/common/interfaces/cliente';

@Injectable()
export class CreditosGenerarService {
  constructor(
    private http: HttpClient
  ) {}

  getTiposCreditos(): Observable<TiposCredito> {
    return this.http.get<TiposCredito>('/tipos-creditos');
  }

  buscarClientes(identificacion: string): Observable<Cliente[]> {
    return this.http.get<Cliente[]>('/clientes?identificacion_like=' + identificacion);
  }
}
