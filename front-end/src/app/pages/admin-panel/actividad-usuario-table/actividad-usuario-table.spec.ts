import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActividadUsuarioTable } from './actividad-usuario-table';

describe('ActividadUsuarioTable', () => {
  let component: ActividadUsuarioTable;
  let fixture: ComponentFixture<ActividadUsuarioTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActividadUsuarioTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActividadUsuarioTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
