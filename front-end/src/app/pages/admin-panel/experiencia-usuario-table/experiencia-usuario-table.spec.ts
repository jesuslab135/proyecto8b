import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienciaUsuarioTable } from './experiencia-usuario-table';

describe('ExperienciaUsuarioTable', () => {
  let component: ExperienciaUsuarioTable;
  let fixture: ComponentFixture<ExperienciaUsuarioTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExperienciaUsuarioTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExperienciaUsuarioTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
