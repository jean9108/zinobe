import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TiposCredito } from 'src/app/common/interfaces/tipos-creditos';
import { Cliente } from 'src/app/common/interfaces/cliente';
import { Credito } from '../../../../common/interfaces/credito';

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
    const creditos = await this.http.get<any>('/creditos?id_cliente=' + idCliente + '&estado_like=APROBADO').toPromise();
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
    let errorMessage = '';

    if (cantidadCreditosRechazados) {
      console.log(1);
      errorMessage = 'No se pudo generar el crédito ya que tiene ' + cantidadCreditosRechazados + ' rechazados';
      estadoCredito = 'RECHAZADO';
      await this.guardarCredito(credito, estadoCredito);
      return errorMessage;
    }

    if (cantidadCreditosPendientesPorPagar) {
      console.log(2);
      errorMessage = 'No se pudo generar el crédito ya que tiene ' + cantidadCreditosPendientesPorPagar + ' pendientes por pagar';
      return errorMessage;
    }

    if (cantidadCreditosAprobados) {
      console.log(3);
      estadoCredito = 'APROBADO';
      await this.guardarCredito(credito, estadoCredito);
    } else {
      if (estadoCredito === 'RECHAZADO') {
        console.log(4);
        errorMessage = 'Su crédito ha sido rechazado';
        await this.guardarCredito(credito, estadoCredito);
      } else {
        console.log(5);
        return await this.guardarCredito(credito, estadoCredito);
      }
    }

    return errorMessage;
  }

  async guardarCredito(credito: any, estado: string) {
    credito.estado_credito = estado;
    credito.pago_credito = 'PENDIENTE';
    delete credito.cliente;
    await this.http.post('/creditos', credito).toPromise();
    return 'Se ha registrado el crédito con éxito';
  }

}
