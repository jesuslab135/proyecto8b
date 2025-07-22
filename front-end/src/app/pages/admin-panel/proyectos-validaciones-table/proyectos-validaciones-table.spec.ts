import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectosValidacionesTable } from './proyectos-validaciones-table';

describe('ProyectosValidacionesTable', () => {
  let component: ProyectosValidacionesTable;
  let fixture: ComponentFixture<ProyectosValidacionesTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProyectosValidacionesTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProyectosValidacionesTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
