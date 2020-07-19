import { NumberSymbol } from '@angular/common';

export interface TiposCredito {
  [index: number]: {
    id: number,
    id_banco: number,
    tipo: string,
    valor_minimo: number,
    valor_maximo: number,
  };
}
