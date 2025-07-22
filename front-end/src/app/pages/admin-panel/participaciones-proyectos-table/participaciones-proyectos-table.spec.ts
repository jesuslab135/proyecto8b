import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipacionesProyectosTable } from './participaciones-proyectos-table';

describe('ParticipacionesProyectosTable', () => {
  let component: ParticipacionesProyectosTable;
  let fixture: ComponentFixture<ParticipacionesProyectosTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParticipacionesProyectosTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParticipacionesProyectosTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
