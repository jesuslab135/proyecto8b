import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsistenciasEventos } from './asistencias-eventos';

describe('AsistenciasEventos', () => {
  let component: AsistenciasEventos;
  let fixture: ComponentFixture<AsistenciasEventos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsistenciasEventos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsistenciasEventos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
