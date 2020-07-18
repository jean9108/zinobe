import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditosGenerarComponent } from './creditos-generar.component';

describe('CreditosGenerarComponent', () => {
  let component: CreditosGenerarComponent;
  let fixture: ComponentFixture<CreditosGenerarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreditosGenerarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditosGenerarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
