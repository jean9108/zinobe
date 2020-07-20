import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Banco } from '../../../common/interfaces/banco';

@Injectable()
export class CreditosService {
  constructor(
    private http: HttpClient
  ) {}

  async cambiarEstadoCreditoAPagado(data): Promise<any> {
    delete data.cliente;
    delete data.tipo_credito;
    data.pago_credito = 'PAGADO';

    let creditoMonto: any = data.monto;
    creditoMonto = (typeof creditoMonto === 'number') ? creditoMonto : Number(creditoMonto.replace(/[^0-9.-]+/g, ''));

    await this.http.put('/creditos/' + data.id, data).toPromise();
    const capitalFinal = await this.sumarAlCapital(creditoMonto);
    return { capitalFinal };
  }

  async obtenerBanco(): Promise<Banco> {
    return await this.http.get<any>('/bancos/1').toPromise();
  }

  async sumarAlCapital(prestamo: number) {
    const capitalFinalBanco = await this.obtenerBanco();
    capitalFinalBanco.capital_final += prestamo;

    await this.http.put('/bancos/1', capitalFinalBanco).toPromise();
    return capitalFinalBanco.capital_final;
  }


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
