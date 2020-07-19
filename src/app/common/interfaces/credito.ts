export interface Credito {
  id?: number;
  id_cliente: number;
  id_tipo_credito: number;
  monto: number;
  fecha_limite_pago: Date;
  estado_credito: string;
  pago_credito: string;
}
