import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestioneVeicoliComponent } from './gestione-veicoli.component';

describe('GestioneVeicoliComponent', () => {
  let component: GestioneVeicoliComponent;
  let fixture: ComponentFixture<GestioneVeicoliComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestioneVeicoliComponent]
    });
    fixture = TestBed.createComponent(GestioneVeicoliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
