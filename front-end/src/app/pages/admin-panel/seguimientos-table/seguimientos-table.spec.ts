import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeguimientosTable } from './seguimientos-table';

describe('SeguimientosTable', () => {
  let component: SeguimientosTable;
  let fixture: ComponentFixture<SeguimientosTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeguimientosTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeguimientosTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
