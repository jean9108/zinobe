import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TiposIdentificacion } from 'src/app/common/interfaces/tipos-identificacion';

@Injectable()
export class ClientesFormularioService {
  constructor(
    private http: HttpClient
  ) {}

  getTiposIdentificacion(): Observable<TiposIdentificacion> {
    return this.http.get<TiposIdentificacion>('/tipos-identificacion');
  }
}
