import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesRegistrarComponent } from './clientes-registrar.component';

describe('ClientesRegistrarComponent', () => {
  let component: ClientesRegistrarComponent;
  let fixture: ComponentFixture<ClientesRegistrarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientesRegistrarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientesRegistrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
