import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditosRechazadosComponent } from './creditos-rechazados.component';

describe('CreditosRechazadosComponent', () => {
  let component: CreditosRechazadosComponent;
  let fixture: ComponentFixture<CreditosRechazadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreditosRechazadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditosRechazadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
