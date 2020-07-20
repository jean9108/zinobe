import { Injectable } from '@angular/core';
import { CapitalChipComponent } from '../components/capital-chip/capital-chip.component';

@Injectable({
  providedIn: 'root'
})
export class CommunicatorService {
  public capitalChipComponent: CapitalChipComponent;

  setCapitalChipComponent(component) {
    this.capitalChipComponent = component;
  }

  getCapitalChipComponent(): CapitalChipComponent {
    return this.capitalChipComponent;
  }
}