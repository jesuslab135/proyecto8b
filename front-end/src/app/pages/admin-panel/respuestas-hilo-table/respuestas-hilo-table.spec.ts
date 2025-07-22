import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RespuestasHiloTable } from './respuestas-hilo-table';

describe('RespuestasHiloTable', () => {
  let component: RespuestasHiloTable;
  let fixture: ComponentFixture<RespuestasHiloTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RespuestasHiloTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RespuestasHiloTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
