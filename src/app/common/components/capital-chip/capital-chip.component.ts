import { Component, OnInit } from '@angular/core';
import { CapitalChipService } from './capital-chip.service';
import { CommunicatorService } from 'src/app/common/services/communicator.service';
import { NumeralPipe } from 'ngx-numeral';

@Component({
  selector: 'app-capital-chip',
  template: `
    <li class="nav-item dropdown no-arrow">
      <div class="card border-left-primary">
        <div class="card-body">
          <div class="row no-gutters align-items-center">
            <div class="capital-wrapper">
              <div class="capital-monto">
                <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">Capital disponible</div>
                  <div class="h5 mb-0 font-weight-bold text-gray-800 capital-monto-text">{{banco?.capital_final}}</div>
                </div>
              </div>
              <div class="col-auto">
                <i class="fas fa-dollar-sign text-gray-300"></i>
              </div>
            </div>
        </div>
      </div>
    </li>
  `,
  styles: [`
    .capital-wrapper { display: flex; align-items: center; justify-content: center; }
    .capital-monto { display: flex; align-items: center; justify-content: center; flex-flow: column; margin-right: 13px; margin-left: 6px; }
    .capital-monto-text { font-size: 12px !important; }
    .fa-dollar-sign{background: #4e73df; font-size: 20px; padding: 10px;border-radius:100%;color: white;line-height: 0.5;}
    .card-body{padding: 0.7rem;}
    .card{border: none; border-radius: initial;}
  `],
  providers: [CapitalChipService]
})
export class CapitalChipComponent implements OnInit {
  public banco: any;

  constructor(
    private capitalChipService: CapitalChipService,
    private communicatorService: CommunicatorService
  ) {
    this.communicatorService.setCapitalChipComponent(this);
  }

  ngOnInit(): void {
    this.capitalChipService.obtenerBanco().then((banco) => {
      this.banco = banco;
      this.banco.capital_final = this.formatearCapital(banco.capital_final);
    });
  }

  actualizarCapital(nuevoCapital): void {
    this.banco.capital_final = this.formatearCapital(nuevoCapital);
  }

  formatearCapital(capital) {
    return new NumeralPipe(capital).format('$0,0.00');
  }
}
