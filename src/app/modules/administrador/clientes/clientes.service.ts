import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../../../common/interfaces/cliente';

@Injectable()
export class ClientesService {
  constructor(
    private http: HttpClient
  ) {}

  registrar(cliente: Cliente): Observable<any> {
    return this.http.post('/clientes', cliente);
  }

  listar(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>('/clientes');
  }

  editar(cliente: Cliente, id: number): Observable<any> {
    return this.http.put('/clientes/' + id, cliente);
  }

  eliminar(id: number): Observable<any> {
    return this.http.delete('/clientes/' + id);
  }

  ver(id: number): Observable<Cliente> {
    return this.http.get<Cliente>('/clientes/' + id);
  }
}
