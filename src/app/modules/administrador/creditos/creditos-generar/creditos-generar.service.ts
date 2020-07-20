import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TiposCredito } from 'src/app/common/interfaces/tipos-creditos';
import { Cliente } from 'src/app/common/interfaces/cliente';
import { Credito } from '../../../../common/interfaces/credito';
import { Banco } from 'src/app/common/interfaces/banco';

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

  async cantidadCreditosRechazados(idCliente: number): Promise<number> {
    const creditos = await this.http.get<any>('/creditos?id_cliente=' + idCliente + '&estado_like=RECHAZADO').toPromise();
    return creditos.length;
  }

  async cantidadCreditosPendientesPorPagar(idCliente: number): Promise<number> {
    const creditos = await this.http.get<any>('/creditos?id_cliente=' + idCliente + '&pago_credito_like=PENDIENTE').toPromise();
    return creditos.length;
  }

  async cantidadCreditosAprobados(idCliente: number): Promise<number> {
    const creditos = await this.http.get<any>('/creditos?id_cliente=' + idCliente + '&estado_credito_like=APROBADO').toPromise();
    return creditos.length;
  }

  calcularAprobacionCredito(): string {
    const probabilidad = Math.random();
    if (probabilidad >= 0.3) {
      return 'APROBADO';
    } else {
      return 'RECHAZADO';
    }
  }

  async generarCredito(credito: Credito): Promise<any> {
    const idCliente = credito.id_cliente;
    const cantidadCreditosRechazados = await this.cantidadCreditosRechazados(idCliente);
    const cantidadCreditosPendientesPorPagar = await this.cantidadCreditosPendientesPorPagar(idCliente);
    const cantidadCreditosAprobados = await this.cantidadCreditosAprobados(idCliente);
    let estadoCredito = this.calcularAprobacionCredito();
    let error = '';
    let creditoMonto: any = credito.monto;
    creditoMonto = (typeof creditoMonto === 'number') ? creditoMonto : Number(creditoMonto.replace(/[^0-9.-]+/g, ''));
    const existeCapitalBanco = await this.validarExisteCapitalBanco(creditoMonto);

    if (!existeCapitalBanco) {
      error = 'No se pudo generar el crédito ya que no hay capital disponible en el banco';
      return { error };
    }

    if (cantidadCreditosRechazados) {
      error = 'No se pudo generar el crédito ya que tiene ' + cantidadCreditosRechazados + ' rechazados';
      estadoCredito = 'RECHAZADO';
      await this.guardarCredito(credito, estadoCredito);
      return { error };
    }

    if (cantidadCreditosPendientesPorPagar) {
      error = 'No se pudo generar el crédito ya que tiene ' + cantidadCreditosPendientesPorPagar + ' pendientes por pagar';
      return { error };
    }

    if (cantidadCreditosAprobados) {
      estadoCredito = 'APROBADO';
      const response: any = await this.guardarCredito(credito, estadoCredito);
      response.capitalFinal = await this.restarAlCapital(creditoMonto);
      return response;
    } else {
      if (estadoCredito === 'RECHAZADO') {
        error = 'Su crédito ha sido rechazado';
        await this.guardarCredito(credito, estadoCredito);
      } else {
        const response: any = await this.guardarCredito(credito, estadoCredito);
        response.capitalFinal = await this.restarAlCapital(creditoMonto);
        return response;
      }
    }

    return { error };
  }

  async guardarCredito(credito: any, estado: string) {
    credito.estado_credito = estado;
    credito.pago_credito = 'PENDIENTE';
    delete credito.cliente;

    const capitalFinal = await this.http.post('/creditos', credito).toPromise();
    return { success: 'Se ha registrado el crédito con éxito' };
  }

  async restarAlCapital(prestamo: number) {
    const capitalFinalBanco = await this.obtenerBanco();
    capitalFinalBanco.capital_final -= prestamo;
    capitalFinalBanco.capital_prestado += prestamo;

    await this.http.put('/bancos/1', capitalFinalBanco).toPromise();
    return capitalFinalBanco.capital_final;
  }

  async obtenerBanco(): Promise<Banco> {
    return await this.http.get<any>('/bancos/1').toPromise();
  }

  async validarExisteCapitalBanco(prestamo: number) {
    const capitalFinalBanco = await this.obtenerBanco();
    capitalFinalBanco.capital_final -= prestamo;
    if (capitalFinalBanco.capital_final > 0) {
      return true;
    }
    return false;
  }
}
