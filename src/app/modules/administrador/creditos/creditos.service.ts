import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CreditosService {
  constructor(
    private http: HttpClient
  ) {}

  async listarCreditos(estado: string): Promise<any> {
    let allCreditosData = [];

    const creditos = await this.http.get('/creditos').toPromise();
    const tiposCreditos = await this.http.get('/tipos-creditos').toPromise();
    const clientes = await this.http.get('/clientes').toPromise();

    allCreditosData = this.fakeJoinCreditosWithTiposCreditos(creditos, tiposCreditos);
    allCreditosData = this.fakeJoinCreditosWithClientes(allCreditosData, clientes);
    allCreditosData = allCreditosData.filter(credito => credito.estado_credito === estado);

    return allCreditosData;
  }

  private fakeJoinCreditosWithTiposCreditos(creditos, tiposCreditos): any {
    creditos.forEach((credito) => {
      const tiposCreditosFiltered = tiposCreditos.filter((tipoCredito) => tipoCredito.id === credito.id_tipo_credito)[0];
      credito.tipo_credito = tiposCreditosFiltered || [];
    });

    return creditos;
  }

  private fakeJoinCreditosWithClientes(creditos, clientes): any {
    creditos.forEach((credito) => {
      const tiposCreditosFiltered = clientes.filter((cliente) => cliente.id === credito.id_cliente)[0];
      credito.cliente = tiposCreditosFiltered || [];
    });

    return creditos;
  }
}
