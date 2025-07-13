import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectosTable } from './proyectos-table';

describe('ProyectosTable', () => {
  let component: ProyectosTable;
  let fixture: ComponentFixture<ProyectosTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProyectosTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProyectosTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
