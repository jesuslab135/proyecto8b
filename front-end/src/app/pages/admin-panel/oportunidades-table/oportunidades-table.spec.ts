import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OportunidadesTable } from './oportunidades-table';

describe('OportunidadesTable', () => {
  let component: OportunidadesTable;
  let fixture: ComponentFixture<OportunidadesTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OportunidadesTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OportunidadesTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
